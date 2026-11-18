/* eslint-disable @typescript-eslint/no-require-imports -- Check compatibility of legacy clinical backup data and transactional imports. */
const assert = require('node:assert/strict');
const { createDataLoader } = require('./data-loader.cjs');
const load = createDataLoader();
const plain = value => JSON.parse(JSON.stringify(value));
const { parseClinicalBackup, mergeClinicalBackup, persistClinicalBackup } = load('src/utils/clinicalBackup');
const memo = (id, extra = {}) => ({ id, type: 'custom', title: id, points: ['合谷'], elements: ['金'], indications: [], summary: '学習メモ', createdAt: 10, updatedAt: 20, ...extra });
const note = (id, extra = {}) => ({ id, patientIdentifier: 'TEST-001', chiefComplaint: '架空例', visitDate: '2026-10-27', selectedPoints: [], createdAt: 10, updatedAt: 20, ...extra });
const backup = (memos = [], patientNotes = []) => JSON.stringify({ version: 1, appName: 'haritaro_oriental_medicine_mynote', memos, patientNotes });

const current = memo('existing', { summary: '新しい内容' });
assert.equal(parseClinicalBackup(backup([current], [note('n')])).memos[0].id, current.id);
for (const invalid of ['{}', 'null', backup([{}]), backup([], [null]), backup([memo('x'), memo('x')]), backup([], [note('n', { selectedPoints: null })]), backup([memo('x', { createdAt: 1e30 })]), backup([memo('x', { elements: ['未知'] })])]) assert.throws(() => parseClinicalBackup(invalid));
assert.deepEqual(plain(mergeClinicalBackup([current], [memo('existing'), memo('new')])).map(item => item.summary), ['学習メモ', '新しい内容']);
const raw = new Map([['m', 'original']]);
const disk = { getItem: key => raw.get(key) ?? null, setItem(key, value) { if (key === 'n') throw Error('quota'); raw.set(key, value); }, removeItem: key => raw.delete(key) };
assert.throws(() => persistClinicalBackup(disk, { memos: 'm', notes: 'n' }, [current], []));
assert.equal(raw.get('m'), 'original', 'A failed notes write restores the previous memo snapshot');

const committed = new Map();
const availableDisk = { getItem: key => committed.get(key) ?? null, setItem: (key, value) => committed.set(key, value), removeItem: key => committed.delete(key) };
const imported = parseClinicalBackup(backup([memo('imported')], [note('note')]));
persistClinicalBackup(availableDisk, { memos: 'm', notes: 'n' }, imported.memos, imported.patientNotes);
assert.deepEqual(JSON.parse(committed.get('m')), plain(imported.memos));
assert.deepEqual(JSON.parse(committed.get('n')), plain(imported.patientNotes));
console.log('PASS: legacy clinical backup parsing, non-destructive merge, durable writes and rollback on a partial write.');

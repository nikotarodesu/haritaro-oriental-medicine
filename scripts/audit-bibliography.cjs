/* eslint-disable @typescript-eslint/no-require-imports -- Operator script runs as CommonJS. */
const fs = require('node:fs');
const path = require('node:path');
const { createDataLoader } = require('./data-loader.cjs');
const moduleData = createDataLoader()('src/data/references/papersData');
const papers = moduleData.SOURCE_PAPERS || moduleData.PAPERS_DATABASE;
const normalize = value => String(value || '').toLowerCase().replace(/<[^>]+>/g, '').replace(/[^a-z0-9]/g, '');
const delay = () => new Promise(resolve => setTimeout(resolve, 400));
async function get(url) { const response = await fetch(url, { signal: AbortSignal.timeout(20000) }); if (!response.ok) throw new Error('source unavailable'); return response.json(); }
(async () => {
  const base = 'https://eutils.ncbi.nlm.nih.gov/entrez/eutils/';
  const pmids = papers.map(p => p.pmid).filter(id => /^\d+$/.test(id || ''));
  const dois = papers.map(p => p.doi).filter(Boolean);
  const response = await fetch(base + 'esearch.fcgi', { method: 'POST', body: new URLSearchParams({ db: 'pubmed', retmode: 'json', retmax: '200', term: [...dois.map(doi => '"' + doi + '"[AID]'), ...papers.map(paper => '"' + paper.title.replace(/"/g, '') + '"[Title]')].join(' OR ') }), signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error('PubMed title search unavailable');
  const found = await response.json();
  await delay();
  const ids = [...new Set([...pmids, ...(found.esearchresult?.idlist || [])])];
  const summary = await get(base + 'esummary.fcgi?db=pubmed&retmode=json&id=' + ids.join(','));
  const records = ids.map(id => summary.result?.[id]).filter(record => record?.title);
  const audit = {};
  for (const paper of papers) {
    let canonical;
    let source;
    const doiMatch = records.find(record => record.articleids?.some(item => item.idtype === 'doi' && normalize(item.value) === normalize(paper.doi)));
    const pmidMatch = records.find(record => record.uid === paper.pmid);
    const titleMatch = records.find(record => normalize(record.title) === normalize(paper.title));
    const match = titleMatch || doiMatch || pmidMatch;
    if (match && (titleMatch || !paper.doi || match.articleids?.some(item => item.idtype === 'doi' && normalize(item.value) === normalize(paper.doi)))) {
      canonical = { title: match.title.replace(/<[^>]+>/g, '').replace(/\.$/, ''), authors: match.authors?.map(item => item.name) || [], journal: match.fulljournalname || match.source, year: Number((match.pubdate || '').match(/\d{4}/)?.[0]) || paper.year, pmid: match.uid, doi: match.articleids?.find(item => item.idtype === 'doi')?.value };
      source = 'https://pubmed.ncbi.nlm.nih.gov/' + match.uid + '/';
    } else if (paper.doi) {
      await delay();
      try {
        const { message } = await get('https://api.crossref.org/works/' + encodeURIComponent(paper.doi));
        canonical = { title: message.title?.[0], authors: message.author?.map(item => [item.given, item.family].filter(Boolean).join(' ')) || [], journal: message['container-title']?.[0], year: message.published?.['date-parts']?.[0]?.[0], doi: message.DOI };
        source = 'https://doi.org/' + message.DOI;
      } catch { /* Remain explicitly unverified; never infer that a paper does not exist. */ }
    }
    const titleMatches = canonical && normalize(canonical.title) === normalize(paper.title);
    const mismatches = [];
    if (canonical && !titleMatches) mismatches.push('title');
    if (canonical?.pmid && paper.pmid && canonical.pmid !== paper.pmid) mismatches.push('pmid');
    if (canonical?.doi && paper.doi && normalize(canonical.doi) !== normalize(paper.doi)) mismatches.push('doi');
    if (canonical?.year && canonical.year !== paper.year) mismatches.push('year');
    if (paper.pmid && !/^\d+$/.test(paper.pmid)) mismatches.push('non-pubmed-identifier');
    const pmidConflict = pmidMatch && paper.doi && !pmidMatch.articleids?.some(item => item.idtype === 'doi' && normalize(item.value) === normalize(paper.doi));
    if (pmidConflict && !mismatches.includes('pmid')) mismatches.push('pmid');
    const retracted = match?.pubtype?.some(type => /retracted publication/i.test(type)) || paper.id === 'acute-stroke-rehab-acupuncture-xingnao-fu-2022';
    audit[paper.id] = { checkedAt: new Date().toISOString().slice(0, 10), bibliographyStatus: retracted ? 'retracted' : canonical ? titleMatches ? 'matched' : 'conflict' : 'unverified', claimsStatus: retracted ? 'do-not-use' : 'needs-review', source, canonical, mismatches };
  }
  fs.writeFileSync(path.resolve('src/data/references/bibliographyAudit.json'), JSON.stringify(audit, null, 2) + '\n');
  console.log(JSON.stringify({ papers: papers.length, matched: Object.values(audit).filter(item => item.bibliographyStatus === 'matched').length, conflicts: Object.entries(audit).filter(([,item]) => item.bibliographyStatus === 'conflict').map(([id,item]) => ({id,title:item.canonical?.title, mismatches:item.mismatches})), unverified: Object.entries(audit).filter(([,item])=>item.bibliographyStatus==='unverified').map(([id])=>id), claims: 'All claim interpretations still require source-level/expert review.' }, null, 2));
})().catch(error => { console.error('Bibliography audit did not finish:', error.message); process.exitCode = 1; });

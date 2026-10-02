// The active adapter is account-scoped. It contains no authentication credentials.
export interface LearningStorageAdapter { owner: string; values: () => Record<string, unknown>; set: (key: string, value: unknown) => void }
let activeAdapter: LearningStorageAdapter | null = null;
export function setLearningStorageAdapter(adapter: LearningStorageAdapter | null) { activeAdapter = adapter; }
export function getLearningStorageAdapter() { return activeAdapter; }

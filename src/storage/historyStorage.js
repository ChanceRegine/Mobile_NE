import { getStoredHistory, saveStoredHistory } from '../utils/storage';

export async function loadHistory() {
  return getStoredHistory();
}

export async function addHistoryWord(word) {
  const history = await getStoredHistory();
  const normalized = word.trim().toLowerCase();
  const deduped = history.filter((item) => item !== normalized);
  const next = [normalized, ...deduped].slice(0, 20);
  await saveStoredHistory(next);
  return next;
}

export async function clearHistory() {
  await saveStoredHistory([]);
}

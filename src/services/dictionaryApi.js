import { create } from 'axios';

const api = create({
  baseURL: 'https://api.dictionaryapi.dev/api/v2/entries/en',
  timeout: 15000,
});

export async function fetchWord(word) {
  const response = await api.get(`/${encodeURIComponent(word.trim().toLowerCase())}`);
  const { data } = response;

  // Guard against malformed API responses so the app can fail gracefully.
  if (!Array.isArray(data)) {
    const malformedError = new Error('Malformed dictionary response');
    malformedError.code = 'MALFORMED_RESPONSE';
    throw malformedError;
  }

  return data;
}

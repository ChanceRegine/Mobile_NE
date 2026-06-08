export function validateWordInput(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return 'Please enter a word to search.';
  }

  if (/\s+/.test(trimmed)) {
    return 'Please search for one word, not a sentence.';
  }

  if (/\d/.test(trimmed)) {
    return 'Please search for a word instead of numbers.';
  }

  if (!/^[a-zA-Z]+$/.test(trimmed)) {
    return 'Please search for a word instead of symbols.';
  }

  return '';
}

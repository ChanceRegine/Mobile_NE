export function validateWordInput(value) {
  const trimmed = value.trim();

  if (!trimmed) {
    return 'Please enter a word to search.';
  }

  return '';
}

export function getErrorMessage(error) {
  const status = error?.response?.status;
  const code = error?.code;

  if (status === 404) {
    return 'Word not found. Please try another word.';
  }

  if (code === 'MALFORMED_RESPONSE') {
    return 'The dictionary response was incomplete. Please try again.';
  }

  if (code === 'ECONNABORTED') {
    return 'The request timed out. Please check your connection and try again.';
  }

  if (!error?.response) {
    return 'Check your internet connection and try again.';
  }

  if (status >= 500) {
    return 'Something went wrong on the server. Please try again.';
  }

  return 'Unable to fetch the word details. Please try again.';
}

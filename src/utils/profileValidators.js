export function validateProfileInput({ fullName, email, password }) {
  const trimmedName = fullName.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    return 'Please enter your full name.';
  }

  if (trimmedName.length < 2) {
    return 'Name must be at least 2 characters long.';
  }

  if (!trimmedEmail) {
    return 'Please enter your email address.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
    return 'Please enter a valid email address.';
  }

  if (!password) {
    return 'Please enter your password.';
  }

  if (password.length < 6) {
    return 'Password must be at least 6 characters long.';
  }

  return '';
}

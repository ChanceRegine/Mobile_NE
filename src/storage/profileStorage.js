import { clearStoredProfile, getStoredProfile, saveStoredProfile } from '../utils/storage';

export async function loadProfile() {
  return getStoredProfile();
}

export async function saveProfile(profile) {
  const nextProfile = {
    fullName: profile.fullName.trim(),
    email: profile.email.trim().toLowerCase(),
    password: profile.password,
  };

  await saveStoredProfile(nextProfile);
  return nextProfile;
}

export async function clearProfile() {
  await clearStoredProfile();
}

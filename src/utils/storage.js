import AsyncStorage from '@react-native-async-storage/async-storage';

const HISTORY_KEY = 'dictionary_search_history_v1';
const PROFILE_KEY = 'dictionary_profile_v1';

export async function getStoredHistory() {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function saveStoredHistory(history) {
  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export async function getStoredProfile() {
  const raw = await AsyncStorage.getItem(PROFILE_KEY);
  return raw ? JSON.parse(raw) : null;
}

export async function saveStoredProfile(profile) {
  await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export async function clearStoredProfile() {
  await AsyncStorage.removeItem(PROFILE_KEY);
}

import { createContext, useContext, useEffect, useState } from 'react';

import { fetchWord } from '../services/dictionaryApi';
import { getErrorMessage } from '../utils/errorHandler';
import { addHistoryWord, loadHistory } from '../storage/historyStorage';
import { clearProfile, loadProfile, saveProfile } from '../storage/profileStorage';

const DictionaryContext = createContext(null);

export function DictionaryProvider({ children }) {
  const [history, setHistory] = useState([]);
  const [currentEntries, setCurrentEntries] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [profile, setProfile] = useState(null);
  const [profileLoading, setProfileLoading] = useState(true);

  useEffect(() => {
    loadHistory().then(setHistory).catch(() => {});
    loadProfile()
      .then(setProfile)
      .catch(() => {})
      .finally(() => setProfileLoading(false));
  }, []);

  const searchWord = async (word) => {
    const normalizedWord = word.trim().toLowerCase();

    setLoading(true);
    setError('');
    try {
      const entries = await fetchWord(word);
      const validEntries = entries.filter((entry) => entry && typeof entry === 'object');
      const hasUsableData = validEntries.some(
        (entry) =>
          entry.word ||
          entry.phonetic ||
          (Array.isArray(entry.meanings) && entry.meanings.length > 0) ||
          (Array.isArray(entry.phonetics) && entry.phonetics.length > 0)
      );

      if (!hasUsableData) {
        setCurrentEntries([]);
        setCurrentWord(normalizedWord);
        setHasSearched(true);
        setError('No dictionary details are available for this word yet.');
        return { ok: false, error: 'No dictionary details are available for this word yet.' };
      }

      setCurrentEntries(validEntries);
      setCurrentWord(normalizedWord);
      setHasSearched(true);
      const nextHistory = await addHistoryWord(word);
      setHistory(nextHistory);
      return { ok: true, data: validEntries };
    } catch (searchError) {
      const message = getErrorMessage(searchError);
      setCurrentEntries([]);
      setCurrentWord(normalizedWord);
      setHasSearched(true);
      setError(message);
      return { ok: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  return (
    <DictionaryContext.Provider
      value={{
        currentEntries,
        currentWord,
        error,
        hasSearched,
        history,
        loading,
        profile,
        profileLoading,
        searchWord,
        setError,
        setHistory,
        clearCurrentWord: () => {
          setCurrentEntries([]);
          setCurrentWord('');
          setError('');
          setHasSearched(false);
        },
        saveUserProfile: async (nextProfile) => {
          const savedProfile = await saveProfile(nextProfile);
          setProfile(savedProfile);
          return savedProfile;
        },
        logoutUser: async () => {
          await clearProfile();
          setProfile(null);
          setCurrentEntries([]);
          setCurrentWord('');
          setError('');
          setHasSearched(false);
        },
      }}>
      {children}
    </DictionaryContext.Provider>
  );
}

export function useDictionary() {
  const value = useContext(DictionaryContext);
  if (!value) {
    throw new Error('useDictionary must be used within a DictionaryProvider');
  }

  return value;
}

import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import LoadingOverlay from '../components/LoadingOverlay';
import SearchBar from '../components/SearchBar';
import { validateWordInput } from '../utils/validators';
import { useDictionary } from '../context/DictionaryContext';
import { colors } from '../theme/colors';

export default function SearchScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const { loading, error, searchWord, setError } = useDictionary();
  const trimmedQuery = query.trim();

  const openWord = async (word) => {
    const validation = validateWordInput(word);
    if (validation) {
      setError(validation);
      return;
    }

    const result = await searchWord(word);
    if (result.ok) {
      navigation.navigate('WordDetails');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoadingOverlay visible={loading} />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        <View style={styles.heroCard}>
          <View style={styles.heroGradientOrb} />
          <View style={styles.heroCircleSmall} />
          <View style={styles.heroBadge}>
            <Ionicons name="flash-outline" size={14} color={colors.drawerText} />
            <Text style={styles.heroBadgeText}>Smart dictionary search</Text>
          </View>
          <Text style={styles.eyebrow}>LexiDict Search</Text>
          <Text style={styles.title}>Find words clearly.</Text>
          <Text style={styles.subtitle}>
            Search one word and view meanings, phonetics, and audio quickly.
          </Text>
          <View style={styles.heroPills}>
            <View style={styles.heroPill}>
              <Ionicons name="book-outline" size={16} color={colors.drawerStart} />
              <Text style={styles.heroPillText}>Definitions</Text>
            </View>
            <View style={styles.heroPill}>
              <Ionicons name="volume-medium-outline" size={16} color={colors.drawerStart} />
              <Text style={styles.heroPillText}>Audio</Text>
            </View>
            <View style={styles.heroPill}>
              <Ionicons name="layers-outline" size={16} color={colors.drawerStart} />
              <Text style={styles.heroPillText}>Meanings</Text>
            </View>
          </View>
        </View>
        <View style={styles.searchCard}>
          <View style={styles.searchContentHeader}>
            <Text style={styles.searchContentTitle}>Start your search</Text>
            <Text style={styles.searchContentText}>
              Enter one English word below to explore its pronunciation, meanings, definitions, and examples.
            </Text>
          </View>
          <SearchBar
            value={query}
            onChangeText={(value) => {
              setQuery(value);
              if (error) {
                setError('');
              }
            }}
            onSubmit={() => openWord(query)}
            loading={loading}
            error={error}
          />
          <View style={styles.quickTips}>
            <View style={styles.quickTip}>
              <Ionicons name="volume-medium-outline" size={16} color={colors.primary} />
              <Text style={styles.quickTipText}>Audio pronunciation when available</Text>
            </View>
            <View style={styles.quickTip}>
              <Ionicons name="book-outline" size={16} color={colors.primary} />
              <Text style={styles.quickTipText}>Definitions and parts of speech</Text>
            </View>
          </View>
          {!error && !trimmedQuery ? (
            <View style={styles.emptyState}>
              <Ionicons name="search-circle-outline" size={22} color={colors.textSoft} />
              <Text style={styles.emptyStateText}>Enter a word to see meanings, phonetics, examples, and pronunciation.</Text>
            </View>
          ) : null}
          {!!error ? (
            <View style={styles.errorCard}>
              <View style={styles.errorHeader}>
                <Ionicons name="alert-circle-outline" size={18} color={colors.danger} />
                <Text style={styles.errorTitle}>Search problem</Text>
              </View>
              <Text style={styles.errorDescription}>{error}</Text>
              <Pressable style={styles.retryButton} onPress={() => openWord(query)}>
                <Ionicons name="refresh" size={16} color="#fff" />
                <Text style={styles.retryText}>Retry Search</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 32, gap: 18 },
  heroCard: {
    overflow: 'hidden',
    backgroundColor: colors.heroStart,
    borderRadius: 32,
    padding: 18,
    marginTop: 8,
  },
  heroGradientOrb: {
    position: 'absolute',
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: colors.heroEnd,
    top: -22,
    right: -14,
  },
  heroCircleSmall: {
    position: 'absolute',
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: 'rgba(255,255,255,0.12)',
    bottom: -10,
    left: -12,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroBadgeText: {
    color: colors.drawerText,
    fontWeight: '800',
    fontSize: 12,
  },
  eyebrow: {
    color: colors.drawerMuted,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 11,
    marginTop: 12,
  },
  title: { marginTop: 6, fontSize: 24, fontWeight: '900', color: colors.drawerText, lineHeight: 30, maxWidth: 200 },
  subtitle: { marginTop: 8, color: colors.drawerMuted, lineHeight: 20, maxWidth: 260, fontSize: 14 },
  heroPills: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 12,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  heroPillText: {
    color: colors.drawerText,
    fontWeight: '800',
    fontSize: 13,
  },
  searchCard: {
    backgroundColor: colors.surface,
    borderRadius: 30,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 3,
    minHeight: 390,
    justifyContent: 'flex-start',
  },
  searchContentHeader: {
    marginBottom: 18,
  },
  searchContentTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  searchContentText: {
    marginTop: 8,
    color: colors.textMuted,
    lineHeight: 24,
    fontSize: 15,
    maxWidth: 290,
  },
  quickTips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 16,
  },
  quickTip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primarySoft,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  quickTipText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  emptyState: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 20,
    padding: 16,
    marginTop: 16,
  },
  emptyStateText: {
    flex: 1,
    color: colors.textSoft,
    lineHeight: 22,
    fontWeight: '700',
    fontSize: 15,
  },
  errorCard: {
    marginTop: 16,
    backgroundColor: colors.dangerSoft,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#fecaca',
    gap: 10,
  },
  errorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  errorTitle: {
    color: colors.danger,
    fontWeight: '900',
  },
  errorDescription: {
    color: colors.textMuted,
    lineHeight: 20,
  },
  retryButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.text,
    paddingHorizontal: 18,
    paddingVertical: 13,
    borderRadius: 18,
    marginTop: 14,
  },
  retryText: { color: '#fff', fontWeight: '800' },
});

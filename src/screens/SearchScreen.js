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
          <Text style={styles.title}>Find English words with quick, clear results.</Text>
          <Text style={styles.subtitle}>
            Search one word at a time and explore phonetics, meanings, definitions, examples, and pronunciation audio in one clean flow.
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
          <View style={styles.searchPanelHeader}>
            <View style={styles.searchTitleRow}>
              <View style={styles.searchTitleIcon}>
                <Ionicons name="search-outline" size={18} color={colors.drawerStart} />
              </View>
              <View style={styles.searchTitleCopy}>
                <Text style={styles.searchCardTitle}>Search for a word</Text>
                <Text style={styles.searchCardText}>Type a word below and open the detail view with one tap.</Text>
              </View>
            </View>
            <View style={styles.searchHintBadge}>
              <Ionicons name="volume-medium-outline" size={15} color={colors.primary} />
              <Text style={styles.searchHintBadgeText}>Audio ready</Text>
            </View>
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
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="git-compare-outline" size={18} color={colors.primary} />
            </View>
            <Text style={styles.infoTitle}>Multiple meanings</Text>
            <Text style={styles.infoText}>See each part of speech and all available definitions in a readable layout.</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <Ionicons name="time-outline" size={18} color={colors.primary} />
            </View>
            <Text style={styles.infoTitle}>Recent history</Text>
            <Text style={styles.infoText}>Open the drawer any time to search again from your saved recent words.</Text>
          </View>
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
    padding: 24,
    marginTop: 8,
  },
  heroGradientOrb: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.heroEnd,
    top: -42,
    right: -28,
  },
  heroCircleSmall: {
    position: 'absolute',
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(255,255,255,0.12)',
    bottom: -20,
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
    fontSize: 12,
    marginTop: 18,
  },
  title: { marginTop: 8, fontSize: 34, fontWeight: '900', color: colors.drawerText, lineHeight: 42 },
  subtitle: { marginTop: 12, color: colors.drawerMuted, lineHeight: 24, maxWidth: 320 },
  heroPills: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginTop: 22,
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  heroPillText: {
    color: colors.drawerText,
    fontWeight: '800',
  },
  searchCard: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  searchPanelHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  searchTitleRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'flex-start',
    flex: 1,
  },
  searchTitleIcon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.drawerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchTitleCopy: {
    flex: 1,
  },
  searchCardTitle: { fontSize: 21, fontWeight: '900', color: colors.text },
  searchCardText: { color: colors.textMuted, lineHeight: 22, marginTop: 6 },
  searchHintBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: colors.primarySoft,
  },
  searchHintBadgeText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  emptyState: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 18,
    padding: 14,
    marginTop: 12,
  },
  emptyStateText: {
    flex: 1,
    color: colors.textSoft,
    lineHeight: 20,
    fontWeight: '600',
  },
  errorCard: {
    marginTop: 14,
    backgroundColor: colors.dangerSoft,
    borderRadius: 18,
    padding: 14,
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
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginTop: 14,
  },
  retryText: { color: '#fff', fontWeight: '800' },
  infoGrid: {
    gap: 14,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  infoTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
  },
  infoText: {
    color: colors.textMuted,
    lineHeight: 22,
    marginTop: 8,
  },
});

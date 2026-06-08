import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import AudioPlayer from '../components/AudioPlayer';
import DefinitionCard from '../components/DefinitionCard';
import { useDictionary } from '../context/DictionaryContext';
import { colors } from '../theme/colors';

export default function WordDetailScreen() {
  const { currentEntries, currentWord, error, hasSearched, loading, searchWord } = useDictionary();

  const entry = currentEntries?.[0] || {};
  const phoneticItems =
    entry?.phonetics
      ?.map((item, index) => {
        const text = item?.text || '';
        const rawAudio = item?.audio || '';
        const normalizedAudio = rawAudio ? rawAudio.replace(/^\/\//, 'https://') : '';
        const lowerText = text.toLowerCase();
        const lowerAudio = normalizedAudio.toLowerCase();
        let label = `Audio ${index + 1}`;

        if (lowerText.includes('uk') || lowerAudio.includes('uk')) {
          label = 'UK';
        } else if (lowerText.includes('us') || lowerAudio.includes('us')) {
          label = 'US';
        } else if (text) {
          label = text.length > 12 ? text.slice(0, 12) : text;
        }

        return {
          key: `${text}-${index}`,
          text,
          label,
          url: normalizedAudio,
        };
      })
      ?.filter((item) => item.text || item.url) || [];

  const audioSources = phoneticItems.filter((item) => item.url);
  const phoneticText =
    entry?.phonetic || phoneticItems.find((item) => item.text)?.text || '';
  const displayedMeanings = entry.meanings || [];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.heroCard}>
          <View style={styles.heroGlow} />
          <View style={styles.wordHeaderRow}>
            <View style={styles.wordBlock}>
              <Text style={styles.word}>{entry.word || currentWord || 'Word'}</Text>
            </View>
            {audioSources.length ? (
              <View style={styles.heroAudioButton}>
                <Ionicons name="volume-high" size={18} color={colors.primary} />
              </View>
            ) : null}
          </View>
          <View style={styles.wordBlock}>
            {phoneticText ? (
              <View style={styles.phoneticPill}>
                <Ionicons name="language-outline" size={16} color={colors.primary} />
                <Text style={styles.phonetic}>{phoneticText}</Text>
              </View>
            ) : null}
            {audioSources.length ? (
              <View style={styles.audioHintPill}>
                <Ionicons name="volume-medium-outline" size={15} color={colors.primary} />
                <Text style={styles.audioHintPillText}>Pronunciation available</Text>
              </View>
            ) : null}
          </View>
          <View style={styles.metricsRow}>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{displayedMeanings.length || 0}</Text>
              <Text style={styles.metricLabel}>Meanings</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricNumber}>{audioSources.length}</Text>
              <Text style={styles.metricLabel}>Audio Clips</Text>
            </View>
          </View>
        </View>

        {audioSources.length ? <AudioPlayer audioSources={audioSources} /> : null}

        {phoneticItems.length ? (
          <View style={styles.phoneticsCard}>
            <Text style={styles.sectionTitle}>Phonetics & Pronunciation</Text>
            {phoneticItems.map((item) => (
              <View key={item.key} style={styles.phoneticRow}>
                <View style={styles.phoneticTag}>
                  <Text style={styles.phoneticTagText}>{item.label}</Text>
                </View>
                <Text style={styles.phoneticRowText}>{item.text || 'Audio available'}</Text>
              </View>
            ))}
            {!audioSources.length ? (
              <Text style={styles.audioHint}>No pronunciation audio was provided for this word.</Text>
            ) : null}
          </View>
        ) : null}

        {error ? (
          <View style={styles.emptyBox}>
            <Ionicons name="alert-circle-outline" size={30} color={colors.danger} />
            <Text style={styles.emptyText}>{error}</Text>
            {!!currentWord && !loading ? (
              <Pressable style={styles.retryButton} onPress={() => searchWord(currentWord)}>
                <Ionicons name="refresh" size={16} color="#fff" />
                <Text style={styles.retryText}>Retry</Text>
              </Pressable>
            ) : null}
          </View>
        ) : displayedMeanings.length ? (
          <>
            <Text style={styles.sectionHeader}>Meanings & Definitions</Text>
            {displayedMeanings.map((meaning, index) => (
              <DefinitionCard key={`${meaning.partOfSpeech}-${index}`} meaning={meaning} />
            ))}
          </>
        ) : hasSearched ? (
          <View style={styles.emptyBox}>
            <Ionicons name="document-text-outline" size={30} color={colors.textSoft} />
            <Text style={styles.emptyText}>No data available.</Text>
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Ionicons name="search-outline" size={30} color={colors.textSoft} />
            <Text style={styles.emptyText}>Search for a word to see its details.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 30 },
  heroCard: {
    overflow: 'hidden',
    backgroundColor: colors.surface,
    borderRadius: 30,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  heroGlow: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: colors.primarySoft,
    top: -120,
    right: -80,
  },
  wordBlock: {
    flex: 1,
  },
  wordHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  word: { fontSize: 38, fontWeight: '900', color: colors.text, textTransform: 'lowercase' },
  heroAudioButton: {
    width: 44,
    height: 44,
    borderRadius: 16,
    backgroundColor: colors.primarySoft,
    borderWidth: 1,
    borderColor: colors.drawerBorder,
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneticPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 12,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
  },
  phonetic: { fontSize: 16, color: colors.primary, fontWeight: '800' },
  audioHintPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 10,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
  },
  audioHintPillText: {
    color: colors.primary,
    fontWeight: '800',
    fontSize: 13,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 18,
  },
  metricCard: {
    flex: 1,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 22,
    padding: 14,
  },
  metricNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
  },
  metricLabel: {
    marginTop: 4,
    color: colors.textSoft,
    fontWeight: '700',
  },
  phoneticsCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
    marginTop: 18,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  phoneticRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  phoneticTag: {
    minWidth: 48,
    backgroundColor: colors.drawerSoft,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 999,
    alignItems: 'center',
  },
  phoneticTagText: {
    color: colors.drawerStart,
    fontWeight: '800',
    fontSize: 12,
  },
  phoneticRowText: {
    flex: 1,
    color: colors.textMuted,
    lineHeight: 21,
  },
  audioHint: {
    marginTop: 6,
    color: colors.textSoft,
    fontWeight: '700',
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '900',
    color: colors.text,
    marginBottom: 12,
  },
  emptyBox: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyText: { color: colors.textSoft, textAlign: 'center', lineHeight: 22 },
  retryButton: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.primary,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 999,
  },
  retryText: {
    color: '#fff',
    fontWeight: '800',
  },
});

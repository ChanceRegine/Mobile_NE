import { StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

export default function DefinitionCard({ meaning }) {
  return (
    <View style={styles.card}>
      <View style={styles.headingRow}>
        <Text style={styles.partOfSpeech}>{meaning.partOfSpeech || 'Unknown'}</Text>
        <View style={styles.countPill}>
          <Text style={styles.countText}>{meaning.definitions?.length || 0} defs</Text>
        </View>
      </View>
      {meaning.definitions?.map((def, index) => (
        <View key={`${def.definition}-${index}`} style={styles.definitionBlock}>
          <View style={styles.definitionHeader}>
            <View style={styles.definitionDot} />
            <Text style={styles.definitionLabel}>Definition {index + 1}</Text>
          </View>
          <Text style={styles.definition}>{def.definition || 'No definition available.'}</Text>
          {def.example ? (
            <View style={styles.exampleBox}>
              <Text style={styles.exampleLabel}>Example</Text>
              <Text style={styles.example}>{def.example}</Text>
            </View>
          ) : null}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  partOfSpeech: { fontSize: 20, fontWeight: '900', color: colors.text, textTransform: 'capitalize' },
  countPill: {
    backgroundColor: colors.secondarySoft,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
  },
  countText: {
    color: colors.secondary,
    fontWeight: '800',
    fontSize: 12,
  },
  definitionBlock: {
    marginBottom: 14,
    paddingTop: 2,
  },
  definitionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  definitionDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
  definitionLabel: { fontSize: 13, fontWeight: '800', color: colors.textSoft },
  definition: { fontSize: 15, lineHeight: 24, color: colors.text },
  exampleBox: {
    marginTop: 10,
    backgroundColor: colors.surfaceMuted,
    borderRadius: 18,
    padding: 12,
  },
  exampleLabel: {
    color: colors.accent,
    fontWeight: '800',
    fontSize: 12,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  example: { fontSize: 14, lineHeight: 22, color: colors.textMuted, fontStyle: 'italic' },
});

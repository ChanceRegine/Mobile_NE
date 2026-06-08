import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

export default function LoadingOverlay({ visible, message = 'Searching the dictionary...' }) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.title}>Loading</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.20)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    zIndex: 10,
  },
  card: {
    width: '100%',
    maxWidth: 320,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  message: {
    textAlign: 'center',
    color: colors.textMuted,
    lineHeight: 21,
  },
});

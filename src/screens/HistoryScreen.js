import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { useDictionary } from '../context/DictionaryContext';
import { colors } from '../theme/colors';
import { clearHistory } from '../storage/historyStorage';

export default function HistoryScreen({ navigation }) {
  const [message, setMessage] = useState('');
  const { history, searchWord, setHistory } = useDictionary();
  const messageTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (messageTimeoutRef.current) {
        clearTimeout(messageTimeoutRef.current);
      }
    };
  }, []);

  const showTemporaryMessage = (nextMessage) => {
    if (messageTimeoutRef.current) {
      clearTimeout(messageTimeoutRef.current);
    }

    setMessage(nextMessage);
    messageTimeoutRef.current = setTimeout(() => {
      setMessage('');
      messageTimeoutRef.current = null;
    }, 1800);
  };

  const searchAgain = async (word) => {
    const result = await searchWord(word);
    if (result.ok) {
      navigation.navigate('SearchStack', { screen: 'WordDetails' });
    } else {
      setMessage(result.error);
    }
  };

  const handleClearHistory = async () => {
    await clearHistory();
    setHistory([]);
    showTemporaryMessage('History cleared successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>LexiDict</Text>
        <Text style={styles.title}>Search History</Text>
        <Text style={styles.subtitle}>Revisit recently searched words and open them again in one tap.</Text>
        <Pressable style={styles.clearButton} onPress={handleClearHistory}>
          <Ionicons name="trash-outline" size={16} color={colors.danger} />
          <Text style={styles.clearButtonText}>Clear History</Text>
        </Pressable>
      </View>
      {message ? (
        <View style={styles.messageBox}>
          <Ionicons
            name={message.toLowerCase().includes('cleared') ? 'checkmark-circle-outline' : 'alert-circle-outline'}
            size={18}
            color={message.toLowerCase().includes('cleared') ? colors.accent : colors.danger}
          />
          <Text
            style={[
              styles.message,
              message.toLowerCase().includes('cleared') && styles.messageSuccess,
            ]}>
            {message}
          </Text>
        </View>
      ) : null}
      {history.length ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <Pressable style={styles.item} onPress={() => searchAgain(item)}>
              <View style={styles.itemBadge}>
                <Ionicons name="time-outline" size={18} color={colors.secondary} />
              </View>
              <View style={styles.itemCopy}>
                <Text style={styles.itemText}>{item}</Text>
                <Text style={styles.itemHint}>Open this word again</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textSoft} />
            </Pressable>
          )}
        />
      ) : (
        <View style={styles.emptyBox}>
          <Ionicons name="albums-outline" size={34} color={colors.textSoft} />
          <Text style={styles.emptyTitle}>Nothing here yet</Text>
          <Text style={styles.emptyText}>Your searched words will appear here after you make your first successful search.</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 20 },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  eyebrow: {
    color: colors.secondary,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 12,
  },
  title: { fontSize: 30, fontWeight: '900', color: colors.text, marginTop: 6 },
  subtitle: { marginTop: 8, color: colors.textMuted, lineHeight: 22 },
  clearButton: {
    marginTop: 16,
    alignSelf: 'flex-start',
    backgroundColor: colors.dangerSoft,
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  clearButtonText: {
    color: colors.danger,
    fontWeight: '800',
  },
  messageBox: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  message: { color: colors.danger, flex: 1, fontWeight: '700' },
  messageSuccess: { color: colors.accent },
  listContent: { paddingBottom: 20 },
  item: {
    backgroundColor: colors.surface,
    padding: 16,
    borderRadius: 20,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  itemBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.secondarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemCopy: { flex: 1 },
  itemText: { fontSize: 16, fontWeight: '800', color: colors.text, textTransform: 'capitalize' },
  itemHint: { color: colors.textSoft, marginTop: 4 },
  emptyBox: {
    backgroundColor: colors.surface,
    padding: 24,
    borderRadius: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  emptyTitle: { fontSize: 18, fontWeight: '900', color: colors.text, marginTop: 10 },
  emptyText: { color: colors.textSoft, textAlign: 'center', lineHeight: 22, marginTop: 6 },
});

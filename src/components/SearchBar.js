import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../theme/colors';

export default function SearchBar({ value, onChangeText, onSubmit, loading, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.inputRow, focused && styles.inputRowFocused]}>
        <View style={[styles.iconWrap, focused && styles.iconWrapFocused]}>
          <Ionicons name="search" size={19} color={focused ? colors.primary : colors.textSoft} />
        </View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder="Type an English word"
          placeholderTextColor={colors.textSoft}
          style={styles.input}
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
          onSubmitEditing={onSubmit}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <Pressable
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={onSubmit}
          disabled={loading}
          accessibilityLabel="Search word">
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Ionicons name="arrow-forward" size={18} color="#fff" />
          )}
        </Pressable>
      </View>
      <Text style={styles.helper}>Try words like `language`, `grace`, or `clarity`.</Text>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: 10 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 7,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  inputRowFocused: { borderColor: colors.primary },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.drawerSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapFocused: {
    backgroundColor: '#e9ddff',
  },
  input: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 14,
    paddingVertical: 16,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.drawerStart,
    borderRadius: 18,
    shadowColor: colors.drawerStart,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  helper: { color: colors.textSoft, fontSize: 13 },
  error: { color: colors.danger, fontSize: 13, fontWeight: '700' },
});

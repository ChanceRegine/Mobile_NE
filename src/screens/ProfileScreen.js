import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { useDictionary } from '../context/DictionaryContext';
import { colors } from '../theme/colors';
import { validateProfileInput } from '../utils/profileValidators';

export default function ProfileScreen() {
  const { profile, saveUserProfile, logoutUser } = useDictionary();
  const [form, setForm] = useState({
    fullName: profile?.fullName || '',
    email: profile?.email || '',
    password: profile?.password || '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSave = async () => {
    const validation = validateProfileInput(form);
    if (validation) {
      setError(validation);
      setMessage('');
      return;
    }

    await saveUserProfile(form);
    setError('');
    setMessage('Profile saved successfully.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {(profile?.fullName || 'L')
                .trim()
                .charAt(0)
                .toUpperCase()}
            </Text>
          </View>
          <Text style={styles.title}>Your Profile</Text>
          <Text style={styles.subtitle}>Update the locally saved profile used by your mock login flow.</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={form.fullName}
            onChangeText={(value) => {
              setForm((current) => ({ ...current, fullName: value }));
              if (error) setError('');
              if (message) setMessage('');
            }}
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={colors.textSoft}
          />

          <Text style={[styles.label, styles.topGap]}>Email Address</Text>
          <TextInput
            value={form.email}
            onChangeText={(value) => {
              setForm((current) => ({ ...current, email: value }));
              if (error) setError('');
              if (message) setMessage('');
            }}
            style={styles.input}
            placeholder="Enter your email"
            placeholderTextColor={colors.textSoft}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <Text style={[styles.label, styles.topGap]}>Password</Text>
          <TextInput
            value={form.password}
            onChangeText={(value) => {
              setForm((current) => ({ ...current, password: value }));
              if (error) setError('');
              if (message) setMessage('');
            }}
            style={styles.input}
            placeholder="Enter your password"
            placeholderTextColor={colors.textSoft}
            secureTextEntry
          />

          {error ? (
            <View style={styles.noticeError}>
              <Ionicons name="alert-circle-outline" size={18} color={colors.danger} />
              <Text style={styles.noticeErrorText}>{error}</Text>
            </View>
          ) : null}

          {message ? (
            <View style={styles.noticeSuccess}>
              <Ionicons name="checkmark-circle-outline" size={18} color={colors.accent} />
              <Text style={styles.noticeSuccessText}>{message}</Text>
            </View>
          ) : null}

          <Pressable style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save Profile</Text>
          </Pressable>

          <Pressable style={styles.logoutButton} onPress={logoutUser}>
            <Ionicons name="log-out-outline" size={18} color={colors.danger} />
            <Text style={styles.logoutButtonText}>Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: 20, paddingBottom: 32, gap: 16 },
  hero: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.primary,
    fontSize: 28,
    fontWeight: '900',
  },
  title: {
    marginTop: 14,
    fontSize: 28,
    fontWeight: '900',
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 22,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  label: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 8,
  },
  topGap: {
    marginTop: 16,
  },
  input: {
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 15,
    color: colors.text,
    fontSize: 16,
  },
  noticeError: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.dangerSoft,
    borderRadius: 16,
    padding: 14,
  },
  noticeErrorText: {
    color: colors.danger,
    flex: 1,
    fontWeight: '700',
  },
  noticeSuccess: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.accentSoft,
    borderRadius: 16,
    padding: 14,
  },
  noticeSuccessText: {
    color: colors.accent,
    flex: 1,
    fontWeight: '700',
  },
  saveButton: {
    marginTop: 18,
    backgroundColor: colors.primary,
    borderRadius: 18,
    alignItems: 'center',
    paddingVertical: 16,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.dangerSoft,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 16,
  },
  logoutButtonText: {
    color: colors.danger,
    fontWeight: '800',
    fontSize: 16,
  },
});

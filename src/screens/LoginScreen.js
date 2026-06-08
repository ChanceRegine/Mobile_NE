import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { useDictionary } from '../context/DictionaryContext';
import { colors } from '../theme/colors';
import { validateProfileInput } from '../utils/profileValidators';

export default function LoginScreen() {
  const { saveUserProfile } = useDictionary();
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const handleLogin = async () => {
    const validation = validateProfileInput(form);
    if (validation) {
      setError(validation);
      return;
    }

    setSaving(true);
    setError('');
    try {
      await saveUserProfile(form);
    } catch {
      setError('Unable to save your profile right now. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <View style={styles.card}>
            <View style={styles.logoWrap}>
              <Ionicons name="book-outline" size={22} color={colors.primary} />
            </View>
            <Text style={styles.eyebrow}>Sign In</Text>
            <Text style={styles.title}>Welcome back to LexiDict.</Text>
            <Text style={styles.subtitle}>
              Sign in with your details to continue to your personal dictionary experience. Your profile stays saved on this device.
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                value={form.fullName}
                onChangeText={(value) => {
                  setForm((current) => ({ ...current, fullName: value }));
                  if (error) setError('');
                }}
                placeholder="Enter your full name"
                placeholderTextColor={colors.textSoft}
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email Address</Text>
              <TextInput
                value={form.email}
                onChangeText={(value) => {
                  setForm((current) => ({ ...current, email: value }));
                  if (error) setError('');
                }}
                placeholder="Enter your email"
                placeholderTextColor={colors.textSoft}
                autoCapitalize="none"
                keyboardType="email-address"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordInputWrap}>
                <View style={styles.passwordIconWrap}>
                  <Ionicons name="lock-closed-outline" size={18} color={colors.primary} />
                </View>
                <TextInput
                  value={form.password}
                  onChangeText={(value) => {
                    setForm((current) => ({ ...current, password: value }));
                    if (error) setError('');
                  }}
                  placeholder="Enter your password"
                  placeholderTextColor={colors.textSoft}
                  secureTextEntry
                  style={styles.passwordInput}
                />
              </View>
            </View>

            {error ? (
              <View style={styles.errorBox}>
                <Ionicons name="alert-circle-outline" size={18} color={colors.danger} />
                <Text style={styles.errorText}>{error}</Text>
              </View>
            ) : null}

            <Pressable style={[styles.button, saving && styles.buttonDisabled]} onPress={handleLogin} disabled={saving}>
              <Text style={styles.buttonText}>{saving ? 'Signing In...' : 'Sign In'}</Text>
              <Ionicons name="log-in-outline" size={18} color="#fff" />
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 20, justifyContent: 'center' },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 22,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  logoWrap: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  eyebrow: {
    color: colors.secondary,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontSize: 12,
  },
  title: {
    marginTop: 10,
    color: colors.text,
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '900',
  },
  subtitle: {
    marginTop: 10,
    color: colors.textMuted,
    lineHeight: 22,
    fontSize: 15,
  },
  inputGroup: {
    marginTop: 16,
  },
  label: {
    color: colors.text,
    fontWeight: '800',
    marginBottom: 8,
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
  passwordInputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingHorizontal: 10,
  },
  passwordIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  passwordInput: {
    flex: 1,
    minWidth: 0,
    paddingHorizontal: 12,
    paddingVertical: 15,
    color: colors.text,
    fontSize: 16,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.dangerSoft,
    borderRadius: 16,
    padding: 14,
    marginTop: 16,
  },
  errorText: {
    color: colors.danger,
    flex: 1,
    fontWeight: '700',
  },
  button: {
    marginTop: 18,
    backgroundColor: colors.primary,
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: colors.primary,
    shadowOpacity: 0.22,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  buttonDisabled: {
    opacity: 0.8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 16,
  },
});

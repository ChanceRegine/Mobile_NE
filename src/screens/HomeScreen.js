import { Ionicons } from '@expo/vector-icons';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';
export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <View style={styles.topCircle} />
          <View style={styles.bottomCircle} />
          <View style={styles.glowBar} />
          <Text style={styles.badge}>LexiDict</Text>
          <Text style={styles.title}>Search English words with clarity and confidence.</Text>
          <Text style={styles.subtitle}>
            Look up one word at a time and view its phonetics, meanings, definitions, examples, and pronunciation audio.
          </Text>
          <View style={styles.heroFeatures}>
            <View style={styles.heroFeature}>
              <Ionicons name="book-outline" size={18} color="#fff" />
              <Text style={styles.heroFeatureText}>Search words</Text>
            </View>
            <View style={styles.heroFeature}>
              <Ionicons name="volume-medium-outline" size={18} color="#fff" />
              <Text style={styles.heroFeatureText}>Play audio</Text>
            </View>
            <View style={styles.heroFeature}>
              <Ionicons name="time-outline" size={18} color="#fff" />
              <Text style={styles.heroFeatureText}>Saved history</Text>
            </View>
          </View>
          <View style={styles.bottomArea}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>A-Z</Text>
              <Text style={styles.statText}>Definitions, phonetics, examples, and pronunciation in one clean experience.</Text>
            </View>
            <Pressable style={styles.button} onPress={() => navigation.navigate('Login')}>
              <Text style={styles.buttonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1, padding: 20 },
  hero: {
    overflow: 'hidden',
    backgroundColor: colors.heroStart,
    borderRadius: 28,
    padding: 24,
    minHeight: 620,
    justifyContent: 'space-between',
  },
  topCircle: {
    position: 'absolute',
    width: 168,
    height: 168,
    borderRadius: 84,
    backgroundColor: colors.heroMid,
    right: -28,
    top: -12,
  },
  bottomCircle: {
    position: 'absolute',
    width: 126,
    height: 126,
    borderRadius: 63,
    backgroundColor: colors.heroEnd,
    left: -16,
    bottom: -32,
  },
  glowBar: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(255,255,255,0.04)',
    right: 56,
    top: 46,
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)',
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 999,
    overflow: 'hidden',
    fontWeight: '800',
  },
  title: {
    marginTop: 16,
    color: '#fff',
    fontSize: 32,
    lineHeight: 41,
    fontWeight: '900',
    maxWidth: '76%',
  },
  subtitle: {
    marginTop: 10,
    color: 'rgba(255,255,255,0.84)',
    lineHeight: 23,
    fontSize: 15,
    maxWidth: '78%',
  },
  heroFeatures: {
    marginTop: 18,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  heroFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  heroFeatureText: {
    color: '#fff',
    fontWeight: '700',
  },
  bottomArea: {
    gap: 14,
    marginTop: 24,
  },
  statCard: {
    alignSelf: 'flex-start',
    maxWidth: '74%',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  statNumber: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
  },
  statText: {
    marginTop: 4,
    color: 'rgba(255,255,255,0.78)',
    fontSize: 13,
    lineHeight: 20,
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 18,
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 15,
  },
});

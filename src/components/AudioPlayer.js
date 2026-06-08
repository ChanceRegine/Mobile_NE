import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av';
import { useEffect, useRef, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors } from '../theme/colors';

export default function AudioPlayer({ audioSources }) {
  const soundRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const sources = audioSources || [];
  const selectedSource = sources[selectedIndex] || null;
  const selectedAudioUrl = selectedSource?.url || '';

  useEffect(() => {
    setSelectedIndex(0);
    setIsPlaying(false);
    setIsPaused(false);
  }, [audioSources]);

  useEffect(() => {
    return () => {
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const stopCurrentSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.unloadAsync();
      } catch {
        // Ignore cleanup errors.
      } finally {
        soundRef.current = null;
      }
    }
  };

  const playAudio = async () => {
    try {
      await stopCurrentSound();
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      const result = await Audio.Sound.createAsync({ uri: selectedAudioUrl }, { shouldPlay: true });
      soundRef.current = result.sound;
      setIsPlaying(true);
      setIsPaused(false);
      result.sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          setIsPaused(false);
        }
      });
    } catch {
      setIsPlaying(false);
      setIsPaused(false);
      Alert.alert('Unable to play audio');
    }
  };

  const pauseAudio = async () => {
    if (!soundRef.current) return;
    try {
      await soundRef.current.pauseAsync();
      setIsPlaying(false);
      setIsPaused(true);
    } catch {
      Alert.alert('Unable to play audio');
    }
  };

  const stopAudio = async () => {
    await stopCurrentSound();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const changeSource = async (index) => {
    if (index === selectedIndex) {
      return;
    }

    await stopAudio();
    setSelectedIndex(index);
  };

  if (!selectedAudioUrl) return null;

  return (
    <View style={styles.panel}>
      <Text style={styles.sectionTitle}>Pronunciations</Text>
      <Text style={styles.statusLabel}>
        {isPlaying
          ? `Playing ${selectedSource?.label || 'Audio'}`
          : isPaused
            ? `Paused ${selectedSource?.label || 'Audio'}`
            : 'Select a pronunciation and press play'}
      </Text>
      <View style={styles.list}>
        {sources.map((source, index) => {
          const isActive = index === selectedIndex;
          return (
            <Pressable
              key={`audio-${index}`}
              style={[styles.card, isActive && styles.cardActive]}
              onPress={() => changeSource(index)}>
              <View style={styles.cardLeft}>
                <View style={[styles.speakerWrap, isActive && styles.speakerWrapActive]}>
                  <Ionicons
                    name={isPlaying && isActive ? 'volume-high' : 'volume-medium'}
                    size={18}
                    color={isActive ? '#fff' : colors.primary}
                  />
                </View>
                <View style={styles.cardCopy}>
                  <Text style={styles.cardTitle}>{source.label} Pronunciation</Text>
                  <Text style={styles.cardSubtext}>{source.text || 'Audio pronunciation available'}</Text>
                </View>
              </View>
              {isActive ? <View style={styles.activeDot} /> : null}
            </Pressable>
          );
        })}
      </View>
      <View style={styles.controls}>
        <Pressable style={[styles.controlButton, styles.playButton]} onPress={isPlaying ? pauseAudio : playAudio}>
          <Ionicons name={isPlaying ? 'pause' : 'play'} size={18} color="#fff" />
          <Text style={styles.playButtonText}>{isPlaying ? 'Pause' : isPaused ? 'Resume' : 'Play'}</Text>
        </Pressable>
        <Pressable style={styles.controlButton} onPress={stopAudio}>
          <Ionicons name="stop" size={16} color={colors.text} />
          <Text style={styles.controlText}>Stop</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: colors.text,
  },
  statusLabel: {
    color: colors.textSoft,
    fontSize: 12,
    fontWeight: '800',
  },
  list: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cardActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  speakerWrap: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primarySoft,
  },
  speakerWrapActive: {
    backgroundColor: colors.primary,
  },
  cardCopy: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontWeight: '900',
    fontSize: 16,
  },
  cardSubtext: {
    marginTop: 4,
    color: colors.textMuted,
    fontWeight: '700',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  controlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderRadius: 16,
    backgroundColor: colors.surfaceMuted,
  },
  playButton: {
    backgroundColor: colors.primary,
  },
  playButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
  controlText: {
    color: colors.text,
    fontWeight: '800',
  },
});

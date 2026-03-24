import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import { api } from '../services/api';
import { colors } from '../theme/colors';

export function PlayerScreen({ route, navigation }: any) {
  const { seriesId, episodeId } = route.params;
  const [episodes, setEpisodes] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSkipIntro, setShowSkipIntro] = useState(true);
  const playerRef = useRef<any>(null);

  useEffect(() => {
    api.getEpisodes(seriesId).then((e: any[]) => {
      const index = e.findIndex((x) => x._id === episodeId);
      setEpisodes(e);
      setCurrentIndex(index >= 0 ? index : 0);
    });
  }, [seriesId, episodeId]);

  const currentEpisode = episodes[currentIndex];
  if (!currentEpisode) return <View style={styles.container} />;

  return (
    <View style={styles.container}>
      <Video
        ref={playerRef}
        source={{ uri: currentEpisode.hlsManifestUrl }}
        style={styles.video}
        controls
        resizeMode="contain"
        onProgress={({ currentTime }) => setShowSkipIntro(currentTime < currentEpisode.introEndSecond)}
        onEnd={() => {
          const next = currentIndex + 1;
          if (next < episodes.length) setCurrentIndex(next);
          else navigation.goBack();
        }}
      />
      <View style={styles.controlsRow}>
        {showSkipIntro && (
          <Pressable style={styles.pill} onPress={() => playerRef.current?.seek(currentEpisode.introEndSecond)}>
            <Text style={styles.pillText}>Skip Intro</Text>
          </Pressable>
        )}
        <Pressable style={styles.pill}>
          <Text style={styles.pillText}>1x Speed</Text>
        </Pressable>
        <Pressable style={styles.pill}>
          <Text style={styles.pillText}>Auto Quality</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  video: { width: '100%', height: '82%' },
  controlsRow: { flexDirection: 'row', gap: 8, paddingHorizontal: 12, paddingTop: 8 },
  pill: { backgroundColor: colors.card, borderRadius: 18, paddingHorizontal: 12, paddingVertical: 8 },
  pillText: { color: colors.textPrimary, fontSize: 12 },
});

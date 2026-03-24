import React, { useEffect, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import { api } from '../services/api';
import { colors } from '../theme/colors';

export function SeriesDetailScreen({ route, navigation }: any) {
  const { id } = route.params;
  const [series, setSeries] = useState<any>(null);
  const [episodes, setEpisodes] = useState<any[]>([]);

  useEffect(() => {
    Promise.all([api.getSeriesById(id), api.getEpisodes(id)]).then(([s, e]) => {
      setSeries(s);
      setEpisodes(e);
    });
  }, [id]);

  if (!series) return <View style={styles.container} />;

  return (
    <FlatList
      style={styles.container}
      data={episodes}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={
        <>
          <ImageBackground source={{ uri: series.heroBannerUrl }} style={styles.hero}>
            <Pressable
              onPress={() => navigation.navigate('Player', { episodeId: episodes[0]?._id, seriesId: id })}
              style={styles.playButton}
            >
              <Text style={styles.playText}>Play</Text>
            </Pressable>
          </ImageBackground>
          <Text style={styles.title}>{series.title}</Text>
          <Text style={styles.description}>{series.description}</Text>
        </>
      }
      renderItem={({ item }) => (
        <Pressable
          onPress={() => navigation.navigate('Player', { episodeId: item._id, seriesId: id })}
          style={({ pressed }) => [styles.episodeCard, pressed && { opacity: 0.85 }]}
        >
          <Text style={styles.episodeTitle}>Ep {item.episodeNumber}: {item.title}</Text>
          <Text style={styles.episodeMeta}>{Math.ceil(item.durationSeconds / 60)} min</Text>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  hero: { height: 220, justifyContent: 'flex-end' },
  playButton: {
    margin: 16,
    backgroundColor: colors.accent,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  playText: { color: 'white', fontWeight: '700' },
  title: { color: colors.textPrimary, fontSize: 24, fontWeight: '800', paddingHorizontal: 16, marginTop: 10 },
  description: { color: colors.textSecondary, paddingHorizontal: 16, marginTop: 8, marginBottom: 16 },
  episodeCard: {
    marginHorizontal: 16,
    marginBottom: 10,
    borderRadius: 12,
    backgroundColor: colors.card,
    padding: 12,
  },
  episodeTitle: { color: colors.textPrimary, fontWeight: '700' },
  episodeMeta: { color: colors.textSecondary, marginTop: 4 },
});

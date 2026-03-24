import React, { useEffect } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useHomeStore } from '../store/useHomeStore';
import { colors } from '../theme/colors';
import { ContentCard } from '../components/ContentCard';
import { SkeletonCard } from '../components/SkeletonCard';

function Section({ title, data, onPress }: { title: string; data: any[]; onPress: (id: string) => void }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <ContentCard title={item.title} imageUrl={item.thumbnailUrl} onPress={() => onPress(item._id)} />
        )}
      />
    </View>
  );
}

export function HomeScreen({ navigation }: any) {
  const { featured, trending, newReleases, continueWatching, loading, loadHome } = useHomeStore();

  useEffect(() => {
    loadHome('mock-user-id');
  }, [loadHome]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.header}>Bhojpuri OTT</Text>
      {loading ? (
        <View style={styles.skeletonRow}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : (
        <>
          <Section title="Featured" data={featured} onPress={(id) => navigation.navigate('SeriesDetail', { id })} />
          <Section
            title="Continue Watching"
            data={continueWatching}
            onPress={(id) => navigation.navigate('SeriesDetail', { id })}
          />
          <Section title="Trending Series" data={trending} onPress={(id) => navigation.navigate('SeriesDetail', { id })} />
          <Section title="New Releases" data={newReleases} onPress={(id) => navigation.navigate('SeriesDetail', { id })} />
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { paddingBottom: 24 },
  header: {
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: '800',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  section: { marginTop: 12, paddingLeft: 16 },
  sectionTitle: { color: colors.textPrimary, fontSize: 18, fontWeight: '700', marginBottom: 10 },
  skeletonRow: { flexDirection: 'row', paddingHorizontal: 16, marginTop: 16 },
});

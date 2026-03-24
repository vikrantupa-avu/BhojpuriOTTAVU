import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';
import { colors } from '../theme/colors';
import { ContentCard } from '../components/ContentCard';
import { api } from '../services/api';

export function SearchScreen({ navigation }: any) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (q.trim().length) {
        api.search(q).then(setResults);
      } else {
        setResults([]);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [q]);

  return (
    <View style={styles.container}>
      <TextInput
        value={q}
        onChangeText={setQ}
        placeholder="Search series"
        placeholderTextColor={colors.textSecondary}
        style={styles.input}
      />
      <FlatList
        data={results}
        numColumns={2}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{ padding: 12 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        renderItem={({ item }) => (
          <ContentCard
            title={item.title}
            imageUrl={item.thumbnailUrl}
            onPress={() => navigation.navigate('SeriesDetail', { id: item._id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  input: {
    margin: 12,
    borderRadius: 12,
    backgroundColor: colors.card,
    color: colors.textPrimary,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
});

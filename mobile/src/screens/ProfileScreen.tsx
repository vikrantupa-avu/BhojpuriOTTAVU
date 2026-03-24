import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';

export function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <Text style={styles.item}>Watch History</Text>
      <Text style={styles.item}>Continue Watching</Text>
      <Text style={styles.item}>Settings</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  header: { color: colors.textPrimary, fontSize: 24, fontWeight: '800', marginBottom: 20 },
  item: {
    color: colors.textPrimary,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
  },
});

import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

export function SkeletonCard() {
  return <View style={styles.card} />;
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    height: 90,
    borderRadius: 12,
    backgroundColor: colors.card,
    marginRight: 12,
  },
});

import React from 'react';
import { ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../theme/colors';

interface Props {
  title: string;
  imageUrl: string;
  onPress: () => void;
}

export function ContentCard({ title, imageUrl, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <ImageBackground source={{ uri: imageUrl }} style={styles.image} imageStyle={styles.imageRounded}>
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.85)']} style={styles.gradient}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { width: 180, marginRight: 12 },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  image: { height: 102, justifyContent: 'flex-end' },
  imageRounded: { borderRadius: 14 },
  gradient: { padding: 10, borderRadius: 14 },
  title: { color: colors.textPrimary, fontWeight: '700', fontSize: 13 },
});

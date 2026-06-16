import React, { memo, useContext } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import { ThemeContext } from '../context/ThemeContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface MovieCardProps {
  title: string;
  subtitle: string;
  imageUrl: any;
  badgeStatus?: 'onSale' | 'upcoming';
  badgeText?: string;
  onPress?: () => void;
}

const MovieCard: React.FC<MovieCardProps> = memo(({
  title,
  subtitle,
  imageUrl,
  badgeStatus = 'none',
  badgeText,
  onPress,
}) => {
  const { colors, theme } = useContext(ThemeContext);

  const getBadgeColor = () => {
    if (badgeStatus === 'onSale') return colors.primary; 
    if (badgeStatus === 'upcoming') return '#E86339';
    return 'transparent';
  };

  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 12, stiffness: 300 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 12, stiffness: 300 });
  };

  const borderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <AnimatedPressable 
      onPress={onPress} 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut}
      style={[styles.container, animatedStyle]} 
    >
      <View style={[styles.imageContainer, { borderColor }]}>
        <Image source={imageUrl} style={styles.poster} resizeMode="cover" />
        
        {badgeStatus !== 'none' && badgeText && (
          <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
            <Text style={styles.badgeText}>{badgeText}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: colors.text }]} numberOfLines={2}>{title}</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]} numberOfLines={1}>{subtitle}</Text>
      </View>
    </AnimatedPressable>
  );
});

const styles = StyleSheet.create({
  container: {
    width: 156,
  },
  imageContainer: {
    width: 156,
    height: 228,
    borderRadius: 16,
    borderWidth: 1,
    overflow: 'hidden',
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 10,
    right: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
  },
  badgeText: {
    fontWeight: '600',
    fontSize: 10,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    letterSpacing: 0.12,
  },
});

export default MovieCard;
import React, { memo } from 'react';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

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

  const getBadgeColor = () => {
    if (badgeStatus === 'onSale') return '#006FFD';
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

  return (
    <Pressable 
      onPress={onPress} 
      onPressIn={handlePressIn} 
      onPressOut={handlePressOut}
    >
      <Animated.View style={[styles.container, animatedStyle]}>
        <View style={styles.imageContainer}>
          <Image source={imageUrl} style={styles.poster} resizeMode="cover" />
          
          {badgeStatus !== 'none' && badgeText && (
            <View style={[styles.badge, { backgroundColor: getBadgeColor() }]}>
              <Text style={styles.badgeText}>{badgeText}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>{title}</Text>
          <Text style={styles.subtitle} numberOfLines={1}>{subtitle}</Text>
        </View>
      </Animated.View>
    </Pressable>
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
    borderColor: 'rgba(255, 255, 255, 0.16)',
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#71727A',
    letterSpacing: 0.12,
  },
});

export default MovieCard;
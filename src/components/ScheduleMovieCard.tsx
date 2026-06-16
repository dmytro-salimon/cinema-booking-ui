import React, { useContext } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

interface ScheduleMovieCardProps {
  movie: any;
  onMoviePress: (movie: any) => void;
  onTimeSlotPress: (movie: any, time: string) => void;
}

const ScheduleMovieCard: React.FC<ScheduleMovieCardProps> = ({
  movie,
  onMoviePress,
  onTimeSlotPress,
}) => {
  const { colors, theme } = useContext(ThemeContext);

  const dynamicBorderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)';

  return (
    <View style={[
      styles.cardContainer, 
      { backgroundColor: colors.surface, borderColor: dynamicBorderColor }
    ]}>
      <TouchableOpacity activeOpacity={0.8} onPress={() => onMoviePress(movie)}>
        <Image source={movie.coverUrl} style={styles.coverImage} resizeMode="cover" />
      </TouchableOpacity>
      
      <View style={styles.cardFooter}>
        <Text style={[styles.movieTitle, { color: colors.text }]} numberOfLines={1}>
          {movie.title}
        </Text>
        
        <View style={styles.timeSlotsContainer}>
          {movie.timeSlots.map((time: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[styles.timeSlotPill, { borderColor: dynamicBorderColor }]}
              activeOpacity={0.7}
              onPress={() => onTimeSlotPress(movie, time)}
            >
              <Text style={[styles.timeSlotText, { color: colors.text }]}>{time}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
  },
  coverImage: {
    width: '100%',
    height: 180,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  movieTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 12,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  timeSlotPill: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  timeSlotText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default ScheduleMovieCard;
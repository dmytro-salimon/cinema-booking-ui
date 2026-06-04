import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WeekPicker from '../components/WeekPicker';
import SectionHeader from '../components/SectionHeader';
import { ROUTES } from '../constants/routes';

const MOCK_SCHEDULE = [
  {
    id: '1',
    title: 'Кіллхаус',
    subtitle: 'Військовий, Драма, Екшн',
    coverUrl: { uri: 'https://kino-teatr.ua/public/main/films/2026-04/poster_56258_69e5f2a395cb7.jpg' },
    timeSlots: ['14:30', '21:00']
  },
  {
    id: '2',
    title: 'Вівці-детективи',
    subtitle: 'Анімація, Комедія',
    coverUrl: { uri: 'https://kino-teatr.ua/public/main/films/2026-05/poster_57215_69f6d3ecb430c.jpg' },
    timeSlots: ['20:50']
  }
];

const ScheduleScreen = ({ navigation }: any) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleMoviePress = (movie: any) => {
    navigation.navigate(ROUTES.MOVIE_DETAILS, { movieData: movie });
  };

  const handleTimeSlotPress = (movie: any, time: string) => {
    navigation.navigate(ROUTES.SEAT_SELECTION, {
      movieData: movie,
      selectedTime: time,
      selectedDate: selectedDate.toISOString(),
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      
      <View style={styles.navBar}>
        <View>
          <Text style={styles.logoText}>CineBook</Text>
          <Text style={styles.locationText}>Київ, вул Коцюбинського 13</Text>
        </View>
        <TouchableOpacity style={styles.swapButton} activeOpacity={0.7}>
          <Text style={styles.swapIcon}>⇅</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        <WeekPicker 
          title=""
          onDateSelect={(date) => setSelectedDate(date)}
        />

        <SectionHeader title="Сьогодні" />

        <View style={styles.moviesList}>
          {MOCK_SCHEDULE.map((movie) => (
            <View key={movie.id} style={styles.cardContainer}>
              
              <TouchableOpacity activeOpacity={0.8} onPress={() => handleMoviePress(movie)}>
                <Image source={movie.coverUrl} style={styles.coverImage} resizeMode="cover" />
              </TouchableOpacity>
              
              <View style={styles.cardFooter}>
                <Text style={styles.movieTitle} numberOfLines={1}>{movie.title}</Text>
                
                <View style={styles.timeSlotsContainer}>
                  {movie.timeSlots.map((time, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.timeSlotPill}
                      activeOpacity={0.7}
                      onPress={() => handleTimeSlotPress(movie, time)}
                    >
                      <Text style={styles.timeSlotText}>{time}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#010101' 
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoText: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 4,
  },
  locationText: {
    color: '#71727A',
    fontSize: 12,
  },
  swapButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  moviesList: {
    paddingHorizontal: 16,
    gap: 16,
  },
  cardContainer: {
    backgroundColor: '#1F2024',
    borderRadius: 16,
    overflow: 'hidden',
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
    color: '#FFFFFF',
    fontSize: 16,
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
    borderColor: '#2C2D35',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  timeSlotText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ScheduleScreen;
import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import WeekPicker from '../components/WeekPicker';
import SectionHeader from '../components/SectionHeader';
import MainHeader from '../components/MainHeader';
import ScheduleMovieCard from '../components/ScheduleMovieCard';

import { ROUTES } from '../constants/routes';
import { ThemeContext } from '../context/ThemeContext';
import { fetchMovies } from '../api/moviesApi';

const MONTHS_GENITIVE = ['Січня', 'Лютого', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопада', 'Грудня'];
const DAYS_FULL = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'];

const ScheduleScreen = ({ navigation }: any) => {
  const { colors } = useContext(ThemeContext);
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  
  const [allMovies, setAllMovies] = useState<any[]>([]);
  const [movies, setMovies] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSchedule();
  }, []);

  const loadSchedule = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchMovies();
      setAllMovies(data);
    } catch {
      setError("Не вдалося завантажити розклад сеансів.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (allMovies.length === 0) return;

    const daySeed = selectedDate.getDate();

    const startIndex = daySeed % Math.max(1, allMovies.length - 6);
    const selectedShows = allMovies.slice(startIndex, startIndex + 6);

    const mappedSchedule = selectedShows.map((movie: any, index: number) => {
      const hour1 = 10 + ((daySeed + index) % 4);
      const hour2 = 15 + ((daySeed + index) % 4);
      const hour3 = 19 + ((daySeed + index) % 4);

      const timeSlots = index % 2 === 0
        ? [`${hour1}:00`, `${hour2}:30`]
        : [`${hour1}:15`, `${hour2}:45`, `${hour3}:20`];

      return {
        id: `${movie.id}-${daySeed}`, 
        title: movie.name,
        subtitle: movie.genres?.join(', ') || 'Жанр невідомий',
        coverUrl: { uri: movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/600x400' },
        description: movie.summary ? movie.summary.replace(/<[^>]+>/g, '') : 'Опис відсутній.',
        timeSlots
      };
    });

    setMovies(mappedSchedule);
  }, [selectedDate, allMovies]);

  const handleMoviePress = useCallback((movie: any) => {
    const movieDataForDetails = {
      title: movie.title,
      subtitle: movie.subtitle,
      imageUrl: movie.coverUrl,
      description: movie.description,
    };
    navigation.navigate(ROUTES.MOVIE_DETAILS, { movieData: movieDataForDetails });
  }, [navigation]);

  const handleTimeSlotPress = useCallback((movie: any, time: string) => {
    const movieDataForDetails = {
      title: movie.title,
      subtitle: movie.subtitle,
      imageUrl: movie.coverUrl,
      description: movie.description,
    };
    navigation.navigate(ROUTES.SEAT_SELECTION, {
      movieData: movieDataForDetails,
      selectedTime: time,
      selectedDate: selectedDate.toISOString(),
    });
  }, [navigation, selectedDate]);

  const getDynamicDateTitle = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    if (targetDate.getTime() === today.getTime()) {
      return "Сьогодні";
    } else if (targetDate.getTime() === tomorrow.getTime()) {
      return "Завтра";
    } else {
      const day = targetDate.getDate();
      const month = MONTHS_GENITIVE[targetDate.getMonth()];
      const dayOfWeek = DAYS_FULL[targetDate.getDay()];
      return `${day} ${month}, ${dayOfWeek}`;
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      
      <MainHeader />

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.centerBox} />
      ) : error ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <WeekPicker 
            title=""
            onDateSelect={(date) => setSelectedDate(date)}
          />

          <View style={styles.sectionHeader}>
            <SectionHeader title={getDynamicDateTitle(selectedDate)} />
          </View>

          <View style={styles.moviesList}>
            {movies.map((movie) => (
              <ScheduleMovieCard 
                key={movie.id}
                movie={movie}
                onMoviePress={handleMoviePress}
                onTimeSlotPress={handleTimeSlotPress}
              />
            ))}
          </View>

        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  centerBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#E86339',
    fontSize: 14,
    textAlign: 'center',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  moviesList: {
    paddingHorizontal: 16,
    gap: 16,
  },
});

export default ScheduleScreen;
import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CardsList from '../components/CardsList';
import MovieCard from '../components/MovieCard';
import { ROUTES } from '../constants/routes';

const MOVIES_DATA = [
  {
    id: '1',
    title: 'Диявол носить Прада 2',
    subtitle: 'Драма, Комедія',
    imageUrl: { uri: 'https://kino-teatr.ua/public/main/films/2026-04/poster_69f043b316d7b.jpg' },
    badgeStatus: 'upcoming' as const,
    badgeText: 'З 30 КВІТНЯ'
  },
  {
    id: '2',
    title: 'Психоз',
    subtitle: 'Військовий, Драма, Жахи',
    imageUrl: { uri: 'https://kino-teatr.ua/public/main/films/2026-04/poster_57603_69e709ceee8fb.jpg' },
    badgeStatus: 'onSale' as const,
    badgeText: 'В КІНО'
  },
  {
    id: '3',
    title: 'Мортал Комбат 2',
    subtitle: 'Пригоди, Екшн',
    imageUrl: { uri: 'https://kino-teatr.ua/public/main/films/2026-03/poster_69a3fdecc27e4.jpg' },
    badgeStatus: 'onSale' as const,
    badgeText: 'В КІНО'
  }
];

const HomeScreen = ({ navigation }: any) => {
  const handleOpenMovie = (movie: any) => {
    navigation.navigate(ROUTES.MOVIE_DETAILS, { movieData: movie });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        
        <CardsList 
          title="Найочікуваніші прем'єри"
          accessoryType="text"
          accessoryText="Усі"
          onAccessoryPress={() => console.log('Усі прем\'єри')}
        >
          {MOVIES_DATA.map((movie) => (
            <MovieCard 
              key={movie.id}
              title={movie.title}
              subtitle={movie.subtitle}
              imageUrl={movie.imageUrl}
              badgeStatus={movie.badgeStatus}
              badgeText={movie.badgeText}
              onPress={() => handleOpenMovie(movie)}
            />
          ))}
        </CardsList>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#010101' 
  },
  content: { 
    paddingBottom: 40 
  },
});

export default HomeScreen;
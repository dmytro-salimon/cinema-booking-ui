import React, { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ActivityIndicator, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';
import MovieCard from '../components/MovieCard';
import { ROUTES } from '../constants/routes';
import { fetchMovies } from '../api/moviesApi';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const data = await fetchMovies();
      setMovies(data.slice(0, 21)); 
      
    } catch {
      setError("Не вдалося завантажити дані. Перевірте з'єднання з інтернетом.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenMovie = useCallback((movie: any) => {
    const mappedMovie = {
      title: movie.name,
      subtitle: movie.genres?.join(', ') || 'Жанр невідомий',
      imageUrl: { uri: movie.image?.original || movie.image?.medium || 'https://via.placeholder.com/210x295' },
      description: movie.summary ? movie.summary.replace(/<[^>]+>/g, '') : 'Опис відсутній.',
    };
    navigation.navigate(ROUTES.MOVIE_DETAILS, { movieData: mappedMovie });
  }, [navigation]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveSlide(viewableItems[0].index || 0);
    }
  }).current;

  const renderBannerItem = useCallback(({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.bannerContainer} 
      activeOpacity={0.8} 
      onPress={() => handleOpenMovie(item)}
    >
      <Image 
        source={{ uri: item.image?.original || item.image?.medium || 'https://via.placeholder.com/600x400' }} 
        style={styles.bannerImage} 
        resizeMode="cover" 
      />
      <View style={styles.bannerOverlay}>
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeText}>В КІНО</Text>
        </View>
        <Text style={styles.bannerTitle} numberOfLines={1}>{item.name}</Text>
      </View>
    </TouchableOpacity>
  ), [handleOpenMovie]);

  const renderMovieItem = useCallback(({ item }: { item: any }) => (
    <View style={styles.cardWrapper}>
      <MovieCard 
        title={item.name}
        subtitle={item.genres?.join(', ') || ''}
        imageUrl={{ uri: item.image?.medium || 'https://via.placeholder.com/210x295?text=No+Image' }}
        badgeStatus="upcoming"
        badgeText="СКОРО"
        onPress={() => handleOpenMovie(item)}
      />
    </View>
  ), [handleOpenMovie]);

  const carouselMovies = useMemo(() => movies.slice(0, 5), [movies]);
  const premieresMovies = useMemo(() => movies.slice(5, 13), [movies]);
  const familyMovies = useMemo(() => movies.slice(13, 21), [movies]);

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

      {isLoading ? (
        <ActivityIndicator size="large" color="#006FFD" style={styles.centerBox} />
      ) : error ? (
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          <View style={styles.carouselSection}>
            <FlatList
              data={carouselMovies}
              renderItem={renderBannerItem}
              keyExtractor={(item) => `banner-${item.id}`}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
              snapToAlignment="center"
            />
            <View style={styles.pagination}>
              {carouselMovies.map((_, index) => (
                <View 
                  key={index} 
                  style={[styles.dot, activeSlide === index && styles.activeDot]} 
                />
              ))}
            </View>
          </View>

          <View style={styles.listSection}>
            <SectionHeader title="Найочікуваніші прем'єри" />
            <FlatList
              data={premieresMovies}
              renderItem={renderMovieItem}
              keyExtractor={(item) => `prem-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            />
          </View>

          <View style={styles.listSection}>
            <SectionHeader title="Для сімейного перегляду" />
            <FlatList
              data={familyMovies}
              renderItem={renderMovieItem}
              keyExtractor={(item) => `fam-${item.id}`}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.horizontalScroll}
            />
          </View>

        </ScrollView>
      )}
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
    lineHeight: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  carouselSection: {
    marginBottom: 24,
  },
  bannerContainer: {
    width: width,
    height: 220,
    paddingHorizontal: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    backgroundColor: '#1F2024',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    
    marginHorizontal: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    padding: 16,
  },
  badgeContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#006FFD',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#2C2D35',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFFFFF',
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  listSection: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  horizontalScroll: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  cardWrapper: {
    marginRight: 12,
  },
});

export default HomeScreen;
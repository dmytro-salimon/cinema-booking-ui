import React, { useEffect, useState, useRef, useMemo, useCallback, useContext } from 'react';
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
import LinearGradient from 'react-native-linear-gradient';
import SectionHeader from '../components/SectionHeader';
import MainHeader from '../components/MainHeader';
import MovieCard from '../components/MovieCard';
import { ROUTES } from '../constants/routes';
import { fetchMovies } from '../api/moviesApi';
import { ThemeContext } from '../context/ThemeContext';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }: any) => {
  const { colors, theme } = useContext(ThemeContext);

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

  const renderBannerItem = useCallback(({ item }: { item: any }) => {
    const dynamicBorderColor = theme === 'dark' ? 'rgba(255, 255, 255, 0.16)' : 'rgba(0, 0, 0, 0.08)';

    return (
      <View style={styles.bannerContainer}>
        <TouchableOpacity 
          style={[styles.bannerInner, { borderColor: dynamicBorderColor }]} 
          activeOpacity={0.8} 
          onPress={() => handleOpenMovie(item)}
        >
          <Image 
            source={{ uri: item.image?.original || item.image?.medium || 'https://via.placeholder.com/600x400' }} 
            style={[styles.bannerImage, { backgroundColor: colors.surface }]} 
            resizeMode="cover" 
          />
          
          <View style={styles.badgeWrapper}>
            <View style={[styles.badgeContainer, { backgroundColor: colors.primary }]}>
              <Text style={styles.badgeText}>В КІНО</Text>
            </View>
          </View>

          <LinearGradient 
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']} 
            style={styles.titleGradient}
          >
            <Text style={styles.bannerTitle} numberOfLines={1}>{item.name}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    );
  }, [handleOpenMovie, colors, theme]);

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
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      
      <MainHeader />

      {isLoading ? (
        <ActivityIndicator size="large" color={colors.primary} style={styles.centerBox} />
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
                  style={[
                    styles.dot, 
                    { backgroundColor: activeSlide === index ? colors.text : colors.textSecondary },
                    activeSlide === index && styles.activeDot
                  ]} 
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
    height: 188,
    paddingHorizontal: 16,
    marginTop: 16,
  },
  bannerInner: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  badgeWrapper: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 2,
  },
  badgeContainer: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  titleGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
  },
  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 24,
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
    marginHorizontal: 4,
  },
  activeDot: {
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
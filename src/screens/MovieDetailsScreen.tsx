import React, { useEffect, useState, useContext } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  ActivityIndicator,
  Linking
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { ROUTES } from '../constants/routes';
import { ThemeContext } from '../context/ThemeContext';
import { fetchMovieDetails } from '../api/moviesApi';

import PrimaryButton from '../components/PrimaryButton';
import ScreenHeader from '../components/ScreenHeader';
import WeekPicker from '../components/WeekPicker';

const MOCK_TIMES = ['14:30', '19:00'];

const MovieDetailsScreen = ({ route, navigation }: any) => {
  const { movieData } = route.params || {};
  const { colors, theme } = useContext(ThemeContext);
  const insets = useSafeAreaInsets();

  const [details, setDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState('14:30');

  const dynamicBorderColor = theme === 'dark' ? '#333' : '#E4E4E5';

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieData.id);
        setDetails(data);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    if (movieData?.id) {
      loadDetails();
    } else {
      setLoading(false);
    }
  }, [movieData?.id]);

  const formatRuntime = (minutes: number) => {
    if (!minutes) return 'Невідомо';
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h} год ${m} хв`;
  };

  const openTrailer = (key: string) => {
    Linking.openURL(`https://www.youtube.com/watch?v=${key}`);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      
      <ScreenHeader 
        onBackPress={() => navigation.goBack()}
        style={[styles.floatingHeader, { top: insets.top }]}
        leftButtonStyle={[styles.floatingBackButton, { backgroundColor: colors.surface }]}
        iconColor={colors.text}
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.heroContainer}>
          <Image 
            source={movieData?.imageUrl} 
            style={styles.heroImage} 
            resizeMode="cover" 
          />
          <LinearGradient 
            colors={['transparent', colors.background]} 
            style={styles.heroGradient} 
            locations={[0, 1]}
          />
        </View>

        <View style={styles.contentWrapper}>

          <View style={styles.pickerSection}>
            <WeekPicker 
              title="Дата сеансу" 
              showMonth={true} 
              onDateSelect={(date) => setSelectedDate(date)}
            />
          </View>

          <View style={styles.timesSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Час сеансу</Text>
            <View style={styles.timesRow}>
              {MOCK_TIMES.map((time, index) => (
                <TouchableOpacity 
                  key={index} 
                  style={[
                    styles.timePill, 
                    selectedTime === time 
                      ? { backgroundColor: colors.primary, borderColor: colors.primary } 
                      : { borderColor: dynamicBorderColor }
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text style={[
                    styles.timeText,
                    selectedTime === time ? styles.timeTextSelected : { color: colors.text }
                  ]}>
                    {time}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton 
              title="Придбати квиток" 
              onPress={() => navigation.navigate(ROUTES.SEAT_SELECTION, { 
                movieData, 
                selectedTime,
                selectedDate: selectedDate.toISOString() 
              })} 
            />
          </View>

          <Text style={[styles.movieTitle, { color: colors.text }]}>{movieData?.title}</Text>
          <Text style={[styles.movieDescription, { color: colors.textSecondary }]}>{movieData?.description}</Text>

          {loading ? (
            <ActivityIndicator size="large" color={colors.primary} style={styles.loaderMargin} />
          ) : (
            <>
              {details?.trailers?.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, styles.sectionTitlePadding, { color: colors.text }]}>Трейлери</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.trailersRow}>
                    {details.trailers.map((trailer: any) => (
                      <TouchableOpacity 
                        key={trailer.id} 
                        style={styles.trailerCard}
                        onPress={() => openTrailer(trailer.key)}
                        activeOpacity={0.8}
                      >
                        <Image 
                          source={{ uri: `https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg` }} 
                          style={styles.trailerImage} 
                        />
                        <View style={styles.playIconOverlay}>
                          <View style={styles.playIcon} />
                        </View>
                        <Text style={[styles.trailerTitle, { color: colors.text }]} numberOfLines={1}>{trailer.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </>
              )}

              <Text style={[styles.sectionTitle, styles.sectionTitleMargin, { color: colors.text }]}>Інформація</Text>
              <View style={styles.infoBlock}>
                <InfoRow label="Рік" value={details?.year} />
                <InfoRow label="Жанр" value={movieData?.subtitle} />
                <InfoRow label="Тривалість" value={formatRuntime(details?.runtime)} />
                <InfoRow label="Вікова категорія" value={`${details?.certification}+`} />
                <InfoRow label="Виробництво" value={details?.production} />
                <InfoRow label="Режисер" value={details?.director} />
                <InfoRow 
                  label="У головних ролях" 
                  value={details?.cast?.map((c: any) => c.name).join(', ')} 
                />
              </View>

              <Text style={[styles.sectionTitle, styles.sectionTitleMargin, { color: colors.text }]}>Доступність</Text>
              <View style={styles.accessibilityBlock}>
                <Text style={[styles.accTitle, { color: colors.text }]}>Інклюзивна адаптація</Text>
                <Text style={[styles.accDesc, { color: colors.textSecondary }]}>
                  Фільм адаптовано для людей з порушенням зору та незрячих людей. 
                  Щоб скористатися цією опцією, завантажте додаток "MovieReading" на свій смартфон.
                </Text>
              </View>
            </>
          )}

        </View>
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ label, value }: { label: string, value: string }) => {
  const { colors } = useContext(ThemeContext);
  
  if (!value) return null;
  return (
    <View style={styles.infoRow}>
      <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[styles.infoValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  floatingHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'transparent',
  },
  floatingBackButton: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  scrollContent: { 
    paddingBottom: 60,
  },
  heroContainer: {
    width: '100%',
    height: 558,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 88,
  },
  contentWrapper: {
  },
  pickerSection: {
  },
  timesSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  timesRow: {
    flexDirection: 'row',
    gap: 12,
  },
  timePill: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
  },
  timeText: {
    fontWeight: 'bold',
  },
  timeTextSelected: {
    color: '#fff',
  },
  buttonWrapper: {
    marginBottom: 24,
    width: '100%',
    alignItems: 'stretch',
  },
  movieTitle: { 
    paddingHorizontal: 16,
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: 18 * 0.0069,
    marginBottom: 12,
  },
  movieDescription: {
    paddingHorizontal: 16,
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 24,
  },
  loaderMargin: {
    marginTop: 40,
  },
  trailersRow: {
    paddingHorizontal: 16,
    gap: 16,
  },
  trailerCard: {
    width: 160,
  },
  trailerImage: {
    width: 160,
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  playIconOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  playIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 14,
    borderRightWidth: 0,
    borderBottomWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: '#FFF',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginLeft: 4, 
  },
  trailerTitle: {
    fontSize: 12,
    fontWeight: '600',
  },
  sectionTitleMargin: {
    paddingHorizontal: 16,
    marginTop: 32,
  },
  sectionTitlePadding: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  infoBlock: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  infoRow: {
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    lineHeight: 20,
  },
  accessibilityBlock: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  accTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  accDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default MovieDetailsScreen;
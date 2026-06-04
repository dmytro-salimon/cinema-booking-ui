import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { ROUTES } from '../constants/routes';

const MovieDetailsScreen = ({ route, navigation }: any) => {
  const { movieData } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader 
        title={movieData?.title || 'Деталі фільму'} 
        onBackPress={() => navigation.goBack()} 
      />
      
      <View style={styles.content}>
        {movieData?.imageUrl && (
          <Image 
            source={movieData.imageUrl} 
            style={styles.poster} 
            resizeMode="cover" 
          />
        )}
        <Text style={styles.title}>{movieData?.title}</Text>
        <Text style={styles.subtitle}>{movieData?.subtitle}</Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          title="Придбати квиток" 
          onPress={() => navigation.navigate(ROUTES.SEAT_SELECTION)} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#010101' 
  },
  content: { 
    flex: 1, 
    alignItems: 'center',
    padding: 16,
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 16,
    marginBottom: 24,
  },
  title: { 
    color: '#FFFFFF', 
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    color: '#71727A',
    fontSize: 14,
  },
  footer: {
    padding: 16,
  }
});

export default MovieDetailsScreen;
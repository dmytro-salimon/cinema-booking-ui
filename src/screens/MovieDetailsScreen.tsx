import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { ROUTES } from '../constants/routes';

const MovieDetailsScreen = ({ route, navigation }: any) => {
  const { movieData } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader 
        title={movieData?.title || 'Деталі'} 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {movieData?.imageUrl && (
          <Image 
            source={movieData.imageUrl} 
            style={styles.poster} 
            resizeMode="cover" 
          />
        )}
        <Text style={styles.title}>{movieData?.title}</Text>
        <Text style={styles.subtitle}>{movieData?.subtitle}</Text>
        
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>Сюжет</Text>
          <Text style={styles.descriptionText}>
            {movieData?.description}
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton 
          title="Придбати квиток" 
          onPress={() => navigation.navigate(ROUTES.SEAT_SELECTION, { movieData })} 
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
  scrollContent: { 
    alignItems: 'center',
    padding: 16,
    paddingBottom: 40,
  },
  poster: {
    width: 220,
    height: 330,
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
    marginBottom: 24,
  },
  descriptionBox: {
    width: '100%',
    backgroundColor: '#1F2024',
    padding: 16,
    borderRadius: 16,
  },
  descriptionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  descriptionText: {
    color: '#D4D4D4',
    fontSize: 14,
    lineHeight: 22,
  },
  footer: {
    padding: 16,
    backgroundColor: '#010101',
  }
});

export default MovieDetailsScreen;
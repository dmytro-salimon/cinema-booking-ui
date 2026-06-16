import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { ROUTES } from '../constants/routes';

import { ThemeContext } from '../context/ThemeContext';
import { useDispatch } from 'react-redux';
import { addTicket } from '../store/ticketsSlice';

const CheckoutScreen = ({ route, navigation }: any) => {
  const { colors } = useContext(ThemeContext);
  const dispatch = useDispatch();

  const { movieData, selectedTime, selectedDate } = route.params || {};

  const handlePayment = () => {
    const ticketId = `${movieData?.title || 'movie'}-${Date.now()}`;

    const newTicket = {
      id: ticketId,
      title: movieData?.title || 'Кіллхаус',
      time: selectedTime || '19:00',
      date: selectedDate ? new Date(selectedDate).toLocaleDateString('uk-UA') : 'Сьогодні',
      price: 300, 
      imageUrl: movieData?.imageUrl,
      row: 2,
      seat: Math.floor(Math.random() * 20) + 1,
    };

    dispatch(addTicket(newTicket));

    navigation.navigate(ROUTES.SUCCESS);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScreenHeader title="Оплата" onBackPress={() => navigation.goBack()} />
      
      <View style={styles.content}>
        <Text style={[styles.text, { color: colors.text }]}>
          Всього до сплати: 300 грн.
        </Text>
        <Text style={[styles.subText, { color: colors.textSecondary }]}>
          {movieData?.title || 'Кіллхаус'} • {selectedTime || '19:00'}
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          title="Pay" 
          onPress={handlePayment} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
  },
  content: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  text: { 
    fontSize: 22, 
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    fontSize: 16,
    marginTop: 4,
  },
  footer: { 
    padding: 16 
  },
});

export default CheckoutScreen;
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { ROUTES } from '../constants/routes';

const CheckoutScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Оплата" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.text}>Всього до сплати: 300 грн.</Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          title="Pay" 
          onPress={() => navigation.navigate(ROUTES.SUCCESS)} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010101' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
  footer: { padding: 16 },
});

export default CheckoutScreen;
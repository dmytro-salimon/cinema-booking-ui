import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PrimaryButton from '../components/PrimaryButton';
import { ROUTES } from '../constants/routes';

const SuccessScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Квитки вже ваші! 🍿</Text>
        <Text style={styles.subtitle}>
          Транзакцію успішно завершено. Цифровий квиток додано до вашого профілю.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton 
          title="Мої квитки" 
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: ROUTES.MAIN_TABS, params: { screen: ROUTES.TAB_TICKETS } }],
            });
          }} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010101' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32 },
  title: { color: '#FFFFFF', fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  subtitle: { color: '#71727A', fontSize: 14, textAlign: 'center', lineHeight: 22 },
  footer: { padding: 16 },
});

export default SuccessScreen;
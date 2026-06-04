import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import PrimaryButton from '../components/PrimaryButton';
import { ROUTES } from '../constants/routes';

const SeatSelectionScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader title="Вибір місць" onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <Text style={styles.text}>Тут буде матриця місць</Text>
      </View>
      
      <View style={styles.footer}>
        <PrimaryButton 
          title="Продовжити" 
          onPress={() => navigation.navigate(ROUTES.CHECKOUT)} 
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010101' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#71727A' },
  footer: { padding: 16 },
});

export default SeatSelectionScreen;
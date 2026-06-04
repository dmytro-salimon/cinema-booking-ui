import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SectionHeader from '../components/SectionHeader';

const TicketsScreen = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionHeader title="Мої квитки" />
      <View style={styles.content}>
        <Text style={styles.text}>Тут будуть придбані квитки</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010101' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { color: '#71727A' },
});

export default TicketsScreen;
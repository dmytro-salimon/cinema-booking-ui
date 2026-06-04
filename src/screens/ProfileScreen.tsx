import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import MenuList from '../components/MenuList';
import MenuItem from '../components/MenuItem';

const ProfileScreen = ({ navigation }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Шапка екрана */}
      <ScreenHeader 
        title="Профіль" 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
        {/* Блок Персоналізації */}
        <MenuList title="Персоналізація">
          <MenuItem 
            title="Улюблені кінотеатри" 
            accessory="arrow" 
            hasDivider={true} 
          />
          <MenuItem 
            title="Улюблені жанри" 
            accessory="arrow" 
            hasDivider={true} 
          />
          <MenuItem 
            title="Дозволити сповіщення" 
            accessory="switch" 
            isSwitchOn={notificationsEnabled}
            onSwitchChange={(value) => setNotificationsEnabled(value)}
          />
        </MenuList>

        {/* Блок Підтримки */}
        <MenuList title="Підтримка">
          <MenuItem title="FAQ" accessory="arrow" hasDivider={true} />
          <MenuItem title="Зв'язок з підтримкою" accessory="arrow" hasDivider={true} />
          <MenuItem title="Умови використання" accessory="arrow" hasDivider={true} />
          <MenuItem title="Політика конфіденційності" accessory="arrow" />
        </MenuList>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010101' },
  content: { padding: 16, paddingBottom: 40 },
});

export default ProfileScreen;
import React, { useState, useContext } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';
import MenuList from '../components/MenuList';
import MenuItem from '../components/MenuItem';

import { ThemeContext } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }: any) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const { theme, colors, toggleTheme } = useContext(ThemeContext);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScreenHeader 
        title="Профіль" 
        onBackPress={() => navigation.goBack()} 
      />
      
      <ScrollView contentContainerStyle={styles.content}>
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
            hasDivider={true}
          />
          <MenuItem 
            title="Темна тема" 
            accessory="switch" 
            isSwitchOn={theme === 'dark'}
            onSwitchChange={toggleTheme}
          />
        </MenuList>

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
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
});

export default ProfileScreen;
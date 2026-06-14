import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useFocusEffect } from '@react-navigation/native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from 'react-native-reanimated';

import ScreenHeader from '../components/ScreenHeader';
import MenuList from '../components/MenuList';
import MenuItem from '../components/MenuItem';

import { ThemeContext } from '../context/ThemeContext';

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const { theme, colors, toggleTheme } = useContext(ThemeContext);

  const enterAnim = useSharedValue(0);

  useFocusEffect(
    useCallback(() => {
      enterAnim.value = withTiming(1, { duration: 300, easing: Easing.out(Easing.ease) });
      
      return () => {
        enterAnim.value = 0;
      };
    }, [enterAnim])
  );

  const block1Style = useAnimatedStyle(() => {
    return {
      opacity: withDelay(10, withTiming(enterAnim.value, { duration: 300 })),
      transform: [
        { translateY: withDelay(10, withTiming(enterAnim.value === 1 ? 0 : 20, { duration: 300 })) }
      ]
    };
  });

  const block2Style = useAnimatedStyle(() => {
    return {
      opacity: withDelay(50, withTiming(enterAnim.value, { duration: 300 })),
      transform: [
        { translateY: withDelay(50, withTiming(enterAnim.value === 1 ? 0 : 20, { duration: 300 })) }
      ]
    };
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScreenHeader title="Профіль" />
      
      <ScrollView contentContainerStyle={styles.content}>
        
        <Animated.View style={block1Style}>
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
        </Animated.View>

        <Animated.View style={block2Style}>
          <MenuList title="Підтримка">
            <MenuItem title="FAQ" accessory="arrow" hasDivider={true} />
            <MenuItem title="Зв'язок з підтримкою" accessory="arrow" hasDivider={true} />
            <MenuItem title="Умови використання" accessory="arrow" hasDivider={true} />
            <MenuItem title="Політика конфіденційності" accessory="arrow" />
          </MenuList>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, paddingBottom: 40 },
});

export default ProfileScreen;
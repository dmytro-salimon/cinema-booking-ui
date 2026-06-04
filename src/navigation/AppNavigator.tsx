import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTES } from '../constants/routes';

import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import TicketsScreen from '../screens/TicketsScreen.tsx';
import ProfileScreen from '../screens/ProfileScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import SuccessScreen from '../screens/SuccessScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

interface TabBarIconProps {
  routeName: string;
  color: string;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ routeName, color }) => {
  let iconSymbol = '';
  if (routeName === ROUTES.TAB_HOME) iconSymbol = '🎬'; 
  else if (routeName === ROUTES.TAB_SCHEDULE) iconSymbol = '🧭';
  else if (routeName === ROUTES.TAB_TICKETS) iconSymbol = '🛍️';
  else if (routeName === ROUTES.TAB_PROFILE) iconSymbol = '👤';

  return (
    <Text style={[styles.iconText, { color }]}>{iconSymbol}</Text>
  );
};

const getScreenOptions = ({ route }: any) => ({
  headerShown: false,
  tabBarStyle: { 
    backgroundColor: '#1F2024', 
    borderTopWidth: 0, 
    paddingTop: 8,
  },
  tabBarActiveTintColor: '#006FFD',
  tabBarInactiveTintColor: '#71727A',
  tabBarLabelStyle: { 
    fontSize: 10, 
    fontWeight: '600' as const, 
    marginTop: 4,
  },
  tabBarIcon: ({ color }: { color: string }) => <TabBarIcon routeName={route.name} color={color} />,
});

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={getScreenOptions}>
      <Tab.Screen name={ROUTES.TAB_HOME} component={HomeScreen} options={{ title: 'Афіша' }} />
      <Tab.Screen name={ROUTES.TAB_SCHEDULE} component={ScheduleScreen} options={{ title: 'Зараз в кіно' }} />
      <Tab.Screen name={ROUTES.TAB_TICKETS} component={TicketsScreen} options={{ title: 'Мої квитки' }} />
      <Tab.Screen name={ROUTES.TAB_PROFILE} component={ProfileScreen} options={{ title: 'Профіль' }} /> 
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={ROUTES.MAIN_TABS} component={TabNavigator} />
        <Stack.Screen name={ROUTES.MOVIE_DETAILS} component={MovieDetailsScreen} />
        <Stack.Screen name={ROUTES.SEAT_SELECTION} component={SeatSelectionScreen} />
        <Stack.Screen name={ROUTES.CHECKOUT} component={CheckoutScreen} />
        <Stack.Screen name={ROUTES.SUCCESS} component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  iconText: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default AppNavigator;
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { ROUTES } from '../constants/routes';
import { ThemeContext } from '../context/ThemeContext';

import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import TicketsScreen from '../screens/TicketsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SeatSelectionScreen from '../screens/SeatSelectionScreen';
import CheckoutScreen from '../screens/CheckoutScreen';
import SuccessScreen from '../screens/SuccessScreen';

import CategoriesIcon from '../assets/icons/Categories.svg';
import ExploreIcon from '../assets/icons/Explore.svg';
import ShoppingBagIcon from '../assets/icons/Shopping Bag Filled.svg';
import ProfileIcon from '../assets/icons/Profile.svg';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabIcon = ({ routeName, color }: { routeName: string, color: string }) => {
  if (routeName === ROUTES.TAB_HOME) {
    return <CategoriesIcon width={20} height={20} color={color} />;
  } else if (routeName === ROUTES.TAB_SCHEDULE) {
    return <ExploreIcon width={20} height={20} color={color} />;
  } else if (routeName === ROUTES.TAB_TICKETS) {
    return <ShoppingBagIcon width={20} height={20} color={color} />;
  } else if (routeName === ROUTES.TAB_PROFILE) {
    return <ProfileIcon width={20} height={20} color={color} />;
  }
  
  return null;
};

const HomeTabIcon = ({ color }: any) => <TabIcon routeName={ROUTES.TAB_HOME} color={color} />;
const ScheduleTabIcon = ({ color }: any) => <TabIcon routeName={ROUTES.TAB_SCHEDULE} color={color} />;
const TicketsTabIcon = ({ color }: any) => <TabIcon routeName={ROUTES.TAB_TICKETS} color={color} />;
const ProfileTabIcon = ({ color }: any) => <TabIcon routeName={ROUTES.TAB_PROFILE} color={color} />;

const TabNavigator = () => {
  const { colors } = useContext(ThemeContext);

  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: colors.surface, 
          borderTopWidth: 0, 
          paddingTop: 8,
        },
        tabBarActiveTintColor: colors.primary, 
        tabBarInactiveTintColor: colors.textSecondary, 
        tabBarLabelStyle: { 
          fontSize: 10, 
          fontWeight: '600' as const, 
          marginTop: 4,
        },
      }}
    >
      <Tab.Screen 
        name={ROUTES.TAB_HOME} 
        component={HomeScreen} 
        options={{ title: 'Афіша', tabBarIcon: HomeTabIcon }} 
      />
      <Tab.Screen 
        name={ROUTES.TAB_SCHEDULE} 
        component={ScheduleScreen} 
        options={{ title: 'Зараз в кіно', tabBarIcon: ScheduleTabIcon }} 
      />
      <Tab.Screen 
        name={ROUTES.TAB_TICKETS} 
        component={TicketsScreen} 
        options={{ title: 'Мої квитки', tabBarIcon: TicketsTabIcon }} 
      />
      <Tab.Screen 
        name={ROUTES.TAB_PROFILE} 
        component={ProfileScreen} 
        options={{ title: 'Профіль', tabBarIcon: ProfileTabIcon }} 
      /> 
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

export default AppNavigator;
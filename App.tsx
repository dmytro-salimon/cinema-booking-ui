// import React, { useState } from 'react';
// import { StyleSheet, View, Alert, ScrollView } from 'react-native';
// import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context'; 

// import MenuItem from './src/components/MenuItem';
// import ScreenHeader from './src/components/ScreenHeader';
// import PrimaryButton from './src/components/PrimaryButton';
// import MovieCard from './src/components/MovieCard';
// import WeekPicker from './src/components/WeekPicker';
// import CardsList from './src/components/CardsList';
// import MenuList from './src/components/MenuList';

// const App = () => {
//   const [notificationsEnabled, setNotificationsEnabled] = useState(true);

//   return (
//     <SafeAreaProvider>
//       <SafeAreaView style={styles.screen}>
        
//         <ScreenHeader title="Компоненти UI" onBackPress={() => {Alert.alert('Назад!', 'Натиснуто кнопку "Назад"')}} />

//         <ScrollView contentContainerStyle={styles.content}>

//           <CardsList title="Найочікуваніші прем'єри">
//             <MovieCard 
//               title="Диявол носить Прада 2"
//               subtitle="Драма, Комедія"
//               imageUrl={{ uri: 'https://kino-teatr.ua/public/main/films/2026-04/poster_69f043b316d7b.jpg' }} 
//               badgeStatus="upcoming"
//               badgeText="З 30 КВІТНЯ"
//               onPress={() => Alert.alert('Фільм', 'Відкрито "Диявол носить Прада 2"')}
//             />
            
//             <MovieCard 
//               title="Психоз"
//               subtitle="Військовий, Драма, Жахи"
//               imageUrl={{ uri: 'https://kino-teatr.ua/public/main/films/2026-04/poster_57603_69e709ceee8fb.jpg' }} 
//               badgeStatus="onSale"
//               badgeText="В КІНО"
//               onPress={() => Alert.alert('Фільм', 'Відкрито "Психоз"')}
//             />

//             <MovieCard 
//               title="Мортал Комбат 2"
//               subtitle="Пригоди, Екшн"
//               imageUrl={{ uri: 'https://kino-teatr.ua/public/main/films/2026-03/poster_69a3fdecc27e4.jpg' }}
//               badgeStatus="onSale"
//               badgeText="В КІНО" 
//               onPress={() => Alert.alert('Фільм', 'Відкрито "Мортал Комбат 2"')}
//             />
//           </CardsList>

//           <WeekPicker 
//             title="День сеансу" 
//             onDateSelect={(date) => Alert.alert('Обрано дату', `Ви обрали дату сеансу ${date}`)}
//           />
          
//           <MenuList title="Персоналізація">
//             <MenuItem 
//               title="Улюблені кінотеатри" 
//               accessory="arrow" 
//               onPress={() => {}} 
//               hasDivider={true} 
//             />
//             <MenuItem 
//               title="Дозволити сповіщення" 
//               accessory="switch" 
//               isSwitchOn={notificationsEnabled}
//               onSwitchChange={(value) => setNotificationsEnabled(value)}
//             />
//           </MenuList>

//           <MenuList 
//             title="Оберіть місця" 
//             accessoryType="icon" 
//             onAccessoryPress={() => Alert.alert('Додати нове місце', 'Натиснуто кнопку "Додати нове місце"')}
//           >
//             <MenuItem 
//               title="Ряд 3, Місце 24" 
//               detail="150 грн."
//               accessory="clear" 
//               onPress={() => {}} 
//               hasDivider={true}
//             />
//             <MenuItem 
//               title="Ряд 3, Місце 25" 
//               detail="150 грн."
//               accessory="clear" 
//               onPress={() => {}} 
//             />
//           </MenuList>

//         </ScrollView>

//         <View style={styles.footer}>
//           <PrimaryButton 
//             title="Перейти до оплати" 
//             onPress={() => Alert.alert('Успіх!', 'Кнопку натиснуто 🚀')} 
//           />
//         </View>

//       </SafeAreaView>
//     </SafeAreaProvider>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: '#010101',
//   },
//   content: {
//     padding: 16,
//     paddingBottom: 40,
//   },
//   footer: {
//     paddingTop: 16,
//   }
// });

// export default App;

import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context'; 
import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
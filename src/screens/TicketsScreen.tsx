import React, { useState, useRef, useContext } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';

import { ThemeContext } from '../context/ThemeContext';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { clearTickets } from '../store/ticketsSlice'; 

import TicketCard from '../components/TicketCard';

const { width } = Dimensions.get('window');
const TICKET_WIDTH = 296;

const SIDE_SPACE = (width - TICKET_WIDTH) / 2;
const ITEM_GAP = SIDE_SPACE - 16;
const SNAP_INTERVAL = TICKET_WIDTH + ITEM_GAP;

const TicketsScreen = () => {
  const { colors } = useContext(ThemeContext);
  const tickets = useSelector((state: RootState) => state.tickets.items);
  
  const dispatch = useDispatch();
  
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index || 0);
    }
  }).current;

  const hasTickets = tickets.length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      
      <ScreenHeader 
        title="Мої квитки" 
        leftIcon={hasTickets ? 'delete' : undefined}
        onLeftPress={hasTickets ? () => dispatch(clearTickets()) : undefined}
      />
      
      <View style={styles.content}>
        {!hasTickets ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              У вас поки немає придбаних квитків
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={tickets}
              renderItem={({ item }) => <TicketCard item={item} />}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
              
              snapToAlignment="start" 
              snapToInterval={SNAP_INTERVAL}
              decelerationRate="fast"
              disableIntervalMomentum={true}
              
              style={styles.list}
              contentContainerStyle={{ 
                paddingHorizontal: SIDE_SPACE,
                gap: ITEM_GAP
              }}
            />
            
            <View style={styles.pagination}>
              {tickets.map((_, index) => (
                <View 
                  key={index} 
                  style={[
                    styles.dot, 
                    { backgroundColor: activeIndex === index ? colors.text : colors.textSecondary },
                    activeIndex === index && styles.activeDot
                  ]} 
                />
              ))}
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
  },
  content: { 
    flex: 1, 
    paddingTop: 16, 
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: { 
    textAlign: 'center',
    fontSize: 16,
  },
  list: {
    flex: 1,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    height: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 4,
  },
  activeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});

export default TicketsScreen;
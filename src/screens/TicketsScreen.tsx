import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenHeader from '../components/ScreenHeader';

import { ThemeContext } from '../context/ThemeContext';

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { removeTicket, updateQuantity } from '../store/ticketsSlice';

const TicketsScreen = () => {
  const { colors } = useContext(ThemeContext);
  
  const tickets = useSelector((state: RootState) => state.tickets.items);
  const dispatch = useDispatch();

  const handleRemove = (id: string) => {
    dispatch(removeTicket(id));
  };

  const handleIncrease = (id: string, currentQuantity: number) => {
    dispatch(updateQuantity({ id, quantity: currentQuantity + 1 }));
  };

  const handleDecrease = (id: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ id, quantity: currentQuantity - 1 }));
    }
  };

  const renderTicket = ({ item }: { item: any }) => (
    <View style={[styles.ticketCard, { backgroundColor: colors.surface }]}>
      
      <View style={styles.ticketInfo}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.details, { color: colors.textSecondary }]}>
          {item.date} | {item.time}
        </Text>
        <Text style={[styles.price, { color: colors.primary }]}>
          {item.price * item.quantity} грн
        </Text>
      </View>

      <View style={styles.actions}>
        <View style={styles.counter}>
          <TouchableOpacity 
            onPress={() => handleDecrease(item.id, item.quantity)} 
            style={[styles.btn, { borderColor: colors.textSecondary }]}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>-</Text>
          </TouchableOpacity>
          
          <Text style={[styles.quantity, { color: colors.text }]}>{item.quantity}</Text>
          
          <TouchableOpacity 
            onPress={() => handleIncrease(item.id, item.quantity)} 
            style={[styles.btn, { borderColor: colors.textSecondary }]}
          >
            <Text style={[styles.btnText, { color: colors.text }]}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleRemove(item.id)} style={styles.removeBtn}>
          <Text style={styles.removeBtnText}>Скасувати</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScreenHeader title="Мої квитки" />
      
      <View style={styles.content}>
        {tickets.length === 0 ? (
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            У вас поки немає придбаних квитків
          </Text>
        ) : (
          <FlatList
            data={tickets}
            renderItem={renderTicket}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
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
  },
  listContent: {
    padding: 16,
    gap: 16,
  },
  emptyText: { 
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
  },
  ticketCard: {
    padding: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ticketInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  details: {
    fontSize: 12,
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actions: {
    alignItems: 'flex-end',
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  btn: {
    borderWidth: 1,
    borderRadius: 8,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 18,
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 12,
  },
  removeBtn: {
    backgroundColor: '#E86339',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  removeBtnText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TicketsScreen;
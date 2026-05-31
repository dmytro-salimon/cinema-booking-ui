import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const MONTHS = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const DAYS = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

interface WeekPickerProps {
  title?: string;
  onDateSelect?: (date: Date) => void;
}

const WeekPicker: React.FC<WeekPickerProps> = ({ title = "День сеансу", onDateSelect }) => {
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dayOfWeek = today.getDay();
      const diffToMonday = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
      const startMonday = new Date(today.setDate(diffToMonday));

      const next14Days = [];
      for (let i = 0; i < 14; i++) {
        const date = new Date(startMonday);
        date.setDate(startMonday.getDate() + i);
        next14Days.push(date);
      }
      setDates(next14Days);
      
      const currentToday = new Date();
      currentToday.setHours(0, 0, 0, 0);
      setSelectedDate(currentToday);
    };

    generateDates();
  }, []);

  const handleSelect = (date: Date) => {
    setSelectedDate(date);
    if (onDateSelect) {
      onDateSelect(date);
    }
  };

  const displayMonth = selectedDate ? MONTHS[selectedDate.getMonth()] : MONTHS[new Date().getMonth()];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.monthText}>{displayMonth}</Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((date, index) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          
          const isPast = date < today;
          const isSelected = selectedDate?.getTime() === date.getTime();
          
          return (
            <TouchableOpacity
              key={index}
              disabled={isPast}
              onPress={() => handleSelect(date)}
              activeOpacity={0.7}
              style={[
                styles.pill,
                isPast && styles.pillDisabled,
                !isPast && !isSelected && styles.pillAvailable,
                isSelected && styles.pillSelected,
              ]}
            >
              <Text style={[
                styles.dayName,
                isPast && styles.textDisabled,
                isSelected && styles.textSelected
              ]}>
                {DAYS[date.getDay()]}
              </Text>
              <Text style={[
                styles.dayNumber,
                isPast && styles.textDisabled,
                isSelected && styles.textSelected
              ]}>
                {date.getDate()}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  monthText: {
    color: '#71727A',
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillAvailable: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2F3036',
  },
  pillSelected: {
    backgroundColor: '#006FFD',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pillDisabled: {
    backgroundColor: 'transparent',
    borderWidth: 0, 
  },
  dayName: {
    fontWeight: '600',
    fontSize: 10,
    color: '#71727A',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textDisabled: {
    color: '#494A50',
  },
  textSelected: {
    color: '#FFFFFF',
  }
});

export default WeekPicker;
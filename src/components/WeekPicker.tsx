import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

import { ThemeContext } from '../context/ThemeContext';

const MONTHS = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
const DAYS = ['НД', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

interface WeekPickerProps {
  title?: string;
  showMonth?: boolean;
  onDateSelect?: (date: Date) => void;
}

const WeekPicker: React.FC<WeekPickerProps> = ({ 
  title = "", 
  showMonth = false, 
  onDateSelect 
}) => {
  const { colors, theme } = useContext(ThemeContext);
  
  const [dates, setDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    const generateDates = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const next14Days = [];
      for (let i = 0; i < 14; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        next14Days.push(date);
      }
      
      setDates(next14Days);
      setSelectedDate(today); 
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
  
  const dynamicBorderColor = theme === 'dark' ? '#2C2D35' : '#E4E4E5';

  return (
    <View style={styles.container}>
      {(title || showMonth) && (
        <View style={styles.header}>
          {title ? <Text style={[styles.title, { color: colors.text }]}>{title}</Text> : <View />}
          {showMonth && <Text style={[styles.monthText, { color: colors.textSecondary }]}>{displayMonth}</Text>}
        </View>
      )}

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {dates.map((date, index) => {
          const isSelected = selectedDate?.getTime() === date.getTime();
          
          return (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(date)}
              activeOpacity={0.7}
              style={[
                styles.pill,
                !isSelected && styles.pillTransparent,
                isSelected 
                  ? { backgroundColor: colors.primary, borderColor: colors.primary }
                  : { borderColor: dynamicBorderColor }
              ]}
            >
              <Text style={[
                styles.dayName,
                isSelected ? styles.textWhite : { color: colors.textSecondary }
              ]}>
                {DAYS[date.getDay()]}
              </Text>
              <Text style={[
                styles.dayNumber,
                isSelected ? styles.textWhite : { color: colors.text }
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
    paddingHorizontal: 16, 
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  monthText: {
    fontSize: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  pill: {
    width: 50,
    paddingVertical: 12,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  pillTransparent: {
    backgroundColor: 'transparent',
  },
  textWhite: {
    color: '#FFFFFF',
  },
  dayName: {
    fontWeight: '600',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  dayNumber: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: 'bold',
  },
});

export default WeekPicker;
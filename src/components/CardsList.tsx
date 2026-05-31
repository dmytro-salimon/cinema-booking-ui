import React, { ReactNode } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import SectionHeader from './SectionHeader';

interface CardsListProps {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'large';
  accessoryType?: 'none' | 'text' | 'icon';
  accessoryText?: string;
  onAccessoryPress?: () => void;
}

const CardsList: React.FC<CardsListProps> = ({ 
  title, 
  children,
  variant,
  accessoryType,
  accessoryText,
  onAccessoryPress
}) => {
  return (
    <View style={styles.container}>
      <SectionHeader 
        title={title} 
        variant={variant}
        accessoryType={accessoryType}
        accessoryText={accessoryText}
        onAccessoryPress={onAccessoryPress}
      />
      <ScrollView 
        horizontal={true} 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingVertical: 8,
    gap: 12,
  },
});

export default CardsList;
import React, { ReactNode, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import SectionHeader from './SectionHeader';

import { ThemeContext } from '../context/ThemeContext';

interface MenuListProps {
  title: string;
  children: ReactNode;
  variant?: 'default' | 'large';
  accessoryType?: 'none' | 'text' | 'icon';
  accessoryText?: string;
  onAccessoryPress?: () => void;
}

const MenuList: React.FC<MenuListProps> = ({ 
  title, 
  children,
  variant,
  accessoryType,
  accessoryText,
  onAccessoryPress
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <SectionHeader 
        title={title} 
        variant={variant}
        accessoryType={accessoryType}
        accessoryText={accessoryText}
        onAccessoryPress={onAccessoryPress}
      />
      <View style={[styles.menuGroup, { backgroundColor: colors.surface }]}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  menuGroup: {
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default MenuList;
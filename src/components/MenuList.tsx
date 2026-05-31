import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import SectionHeader from './SectionHeader';

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
  return (
    <View style={styles.container}>
      <SectionHeader 
        title={title} 
        variant={variant}
        accessoryType={accessoryType}
        accessoryText={accessoryText}
        onAccessoryPress={onAccessoryPress}
      />
      <View style={styles.menuGroup}>
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
    marginTop: 8,
    backgroundColor: '#1F2024',
    borderRadius: 16,
    overflow: 'hidden',
  },
});

export default MenuList;
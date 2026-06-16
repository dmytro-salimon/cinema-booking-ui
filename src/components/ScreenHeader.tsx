import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

import DeleteIcon from '../assets/icons/Delete.svg';
import ArrowLeftIcon from '../assets/icons/Arrow Left.svg';

interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
  leftIcon?: string;
  onLeftPress?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBackPress, leftIcon, onLeftPress }) => {
  const { colors } = useContext(ThemeContext);

  const renderLeftIcon = () => {
    if (leftIcon === 'delete') {
      return <DeleteIcon width={20} height={20} color={colors.text} />;
    }

    if (leftIcon) {
      return <Text style={[styles.customLeftIcon, { color: colors.text }]}>{leftIcon}</Text>;
    }

    return <ArrowLeftIcon width={20} height={20} color={colors.text} />; 
  };

  return (
    <View style={styles.headerContainer}>
      {(onBackPress || onLeftPress) ? (
        <TouchableOpacity onPress={onBackPress || onLeftPress} style={styles.leftButton}>
          {renderLeftIcon()}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  leftButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  customLeftIcon: {
    fontSize: 22,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
    height: 40,
  },
});

export default ScreenHeader;
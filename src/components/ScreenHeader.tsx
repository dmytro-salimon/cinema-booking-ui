import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

interface ScreenHeaderProps {
  title: string;
  onBackPress?: () => void;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ title, onBackPress }) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={styles.headerContainer}>
      {onBackPress ? (
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Text style={styles.backIcon}>‹</Text>
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
  backButton: {
    width: 40,
    justifyContent: 'center',
  },
  backIcon: {
    color: '#006FFD',
    fontSize: 32,
    lineHeight: 32,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
});

export default ScreenHeader;
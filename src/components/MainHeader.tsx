import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

interface MainHeaderProps {
  location?: string;
  onSwapPress?: () => void;
}

const MainHeader: React.FC<MainHeaderProps> = ({ 
  location = 'Київ, вул Коцюбинського 13', 
  onSwapPress 
}) => {
  const { colors } = useContext(ThemeContext);

  return (
    <View style={styles.navBar}>
      <View>
        <Text style={[styles.logoText, { color: colors.text }]}>CineBook</Text>
        <Text style={[styles.locationText, { color: colors.textSecondary }]}>{location}</Text>
      </View>
      <TouchableOpacity style={styles.swapButton} activeOpacity={0.7} onPress={onSwapPress}>
        <Text style={[styles.swapIcon, { color: colors.text }]}>⇅</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  logoText: {
    fontSize: 24,
    fontWeight: '800',
  },
  locationText: {
    fontSize: 12,
    marginTop: 4,
  },
  swapButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapIcon: {
    fontSize: 24,
  },
});

export default MainHeader;
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';

import DeleteIcon from '../assets/icons/Delete.svg';
import ArrowLeftIcon from '../assets/icons/Arrow Left.svg';

interface ScreenHeaderProps {
  title?: string;
  onBackPress?: () => void;
  leftIcon?: string;
  onLeftPress?: () => void;
  style?: StyleProp<ViewStyle>;
  leftButtonStyle?: StyleProp<ViewStyle>;
  iconColor?: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ 
  title = "", 
  onBackPress, 
  leftIcon, 
  onLeftPress,
  style,
  leftButtonStyle,
  iconColor
}) => {
  const { colors } = useContext(ThemeContext);

  const renderLeftIcon = () => {
    const finalIconColor = iconColor || colors.text;

    if (leftIcon === 'delete') {
      return <DeleteIcon width={20} height={20} color={finalIconColor} />;
    }

    if (leftIcon) {
      return <Text style={[styles.customLeftIcon, { color: finalIconColor }]}>{leftIcon}</Text>;
    }

    return <ArrowLeftIcon width={20} height={20} color={finalIconColor} />; 
  };

  return (
    <View style={[styles.headerContainer, style]}>
      {(onBackPress || onLeftPress) ? (
        <TouchableOpacity 
          onPress={onBackPress || onLeftPress} 
          style={[styles.leftButton, leftButtonStyle]}
          activeOpacity={0.8}
        >
          {renderLeftIcon()}
        </TouchableOpacity>
      ) : (
        <View style={styles.placeholder} />
      )}
      
      {!!title && (
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      )}
      
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
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

interface MenuItemProps {
  title: string;
  subtitle?: string;
  detail?: string;
  accessory?: 'none' | 'checkmark' | 'clear' | 'arrow' | 'dropdown' | 'switch';
  isSwitchOn?: boolean;
  onSwitchChange?: (value: boolean) => void;
  onPress?: () => void;
  hasDivider?: boolean;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  subtitle,
  detail,
  accessory = 'none',
  isSwitchOn = false,
  onSwitchChange,
  onPress,
  hasDivider = false,
}) => {
  
  const renderAccessory = () => {
    if (accessory === 'switch') {
      return (
        <Switch
          value={isSwitchOn}
          onValueChange={onSwitchChange}
          trackColor={{ false: '#3E3E42', true: '#006FFD' }}
          ios_backgroundColor="#3E3E42"
        />
      );
    }

    let iconText = '';
    if (accessory === 'checkmark') iconText = '✓';
    if (accessory === 'clear') iconText = '✕';
    if (accessory === 'arrow') iconText = '›';
    if (accessory === 'dropdown') iconText = '⌄';

    if (iconText) {
      return <Text style={styles.icon}>{iconText}</Text>;
    }

    return null;
  };

  const Component = onPress ? TouchableOpacity : View;

  return (
    <Component
      style={[
        styles.container,
        hasDivider && styles.divider
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.leftContent}>
        <Text style={[styles.title, !subtitle && styles.titleNoMargin]}>{title}</Text>
        {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>

      <View style={styles.rightContent}>
        {detail && <Text style={styles.detail}>{detail}</Text>}
        {renderAccessory()}
      </View>
    </Component>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: '#2C2D35',
  },
  leftContent: {
    flex: 1,
    marginRight: 16,
  },
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
  },
  titleNoMargin: {
    marginBottom: 0,
  },
  subtitle: {
    color: '#71727A',
    fontSize: 12,
  },
  detail: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  icon: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuItem;
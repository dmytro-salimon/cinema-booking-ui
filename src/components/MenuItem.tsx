import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

import { ThemeContext } from '../context/ThemeContext';

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
  const { colors, theme } = useContext(ThemeContext);

  const renderAccessory = () => {
    if (accessory === 'switch') {
      return (
        <Switch
          value={isSwitchOn}
          onValueChange={onSwitchChange}
          trackColor={{ false: colors.textSecondary, true: colors.primary }}
          ios_backgroundColor={colors.textSecondary}
        />
      );
    }

    let iconText = '';
    if (accessory === 'checkmark') iconText = '✓';
    if (accessory === 'clear') iconText = '✕';
    if (accessory === 'arrow') iconText = '›';
    if (accessory === 'dropdown') iconText = '⌄';

    if (iconText) {
      return <Text style={[styles.icon, { color: colors.text }]}>{iconText}</Text>;
    }

    return null;
  };

  const Component = onPress ? TouchableOpacity : View;

  const dividerColor = theme === 'dark' ? '#2C2D35' : '#E4E4E5';

  return (
    <Component
      style={[
        styles.container,
        hasDivider && [styles.divider, { borderBottomColor: dividerColor }]
      ]}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.leftContent}>
        <Text style={[styles.title, !subtitle && styles.titleNoMargin, { color: colors.text }]}>
          {title}
        </Text>
        {subtitle && (
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            {subtitle}
          </Text>
        )}
      </View>

      <View style={styles.rightContent}>
        {detail && <Text style={[styles.detail, { color: colors.text }]}>{detail}</Text>}
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
    fontSize: 14,
    marginBottom: 4,
  },
  titleNoMargin: {
    marginBottom: 0,
  },
  subtitle: {
    fontSize: 12,
  },
  detail: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 12,
  },
  icon: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default MenuItem;
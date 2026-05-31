import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SectionHeaderProps {
  title: string;
  variant?: 'default' | 'large';
  accessoryType?: 'none' | 'text' | 'icon';
  accessoryText?: string;
  onAccessoryPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  variant = 'default',
  accessoryType = 'none',
  accessoryText,
  onAccessoryPress,
}) => {
  return (
    <View style={styles.container}>
      <Text style={[
        styles.baseTitle,
        variant === 'default' ? styles.defaultTitle : styles.largeTitle
      ]}>
        {title}
      </Text>

      {accessoryType === 'text' && accessoryText && (
        <TouchableOpacity onPress={onAccessoryPress} activeOpacity={0.7} disabled={!onAccessoryPress}>
          <Text style={styles.accessoryText}>{accessoryText}</Text>
        </TouchableOpacity>
      )}

      {accessoryType === 'icon' && (
        <View style={styles.iconWrapper}>
          <TouchableOpacity style={styles.touchableArea} onPress={onAccessoryPress} activeOpacity={0.7}>
            <View style={styles.iconPlaceholder}>
              <Text style={styles.iconText}>+</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  baseTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  defaultTitle: {
    fontSize: 18,
    letterSpacing: 18 * 0.005,
    lineHeight: 22,
  },
  largeTitle: {
    fontSize: 32,
    letterSpacing: 32 * -0.0069,
  },
  accessoryText: {
    color: '#71727A',
    fontSize: 16,
  },
  iconWrapper: {
    height: 22,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  touchableArea: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: '#FFFFFF',
    fontSize: 18,
    lineHeight: 20,
  }
});

export default SectionHeader;
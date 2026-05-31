import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const PrimaryButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.8}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#006FFD',
    borderRadius: 12,
    paddingVertical: 16,
    marginBottom: 24,
    marginHorizontal: 16,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 12, 
    fontWeight: 'bold',
  },
});

export default PrimaryButton;
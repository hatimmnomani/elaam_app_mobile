import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { prizePageTheme } from '../theme/prizePageTheme';
import { Text } from 'react-native';

const BackNavigationButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.backButton} onPress={onPress}>
      <Text style={styles.buttonText}>Next</Text>
      {/* <BackArrowIcon width={24} height={24} color={prizePageTheme.colors.textOnPrimary} /> */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: prizePageTheme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    ...prizePageTheme.shadows.card,
  },
  buttonText: {
    color: prizePageTheme.colors.textOnPrimary,
    fontSize: prizePageTheme.typography.sizes.body,
    fontWeight: 'bold',
    fontFamily: prizePageTheme.typography.fontFamily,
    textAlign: 'center',
  },
});

export default BackNavigationButton;

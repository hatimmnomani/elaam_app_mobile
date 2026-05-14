import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { prizePageTheme } from '../theme/prizePageTheme';

const PrizePageHeader = ({ headerText }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: prizePageTheme.colors.primary,
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: prizePageTheme.typography.sizes.header,
    fontWeight: prizePageTheme.typography.weights.medium,
    color: prizePageTheme.colors.textOnPrimary,
    fontFamily: prizePageTheme.typography.fontFamily,
    textAlign: 'center',
  },
});

export default PrizePageHeader;

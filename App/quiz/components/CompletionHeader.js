import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { completionTheme } from '../theme/quizTheme';

const CompletionHeader = ({ headerText }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{headerText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'rgba(119, 96, 42, 0.9)', // Semi-transparent to show background image
    width: '100%',
    alignItems: 'center',
  },
  headerText: {
    fontSize: completionTheme.typography.sizes.header,
    fontWeight: completionTheme.typography.weights.medium,
    color: completionTheme.colors.textOnPrimary,
    fontFamily: completionTheme.typography.fontFamily,
    textAlign: 'center',
    ...(completionTheme.typography.textStyles?.heading || {
      includeFontPadding: false,
      textAlignVertical: 'center',
    }), // Prevent cropping with fallback
  },
});

export default CompletionHeader;

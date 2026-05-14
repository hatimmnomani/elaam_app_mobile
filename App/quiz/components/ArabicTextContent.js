import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {prizePageTheme} from '../theme/prizePageTheme';

const ArabicTextContent = ({content}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.contentText}>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 20,
    marginVertical: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: prizePageTheme.borderRadius.section,
    ...prizePageTheme.shadows.card,
  },
  contentText: {
    fontSize: prizePageTheme.typography.sizes.body,
    fontWeight: prizePageTheme.typography.weights.medium,
    color: prizePageTheme.colors.text,
    fontFamily: prizePageTheme.typography.fontFamily,
    textAlign: 'right',
    lineHeight: 32,
    writingDirection: 'rtl',
  },
});

export default ArabicTextContent;
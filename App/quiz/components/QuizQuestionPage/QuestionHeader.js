import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color, font } from '../../../constants';
import { quizTheme } from '../../theme/quizTheme';

const QuestionHeader = ({ title = 'سوال' }) => {
  return (
    <LinearGradient
      colors={[quizTheme.colors.primary, quizTheme.colors.primary]}
      style={styles.headerContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Text style={styles.headerText}>{title}</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 47,
    overflow: 'hidden',
  },
  headerText: {
    fontSize: quizTheme.typography.sizes.header,
    fontWeight: '500',
    color: Color.white,
    textAlign: 'center',
    textAlignVertical: 'center', // Android vertical centering
    lineHeight: 47, // match container height to avoid clipping/pushing
    writingDirection: 'rtl',
    fontFamily: quizTheme.typography.fontFamily,
    includeFontPadding: false, // reduce extra top padding on Android
  },
});

export default QuestionHeader;

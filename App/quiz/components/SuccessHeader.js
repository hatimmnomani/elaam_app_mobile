import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { quizTheme } from '../theme/quizTheme';
import SuccessCheckmarkIcon from './icons/SuccessCheckmarkIcon';
import Success from '../assets/Success';
import { QuestionHeader } from './QuizQuestionPage';
import { appScreen } from '../../utils/responsive/SizeUtil';
import { mockQuizResultData } from '../quizResultMockData';

const SuccessHeader = ({
  headerText,
  correctAnswerText,
  websiteUrl,
  isCorrect = true,
}) => {
  return (
    <View style={styles.container}>
      {/* Header with brown background */}
      <View style={[styles.headerContainer]}>
        <QuestionHeader title={mockQuizResultData.headerText} />
      </View>

      {/* Success icon */}
      <View style={styles.iconContainer}>
        <Image
          source={
            isCorrect
              ? require('../assets/success_img.png')
              : require('../assets/wrong_sign.png')
          }
          style={{ width: 70, height: 70, overflow: 'hidden' }}
          resizeMode="contain"
        />
      </View>

      {/* Correct answer section */}
      <View style={styles.answerContainer}>
        <Text style={styles.correctAnswerText}>
          {mockQuizResultData.sahe_jwab}
        </Text>
        <Text style={styles.websiteText}>{correctAnswerText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: appScreen.width,
  },
  headerContainer: {
    backgroundColor: quizTheme.colors.primary,
    width: '100%',
    alignItems: 'center',
    height: 47,
  },
  headerContainerWrong: {
    backgroundColor: '#B00020',
  },
  headerText: {
    fontSize: quizTheme.typography.sizes.header,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.textOnPrimary,
    fontFamily: quizTheme.typography.fontFamily,
    textAlign: 'center',
    ...(quizTheme.typography.textStyles?.heading || {
      includeFontPadding: false,
      textAlignVertical: 'center',
    }), // Prevent cropping with fallback
  },
  iconContainer: {
    overflow: 'hidden',
  },
  answerContainer: {
    backgroundColor: quizTheme.colors.contentBackground, // Standardized background
    paddingHorizontal: 16,
    borderRadius: quizTheme.borderRadius.section,
    marginHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    width: appScreen.width - 40,
    ...quizTheme.shadows.content, // Standardized shadow
  },
  correctAnswerText: {
    fontSize: quizTheme.typography.sizes.header,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.text,
    fontFamily: quizTheme.typography.fontFamily,
    textAlign: 'center',
    ...(quizTheme.typography.textStyles?.heading || {
      includeFontPadding: false,
      textAlignVertical: 'center',
    }), // Prevent cropping with fallback
  },
  websiteText: {
    fontSize: quizTheme.typography.sizes.header,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.text,
    fontFamily: quizTheme.typography.fontFamily,
    textAlign: 'center',
    marginBottom: 10,
    ...(quizTheme.typography.textStyles?.body || {
      includeFontPadding: false,
      textAlignVertical: 'center',
    }), // Prevent cropping with fallback
  },
});

export default SuccessHeader;

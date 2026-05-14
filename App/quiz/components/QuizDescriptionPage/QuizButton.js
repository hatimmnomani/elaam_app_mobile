import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color, font } from '../../../../App/constants';
import { quizTheme } from '../../theme/quizTheme';

const QuizButton = ({ onPress, style }) => {
  return (
    <Pressable
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      android_ripple={{ color: Color.titleColor }}
    >
      <LinearGradient
        colors={[Color.quizColor, Color.titleColor]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.gradientTextContainer}>
          <Text style={styles.buttonText}>Quiz</Text>
          <Text style={styles.separator}>{'  '}</Text>
          <Text style={styles.buttonTextArabic}>مسابقة</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    height: 52,
  },
  gradient: {
    // Ensure the text group is perfectly centered inside the button
    paddingHorizontal: 24,
    minHeight: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 32,
    fontWeight: '500',
    color: Color.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    writingDirection: 'ltr',
    includeFontPadding: false,
    fontFamily: quizTheme.typography.fontFamily,
  },
  buttonTextArabic: {
    fontSize: 32,
    fontWeight: '500',
    color: Color.white,
    textAlign: 'center',
    textAlignVertical: 'center',
    writingDirection: 'rtl',
    includeFontPadding: false,
    fontFamily: quizTheme.typography.fontFamily,
  },
  gradientTextContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    width: 8,
  },
});

export default QuizButton;

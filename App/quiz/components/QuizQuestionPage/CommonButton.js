// App/quiz/components/QuizQuestionPage/CommonButton.js
import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from '../../../constants';

const CommonButton = ({ text, onPress, isBackButton = false, style }) => {
  return (
    <Pressable
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      android_ripple={{ color: Color.titleColor }}
    >
      <LinearGradient
        colors={
          isBackButton
            ? [Color.SatoimoBrown, Color.titleColor]
            : [Color.SatoimoBrown, Color.titleColor]
        }
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text style={styles.buttonText}>{text}</Text>
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 175,
    height: 51,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: Color.white,
    textAlign: 'center',
  },
});

export default CommonButton;

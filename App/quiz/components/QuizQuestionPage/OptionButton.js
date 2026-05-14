import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from '../../../constants';
import { quizTheme } from '../../theme/quizTheme';

const OptionButton = ({ text, onPress, isSelected = false, style }) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.buttonContainer,
        isSelected && styles.selectedButton,
        pressed && styles.pressedButton,
        style,
      ]}
      onPress={onPress}
      android_ripple={{ color: Color.titleColor }}
    >
      <LinearGradient
        colors={
          isSelected
            ? [Color.ActivityColorLoader, Color.ActivityColorLoader]
            : [Color.quizColor, Color.titleColor, Color.quizColor]
        }
        style={[styles.gradient, isSelected && styles.selectedGradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Text
          style={[styles.buttonText, isSelected && styles.selectedText]}
          numberOfLines={3}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
        >
          {text}
        </Text>
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
    marginVertical: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    maxWidth: '90%', // Limit width to prevent overflow
    alignSelf: 'center', // Center the button
    minWidth: 120, // Minimum width for small text
  },
  selectedButton: {
    borderColor: Color.titleColor,
    elevation: 5,
    shadowColor: Color.titleColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 4.84,
  },
  pressedButton: {
    opacity: 0.8,
  },
  gradient: {
    flexDirection: 'row', // Ensure proper layout direction
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    paddingHorizontal: 16, // Add horizontal padding
    paddingVertical: 12, // Add vertical padding
    width: '100%', // Ensure gradient takes full width of container
  },
  selectedGradient: {
    borderWidth: 0,
  },
  buttonText: {
    // Typography per spec
    fontFamily: quizTheme.typography.fontFamily,
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: 24,
    // lineHeight: 24, // 100%
    letterSpacing: 0,
    color: Color.welcomePageButtonColor,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    writingDirection: 'rtl',
    flex: 1, // Allow text to take available space
    flexWrap: 'wrap', // Wrap text if too long
    maxWidth: '100%', // Prevent text from exceeding button width
    paddingHorizontal: 8, // Add some padding for better text layout
  },
  selectedText: {},
});

export default OptionButton;

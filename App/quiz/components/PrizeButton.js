import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { quizTheme } from '../theme/quizTheme';

const PrizeButton = ({ prizeDescription, buttonText, onPress }) => {
  return (
    <View style={styles.container}>
      {/* Prize description */}
      <Text style={styles.descriptionText}>{prizeDescription}</Text>

      {/* Prize button with gradient */}
      <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
        <LinearGradient
          colors={[
            quizTheme.colors.gradient.start,
            quizTheme.colors.gradient.middle1,
            quizTheme.colors.gradient.middle2,
            quizTheme.colors.gradient.end,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradientButton}
        >
          <Text style={styles.buttonText}>{buttonText}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: quizTheme.colors.contentBackground, // Standardized background
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: quizTheme.borderRadius.section,
    ...quizTheme.shadows.content, // Standardized shadow
    alignItems: 'center',
  },
  descriptionText: {
    fontFamily: quizTheme.typography.fontFamily,
    fontWeight: quizTheme.typography.weights.medium,
    fontSize: quizTheme.typography.sizes.body,
    lineHeight: quizTheme.typography.sizes.body * 1.5, // Standardized line height
    color: quizTheme.colors.text,
    textAlign: 'center',
    textAlignVertical: 'center',
    ...(quizTheme.typography.textStyles?.body || {
      includeFontPadding: false,
      textAlignVertical: 'center',
      lineHeight: 24,
    }), // Prevent cropping with fallback
    marginBottom: 20,
    writingDirection: 'rtl',
  },
  buttonContainer: {
    borderRadius: quizTheme.borderRadius.button,
    overflow: 'hidden',
    ...quizTheme.shadows.buttonInset,
  },
  gradientButton: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: quizTheme.borderRadius.button,
    minWidth: 300,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: quizTheme.typography.sizes.body,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.text,
    fontFamily: quizTheme.typography.fontFamily,
    textAlign: 'center',
    textAlignVertical: 'center',
    ...(quizTheme.typography.textStyles?.body || {
      includeFontPadding: false,
      textAlignVertical: 'center',
      lineHeight: 32,
    }), // Prevent cropping with fallback
  },
});

export default PrizeButton;

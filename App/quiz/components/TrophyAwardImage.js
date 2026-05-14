import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import { completionTheme } from '../theme/completionTheme';

const TrophyAwardImage = ({
  imageSource,
  overlayText,
  textPosition = 'center', // 'top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center', 'center'
  textStyle = {},
}) => {
  const getTextPositionStyle = () => {
    switch (textPosition) {
      case 'top-left':
        return { top: 20, left: 20, textAlign: 'left' };
      case 'top-right':
        return { top: 20, right: 20, textAlign: 'right' };
      case 'top-center':
        return {
          top: 20,
          left: '50%',
          transform: [{ translateX: -50 }],
          textAlign: 'center',
        };
      case 'bottom-left':
        return { bottom: 20, left: 20, textAlign: 'left' };
      case 'bottom-right':
        return { bottom: 20, right: 20, textAlign: 'right' };
      case 'bottom-center':
        return {
          bottom: 20,
          left: '50%',
          transform: [{ translateX: -50 }],
          textAlign: 'center',
        };
      case 'center':
      default:
        return {
          top: '50%',
          left: '50%',
          transform: [{ translateX: -50 }, { translateY: -50 }],
          textAlign: 'center',
        };
    }
  };

  return (
    <View style={styles.imageContainer}>
      <Image source={imageSource} style={styles.image} resizeMode="contain" />

      {/* Text Overlay */}
      {overlayText && (
        <View style={[styles.textOverlay, getTextPositionStyle()]}>
          <Text style={[styles.overlayText, textStyle]}>{overlayText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: completionTheme.borderRadius.image,
    overflow: 'hidden',
    ...completionTheme.shadows.card,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: completionTheme.borderRadius.image,
  },
  textOverlay: {
    position: 'absolute',
    backgroundColor: 'transparent', // Changed from 'rgba(0, 0, 0, 0.6)' to transparent
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    minWidth: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: '#FFD700',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: completionTheme.typography.fontFamily,
    ...(completionTheme.typography.textStyles?.body || {
      includeFontPadding: false,
      textAlignVertical: 'center',
      lineHeight: 24,
    }), // Prevent cropping with fallback
  },
});

export default TrophyAwardImage;

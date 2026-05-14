/**
 * Unified Theme Configuration for Quiz Application
 * Contains shared and screen-specific theme configurations
 */

import { Platform } from 'react-native';

// Shared theme constants
const sharedColors = {
  primary: '#77602a', // Brown border color
  secondary: '#977931', // Gold text color
  success: '#00C853', // Green checkmark color
  background: '#f5f5f5', // Light background
  surface: 'rgba(255, 255, 255, 0.9)', // Semi-transparent card background (increased opacity)
  text: '#000000', // Black text
  textOnPrimary: '#ffffff', // White text on primary background
  shadow: 'rgba(0, 0, 0, 0.25)', // Shadow color
  linkBlue: '#001dac', // Blue color for website links
  // Standardized background colors for consistency
  cardBackground: 'rgba(255, 255, 255, 0.9)', // High opacity for better readability
  contentBackground: 'rgba(255, 255, 255, 0.8)', // Medium opacity for content sections
  overlayBackground: 'rgba(255, 255, 255, 0.95)', // High opacity for overlays
};

const sharedTypography = {
  fontFamily: Platform.OS === 'ios' ? 'FatemiMaqala-Regular' : 'fatemiregular', // Custom Arabic font family (must match the actual font PostScript name)
  weights: {
    medium: '500',
    bold: 'bold',
  },
  // Standardized text styles to prevent cropping
  textStyles: {
    heading: {
      includeFontPadding: false,
      textAlignVertical: 'center',
    },
    body: {
      includeFontPadding: false,
      textAlignVertical: 'center',
      // lineHeight: 24,
    },
    caption: {
      includeFontPadding: false,
      textAlignVertical: 'center',
      lineHeight: 20,
    },
  },
};

const sharedShadows = {
  card: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 4,
  },
  buttonInset: {
    shadowColor: '#77602a',
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 4,
  },
  // Standardized shadow for consistent UI
  content: {
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 8,
    // elevation: 3,
  },
};

// Screen-specific themes
export const quizTheme = {
  colors: {
    ...sharedColors,
    gradient: {
      start: '#b48811',
      middle1: '#a2790d',
      middle2: '#bb9b49',
      end: '#b48811',
    },
  },
  typography: {
    ...sharedTypography,
    sizes: {
      header: 32,
      body: 24,
      subtitle: 32,
      title: 48,
    },
  },
  spacing: {
    small: 24,
    medium: 30,
    large: 50,
  },
  borderRadius: {
    card: 30,
    section: 50,
    button: 46,
  },
  shadows: sharedShadows,
};

export const prizePageTheme = {
  colors: {
    ...sharedColors,
    primary: '#77602a', // Brown border and header color
    linkBlue: '#001dac', // Blue color for website links
  },
  typography: {
    ...sharedTypography,
    sizes: {
      header: 32,
      body: 22,
      subtitle: 24,
      link: 20,
    },
  },
  spacing: {
    small: 16,
    medium: 24,
    large: 50,
  },
  borderRadius: {
    card: 30,
    section: 50,
    image: 30,
  },
  shadows: sharedShadows,
};

export const completionTheme = {
  colors: {
    ...sharedColors,
    primary: '#a2790d', // Darker brown for completion screen
  },
  typography: {
    ...sharedTypography,
    fontFamily:
      Platform.OS === 'ios' ? 'FatemiMaqala-Regular' : 'fatemiregular', // Custom Arabic font family (must match the actual font PostScript name)
    sizes: {
      header: 32,
      body: 24,
      button: 32,
    },
  },
  spacing: {
    small: 16,
    medium: 24,
    large: 50,
  },
  borderRadius: {
    card: 30,
    section: 31,
    image: 31,
  },
  shadows: sharedShadows,
};

// Default export for backward compatibility
export default quizTheme;

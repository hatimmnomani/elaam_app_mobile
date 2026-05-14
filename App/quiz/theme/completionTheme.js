import { Platform } from 'react-native';

// React Native theme configuration for Arabic/Urdu completion screen
export const completionTheme = {
  colors: {
    primary: '#a2790d', // Brown border and header color
    secondary: '#977931', // Gold text color
    background: '#f5f5f5', // Light background
    surface: 'rgba(255, 255, 255, 0.8)', // Semi-transparent card background
    text: '#000000', // Black text
    textOnPrimary: '#ffffff', // White text on primary background
    shadow: 'rgba(0, 0, 0, 0.25)', // Shadow color
    // Standardized background colors for consistency
    cardBackground: 'rgba(255, 255, 255, 0.9)', // High opacity for better readability
    contentBackground: 'rgba(255, 255, 255, 0.8)', // Medium opacity for content sections
    overlayBackground: 'rgba(255, 255, 255, 0.95)', // High opacity for overlays
  },
  typography: {
    fontFamily:
      Platform.OS === 'ios' ? 'FatemiMaqala-Regular' : 'fatemiregular', // Custom Arabic font family (must match the actual font PostScript name)
    sizes: {
      header: 32,
      body: 24,
      button: 32,
    },
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
        lineHeight: 32,
      },
      caption: {
        includeFontPadding: false,
        textAlignVertical: 'center',
        lineHeight: 20,
      },
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
  shadows: {
    card: {
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 4 },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 4,
    },
    // Standardized shadow for consistent UI
    content: {
      // shadowColor: '#000',
      // shadowOffset: { width: 0, height: 2 },
      // shadowOpacity: 0.1,
      // shadowRadius: 8,
      // elevation: 3,
    },
  },
};

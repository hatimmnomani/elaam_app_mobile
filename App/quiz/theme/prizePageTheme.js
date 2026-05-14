import { Platform } from 'react-native';

// React Native theme configuration for Arabic/Urdu prize page screen
export const prizePageTheme = {
  colors: {
    primary: '#77602a', // Brown border and header color
    secondary: '#977931', // Gold text color
    background: '#f5f5f5', // Light background
    surface: 'rgba(255, 255, 255, 0.8)', // Semi-transparent card background
    text: '#000000', // Black text
    textOnPrimary: '#ffffff', // White text on primary background
    linkBlue: '#001dac', // Blue color for website link
    shadow: 'rgba(0, 0, 0, 0.25)', // Shadow color
  },
  typography: {
    fontFamily:
      Platform.OS === 'ios' ? 'FatemiMaqala-Regular' : 'fatemiregular', // Custom Arabic font family (must match the actual font PostScript name)
    sizes: {
      header: 32,
      body: 22,
      subtitle: 24,
      link: 20,
    },
    weights: {
      medium: '500',
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
  shadows: {
    card: {
      // shadowColor: '#000',
      // shadowOffset: {
      //   width: 0,
      //   height: 4,
      // },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 4,
    },
  },
};

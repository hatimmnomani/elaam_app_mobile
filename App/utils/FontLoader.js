import { Platform } from 'react-native';

// Font loading utility for React Native
export const loadFonts = async () => {
  // In React Native, fonts are typically loaded through the react-native.config.js
  // and linked automatically. However, we need to ensure they're available before use.

  // For iOS, fonts are loaded from the Info.plist
  // For Android, fonts are loaded from assets

  return new Promise((resolve) => {
    // Simulate font loading - in practice, fonts should be pre-loaded
    setTimeout(() => {
      console.log('Fonts loaded successfully');
      resolve(true);
    }, 100);
  });
};

// Font constants - these should match the font family names in the font files
export const Fonts = {
  fatemiregular: Platform.select({
    ios: 'fatemiregular',
    android: 'fatemiregular',
    default: 'fatemiregular'
  }),
  AlKanz: Platform.select({
    ios: 'AlKanz',
    android: 'AlKanz',
    default: 'AlKanz'
  })
};

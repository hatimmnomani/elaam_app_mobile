import React, { useEffect } from 'react';
import { Platform, Alert } from 'react-native';
import RNScreenshotPrevent, {
  addListener,
} from 'react-native-screenshot-prevent';
import { showAlert } from '../../common/CustomAlert';

const SecureScreen = ({ children }) => {
  useEffect(() => {
    // Enable screenshot prevention
    RNScreenshotPrevent.enabled(true);

    // Enable secure view for iOS 13+
    if (Platform.OS === 'ios' && !__DEV__) {
      RNScreenshotPrevent.enableSecureView();
    }

    // Add screenshot detection listener
    const subscription = addListener(() => {
      showAlert({
        title: 'Warning',
        message:
          'Capturing screenshots is not allowed during the quiz for security reasons.',
        confirmText: 'I Understand',
      });
    });

    // Clean up
    return () => {
      // Disable screenshot prevention
      RNScreenshotPrevent.enabled(false);

      // Disable secure view for iOS
      if (Platform.OS === 'ios' && !__DEV__) {
        RNScreenshotPrevent.disableSecureView();
      }

      // Remove screenshot detection listener
      if (subscription && subscription.remove) {
        subscription.remove();
      }
    };
  }, []);

  return children;
};

export default SecureScreen;

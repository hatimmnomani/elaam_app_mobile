import { PermissionsAndroid, Platform } from 'react-native';
import Config from 'react-native-config';

/**
 * Checks if the app is running in production environment
 * @returns {boolean} - True if running in production, false otherwise
 */
export const isProductionEnvironment = () => {
  return Config.API_URL && Config.API_URL.includes('prod');
};

export const formatRoleName = role => {
  if (!role) return role;

  if (role === 'Aamil') {
    return 'Aamil Saheb';
  } else if (role === 'Muavin Aamil') {
    return 'Muawin Aamil Saheb';
  } else if (role === 'Khidmat Ramadaniyah') {
    return 'Khidmat Ramadaniyah';
  }
  return role;
};

export const hasNotificationPermission = async dispatch => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
  }
};

import {
  Alert,
  BackHandler,
  Linking,
  NativeModules,
  Platform,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {showAlert} from '../common/CustomAlert';
import httpClient from './httpClients';
import {MyConsole} from './MyConsole';
import RNExitApp from 'react-native-exit-app';

const {AppUpdateModule} = NativeModules;

const isNewerVersion = (oldVer, newVer) => {
  const oldParts = oldVer.split('.');
  const newParts = newVer.split('.');
  for (var i = 0; i < newParts.length; i++) {
    const a = ~~newParts[i]; // parse int
    const b = ~~oldParts[i]; // parse int
    MyConsole.log('new part is ========= ' + a);
    MyConsole.log('old part is ========= ' + b);
    if (a > b) {
      return true;
    }
    if (a < b) {
      return false;
    }
  }
  return false;
};

const showUpdateDialog = (platform, link) => {
  // Alert.alert(
  //   'Update App',
  //   `}`,
  //   [
  //     {
  //       text: 'OK',
  //       onPress: () => Linking.openURL(link),
  //     },
  //   ],
  // );

  showAlert({
    header: 'New Version Available',
    title: `There is a newer version available for download! Please update the app by visiting the ${platform}`,
    alertType: 'success',
    onPress: async () => {
      Linking.openURL(link);
      RNExitApp.exitApp();
      return true;
    },
  });
};

export const isUpdateAvailable = async () => {
  MyConsole.log('OLD VERSION');

  // if (__DEV__) {
  //   return false;
  // }
  try {
    if (Platform.OS === 'ios') {
      const iosResult = await httpClient.get(
        'https://itunes.apple.com/us/lookup?bundleId=com.elaam.niyat',
      );
      MyConsole.log('iosResult', iosResult.data.results[0].version);
      const oldVersion = DeviceInfo.getVersion();
      MyConsole.log('OLD VERSION', oldVersion);
      if (isNewerVersion(oldVersion, iosResult.data.results[0].version)) {
        showUpdateDialog(
          'Apple Store',
          'itms-apps://itunes.apple.com/app/id1613886118',
        );
        return true;
      } else {
        return false;
      }
    } else {
      const result = await AppUpdateModule.checkForUpdate();
      MyConsole.log('AppUpdateModule result', result);
      if (result) {
        showUpdateDialog(
          'Play Store',
          'https://play.google.com/store/apps/details?id=com.elaam.niyat',
        );
      }
      return result;
    }
  } catch (err) {
    MyConsole.log('AppUpdateModule err', err);
    return false;
  }
};

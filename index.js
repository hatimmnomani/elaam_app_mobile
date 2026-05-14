/* eslint-disable no-alert */
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import App from './App';
import { name as appName } from './app.json';
import { MyConsole } from './App/utils/MyConsole';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  MyConsole.log('Message handled in the background!', remoteMessage);
  // alert('BACKGROUND', JSON.stringify(remoteMessage));
});
AppRegistry.registerComponent(appName, () => App);

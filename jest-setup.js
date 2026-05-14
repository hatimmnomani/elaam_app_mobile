/* eslint-disable no-undef */
import 'react-native-gesture-handler/jestSetup';
import 'rn-fetch-blob';
import '@react-native-community/push-notification-ios';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
//jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
//jest.mock('NativeAnimatedHelper');
//jest.mock('NativeAnimatedHelp');

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);

// import mockRNLocalization from './__mocks__/react-native-localization-mock';

// jest.mock('react-native-localization', () => mockRNLocalization);
const mock = jest.requireMock('react-native-reanimated');
jest.mock('react-native-reanimated', () => ({
  ...mock,
  useSharedValue: jest.fn().mockReturnValue(0),
  useAnimatedStyle: jest.fn().mockReturnValue({}),
  useAnimatedScrollHandler: jest.fn().mockReturnValue({}),
  createAnimatedComponent: component => jest.fn().mockReturnValue(component),
  __reanimatedWorkletInit: jest.fn(),
  ScrollView: 'ScrollView',
}));

// ...
jest.mock('rn-fetch-blob', () => {
  return () => ({
    fs: jest.fn(),
    config: jest.fn(),
    DocumentDir: jest.fn(),
  });
});
jest.mock('@react-native-community/push-notification-ios', () => {
  return {
    addEventListener: jest.fn(),
    requestPermissions: jest.fn(() => Promise.resolve()),
    getInitialNotification: jest.fn(() => Promise.resolve()),
  };
});
jest.mock('@react-native-firebase/messaging', () => {
  return () => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve('myMockToken')),
    onMessage: jest.fn(),
    onNotificationOpenedApp: jest.fn(),
    getInitialNotification: jest.fn(() => Promise.resolve(false)),
  });
});

jest.mock('@react-native-firebase/app', () => {
  return () => ({
    onNotification: jest.fn(),
    onNotificationDisplayed: jest.fn(),
  });
});
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});
//@ts-expect-error
global.__reanimatedWorkletInit = jest.fn();

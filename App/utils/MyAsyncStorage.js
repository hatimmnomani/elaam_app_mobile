import * as Keychain from 'react-native-keychain';
import { MyConsole } from './MyConsole';

/* eslint-disable prettier/prettier */
export const MyAsyncStorage = {
  setItem: async (key, value) => {
    try {
      await Keychain.setGenericPassword(key, value, {
        service: key, // acts like a namespace
      });
    } catch (err) {
      MyConsole.log('error while setItem ' + key, err);
    }
  },

  getItem: async key => {
    try {
      const credentials = await Keychain.getGenericPassword({ service: key });
      return credentials ? credentials.password : '';
    } catch (err) {
      MyConsole.log('error while getItem ' + key, err);
      return '';
    }
  },

  removeItem: async key => {
    try {
      await Keychain.resetGenericPassword({ service: key });
    } catch (err) {
      MyConsole.log('error while removeItem ' + key, err);
    }
  },
};

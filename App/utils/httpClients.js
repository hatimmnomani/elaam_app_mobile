/* eslint-disable no-unused-vars */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Config from 'react-native-config';
import { urls } from '../constants/string';
import * as RootNavigation from '../navigation/Navigators';
import { loading } from '../redux/LoaderAction';
import { store } from '../redux/Store';
import { MyAsyncStorage } from './MyAsyncStorage';
import { MyConsole } from './MyConsole';

const axiosInstace = axios.create({
  baseURL: Config.API_URL,
  // adapter: fetchAdapter
});
const { dispatch } = store;
axiosInstace.interceptors.request.use(
  async config => {
    dispatch(loading(true));
    const token = await MyAsyncStorage.getItem('userToken');
    if (token) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    MyConsole.log('config.headers', config);
    return config;
  },
  error => {
    MyConsole.log('base error', error.response);
    dispatch(loading(false));
    return Promise.reject(error);
  },
);

const refreshAuthLogic = async failedRequest => {
  const id_token = await MyAsyncStorage.getItem('IdToken');
  const refreshToken = await MyAsyncStorage.getItem('refreshToken');
  const itsid = await MyAsyncStorage.getItem('itsid');
  MyConsole.log('id_token', id_token);
  MyConsole.log('refreshToken', refreshToken);
  const data = {
    isMumin: false,
    itsId: itsid,
    refreshToken: refreshToken,
  };
  MyConsole.log('data', data);
  const options = {
    method: 'POST',
    data,
    url: Config.API_URL + urls.USER_REFRESH_TOKEN,
  };

  try {
    const tokenRefreshResponse = await axios(options);
    failedRequest.response.config.headers.Authorization =
      'Bearer ' + tokenRefreshResponse.data.token;
    await MyAsyncStorage.setItem('userToken', tokenRefreshResponse.data.token);
    MyConsole.log('tokenRefreshResponse', tokenRefreshResponse);
    await MyAsyncStorage.setItem(
      'refreshToken',
      tokenRefreshResponse.data.refreshToken,
    );
    return await Promise.resolve();
  } catch (e) {
    if (e?.response?.status === 400) {
      MyAsyncStorage.removeItem('accessToken');
      RootNavigation.reset('Authentication');
      MyAsyncStorage.removeItem('refreshToken');
    }
    MyAsyncStorage.removeItem('IdToken');
  }
};

createAuthRefreshInterceptor(axiosInstace, refreshAuthLogic, {});

var islogedIn = true;
axiosInstace.interceptors.response.use(
  async response => {
    // MyConsole.log('response', response);
    dispatch(loading(false));
    return response;
  },
  error => {
    // if (error.response.data.message) {
    //   Alert.alert('', error.response.data.message);
    // }
    // MyConsole.log('baseerror response', error);
    // MyConsole.log('baseerror response', error.response.status);
    // if (error.response && error.response.status === 401) {
    //   //MyAsyncStorage.removeItem('accessToken');
    //   // navigation.navigate('AuthStack');

    //   MyAsyncStorage.removeItem('isLogin');
    //   MyAsyncStorage.removeItem('IdToken');
    //   MyAsyncStorage.removeItem('userToken');
    //   if (islogedIn) {
    //     islogedIn = false;
    //     showAlert({
    //       // header: 'Alert',
    //       title: 'Session Expired',
    //       //alertType: 'warning',
    //       // onPress: () => {
    //       //   MyConsole.log('BackHandler.exitApp');
    //       // },
    //     });
    //     // alert('Session Expired', [
    //     //   {
    //     //     text: 'Yes',
    //     //     onPress: () => {
    //     //       islogedIn = false;
    //     //     },
    //     //     style: 'cancel',
    //     //   },
    //     //   // {text: 'YES', onPress: () => BackHandler.exitApp()},
    //     // ]);
    //     reset('Auth', {});
    //     //RootNavigation.navigate('Authentication');
    //     // RootNavigation.reset({
    //     //   index: 0,
    //     //   routes: [
    //     //     {
    //     //       name: 'Authentication',
    //     //       state: {
    //     //         routes: [
    //     //           {
    //     //             name: 'ITSLOGIN',
    //     //           },
    //     //         ],
    //     //       },
    //     //     },
    //     //   ],
    //     // });
    //   }
    // } else {
    //   islogedIn = true;
    // }

    MyConsole.log('baseerror', error.response);
    dispatch(loading(false));
    return Promise.reject(error);
  },
);

const httpClient = axiosInstace;
//httpClient.defaults.timeout = 5000;
export default httpClient;

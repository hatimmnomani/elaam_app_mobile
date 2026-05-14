import CookieManager from '@react-native-cookies/cookies';
import { jwtDecode } from 'jwt-decode';
import { Platform } from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import { showAlert } from '../common/CustomAlert';
import { string } from '../constants';
import { ReduxActionCreators } from '../redux/ActionsCreators';
import { loading } from '../redux/LoaderAction';
import Notification from '../services/notification';
import httpClient from '../utils/httpClients';
import { MyAsyncStorage } from '../utils/MyAsyncStorage';
import { MyConsole } from '../utils/MyConsole';
// import 'core-js/stable/atob';
class AuthService {
  static login(values) {
    let config = {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
      },
    };
    return httpClient.post('/authenticate', values, config);
  }
  static getlogindetail(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.get('/api/getMuminLoginDetails?itsId=' + values, config);
  }
}

export default AuthService;
export const Authenticate = (params, navigation) => async dispatch => {
  MyConsole.log('Authenticate.clearAll =>');
  try {
    const { data, config } = await AuthService.login(params);
    MyConsole.log('Authenticate', data);
    await MyAsyncStorage.setItem('userToken', data.token);
    await MyAsyncStorage.setItem('IdToken', data.token);
    await MyAsyncStorage.setItem('refreshToken', data.refreshToken);
    dispatch(checkUserType(data.token, navigation));
  } catch (error) {
    CookieManager.get('https://auth.its52.com').then(cookies => {
      MyConsole.log('CookieManager.get =>', cookies);
    });
    CookieManager.clearAll().then(success => {
      MyConsole.log('CookieManager.clearAll =>', success);
    });
    // flush cookies (ANDROID ONLY)
    CookieManager.flush().then(success => {
      MyConsole.log('CookieManager.flush =>', success);
    });
    CookieManager.removeSessionCookies().then(sessionCookiesRemoved => {
      MyConsole.log(
        'CookieManager.removeSessionCookies =>',
        sessionCookiesRemoved,
      );
    });
    if (error.response && error.response.data) {
      showAlert({ title: error.response.data.message });
    }
  }
};

export const checkUserType = (token, navigation, mDetail) => async dispatch => {
  MyConsole.log('decode checkuser', token);
  try {
    const decoded = jwtDecode(token);
    MyConsole.log('decode value', decoded);
    MyConsole.log('decode value', decoded.Roles[0].authority);
    MyConsole.log('decode valure', decoded.sub);
    dispatch(ReduxActionCreators.token_Decode(decoded));
    await MyAsyncStorage.setItem('itsid', decoded.sub);
    dispatch(pushToken(decoded.sub, navigation, 'login'));
    await MyAsyncStorage.setItem('decode', JSON.stringify(decoded));
    navigation.navigate(string.LaunchScreen);
    // navigation.navigate(string.Quiz);
  } catch (error) {
    MyConsole.log('decode value', error);
  }
};
export const handleOneLogin = (url, navigation) => async dispatch => {
  const code_verifier = await MyAsyncStorage.getItem('codeVerifier');
  var regex = /[?#]([^=#]+)=([^&#]*)/g,
    params = {},
    match;
  while ((match = regex.exec(url))) {
    params[match[1]] = match[2];
  }
  MyConsole.log('params', params.code);

  var code = params.code;
  //MyConsole.log('getToken code', code);
  var formdata = new FormData();
  formdata.append('client_id', Config.CLIENT_ID);
  formdata.append('client_secret', Config.SECRET_ID);
  const newLocal = 'grant_type';
  formdata.append(newLocal, 'authorization_code');
  formdata.append('redirect_uri', 'com.elaam.niyat://loggedin');
  formdata.append('code', code);
  formdata.append('code_verifier', code_verifier);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow',
  };

  fetch(Config.ITS_URL + '/connect/token', requestOptions)
    .then(response => response.json())
    .then(result => {
      MyConsole.log('result', result);
      dispatch(ReduxActionCreators.modalwebview(false));
      dispatch(loading(false));
      const values = {
        data: result.id_token,
        token: 'mobile-app',
      };
      // await MyAsyncStorage.setItem('itsid', ITSID);

      dispatch(Authenticate(values, navigation));
      MyConsole.log('result.id_token', result.id_token);
    })
    .catch(error => MyConsole.log('error', error));
};
export const pushToken = (itsId, navigation, type) => async dispatch => {
  try {
    const fcmTokenn = await MyAsyncStorage.getItem('fcmToken');
    const deviceIP = await MyAsyncStorage.getItem('deviceIP');
    let deviceName = await DeviceInfo.getDeviceName();

    let brand = DeviceInfo.getBrand();
    const values = {
      deviceBrand: brand,
      deviceName: deviceName,
      itsId: itsId,
      pushToken: type === 'login' ? fcmTokenn : 'FCM TOKEN',
      deviceVersion: DeviceInfo.getSystemVersion(),
      appVersion: DeviceInfo.getVersion(),
      platformOs: Platform.OS,
      userType: Platform.OS,
      userDeviceIP: deviceIP,
    };
    MyConsole.log('value push', values);
    const { data } = await Notification.pushNotificationToken('', values);
    // MyConsole.log('value push', values);
    MyConsole.log('data push', data);
    if (type == 'logout') {
      await MyAsyncStorage.removeItem('token');
    }
  } catch (error) {
    MyConsole.log('error.response', error.response);
  }
};

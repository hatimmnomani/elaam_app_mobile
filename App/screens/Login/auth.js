import FastImage from '@d11/react-native-fast-image';
import CookieManager from '@react-native-cookies/cookies';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import {
   ActivityIndicator,
   Dimensions,
   Linking,
   Platform,
   StatusBar,
   StyleSheet,
   TouchableOpacity,
   View
} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import { useDispatch } from 'react-redux';
import { BgPattern } from '../../assets';
import { showAlert } from '../../common/CustomAlert';
import { string } from '../../constants';
import { checkQuizAccess as checkQuizAccessAction } from '../../quiz/redux/actions';
import authService, { checkUserType } from '../../services/authServices';
import Notification from '../../services/notification';
import { isUpdateAvailable } from '../../utils/AppUpdate';
import { isProductionEnvironment } from '../../utils/CommonFunction';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';

const size = Dimensions.get('window');
const Auth = () => {
  const [deviceIP, setDeviceIP] = useState('');
  const [hideSplash, setHideSplash] = useState(false);
  const [deviceBrand, setDeviceBrand] = useState('');
  const [deviceName, setDeviceName] = useState('');

  const focused = useIsFocused();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  var decoded;
  const APICallling = async () => {
    const id_token = await MyAsyncStorage.getItem('IdToken');
    MyConsole.log(id_token);
    try {
      const values = {
        data: id_token,
        token: 'mobile-app',
      };
      const { data } = await authService.login(values);
      MyConsole.log('data', data);
      //MyConsole.log(data.token);
      decoded = jwtDecode(data.token);
      await MyAsyncStorage.setItem('itsid', decoded.sub);
      await MyAsyncStorage.setItem('decode', JSON.stringify(decoded));
      await MyAsyncStorage.setItem('userToken', data.token);
      await MyAsyncStorage.setItem('refreshToken', data.refreshToken);
      // Populate quiz access in Redux after login
      try {
        dispatch(checkQuizAccessAction(decoded.sub));
      } catch (e) {
        // ignore
      }
      pushNotification();
      navigation.navigate(string.LaunchScreen);
    } catch ({ response }) {
      MyConsole.log(response);
      logOut();
      if (response) {
        MyConsole.log(response);
        const { data } = response;
        MyConsole.log(data);
        showAlert({
          header: 'Login Failed..',
          title: data.errorMessage,
        });
      }
    }
  };
  const logOut = async () => {
    getDeviceInfo();
    MyConsole.log('Deactivate Fun Run');
    const tokenn = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    const fcmTokenn = 'Deactivate-Push-Notification';
    MyConsole.log('llllll', tokenn);
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
    navigation.navigate('ITSLOGIN');
    MyAsyncStorage.removeItem('isLogin');
    MyAsyncStorage.removeItem('IdToken');
    MyAsyncStorage.removeItem('userToken');
    try {
      const values = {
        deviceBrand: deviceBrand,
        deviceName: deviceName,
        itsId: itsid,
        pushToken: fcmTokenn,
        deviceVersion: DeviceInfo.getSystemVersion(),
        appVersion: DeviceInfo.getVersion(),
        platformOs: Platform.OS,
        userType: Platform.OS,
        userDeviceIP: deviceIP,
      };
      const { data } = await Notification.pushNotificationToken(tokenn, values);
      MyConsole.log('Deactivate Push Notification', data);
    } catch ({ response }) {
      MyConsole.log('PUSH Data NOTTT SEND', response);
    }
  };

  const getDeviceInfo = async () => {
    await DeviceInfo.getDeviceName().then(deviceName => {
      setDeviceName(deviceName);
    });
    let brand = DeviceInfo.getBrand();
    setDeviceBrand(brand);
    //await DeviceInfo.getIpAddress().then(ip => setDeviceIP(ip));
    publicIP()
      .then(ip => {
        MyConsole.log(ip);
        // '47.122.71.234'
        setDeviceIP(ip);
      })
      .catch(error => {
        MyConsole.log(error);
        // 'Unable to get IP address.'
      });
  };
  //update push token
  const pushNotification = async () => {
    getDeviceInfo();

    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    const fcmTokenn = await MyAsyncStorage.getItem('fcmToken');
    try {
      const values = {
        deviceBrand: deviceBrand,
        deviceName: deviceName,
        itsId: itsid,
        pushToken: fcmTokenn,
        deviceVersion: DeviceInfo.getSystemVersion(),
        appVersion: DeviceInfo.getVersion(),
        platformOs: Platform.OS,
        userType: Platform.OS,
        userDeviceIP: deviceIP,
      };
      MyConsole.log(
        'PUSH NOTIFICATION DATA IS SENDED TO THE SERVER  values',
        values,
      );
      const { data } = await Notification.pushNotificationToken(token, values);
      MyConsole.log('PUSH NOTIFICATION DATA IS SENDED TO THE SERVER', data);
    } catch (response) {
      MyConsole.log('PUSH Data NOT SEND', response);
    }
  };

  const [token, setToken] = useState(false);
  const changeScreen = async () => {
    MyConsole.log('changeScreen');
    MyConsole.log('Config.API_URL', Config.API_URL);
    try {
      if (Config.API_URL?.includes('prod')) {
        MyConsole.log('inside config prod update');
        const updateAvailable = await isUpdateAvailable();
        if (updateAvailable) {
          return;
        }
      }
    } catch (error) {
      MyConsole.log('changeScreen error', error);
    }
    try {
      MyConsole.log('changeScreen try');
      const value = await MyAsyncStorage.getItem('IdToken');
      const checksuperadmin = obj => obj.authority === 'Super Admin';
      const checkmumin = obj => obj.authority === 'Mumin';
      let dvalue = null;
      try {
        const decodee = await MyAsyncStorage.getItem('decode');
        if (decodee) {
          dvalue = JSON.parse(decodee);
        }
      } catch (e) {
        console.error('Error parsing decode value:', e);
        // Handle the error appropriately, maybe clear invalid data
        await MyAsyncStorage.removeItem('decode');
      }
      MyConsole.log('value', value);
       if (value) {
         MyConsole.log('calling Noti API');
         MyConsole.log('Moving to Dashboard');
         MyAsyncStorage.setItem('isMumin', 'false');
         dispatch(checkUserType(value, navigation));
         // Ensure quiz access is available in Redux on app open
         try {
           dispatch(checkQuizAccessAction());
         } catch (e) {
           // ignore
         }
         //pushNotification();
       } else {
         MyConsole.log('tokennnnn1', value);
         if (Config.API_URL?.includes('prod')) {
           MyConsole.log('inside config prod');
           navigation.reset({
             index: 0,
             routes: [
               {
                 name: isProductionEnvironment()
                   ? 'ITSLOGIN'
                   : string.LoginScreen,
               },
             ],
           });
           // navigation.navigate(string.LoginScreen);
         } else {
           navigation.reset({
             index: 0,
             routes: [
               {
                 name: isProductionEnvironment()
                   ? 'ITSLOGIN'
                   : string.LoginScreen,
               },
             ],
           });
         }
       }
    } catch (e) {
      MyConsole.log('auth error', e);
      // error reading value
    }
  };
  const getNotification = async () => {
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const { data } = await Notification.getNotificationPagination(
        itsid,
        0,
        10,
      );
      MyConsole.log('auth noti data1', data);
    } catch (response) {
      MyConsole.log('errorNoti', response);
    }
  };
  //check loggedin or not
  const getData = async () => {
    // navigation.navigate('ITSLOGIN');
    setTimeout(changeScreen, 3000);
  };
  //check dynamic link
  const myhandler = async ({ url }) => {
    MyConsole.log('hittt');
    MyConsole.log('result', url);
    await MyAsyncStorage.setItem('loginResponse', url);
    getToken();
    // handleUrl({ url, userDetails });
  };
  //search pamams from url
  const getSearchParamFromURL = (url, param) => {
    //MyConsole.log('urlll', url);
    const include = url.includes(param);
    if (!include) {
      return null;
    }

    const params = url.split(/([?,=])/);
    const index = params.indexOf(param);
    const value = params[index + 2];
    return value;
  };

  // get access token from its
  const getToken = async () => {
    MyConsole.log('getToken');
    const b = await MyAsyncStorage.getItem('loginResponse');
    const code_verifier = await MyAsyncStorage.getItem('codeVerifier');
    var urll = new URL(b);
    var regex = /[?#]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(urll))) {
      params[match[1]] = match[2];
    }
    getSearchParamFromURL(b, 'code');
    var code = params.code;
    const user = {
      client_id: Config.CLIENT_ID,
      client_secret: Config.CLIENT_SECERET,
      grant_type: 'authorization_code',
      redirect_uri: 'com.elaam.niyat://loggedin',
      code: code,
      code_verifier: code_verifier,
    };
    var formdata = new FormData();
    formdata.append('client_id', Config.CLIENT_ID);
    formdata.append('client_secret', Config.SECRET_ID);
    formdata.append('grant_type', 'authorization_code');
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
        MyAsyncStorage.setItem('IdToken', result.id_token);
        APICallling();
      })
      .catch(error => MyConsole.log('error', error));
  };
  React.useEffect(() => {
    console.log('Auth useEffect');
    getDeviceInfo();
    //getData();
    changeScreen();
    const subscription = Linking.addEventListener('url', myhandler);
    return () => {
      subscription.remove();
    };
  }, [focused]);
  return (
    <View style={Styles.view}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />
      <TouchableOpacity
        activeOpacity={1}
        style={Styles.touch}
        onPress={() => {
          // setHideSplash(!hideSplash);
          // getData();
        }}
      >
        <FastImage
          source={BgPattern}
          //resizeMode="cover"
          style={Styles.img}
        >
          <ActivityIndicator />
        </FastImage>
      </TouchableOpacity>
    </View>
  );
};
export default Auth;
const Styles = StyleSheet.create({
  view: { flex: 1 },
  touch: {
    flex: 1,
    justifyContent: 'center',
    width: size.width,
    height: size.height,
  },
  img: {
    flex: 1,
    justifyContent: 'center',
    width: size.width,
    height: size.height,
  },
});

/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import React, { useState } from 'react';
import {
   BackHandler,
   Image,
   ImageBackground,
   Platform,
   ScrollView,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import Config from 'react-native-config';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { BgPattern, Elaam_Logo } from '../../assets';
import { showAlert } from '../../common/CustomAlert';
import Loader from '../../common/Loader';
import ModalWebView from '../../common/ModalWebView';
import { Color, string } from '../../constants';
import STRING from '../../constants/string';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import authService, { handleOneLogin } from '../../services/authServices';
import Notification from '../../services/notification';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { pkceChallenge } from '../../utils/pkceChallenge';
import Style from './Style';

// import Auth0 from 'react-native-auth0';

const ITSLogin = () => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loader);
  const navigation = useNavigation();
  const [showWebView, setWebView] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState('https://reactnative.dev/');
  const [deviceIP, setDeviceIP] = useState('');
  const [deviceBrand, setDeviceBrand] = useState('');
  const [deviceName, setDeviceName] = useState('');
  var decoded;
  const APICallling = async () => {
    //setLoading(true);
    const id_token = await MyAsyncStorage.getItem('IdToken');
    try {
      const values = {
        data: id_token,
        token: 'mobile-app',
      };
      MyConsole.log('calling login API ');
      const { data } = await authService.login(values);
      // Alert.alert(data)
      MyConsole.log(data);
      MyConsole.log(data.token);
      decoded = jwtDecode(data.token);
      MyConsole.log('decoded', decoded.Name);
      MyConsole.log('itsid', decoded.sub);
      await MyAsyncStorage.setItem('itsid', decoded.sub);
      await MyAsyncStorage.setItem('decode', JSON.stringify(decoded));
      await MyAsyncStorage.setItem('userToken', data.token);
      //setLoading(false);
      pushNotification();
      navigation.navigate(string.LaunchScreen);
    } catch ({ response }) {
      MyConsole.log(response);
      // setLoading(false);
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
  //open login in browser
  const handleClick = async () => {
    try {
      MyConsole.log('inside handle click');
      InAppBrowser.close();
      const challenge = await pkceChallenge();
      MyConsole.log('challenge', challenge);
      await MyAsyncStorage.setItem('codeChallenge', challenge.codeChallenge);
      await MyAsyncStorage.setItem('codeVerifier', challenge.codeVerifier);
      //set url
      var ourl =
        Config.ITS_URL +
        '/connect/authorize?client_id=' +
        Config.CLIENT_ID +
        '&response_type=id_token code&scope=openid profile&redirect_uri=com.elaam.niyat://loggedin&state=state-8600b31f-52d1-4dca-987c-386e3d8967e9&code_challenge_method=S256&code_challenge=' +
        challenge.codeChallenge +
        '&nonce=12345';
      MyConsole.log('url', ourl);
      setUrl(ourl);

      dispatch(ReduxActionCreators.itsUrl(ourl));
      if (Platform.OS == 'android') {
        MyConsole.log('inside plateform');
        dispatch(ReduxActionCreators.modalwebview(true));
      } else {
        //open url in InAppBrowser
        try {
          if (await InAppBrowser.isAvailable()) {
            const result = await InAppBrowser.openAuth(
              encodeURI(ourl),
              'com.elaam.niyat://loggedin',
              {
                // iOS Properties
                ephemeralWebSession: true,
                // Android Properties
                showTitle: false,
                enableUrlBarHiding: true,
                enableDefaultShare: false,
              },
            );
            MyConsole.log('result2', result);
            const r = result.url;
            // MyConsole.log('result3', r);
            dispatch(handleOneLogin(r, navigation));
          } else {
            // Alert.alert('InAppBrowser is not supported :/');
          }
        } catch (error) {
          MyConsole.log('error', error);
          // Alert.alert('Something’s wrong with the app :(');
        }
      }
    } catch (error) {
      MyConsole.log('error', error);
      // Alert.alert('Something’s wrong with the app :(');
    }
  };

  const getDeviceInfo = async () => {
    await DeviceInfo.getDeviceName().then(deviceName => {
      setDeviceName(deviceName);
    });
    let brand = DeviceInfo.getBrand();
    setDeviceBrand(brand);
    await DeviceInfo.getIpAddress().then(ip => setDeviceIP(ip));
  };

  //update push token
  const pushNotification = async () => {
    getDeviceInfo();
    const tokenn = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    const fcmTokenn = await MyAsyncStorage.getItem('fcmToken');
    MyConsole.log('llllll', tokenn);
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
      MyConsole.log(
        'ITSLOGIN PUSH NOTIFICATION DATA IS SENDED TO THE SERVER',
        data,
      );
    } catch ({ response }) {
      MyConsole.log('PUSH Data NOT SEND', response);
    }
  };

  //search pamams from url
  const getSearchParamFromURL = (url, param) => {
    MyConsole.log('urlll', url);
    const include = url.includes(param);
    MyConsole.log('includes', include);
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
    MyConsole.log('getToken', b);
    var urll = new URL(b);
    MyConsole.log('getToken url', urll);
    var regex = /[?#]([^=#]+)=([^&#]*)/g,
      params = {},
      match;
    while ((match = regex.exec(urll))) {
      params[match[1]] = match[2];
    }
    MyConsole.log('code value', getSearchParamFromURL(b, 'code'));
    getSearchParamFromURL(b, 'code');
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
        MyConsole.log(result);
        MyConsole.log(result.id_token);
        MyAsyncStorage.setItem('IdToken', result.id_token);
        APICallling();
        // navigation.navigate('WelcomeScreen');
      })
      .catch(error => MyConsole.log('error', error));
  };
  MyConsole.log('Inside ITSLogin. focus state  ' + focused);
  React.useEffect(() => {
    getDeviceInfo();
    setWebView(false);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [focused]);
  const backAction = () => {
    if (focused) {
      MyConsole.log('Inside exit app dialog. focus state  ' + focused);
      showAlert({
        header: 'Hold on!',
        message: 'Are you sure you want to Exit App ?',
        alertType: 'warning',
        onPress: () => {
          MyConsole.log('BackHandler.exitApp');
          RNExitApp.exitApp();
        },
      });
      return true;
    }
  };
  const onNavigationStateChange = navState => {
    MyConsole.log('navState', navState);
    if (navState.url.includes('com.elaam.niyat://loggedin#code=')) {
      MyConsole.log('url', navState.url);
      dispatch(loading(true));

      dispatch(handleOneLogin(navState.url, navigation));
    }
  };
  return (
    <View style={Style.view1}>
      {!loading ? (
        <ImageBackground
          source={BgPattern}
          resizeMode="cover"
          style={Style.img_background}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={Style.img_view}>
              <Image
                resizeMode="contain"
                source={Elaam_Logo}
                style={Style.img}
              />
            </View>
            <Card containerStyle={{ elevation: 0 }} style={Style.card}>
              <View style={Style.login_desc_view}>
                <Text style={Style.txt3}> {STRING.LoginDesc}</Text>
                <View style={Style.liner_gradient_view}>
                  <LinearGradient
                    colors={Color.gradientColor}
                    style={Style.linear_gradient}
                  >
                    <Text onPress={() => handleClick()} style={Style.button}>
                      {STRING.ITSLOGIN}
                    </Text>
                  </LinearGradient>
                </View>

                <View
                  style={{ flexDirection: 'row', justifyContent: 'center' }}
                >
                  <Text style={Style.txt3}>{STRING.Copyright} </Text>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate(string.PrivacyPolicy, {
                        showHeader: false,
                      })
                    }
                  >
                    <Text style={Style.txt3}>{STRING.PrivacyPolicy} </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          </ScrollView>
        </ImageBackground>
      ) : null}
      <ModalWebView />
      <Loader />
    </View>
  );
};
export default ITSLogin;

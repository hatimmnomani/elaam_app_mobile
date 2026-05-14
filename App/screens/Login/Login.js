/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import {
   Image,
   ImageBackground,
   Platform,
   ScrollView,
   Text,
   View
} from 'react-native';
import { CheckBox } from 'react-native-elements';

import { useIsFocused, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Card, TextInput } from 'react-native-paper';
import Style from './Style';

import NetInfo from '@react-native-community/netinfo';
import { jwtDecode } from 'jwt-decode';
import { TouchableOpacity } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';
import { showAlert } from '../../common/CustomAlert';
import Loader from '../../common/Loader';
import { Color, string } from '../../constants';
import STRING from '../../constants/string';
import authService, { checkUserType } from '../../services/authServices';
import Notification from '../../services/notification';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
const Login = () => {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const navigation = useNavigation();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSecureEntry, setisSecureEntry] = useState(true);
  const [ITSID, setITSID] = useState('');
  const [Password, setPassword] = useState('');
  const [deviceIP, setDeviceIP] = useState('');
  const [deviceBrand, setDeviceBrand] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const APICallling = async () => {
    setLoading(true);

    var decoded;

    try {
      const values = {
        isMumin: 'true',
        itsId: ITSID,
        password: Password,
      };
      const { data } = await authService.login(values);
      // alert(data)

      MyConsole.log('djskjkds', data);
      if (checked === false) {
        MyConsole.log('Not Save PAssword Data');

        await MyAsyncStorage.setItem('userToken', 'Bearer ' + data.token);
        await MyAsyncStorage.setItem('isMumin', 'true');
        await MyAsyncStorage.setItem('itsid', ITSID);
        await MyAsyncStorage.setItem('isLogin', 'false');
        await MyAsyncStorage.setItem('isSave2', 'false');
        await MyAsyncStorage.setItem('password', Password);
        await MyAsyncStorage.setItem('refreshToken', data.refreshToken);
      } else if (checked === true) {
        MyConsole.log('Save PAssword Data');
        await MyAsyncStorage.setItem('userToken', 'Bearer ' + data.token);
        await MyAsyncStorage.setItem('isMumin', 'true');
        await MyAsyncStorage.setItem('itsid', ITSID);
        await MyAsyncStorage.setItem('password', Password);
        await MyAsyncStorage.setItem('isLogin', 'true');
        await MyAsyncStorage.setItem('isSave2', 'true');
        await MyAsyncStorage.setItem('refreshToken', data.refreshToken);
      }
      setLoading(false);
      MyConsole.log(data.token);
      decoded = jwtDecode(data.token);
      MyConsole.log('decoded', decoded.Name);
      MyConsole.log('itsid', decoded.sub);
      await MyAsyncStorage.setItem('itsid', decoded.sub);
      MyAsyncStorage.setItem('IdToken', data.token);
      await MyAsyncStorage.setItem('decode', JSON.stringify(decoded));
      await MyAsyncStorage.setItem('userToken', data.token);
      await MyAsyncStorage.setItem('refreshToken', data.refreshToken);

      pushNotification(data.token);
      // navigation.navigate('WelcomeScreen');
    } catch (err) {
      MyConsole.log('login error', err.response);
      setLoading(false);
      if (err) {
        const data = err.response
          ? err.response.data
          : { errorMessage: 'Something went wrong' };

        // alert('Login Failed..', data.errorMessage);
        showAlert({
          header: 'Login Failed..',
          title: data.errorMessage,
          //alertType: 'warning',
          // onPress: () => {
          //   MyConsole.log('BackHandler.exitApp');
          // },
        });
      }
    }
  };

  const handleClick = () => {
    MyConsole.log('handle click login');
    APICallling();
  };

  // eslint-disable-next-line no-unused-vars
  const [token, setToken] = React.useState(false);
  const getData = async () => {
    try {
      const value = await MyAsyncStorage.getItem('userToken');
      const userID = await MyAsyncStorage.getItem('itsid');
      const userPassword = await MyAsyncStorage.getItem('password');
      const checkIS = await MyAsyncStorage.getItem('isSave2');

      if (checkIS === 'true') {
        setITSID(userID);
        setPassword(userPassword);
        setChecked(true);
      } else if (checkIS === 'false') {
        setPassword('');
        setChecked(false);
      }

      // MyConsole.log('USER ID IS +> ', userID);
      // MyConsole.log('USER PASSword IS +> ', userPassword);

      if (value !== null) {
        // value previously stored
        // MyConsole.log("token", value);
        setToken(true);
        //navigation.navigate("WelcomeScreen")
      }
    } catch (e) {
      // error reading value
    }
    try {
      const value = await MyAsyncStorage.getItem('password');
      if (value !== null) {
        // value previously stored
        // MyConsole.log("password eee", value);
        //setToken(true)
        //navigation.navigate("WelcomeScreen")
      }
    } catch (e) {
      // error reading value
    }
    try {
      const value = await MyAsyncStorage.getItem('itsid');
      if (value !== null) {
        // value previously stored
        // MyConsole.log("itsid", value);
        //setToken(true)
        //navigation.navigate("WelcomeScreen")
      }
    } catch (e) {
      // error reading value
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

  useEffect(() => {
    getDeviceInfo();
    // eslint-disable-next-line no-unused-vars
    const unsubscribe = NetInfo.addEventListener(state => {
      // MyConsole.log('Connection type', state.type);
      // MyConsole.log('Is connected?', state.isConnected);
      // eslint-disable-next-line eqeqeq
      if (state.isConnected == false) {
        Toast.show({
          type: 'error',
          text1: 'Please check your internet connection',
        });
        return;
      }
    });
    getData();
  }, [focused]);

  const pushNotification = async token => {
    getDeviceInfo();
    const tokenn = await MyAsyncStorage.getItem('userToken');
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
        // userType:

        //   Platform.OS +
        //   ', ' +
        //   deviceBrand +
        //   ', ' +
        //   deviceName +
        //   ', ' +
        //   DeviceInfo.getVersion() +
        //   ', ' +
        //   DeviceInfo.getSystemVersion() +
        //   ', ',
      };
      MyConsole.log(
        'ITSLOGIN PUSH NOTIFICATION DATA IS SENDED TO THE SERVER',
        values,
      );
      const { data } = await Notification.pushNotificationToken(tokenn, values);
      const decodee = await MyAsyncStorage.getItem('decode');
      const checksuperadmin = obj => obj.authority === 'Super Admin';
      const checkmumin = obj => obj.authority === 'Mumin';
      const dvalue = JSON.parse(decodee);
      // MyConsole.log('isLog', value);
      MyAsyncStorage.setItem('isMumin', 'false');
      dispatch(checkUserType(token, navigation));
      // value previously stored
      // MyConsole.log('tokennnn', value);

      //navigation.navigate('LaunchScreen');
      // if (dvalue.Roles.some(checksuperadmin)) {
      //   MyAsyncStorage.setItem('isSuperAdmin', 'true');
      //   MyAsyncStorage.setItem('isMumin', 'false');
      //   // navigation.navigate('SuperAdminDrawerNavigators');
      //   navigation.navigate('SuperAdminDrawerNavigators', {
      //     screen: 'LaunchScreen',
      //     initial: false,
      //   });
      //   dispatch(ReduxActionCreators.d_tab_type(string.Dashboard));
      // } else {
      //   if (dvalue.Roles.length < 2) {
      //     if (dvalue.Roles.some(checkmumin)) {
      //       MyAsyncStorage.setItem('isMumin', 'true');
      //       MyAsyncStorage.setItem('isCheckMumin', 'Mumin');
      //       MyAsyncStorage.setItem('isSuperAdmin', 'false');
      //       navigation.navigate('MuminDrawerNavigators');
      //       dispatch(ReduxActionCreators.d_tab_type(string.Dashboard));
      //     } else {
      //       MyAsyncStorage.setItem('isMumin', 'false');
      //       MyAsyncStorage.setItem('isCheckMumin', '');
      //       MyAsyncStorage.setItem('isSuperAdmin', 'false');
      //       navigation.navigate('ApproveDrawerNavigators');
      //       dispatch(ReduxActionCreators.d_tab_type(string.Dashboard));
      //     }
      //   } else {
      //     setToken(true);
      //     navigation.navigate('WelcomeScreen');
      //     dispatch(ReduxActionCreators.d_tab_type('Welcome'));
      //   }
      // }

      // pushNotification();

      //  MyAsyncStorage.setItem('isSuperAdmin', 'true');
      //  MyAsyncStorage.setItem('isMumin', 'false');
      //  MyAsyncStorage.setItem('isCheckMumin', '');
      //   navigation.navigate('SuperAdminDrawerNavigators');
    } catch ({ response }) {
      MyConsole.log('PUSH Data NOT SEND', response);
    }
  };

  return (
    <View style={Style.container}>
      <Toast style={{ zIndex: 3000 }} />

      <ImageBackground
        source={require('../../assets/images/Elaam_Icons/login_red_bg.jpg')}
        resizeMode="cover"
        style={Style.image}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={Style.img_view}>
            <Image
              resizeMode="contain"
              source={require('../../assets/logo.png')}
              style={Style.img}
            />
          </View>

          {/* <Text style={{color: 'white', fontWeight: 'bold', marginLeft: '2%'}}>
            API Set is :-
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginHorizontal: '4%',
            }}>
            <Button mode="contained" onPress={() => MyConsole.log('Pressed')}>
              QA
            </Button>

            <Button mode="contained" onPress={() => MyConsole.log('Pressed')}>
              DEV
            </Button>
          </View> */}

          {/* {loading ? (
            <View style={[Style.loader, Style.horizontal]}>
              <ActivityIndicator size="large" />
            </View>
          ) : null} */}
          <Card containerStyle={{ elevation: 0 }} style={Style.card}>
            <View style={{ padding: '5%' }}>
              <TextInput
                keyboardType={'numeric'}
                label="ITS ID"
                maxLength={8}
                value={ITSID}
                // eslint-disable-next-line no-shadow
                onChangeText={ITSID => setITSID(ITSID)}
                right={<TextInput.Icon name="account" color="#fbc02d" />}
                style={Style.txtinput}
                theme={{
                  colors: {
                    primary: Color.white,
                    text: Color.white,
                    placeholder: Color.white,
                  },
                }}
              />
              {ITSID.length < 8 ? (
                <Text style={{ color: Color.white }}>
                  {' '}
                  ITS ID should be 8 digits{' '}
                </Text>
              ) : null}
              <TextInput
                label="Password"
                secureTextEntry={isSecureEntry ? true : false}
                value={Password}
                // eslint-disable-next-line no-shadow
                onChangeText={Password => setPassword(Password)}
                right={
                  <TextInput.Icon
                    name={isSecureEntry ? 'eye-off' : 'eye'}
                    color={'#fbc02d'}
                    onPress={() => setisSecureEntry(!isSecureEntry)}
                  />
                }
                style={Style.txtinput}
                theme={{
                  colors: {
                    primary: Color.white,
                    text: Color.white,
                    placeholder: Color.white,
                  },
                }}
              />
              <View style={Style.view2}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <CheckBox
                    checked={checked}
                    checkedColor="red"
                    onPress={() => {
                      // eslint-disable-next-line no-lone-blocks
                      {
                        // eslint-disable-next-line no-sequences
                        (setChecked(!checked),
                          MyConsole.log('hsadca', checked));
                      }
                    }}
                  />
                  <Text style={Style.txt1}>{string.RememberMe}</Text>
                </View>

                <View>
                  <Text style={Style.txt2}>{string.ForgetPassword}</Text>
                </View>
              </View>
              <Text style={Style.txt3}> {string.LoginDesc}</Text>
              <View style={{ marginTop: '8%' }}>
                <LinearGradient
                  colors={Color.gradientColor}
                  style={Style.linear_gradient}
                >
                  <Text onPress={() => handleClick()} style={Style.button}>
                    {string.LOGIN}
                  </Text>
                </LinearGradient>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Text style={Style.txt3}>{string.Copyright} </Text>
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
      <Loader />
    </View>
  );
};
export default Login;

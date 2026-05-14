/* eslint-disable no-sequences */
/* eslint-disable no-lone-blocks */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import {
  Image,
  ImageBackground,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  DrawerActions,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
// import WithLocalSvg from 'react-native-svg/css';

//import CookieManager from '@react-native-cookies/cookies';
import CookieManager from '@react-native-cookies/cookies';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRoute } from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import {
  Active_Menu_Bar_png,
  BgPattern,
  Elaam_Logo,
  Stamp,
  fmb,
  hasana,
  hifz,
} from '../assets';
import CatalogueIcon from '../assets/images/Elaam_Icons/CatalogueIcon';
import DashboardIcon from '../assets/images/Elaam_Icons/DashboardIcon';
import NotificationIcon from '../assets/images/Elaam_Icons/NotificationIcon';
import Scan_icon from '../assets/images/Elaam_Icons/Privacy_policy_icon';
import StampIcon from '../assets/images/Elaam_Icons/StampIcon';
import WelcomeIcon from '../assets/images/Elaam_Icons/WelcomeIcon';
import { Color, font, string } from '../constants/index';
import { ReduxActionCreators } from '../redux/ActionsCreators';
import Notification from '../services/notification';
import { MyAsyncStorage } from '../utils/MyAsyncStorage';
import { MyConsole } from '../utils/MyConsole';
export const DrawerContent = props => {
  const dispatch = useDispatch();
  const [showMenu, setshowMenu] = useState(true);
  const [isSuperAdmin, setisSuperAdmin] = useState(false);
  const [isKhidmatRamadaniyah, setIsKhidmatRamadaniyah] = useState(false);
  const [shouldShow, setShouldShow] = useState(true);
  const [deviceIP, setDeviceIP] = useState('');
  const [deviceBrand, setDeviceBrand] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const focused = useIsFocused();

  //const [isActive, setActive] = useState(string.Dashboard);
  const d_tab_type = useSelector(state => state.CommonReducer.d_tab_type);
  MyConsole.log('d_tab_type', d_tab_type);

  useEffect(() => {
    getDeviceInfo();
    APICallling();
    checkData();
  }, []);
  // useEffect(() => {
  //   MyConsole.log('route name useEffect ', route.name);
  //   if (route.name.includes('Catalogue')) {
  //     // setActive('Catalogue');
  //   }
  // }, [focused]);

  // MyConsole.log('navigation', route);

  const checkData = async () => {
    const decodee = await MyAsyncStorage.getItem('decode');
    const dvalue = JSON.parse(decodee);
    MyConsole.log('dvalue', dvalue.Roles.length);
    if (dvalue.Roles.length < 2) {
      MyConsole.log(shouldShow);
      setShouldShow(false);
    }
    // Check if user has Khidmat Ramadaniyah role
    const hasKhidmatRamadaniyah = dvalue.Roles.some(
      role => role.authority === 'Khidmat Ramadaniyah',
    );
    setIsKhidmatRamadaniyah(hasKhidmatRamadaniyah);
  };

  const APICallling = async () => {
    try {
      const ismumin = await MyAsyncStorage.getItem('isMumin');
      const isSuperAdminn = await MyAsyncStorage.getItem('isSuperAdmin');
      if (ismumin === 'true') {
        setshowMenu(true);
      } else {
        setshowMenu(false);
      }
      if (isSuperAdminn === 'true') {
        setisSuperAdmin(true);
      } else {
        setisSuperAdmin(false);
      }
    } catch ({ response }) {
      MyConsole.log('DrawerContent error :', response);
    }
  };
  const getDeviceInfo = async () => {
    await DeviceInfo.getDeviceName().then(deviceName => {
      setDeviceName(deviceName);
    });
    let brand = DeviceInfo.getBrand();
    setDeviceBrand(brand);
    // await DeviceInfo.getIpAddress().then(ip => setDeviceIP(ip));
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
  const pushNotificationDeactivate = async () => {
    getDeviceInfo();

    const tokenn = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    const fcmTokenn = 'Deactivate-Push-Notification';
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
      MyConsole.log('Deactivate Push Notification', values);
      MyConsole.log('Deactivate Push Notification2', data);
      // navigation.navigate('WelcomeScreen');
    } catch ({ response }) {
      MyConsole.log('PUSH Data NOTTT SEND', response);
    }

    // navigation.navigate('ITSLOGIN');
    MyAsyncStorage.removeItem('isLogin');
    MyAsyncStorage.removeItem('IdToken');
    MyAsyncStorage.removeItem('userToken');
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'Authentication',
          state: {
            routes: [
              {
                name: 'ITSLOGIN',
              },
            ],
          },
        },
      ],
    });
  };

  const pushNotificationDeactivatee = async () => {
    MyConsole.log('Deactivate Fun Run');
    const tokenn = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    const fcmTokenn = 'Deactivate-Push-Notification';
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
    try {
      const values = {
        itsId: itsid,
        pushToken: fcmTokenn,
      };
      const { data } = await Notification.pushNotificationToken(tokenn, values);
      MyConsole.log('Deactivate Push Notification', data);
      // navigation.navigate('WelcomeScreen');
    } catch ({ response }) {
      MyConsole.log('PUSH Data NOTTT SEND', response);
    }
    navigation.navigate('ITSLOGIN');
    MyAsyncStorage.removeItem('isLogin');
    MyAsyncStorage.removeItem('IdToken');
    MyAsyncStorage.removeItem('userToken');
    MyAsyncStorage.setItem('isSuperAdmin', 'false');
  };

  const switchScreen = async () => {
    const decodee = await MyAsyncStorage.getItem('decode');
    const checksuperadmin = obj => obj.authority === 'Super Admin';
    const dvalue = JSON.parse(decodee);
    if (showMenu) {
      MyConsole.log('true');
      MyAsyncStorage.setItem('isMumin', 'false');
      // navigation.navigate('ApproveDrawerNavigators');

      // Reset approval data when switching to Approver view
      dispatch(
        ReduxActionCreators.approval_pending_list({ list: [], count: 0 }),
      );
      dispatch(ReduxActionCreators.pending_search(''));
      // Note: Don't reset a_dropdown_selected or selected_date here - let them persist
      // Only clear the lists, keep the filter selections

      dispatch(
        ReduxActionCreators.multiple_niyat({
          d_tab_type: string.Dashboard,
          selectedFilterId: 0,
          dashboard_title: string.Dashboard,
          start_date: string.defaultStartDate,
          tab_type: string.Jamiat,
        }),
      );

      if (dvalue.Roles.some(checksuperadmin)) {
        MyAsyncStorage.setItem('isSuperAdmin', 'true');
        props.navigation.navigate(string.SuperAdminDrawerNavigators, {
          screen: string.SuperAdminScreen,
        });
        // navigation.navigate('Profile', {
        //   screen: 'WebScreen',
      } else {
        MyAsyncStorage.setItem('isSuperAdmin', 'false');
        props.navigation.navigate(string.ApproveDrawerNavigators, {
          screen: string.ApprovalScreen,
        });
      }
    } else {
      MyConsole.log('false');
      MyAsyncStorage.setItem('isMumin', 'true');
      MyAsyncStorage.setItem('isSuperAdmin', 'false');
      dispatch(ReduxActionCreators.d_tab_type(string.Dashboard));
      navigation.navigate(string.MuminDrawerNavigators, {
        screen: string.MuminScreen,
      });
    }
  };
  const changeDashboard = title =>
    dispatch(
      ReduxActionCreators.multiple_niyat({
        selectedFilterId: 0,
        dashboard_title: title,
        start_date: string.defaultStartDate,
        tab_type: string.Jamiat,
      }),
    );
  return (
    <ImageBackground resizeMode="cover" source={BgPattern} style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.logo}>
            <View>
              <Image resizeMode="cover" source={Elaam_Logo} />
            </View>
          </View>

          <View style={styles.drawerSection}>
            <Pressable
              style={{
                backgroundColor:
                  d_tab_type === 'Welcome' ? Color.drawarActiveTintColor : null,
                padding: 17,
                justifyContent: 'center',
              }}
              onPress={() => {
                // setActive('Welcome'),
                dispatch(ReduxActionCreators.d_tab_type('Welcome'));
                // navigation.navigate('Authentication', {
                //   screen: 'WelcomeScreen',
                //   initial: false,
                // });
                navigation.navigate(string.WelcomeScreen);
              }}
            >
              {d_tab_type === 'Welcome' ? (
                <Image
                  style={{
                    resizeMode: 'contain',
                    position: 'absolute',
                    height: '185%',
                  }}
                  source={Active_Menu_Bar_png}
                />
              ) : null}
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                {/* <Icon name='home-outline' color={isActive === "Welcome" ? '#E7BD4D' : 'white'} size={35} /> */}
                {/* <WithLocalSvg asset={Welcome} height={35} width={35} /> */}
                <WelcomeIcon height={35} width={35} />
                <Text
                  style={{
                    color:
                      d_tab_type === 'Welcome'
                        ? Color.drawarActiveTextColor
                        : Color.drawerInactiveTextColor,
                    fontSize: font.fontSizes16,
                    fontWeight: '500',
                  }}
                >
                  Welcome
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                backgroundColor:
                  d_tab_type === string.Dashboard
                    ? Color.drawarActiveTintColor
                    : null,
                padding: 17,
                justifyContent: 'center',
              }}
              onPress={() => {
                changeDashboard(string.Dashboard);
                //setActive(string.Dashboard);
                // dispatch(ReduxActionCreators.d_tab_type(string.Dashboard));
                MyConsole.log(showMenu);
                if (showMenu) {
                  navigation.navigate(string.MuminDrawerNavigators, {
                    screen: string.MuminScreen,
                    initial: false,
                  });
                } else {
                  MyConsole.log(isSuperAdmin);
                  if (isSuperAdmin) {
                    navigation.navigate(string.SuperAdminDrawerNavigators, {
                      screen: string.SuperAdminScreen,
                    });
                  } else {
                    navigation.navigate(string.ApproveDrawerNavigators, {
                      screen: string.ApprovalScreen,
                    });
                    //navigation.navigate('ApproveDrawerNavigators');
                    MyConsole.log('ApproveDrawerNavigators');
                  }
                }
                // {
                //   showMenu
                //     ?
                //     : isSuperAdmin
                //     ?
                //     :
                // }
                try {
                  navigation.dispatch(DrawerActions.closeDrawer());
                } catch (error) {
                  MyConsole.log('DrawerActions', error);
                }
              }}
            >
              {d_tab_type === string.Dashboard ? (
                <Image
                  style={{
                    resizeMode: 'contain',
                    position: 'absolute',
                    height: '185%',
                  }}
                  source={Active_Menu_Bar_png}
                />
              ) : null}
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                {/* <Icon name='account-outline' color={d_tab_type === "Dashboard" ? '#E7BD4D' : 'white'} size={35} /> */}
                {/* <WithLocalSvg asset={Dashboard} height={35} width={35} /> */}
                <DashboardIcon height={35} width={35} />
                <Text
                  style={{
                    color:
                      d_tab_type === string.Dashboard
                        ? Color.drawarActiveTextColor
                        : Color.drawerInactiveTextColor,
                    fontSize: font.fontSizes16,
                    fontWeight: '500',
                  }}
                >
                  Dashboard
                </Text>
              </View>
            </Pressable>

            {/* Quiz Navigation Item (conditionally rendered by Redux) */}
            {/* Quiz button has been moved to MuminScreen */}

            {isSuperAdmin === true ? (
              <Pressable
                style={{
                  backgroundColor:
                    d_tab_type === string.FMB_DASHBOARD
                      ? Color.drawarActiveTintColor
                      : null,
                  padding: 17,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  changeDashboard(string.FMB_DASHBOARD);
                  //setActive(string.FMB_DASHBOARD),
                  // dispatch(
                  //   ReduxActionCreators.d_tab_type(string.FMB_DASHBOARD),
                  // );
                  navigation.navigate(string.SuperAdminDrawerNavigators, {
                    screen: string.SuperAdminScreen,
                  });
                }}
              >
                {d_tab_type === string.FMB_DASHBOARD ? (
                  <Image
                    style={{
                      resizeMode: 'cover',
                      position: 'absolute',
                      height: '185%',
                    }}
                    source={Active_Menu_Bar_png}
                  />
                ) : null}
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* <Icon name='bookmark-outline' color={d_tab_type === "Catalogue" ? '#E7BD4D' : 'white'} size={35} /> */}
                  {/* <WithLocalSvg asset={Catalogue} height={35} width={35} /> */}

                  <Image
                    style={{
                      resizeMode: 'cover',
                      // position: 'absolute',
                      // height: dpHeight(30),
                      // width: dpWidth(13),
                    }}
                    source={fmb}
                  />
                  <Text
                    style={{
                      color:
                        d_tab_type === string.FMB_DASHBOARD
                          ? Color.drawarActiveTextColor
                          : Color.drawerInactiveTextColor,
                      fontSize: font.fontSizes16,
                      fontWeight: '500',
                    }}
                  >
                    FMB
                  </Text>
                </View>
              </Pressable>
            ) : null}
            {isSuperAdmin === true ? (
              <Pressable
                style={{
                  backgroundColor:
                    d_tab_type === string.HQHB_Dashboard
                      ? Color.drawarActiveTintColor
                      : null,
                  padding: 17,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  changeDashboard(string.HQHB_Dashboard);
                  //setActive(string.HQHB_Dashboard),
                  // dispatch(
                  //   ReduxActionCreators.d_tab_type(string.HQHB_Dashboard),
                  // );
                  navigation.navigate(string.SuperAdminDrawerNavigators, {
                    screen: string.SuperAdminScreen,
                  });
                }}
              >
                {d_tab_type === string.HQHB_Dashboard ? (
                  <Image
                    style={{
                      resizeMode: 'cover',
                      position: 'absolute',
                      height: '185%',
                    }}
                    source={Active_Menu_Bar_png}
                  />
                ) : null}
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  {/* <Icon name='bookmark-outline' color={d_tab_type === "Catalogue" ? '#E7BD4D' : 'white'} size={35} /> */}
                  {/* <WithLocalSvg asset={Catalogue} height={35} width={35} /> */}
                  <Image
                    style={{
                      resizeMode: 'cover',
                      // position: 'absolute',
                      // height: '15%',
                    }}
                    source={hasana}
                  />
                  <Text
                    style={{
                      color:
                        d_tab_type === string.HQHB_Dashboard
                          ? Color.drawarActiveTextColor
                          : Color.drawerInactiveTextColor,
                      fontSize: font.fontSizes16,
                      fontWeight: '500',
                    }}
                  >
                    HQHB
                  </Text>
                </View>
              </Pressable>
            ) : null}

            {isSuperAdmin === true ? (
              <Pressable
                style={{
                  backgroundColor:
                    d_tab_type === string.Mahad_Al_Zahra_Dashboard
                      ? Color.drawarActiveTintColor
                      : null,
                  padding: 17,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  changeDashboard(string.Mahad_Al_Zahra_Dashboard);
                  dispatch(
                    ReduxActionCreators.d_tab_type(
                      string.Mahad_Al_Zahra_Dashboard,
                    ),
                  );
                  navigation.navigate(string.SuperAdminDrawerNavigators, {
                    screen: string.SuperAdminScreen,
                  });
                }}
              >
                {d_tab_type === string.Mahad_Al_Zahra_Dashboard ? (
                  <Image
                    style={{
                      resizeMode: 'cover',
                      position: 'absolute',
                      height: '185%',
                    }}
                    source={Active_Menu_Bar_png}
                  />
                ) : null}
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  {/* <Icon name='bookmark-outline' color={d_tab_type === "Catalogue" ? '#E7BD4D' : 'white'} size={35} /> */}
                  {/* <WithLocalSvg asset={Catalogue} height={35} width={35} /> */}
                  <Image
                    style={{
                      resizeMode: 'cover',
                      // position: 'absolute',
                      // height: '15%',
                    }}
                    source={hifz}
                  />
                  <Text
                    style={{
                      color:
                        d_tab_type === string.Mahad_Al_Zahra_Dashboard
                          ? Color.drawarActiveTextColor
                          : Color.drawerInactiveTextColor,
                      fontSize: font.fontSizes16,
                      fontWeight: '500',
                    }}
                  >
                    Mahad al Zahra
                  </Text>
                </View>
              </Pressable>
            ) : null}

            {isSuperAdmin === false && !isKhidmatRamadaniyah ? (
              <Pressable
                style={{
                  backgroundColor:
                    d_tab_type === 'Catalogue'
                      ? Color.drawarActiveTintColor
                      : null,
                  padding: 17,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  // setActive('Catalogue'),
                  // dispatch(ReduxActionCreators.d_tab_type('Catalogue'));
                  //dispatch(ReduxActionCreators.d_tab_type('Catalouge'));
                  showMenu
                    ? navigation.navigate(string.MuminDrawerNavigators, {
                        screen: string.CatalogueScreen,
                      })
                    : navigation.navigate(string.ApproveDrawerNavigators, {
                        screen: string.ApproveCatalogue,
                      });
                }}
              >
                {d_tab_type === 'Catalogue' ? (
                  <Image
                    style={{
                      resizeMode: 'cover',
                      position: 'absolute',
                      height: '185%',
                    }}
                    source={Active_Menu_Bar_png}
                  />
                ) : null}
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  {/* <Icon name='bookmark-outline' color={d_tab_type === "Catalogue" ? '#E7BD4D' : 'white'} size={35} /> */}
                  {/* <WithLocalSvg asset={Catalogue} height={35} width={35} /> */}
                  <CatalogueIcon height={35} width={35} />
                  <Text
                    style={{
                      color:
                        d_tab_type === 'Catalogue'
                          ? Color.drawarActiveTextColor
                          : Color.drawerInactiveTextColor,
                      fontSize: font.fontSizes16,
                      fontWeight: '500',
                    }}
                  >
                    Catalogue
                  </Text>
                </View>
              </Pressable>
            ) : null}
            {showMenu === true ? (
              <Pressable
                style={{
                  backgroundColor:
                    d_tab_type === 'Notification'
                      ? Color.drawarActiveTintColor
                      : null,
                  padding: 17,
                  justifyContent: 'center',
                }}
                onPress={() => {
                  {
                    // setActive('Notification'),
                    // dispatch(ReduxActionCreators.d_tab_type('Notification'));
                    showMenu
                      ? navigation.navigate(string.MuminDrawerNavigators, {
                          screen: string.NotificationScreen,
                        })
                      : navigation.navigate(string.ApproveDrawerNavigators, {
                          screen: string.ApprovalScreen,
                        });
                  }
                }}
              >
                {d_tab_type === 'Notification' ? (
                  <Image
                    style={{
                      resizeMode: 'cover',
                      position: 'absolute',
                      height: '185%',
                    }}
                    source={Active_Menu_Bar_png}
                  />
                ) : null}
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  {/* <Icon name='bookmark-outline' color={d_tab_type === "Notification" ? '#E7BD4D' : 'white'} size={35} /> */}
                  {/* <WithLocalSvg
                    asset={showMenu === false ? Notification : Stamp}
                    height={40}
                    width={40}
                  /> */}
                  {showMenu === false ? (
                    <NotificationIcon height={40} width={40} />
                  ) : (
                    <StampIcon height={40} width={40} />
                  )}

                  <Text
                    style={{
                      color:
                        d_tab_type === 'Notification'
                          ? Color.drawarActiveTextColor
                          : Color.drawerInactiveTextColor,
                      fontSize: font.fontSizes16,
                      fontWeight: '500',
                    }}
                  >
                    {showMenu === true ? 'Notifications' : 'Approve Niyat'}
                  </Text>
                </View>
              </Pressable>
            ) : null}

            <Pressable
              style={{
                backgroundColor:
                  d_tab_type === string.PrivacyPolicy
                    ? Color.drawarActiveTintColor
                    : null,
                padding: 17,
                justifyContent: 'center',
              }}
              onPress={() => {
                // dispatch(
                //   ReduxActionCreators.dashboard_title(string.PrivacyPolicy),
                // );
                navigation.navigate(
                  showMenu
                    ? string.MuminDrawerNavigators
                    : string.ApproveDrawerNavigators,
                  { screen: string.PrivacyPolicy },
                );
              }}
            >
              {d_tab_type === string.PrivacyPolicy ? (
                <Image
                  style={{
                    resizeMode: 'cover',
                    position: 'absolute',
                    height: '185%',
                  }}
                  source={Active_Menu_Bar_png}
                />
              ) : null}
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                {/* <Icon name='bookmark-outline' color={d_tab_type === "Notification" ? '#E7BD4D' : 'white'} size={35} /> */}
                {/* <WithLocalSvg
                  asset={showMenu === false ? Notification : Stamp}
                  height={40}
                  width={40}
                /> */}
                <Scan_icon
                  asset={showMenu === false ? Notification : Stamp}
                  height={40}
                  width={40}
                />
                <Text
                  style={{
                    color:
                      d_tab_type === string.PrivacyPolicy
                        ? Color.drawarActiveTextColor
                        : Color.drawerInactiveTextColor,
                    fontSize: font.fontSizes16,
                    fontWeight: '500',
                  }}
                >
                  {string.PrivacyPolicy}
                  {/* {showMenu === true ? 'Privacy&Policy' : ''} */}
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                backgroundColor:
                  d_tab_type === 'Log Out' ? Color.drawarActiveTintColor : null,
                padding: 17,
                justifyContent: 'center',
              }}
              onPress={() => {
                pushNotificationDeactivate();
              }}
            >
              {d_tab_type === 'Log Out' ? (
                <Image
                  style={{
                    resizeMode: 'cover',
                    position: 'absolute',
                    height: '185%',
                  }}
                  source={Active_Menu_Bar_png}
                />
              ) : null}
              <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Entypo
                  name="log-out"
                  color="#fef9bd"
                  style={{ fontWeight: 'bold' }}
                  size={28}
                />
                {/* <WithLocalSvg asset={logout} height={35} width={35} /> */}
                <Text
                  style={{
                    color:
                      d_tab_type === 'Log Out'
                        ? Color.drawarActiveTextColor
                        : Color.drawerInactiveTextColor,
                    fontSize: font.fontSizes16,
                    fontWeight: '500',
                  }}
                >
                  Log Out
                </Text>
              </View>
            </Pressable>

            <Pressable
              style={{
                backgroundColor:
                  d_tab_type === 'Log Out' ? Color.drawarActiveTintColor : null,
                padding: 17,
                justifyContent: 'center',
              }}
              onPress={() => {
                switchScreen();
                // navigation.navigate('LoginScreen');
                // MyAsyncStorage.removeItem("isLogin");
              }}
            >
              {d_tab_type === 'Log Out' ? (
                <Image
                  style={{
                    resizeMode: 'cover',
                    position: 'absolute',
                    height: '185%',
                  }}
                  source={Active_Menu_Bar_png}
                />
              ) : null}

              {shouldShow ? (
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                  <Entypo
                    name="switch"
                    color="#fef9bd"
                    style={{ fontWeight: 'bold' }}
                    size={28}
                  />
                  <Text
                    style={{
                      color:
                        d_tab_type === 'Log Out'
                          ? Color.drawarActiveTextColor
                          : Color.drawerInactiveTextColor,
                      fontSize: font.fontSizes16,
                      fontWeight: '500',
                    }}
                  >
                    Switch to {showMenu ? 'Approver' : 'Mumin'}
                  </Text>
                </View>
              ) : null}
            </Pressable>
          </View>
        </View>
      </DrawerContentScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  logo: {
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    marginTop: 10,
    fontWeight: '900',
    color: 'orange',
    textAlign: 'center',
  },
  drawerSection: {
    marginTop: 20,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

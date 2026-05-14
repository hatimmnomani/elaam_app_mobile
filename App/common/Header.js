/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Appbar, Badge } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import Scanner_icon from '../assets/images/Elaam_Icons/Scanner_icon';
import { Color, font, string } from '../constants';
import Notification from '../services/notification';
import { MyAsyncStorage } from '../utils/MyAsyncStorage';
import { MyConsole } from '../utils/MyConsole';
export default Header = () => {
  const [headerTitle, setheaderTitle] = useState(true);
  const [count, setcount] = useState(0);
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  MyConsole.log('route name Header', route.name);
  useEffect(() => {
    APICallling();
    getNotification();
  }, [headerTitle]);

  // useEffect(() => {
  //   MyConsole.log('route name useEffect ', route.name);
  //   if (route.name == 'ApprovalScreen') {
  //     dispatch(ReduxActionCreators.d_tab_type(string.Dashboard));
  //   }
  // }, [route]);

  const getNotification = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    //MyConsole.log('token', token);
    try {
      const { data } = await Notification.getNotification(
        itsid,
        token,
        '&status=UNREADMESSAGE',
      );
      // alert(data)
      // MyConsole.log('data1 header', data.data.length);
      setcount(data.data.length);
      //setLoading(false)
      //MyConsole.log("json",JSON.stringify(response.data.data))
      // setData(data.data)
    } catch ({ response }) {
      MyConsole.log('errorNoti', response);
    }
  };
  const APICallling = async () => {
    try {
      const ismumin = await MyAsyncStorage.getItem('isMumin');
      // MyConsole.log('header title is :', ismumin);

      if (ismumin === 'true') {
        setheaderTitle(true);
      } else {
        setheaderTitle(false);
      }
    } catch ({ response }) {
      MyConsole.log('error1', response);
    }
  };
  const switchScreen = () => {
    if (headerTitle) {
      MyConsole.log('true');
      MyAsyncStorage.setItem('isMumin', 'false');
      navigation.navigate(string.ApproveDrawerNavigators);
    } else {
      MyConsole.log('false');
      MyAsyncStorage.setItem('isMumin', 'true');
      navigation.navigate(string.MuminDrawerNavigators);
    }
  };

  return (
    <View>
      <Appbar.Header style={styles.app_header}>
        <Appbar.Action
          icon="menu"
          color="#b73109"
          onPress={() => navigation.openDrawer()}
        />
        <View style={styles.presable_view} />
        {route.name === string.ApprovalScreen ||
        route.name === string.MuminScreen ||
        route.name === string.PrivacyPolicy ? (
          <Pressable style={styles.presable_style} onPress={() => {}}>
            <Text style={styles.header_title_txt}>
              {route.name === string.PrivacyPolicy
                ? string.PrivacyPolicy
                : headerTitle
                  ? 'Mumin Dashboard'
                  : 'Dashboard'}
            </Text>
          </Pressable>
        ) : null}
        <View style={styles.presable_view} />
        {route.name === string.PrivacyPolicy ? null : (
          <Scanner_icon onPress={() => navigation.navigate('Scanner')} />
        )}
        {route.name === string.PrivacyPolicy ? null : (
          <View style={styles.bel_icon_view}>
            <Appbar.Action
              icon="bell-outline"
              onPress={() => navigation.navigate(string.NotificationScreen)}
              color="#b73109"
            />
            <Badge size={16} style={styles.bdge}>
              {count}
            </Badge>
          </View>
        )}
      </Appbar.Header>
      <LinearGradient
        colors={Color.gradientColor2}
        start={{ x: 0.2, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.liner_gradient}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  liner_gradient: { paddingVertical: 1 },
  bdge: {
    position: 'absolute',
    top: 6,
    right: 10,
    backgroundColor: '#b73109',
    color: '#fcf9e5',
  },
  app_header: {
    backgroundColor: Color.bgColor,
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  presable_view: { flexGrow: 1 },
  header_title_txt: {
    fontSize: font.fontSizes20,
    color: Color.titleColor,
    fontWeight: '500',
  },
  bel_icon_view: { flexDirection: 'row' },
  presable_style: { marginRight: 15 },
});

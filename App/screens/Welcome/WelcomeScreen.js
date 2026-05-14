import NetInfo from '@react-native-community/netinfo';
import { DrawerActions, useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
   BackHandler,
   Image,
   StatusBar,
   Text,
   View,
   useWindowDimensions,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import RNExitApp from 'react-native-exit-app';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { Pattern, WelcomeElaamLogo } from '../../assets';
import { showAlert } from '../../common/CustomAlert';
import { Color, font, string } from '../../constants';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import { formatRoleName } from '../../utils/CommonFunction';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { dpHeight } from '../../utils/SizeInDp';
import {
  chceckUmmor,
  checkJamiatMasool,
  checkKhidmatRamadaniyah,
  checkMuavinAamil,
  checkUmmorHead,
  checkaamil,
  getAllJamaatAPI,
  getAllJamiat,
  getAllUmoor,
} from '../ApproveDashboard/getApi';
import styles from './styles';
const Welcome = props => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const token_Decode = useSelector(s => s.CommonReducer.token_Decode);
  const allJamatList = useSelector(s => s.ApiReducer.allJamatList);
  const [buttons, setButtons] = useState([]);
  React.useEffect(() => {
    MyConsole.log('inside useEffect');

    const unsubscribe = NetInfo.addEventListener(state => {
      MyConsole.log('Connection type', state.type);
      MyConsole.log('Is connected?', state.isConnected);
      if (state.isConnected == false) {
        Toast.show({
          type: 'error',
          text1: 'Please check your internet connection',
        });
        return;
      }
    });
    getData();
    // BackHandler.addEventListener('hardwareBackPress', backAction);
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
    // BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, [focused]);
  const backAction = () => {
    if (focused) {
      showAlert({
        header: 'Hold on!',
        message: 'Are you sure you want to Exit App ?',
        alertType: 'warning',
        onPress: () => {
          MyConsole.log('BackHandler.exitApp');
          RNExitApp.exitApp();
        },
      });
      //  Alert .alert('Hold on!', 'Are you sure you want to Exit App ?', [
      //     {
      //       text: 'Cancel',
      //       onPress: () => null,
      //       style: 'cancel',
      //     },
      //     {text: 'YES', onPress: () => BackHandler.exitApp()},
      //   ]);
      return true;
    }
  };
  const getData = async () => {
    const decodee = await MyAsyncStorage.getItem('decode');
    const dvalue = JSON.parse(decodee);
    MyConsole.log('dvalue', dvalue);
    setButtons([]);
    let result = dvalue.Roles.map(a => formatRoleName(a.authority));
    result = result.filter(e => e);
    setButtons(result);
  };
  // const getData = async () => {
  //   const decodee = await MyAsyncStorage.getItem('decode');
  //   const dvalue = JSON.parse(decodee);
  //   MyConsole.log('dvalue', dvalue);
  //   setButtons([]);
  //   let result = dvalue.Roles.map(a => a.authority);
  //   //MyConsole.log(result);
  //   result = result.filter(function (e) {
  //     return e;
  //   });
  //   //MyConsole.log(result);
  //   setButtons(result);
  // };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       alert('Hold on!', 'Are you sure you want to Exit ?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         {text: 'YES', onPress: () => BackHandler.exitApp()},
  //       ]);
  //       return true;
  //     };
  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () => {
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //     };
  //   }),
  // );
  const navigation = useNavigation();
  const { height, width } = useWindowDimensions();

  const buttonNavigation = value => {
    const v = buttons[value];
    MyConsole.log('ButtonGroup', v);

    // dispatch(ReduxActionCreators.d_tab_type(string.Dashboard));
    dispatch(
      ReduxActionCreators.multiple_niyat({
        d_tab_type: string.Dashboard,
        selectedFilterId: 0,
        dashboard_title: string.Dashboard,
        start_date: string.defaultStartDate,
        tab_type: string.Jamiat,
        approval_pending_list: {},
        a_dropdown_selected: {},
      }),
    );
    try {
      navigation.dispatch(DrawerActions.closeDrawer());
    } catch (error) {
      MyConsole.log('DrawerActions', error);
    }

    if (v === 'Mumin') {
      MyAsyncStorage.setItem('isMumin', 'true');
      MyAsyncStorage.setItem('isCheckMumin', 'Mumin');
      MyAsyncStorage.setItem('isSuperAdmin', 'false');
      //props.navigation.navigate('MuminDrawerNavigators');
      props.navigation.reset({
        index: 0,
        routes: [{ name: string.MuminDrawerNavigators }],
      });
    } else {
      MyAsyncStorage.setItem('isMumin', 'false');
      MyAsyncStorage.setItem('isCheckMumin', '');
      if (v === 'Super Admin') {
        MyAsyncStorage.setItem('isSuperAdmin', 'true');
        props.navigation.reset({
          index: 0,
          routes: [{ name: string.SuperAdminDrawerNavigators }],
        });
        // props.navigation.navigate('SuperAdminDrawerNavigators');
      } else {
        MyAsyncStorage.setItem('isSuperAdmin', 'false');
        props.navigation.reset({
          index: 0,
          routes: [{ name: string.ApproveDrawerNavigators }],
        });
        // props.navigation.navigate('ApproveDrawerNavigators');
      }
    }
  };
  useEffect(() => {
    if (
      token_Decode?.Roles?.some(checkaamil) ||
      token_Decode?.Roles?.some(checkMuavinAamil) ||
      token_Decode?.Roles?.some(chceckUmmor) ||
      token_Decode?.Roles?.some(checkUmmorHead) ||
      token_Decode?.Roles?.some(checkJamiatMasool) ||
      token_Decode?.Roles?.some(checkKhidmatRamadaniyah)
    ) {
      if (!allJamatList?.id && token_Decode?.Roles?.some(checkaamil)) {
        dispatch(getAllJamaatAPI(token_Decode));
      } else if (
        !allJamatList?.id &&
        token_Decode?.Roles?.some(checkMuavinAamil)
      ) {
        dispatch(getAllJamaatAPI(token_Decode));
      } else if (
        !allJamatList?.id &&
        token_Decode?.Roles?.some(checkKhidmatRamadaniyah)
      ) {
        dispatch(getAllJamaatAPI(token_Decode));
      } else if (!allJamatList?.id && token_Decode?.Roles?.some(chceckUmmor)) {
        MyConsole.log('getAllUmoor');
        dispatch(getAllUmoor(token_Decode));
      } else if (
        !allJamatList?.id &&
        token_Decode?.Roles?.some(checkUmmorHead)
      ) {
        MyConsole.log('getAllUmoor');
        dispatch(getAllUmoor(token_Decode));
      } else if (
        !allJamatList?.id &&
        token_Decode?.Roles?.some(checkJamiatMasool)
      ) {
        dispatch(getAllJamiat(token_Decode));
      }
    }
  }, [focused]);

  return (
    <View style={styles.MainContainer} testID="WelcomeScreenAvil">
      {/* <Toast style={styles.toast} ref={ref => Toast.setRef(ref)} /> */}
      <StatusBar
        backgroundColor={Color.headtextColor}
        barStyle="dark-content"
      />
      <LinearGradient
        colors={['#c0370b', '#842000']}
        style={styles.liner_gradient}
      >
        <View style={styles.imgView}>
          <Image source={Pattern} style={styles.img_style} />
        </View>
        <View style={styles.image}>
          <Image source={WelcomeElaamLogo} />
        </View>

        <View style={styles.txt_view}>
          <View>
            <Text style={styles.text}>WELCOME !</Text>
            <Text
              style={[
                styles.text,
                {
                  marginBottom: 35,
                },
              ]}
            >
              ELAAM
            </Text>
          </View>
          <View style={styles.btn}>
            <ButtonGroup
              testID="moveDashboard"
              accessibilityLabel="Move DashboardBtn"
              buttons={buttons}
              onPress={buttonNavigation}
              containerStyle={{ height: dpHeight(40), borderRadius: 30 }}
              buttonContainerStyle={{
                backgroundColor: Color.welcomePageButtonColor,
              }}
              textStyle={{
                color: Color.black,
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: font.fontSizes15,
              }}
            />
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Welcome;

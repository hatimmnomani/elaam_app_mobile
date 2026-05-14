import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  StatusBar,
  Image,
  Animated,
  Easing,
  InteractionManager,
  BackHandler,
  Alert,
  ImageBackground,
} from 'react-native';
import Header from '../SuperAdminDashboard/common/Header';
import Item from './common/Item';
import { Color, string } from '../../constants/index';
import Menu from './common/Menu';
import BottomTab from './common/BottomTab';
import Globe_b from '../../assets/images/Elaam_Icons/Globe_b';
import Jamaat_b from '../../assets/images/Elaam_Icons/Jamaat_b';
import Umoor_b from '../../assets/images/Elaam_Icons/Umoor_b';
import Department_b from '../../assets/images/Elaam_Icons/Department_b';
import Niyat_b from '../../assets/images/Elaam_Icons/Niyat_b';
import Globe_w from '../../assets/images/Elaam_Icons/Globe_w';
import Jamaat_w from '../../assets/images/Elaam_Icons/Jamaat_w';
import Umoor_w from '../../assets/images/Elaam_Icons/Umoor_w';
import Department_w from '../../assets/images/Elaam_Icons/Department_w';
import Niyat_w from '../../assets/images/Elaam_Icons/Niyat_w';
import styles from './style';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Background from '../../assets/images/Elaam_Icons/Background';
import { getApiData } from './getApiData';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import { MyConsole } from '../../utils/MyConsole';
import Loader from '../../common/Loader';
import Lottie from 'lottie-react-native';
import { showAlert } from '../../common/CustomAlert';
import { dpHeight, dpWidth } from '../../utils/SizeInDp';
import { backg, fmb } from '../../assets';
import { appScreen } from '../../utils/responsive/SizeUtil';
import RNExitApp from 'react-native-exit-app';

const SuperAdminDashboard = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [animationDisabled, setAnimationDisabled] = useState(false);
  const d_title = useSelector(s => s.CommonReducer.dashboard_title);
  const end_date = useSelector(s => s.CommonReducer.end_date);
  const start_date = useSelector(s => s.CommonReducer.start_date);
  const total_niyats = useSelector(s => s.CommonReducer.total_niyats);
  const active = useSelector(s => s.CommonReducer.active);
  const completed = useSelector(s => s.CommonReducer.completed);
  const tab_type = useSelector(s => s.CommonReducer.tab_type);
  const selectedFilterId = useSelector(s => s.CommonReducer.selectedFilterId);
  const selectedFilterJamiatId = useSelector(
    s => s.CommonReducer.selectedFilterJamiatId,
  );
  const selectedFilterJamatId = useSelector(
    s => s.CommonReducer.selectedFilterJamatId,
  );
  const dashboardTitle = useSelector(s => s.CommonReducer.dashboard_title);
  const approval_pending = useSelector(s => s.CommonReducer.approval_pending);
  const animationProgress = useRef(new Animated.Value(0));
  const animationProgress1 = useRef(new Animated.Value(0));

  useEffect(() => {
    if (!focused) {
      return;
    }
    MyConsole.log('SuperAdminDashboard', dashboardTitle);
    let params = { endDate: end_date, startDate: start_date };
    if (dashboardTitle !== string.Dashboard) {
      params.departmentId =
        dashboardTitle === string.FMB_DASHBOARD
          ? 1
          : dashboardTitle === string.HQHB_Dashboard
          ? 3
          : dashboardTitle === string.Mahad_Al_Zahra_Dashboard
          ? 2
          : 1;
    }
    if (selectedFilterId !== 0) {
      params[
        tab_type === string.Jamaat
          ? 'jamaatId'
          : tab_type === string.Jamiat
          ? 'jamiatId'
          : tab_type === string.Umoor
          ? 'umoorId'
          : tab_type === string.Department
          ? 'departmentId'
          : 'search'
      ] = selectedFilterId;
    }
    if (selectedFilterJamatId !== 0) {
      params.jamaatId = selectedFilterJamatId;
    }
    if (selectedFilterJamiatId !== 0) {
      params.jamiatId = selectedFilterJamiatId;
    }
    MyConsole.log('params superadmin', params);
    dispatch(getApiData(params, tab_type, dashboardTitle));
    setTimeout(() => setAnimationDisabled(true), 5000);
    animateNow();
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [
    dashboardTitle,
    tab_type,
    start_date,
    selectedFilterId,
    selectedFilterJamatId,
    selectedFilterJamiatId,
    focused,
  ]);
  const backAction = () => {
    if (focused) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        showAlert({
          header: 'Hold on!',
          message: 'Are you sure you want to Exit App ?',
          alertType: 'warning',
          onPress: () => {
            MyConsole.log('BackHandler.exitApp');
            RNExitApp.exitApp();
          },
        });
      }
      return true;
    }
  };
  const animateNow = () => {
    MyConsole.log('inside animate now', animationProgress);
    animationProgress.current.setValue(0);
    animationProgress1.current.setValue(0);
    Animated.timing(animationProgress.current, {
      toValue: 1,
      duration: 5000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
    Animated.timing(animationProgress1.current, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();
  };
  const changeTab = type =>
    dispatch(
      ReduxActionCreators.multiple_niyat({
        selectedFilterId: 0,
        tab_type: type,
        start_date: string.defaultStartDate,
        selectedFilterJamiatId: 0,
        selectedFilterJamatId: 0,
      }),
    );

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar backgroundColor={Color.bgColor} barStyle="dark-content" />
      <View
        style={{
          position: 'absolute',
        }}
      >
        <Image source={backg} style={{ width: appScreen.width }} />
      </View>
      <Menu />
      <Header heading={d_title} />
      <View style={styles.mainItemView}>
        <Item count={total_niyats} name={string.TOTAL_NIYATS} />
        <Item count={active} name={string.ACTIVE} />
      </View>
      <View style={styles.mainItemView2}>
        <Item count={approval_pending} name={string.APPROVAL_PENDING} />
        <Item count={completed} name={string.COMPLETED} />
      </View>
      <View style={styles.mainBottomView}>
        <View style={styles.mainJamiatView}>
          <BottomTab
            onPress={() => {
              changeTab(string.Jamiat);
            }}
            TabName={string.Jamiat}
            image={tab_type === string.Jamiat ? <Globe_w /> : <Globe_b />}
          />
        </View>
        <View style={styles.bottomView}>
          <BottomTab
            onPress={() => {
              changeTab(string.Jamaat);
            }}
            TabName={string.Jamaat}
            image={tab_type === string.Jamaat ? <Jamaat_w /> : <Jamaat_b />}
          />
        </View>
        {d_title === 'DASHBOARD' ? (
          <View style={styles.bottomView}>
            <BottomTab
              onPress={() => {
                changeTab(string.Umoor);
              }}
              TabName={string.Umoor}
              image={tab_type === string.Umoor ? <Umoor_w /> : <Umoor_b />}
            />
          </View>
        ) : null}
        {d_title === 'DASHBOARD' ? (
          <View style={styles.bottomView}>
            <BottomTab
              onPress={() => {
                changeTab(string.Department);
              }}
              TabName={string.Department}
              image={
                tab_type === string.Department ? (
                  <Department_w />
                ) : (
                  <Department_b />
                )
              }
            />
          </View>
        ) : null}
        <View style={styles.bottomView}>
          <BottomTab
            onPress={() => {
              changeTab(string.Niyat);
            }}
            TabName={string.Niyat}
            image={tab_type === string.Niyat ? <Niyat_w /> : <Niyat_b />}
          />
        </View>
      </View>
      {/* {!animationDisabled ? (
        <Lottie
          progress={animationProgress.current}
          autoPlay
          loop={false}
          source={require('../../assets/78540-confetti-congratulation-sparkle.json')}
        />
      ) : null}
      {!animationDisabled ? (
        <Lottie
          progress={animationProgress1.current}
          autoPlay
          loop={false}
          source={require('../../assets/101013-congrats.json')}
        />
      ) : null} */}
      <Loader />
    </SafeAreaView>
  );
};
export default SuperAdminDashboard;

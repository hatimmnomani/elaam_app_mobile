/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  View,
  Text,
  Pressable,
  Image,
  Dimensions,
  ScrollView,
  Platform,
} from 'react-native';
// import WithLocalSvg from 'react-native-svg/css';
import LinearGradient from 'react-native-linear-gradient';
import {Color, string, font} from '../../../constants/index';
import {DownloadIconSvg, Border_frame, Border} from '../../../assets';
import styles from './style';
import Border_new from '../../../assets/images/Elaam_Icons/Border_new';
import {useNavigation} from '@react-navigation/native';
import {ReduxActionCreators} from '../../../redux/ActionsCreators';
import {useDispatch, useSelector} from 'react-redux';
import {Border1} from '../../../assets/images/Elaam_Icons/Border1';
import {dpHeight, dpWidth} from '../../../utils/SizeInDp';
import {appScreen} from '../../../utils/responsive/SizeUtil';
import DeviceInfo from 'react-native-device-info';
import {MyConsole} from '../../../utils/MyConsole';

export default Item = props => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const loading = useSelector(state => state.loader);
  // let isTablet = DeviceInfo.isTablet();

  return (
    <View style={styles.itemContainer}>
      <View style={styles.row}>
        <Pressable
          style={styles.cardmainbox}
          onPress={() => {
            dispatch(ReduxActionCreators.niyat_type(props.name));
            navigation.navigate(string.NiyatList);
          }}>
          <LinearGradient
            colors={Color.gradientColor}
            style={styles.linear_gradient}>
            <Border_new
              width={appScreen.width * 0.25}
              height={appScreen.width * 0.27}
              style={styles.itemBorder}
            />
            <View style={styles.itemBoxView}>
              <View style={styles.itenCountView}>
                <Border1
                  height={
                    dpWidth(60) > dpWidth(`${props.count}`.length * 12)
                      ? dpWidth(DeviceInfo.isTablet() ? 40 : 60)
                      : dpWidth(
                          `${props.count}`.length *
                            (DeviceInfo.isTablet() ? 10 : 15),
                        )
                  }
                  width={
                    dpWidth(80) > dpWidth(`${props.count}`.length * 16)
                      ? dpWidth(DeviceInfo.isTablet() ? 60 : 80)
                      : dpWidth(
                          `${props.count}`.length *
                            (DeviceInfo.isTablet() ? 14 : 20),
                        )
                  }
                />
                <Text style={styles.itemCountTxt}>
                  {loading ? '' : props.count}
                </Text>
              </View>
              <Text style={styles.itemTxt}> {props.name}</Text>
            </View>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

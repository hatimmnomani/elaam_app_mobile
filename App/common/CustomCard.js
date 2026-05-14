import React from 'react';
import {Dimensions, Image, Pressable, Text, View} from 'react-native';
import {Color} from '../constants';
import styles from '../screens/MuminDashboard/styles';
import LinearGradient from 'react-native-linear-gradient';
import {Border_frame} from '../assets';
import {Border1} from '../assets/images/Elaam_Icons/Border1';
import {dpWidth} from '../utils/SizeInDp';
import DeviceInfo from 'react-native-device-info';

const windowWidth = Dimensions.get('window').width;

const CustomCard = ({onPress, cardTitle, statNum, sDate, eDate, number}) => (
  <Pressable style={styles.cardmainbox} onPress={onPress}>
    <LinearGradient
      colors={Color.gradientColor}
      style={[styles.gradientStyle, {flex: 1}]}>
      <Image style={styles.cardmainboximage} source={Border_frame} />
      <View style={styles.cardmainboxstyle}>
        <View style={styles.cardmainboxborder}>
          <Border1
            height={
              dpWidth(60) > dpWidth(`${number}`.length * 12)
                ? dpWidth(DeviceInfo.isTablet() ? 40 : 60)
                : dpWidth(
                    `${number}`.length * (DeviceInfo.isTablet() ? 10 : 15),
                  )
            }
            width={
              dpWidth(80) > dpWidth(`${number}`.length * 16)
                ? dpWidth(DeviceInfo.isTablet() ? 60 : 80)
                : dpWidth(
                    `${number}`.length * (DeviceInfo.isTablet() ? 14 : 20),
                  )
            }
          />
          <Text style={styles.cardmainboxnumber}>{number ? number : '0'}</Text>
        </View>
        <Text style={styles.cardmainboxtext}>{cardTitle}</Text>
      </View>
    </LinearGradient>
  </Pressable>
);

export default CustomCard;

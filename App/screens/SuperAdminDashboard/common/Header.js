/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Color, font, string} from '../../../constants';
import Bell from '../../../assets/images/Elaam_Icons/Bell';
import Vector from '../../../assets/images/Elaam_Icons/Vector';
import Filter from '../../../assets/images/Elaam_Icons/Filter';
import styles from './style';
import Background from '../../../assets/images/Elaam_Icons/Background';
import {appScreen} from '../../../utils/responsive/SizeUtil';
import {backg} from '../../../assets';

export default Header = props => {
  const navigation = useNavigation();
  const route = useRoute();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <View style={styles.headerView}>
      <View style={styles.background_view}>
        <Background />
      </View>
      <View style={styles.headerTxtView}>
        <Text style={styles.headertxt}>{props.heading}</Text>
      </View>
      <View style={styles.headerIconView}>
        {props.heading === 'SEND MESSAGE' ||
        props.heading === string.PrivacyPolicy ? null : (
          <TouchableOpacity
            onPress={() => navigation.navigate(string.SendMessage)}
            style={styles.headerVectorView}>
            <Vector style={styles.headerVector} />
          </TouchableOpacity>
        )}
        {props.heading === string.PrivacyPolicy ? null : (
          <TouchableOpacity
            onPress={() => navigation.navigate(string.NotificationScreen)}
            style={styles.headerVectorView}>
            <Bell />
          </TouchableOpacity>
        )}
        {props.heading === 'TOTAL NIYATS' ||
        props.heading === 'ACTIVE' ||
        props.heading === 'APPROVAL PENDING' ||
        props.heading === 'SEND MESSAGE' ||
        props.heading === string.PrivacyPolicy ||
        props.heading === 'COMPLETED' ? null : (
          <View style={styles.headerFilterView}>
            <TouchableOpacity
              style={styles.headerVector}
              onPress={() => {
                navigation.navigate(string.Filter);
              }}>
              <Filter style={styles.headerVector} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

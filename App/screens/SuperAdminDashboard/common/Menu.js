/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, Pressable, Platform, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Badge} from 'react-native-paper';
import Background from '../../../assets/images/Elaam_Icons/Background';

import {Color, font} from '../../../constants';
import {backg} from '../../../assets';
import {appScreen} from '../../../utils/responsive/SizeUtil';

export default Menu = () => {
  const [headerTitle, setheaderTitle] = useState(true);
  const [count, setcount] = useState(0);
  const navigation = useNavigation();
  useEffect(() => {}, [headerTitle]);

  return (
    <View style={styles.container}>
      <View style={styles.background_view}>
        <Background />
      </View>
      <Appbar.Action
        icon="menu"
        color="#b73109"
        onPress={() => navigation.openDrawer()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.bgColor,
    // marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  background_view: {position: 'absolute'},
});

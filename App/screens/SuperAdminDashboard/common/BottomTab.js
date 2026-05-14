/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Dimensions, TouchableOpacity} from 'react-native';
import styles from './style';
import {default as CommonStyle} from '../common/style';
import {useSelector} from 'react-redux';

export default BottomTab = props => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const tab_type = useSelector(state => state.CommonReducer.tab_type);
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={
        tab_type === props.TabName
          ? CommonStyle.bottomImg_dark
          : CommonStyle.bottomImg_light
      }>
      {props.image}

      <Text
        style={
          tab_type === props.TabName
            ? CommonStyle.bottomTxt_light
            : CommonStyle.bottomTxt_dark
        }>
        {props.TabName}
      </Text>
    </TouchableOpacity>
  );
};

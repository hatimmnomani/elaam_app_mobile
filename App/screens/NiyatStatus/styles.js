/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import {StyleSheet} from 'react-native';
import {Color, font} from '../../constants';
import DeviceInfo from 'react-native-device-info';
import {dpHeight} from '../../utils/SizeInDp';
export default styles = StyleSheet.create({
  MainContainer: {
    backgroundColor: Color.bgColor,
    flex: 1,
  },
  BaseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  text: {
    color: Color.titleColor,
    fontSize: font.fontSizes15,
    fontWeight: 'bold',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: Color.white,
    marginHorizontal: 55,
    borderRadius: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: Color.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    marginLeft: 290,
  },
  textStyle: {
    color: Color.titleColor,
    fontSize: font.fontSizes20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  first_view: {paddingStart: 5},
  bach_arow_icon_view: {flexDirection: 'row', alignItems: 'center'},
  bach_arow_icon: {marginRight: '3%'},
  txt_input: {
    width: '53%',
    // borderBottomWidth: 1,
    backgroundColor: 'none',
    borderBottomColor: Color.headtextColor,
    padding: 0,
    margin: 0,
    height: dpHeight(40),
    justifyContent: 'center',
  },
  list_view: {
    marginTop: '3%',
    paddingBottom: '5%',
    marginBottom: DeviceInfo.isTablet() ? '30%' : '40%',
  },
});

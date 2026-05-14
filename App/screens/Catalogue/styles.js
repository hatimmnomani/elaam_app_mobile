/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import {StyleSheet, Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Color, font} from '../../constants';
import {dpFont, dpWidth} from '../../utils/SizeInDp';
import COLOR from '../../constants/colors';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const tab = {
  borderRadius: 5,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: windowWidth * 0.03,
  height: windowWidth * 0.1,
  width: windowWidth * 0.44,
};

const tabTxt = {
  fontSize: font.fontSizes,
  fontWeight: '500',
};
export default style = StyleSheet.create({
  row: {
    marginBottom: '45%',
    paddingVertical: windowWidth * 0.05,
    borderRadius: 5,
  },
  row1: {
    marginTop: windowWidth * 0.05,
    backgroundColor: Color.cataloguebgColor,
    padding: windowWidth * 0.045,
    borderRadius: 7,
    //marginHorizontal: windowWidth * 0.06,
    elevation: 4,
    // justifyContent: 'center',
  },
  count: {
    height: windowWidth * 0.06,
    width: windowWidth * 0.06,
    borderRadius: 100,
    backgroundColor: COLOR.white,
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: windowWidth * 0.02,
    right: dpWidth(4),
    alignContent: 'center',
    justifyContent: 'center',
    // marginEnd: windowWidth * 0.02,
  },
  countTxt: {
    fontSize: dpFont(13),
    color: Color.black,
    textAlign: 'center',
    fontWeight: '500',
    alignItems: 'center',
    alignSelf: 'center',
    // backgroundColor: 'red',
  },
  catalogue: {
    fontSize: font.fontSizes16,
    color: Color.titleColor,
    marginLeft: windowWidth * 0.03,
    marginTop: windowWidth * 0.03,
    fontWeight: '500',
  },
  card: {
    backgroundColor: Color.bgColor,
    alignItems: 'center',
    borderRadius: 5,
    // flex: 1,
    margin: windowWidth * 0.005,
    paddingVertical: dpWidth(18),
  },
  card2: {
    // paddingLeft: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth * 0.02,
  },
  card3: {
    backgroundColor: Color.bgColor,
    borderRadius: 100,
    //padding: windowWidth * 0.07,
  },
  image: {
    height: windowWidth * 0.25,
    width: windowWidth * 0.25,
    borderRadius: 100,
  },
  text: {
    bottom: windowWidth * 0.09,
    color: Color.subtextColor,
    fontSize: font.fontSizes,
    fontWeight: '500',
  },
  text2: {
    bottom: windowWidth * 0.09,
    color: Color.subtextColor,
    fontSize: font.fontSizes,
    fontWeight: '500',
    marginBottom: -35,
  },
  reward: {
    color: Color.titleColor,
    fontSize: font.fontSizes16,
    fontWeight: '500',
  },
  buttontext: {
    color: Color.black,
    fontSize: font.fontSizes12,
    fontWeight: '500',
  },
  buttontext2: {
    color: Color.black,
    fontSize: font.fontSizes15,
    fontWeight: '700',
  },
  lineargradient: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.03,
    height: windowWidth * 0.1,
    width: windowWidth * 0.39,
  },
  lineargradient2: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.02,
    paddingVertical: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.04,
    marginLeft: 10,
    marginHorizontal: 10,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: windowWidth * 0.08,
  },
  modalView: {
    margin: '10%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: windowWidth * 0.01,
    alignItems: 'center',
  },
  trophytext1: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    // backgroundColor: 'red',
    bottom: DeviceInfo.isTablet() ? '25%' : '32%',
  },
  trophytext2: {
    fontWeight: 'bold',
    marginRight: '2.3%',
    color: 'black',
    fontSize: dpFont(14),
    textAlign: 'center',
    alignSelf: 'center',
  },
  redeemTab: {
    ...tab,
    backgroundColor: COLOR.drawarActiveTextColor,
  },
  achieveTab: {
    ...tab,
    backgroundColor: COLOR.drawarActiveTintColor,
  },
  redeemTxt: {
    ...tabTxt,
    color: Color.black,
  },
  achieveTxt: {
    ...tabTxt,
    color: Color.white,
  },
});

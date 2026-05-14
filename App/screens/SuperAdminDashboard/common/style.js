import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import {Color, font} from '../../../constants';
import Fonts from '../../../constants/fonts';
import {dpHeight, dpWidth} from '../../../utils/SizeInDp';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const bottomImg = {
  alignItems: 'center',
  height: windowHeight * 0.08,
  // paddingVertical: 10,
  justifyContent: 'center',
};
const bottomTxt = {
  fontSize: Fonts.fontSizes13,
  fontWeight: '400',
  textAlign: 'center',
};

export default style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowWidth * 0.03,
    width: '100%',
  },
  cardmainbox: {
    borderRadius: 18,
    width: windowWidth * 0.44,
    // backgroundColor: 'red',
  },
  itemContainer: {
    flex: 1,
    marginHorizontal: windowWidth * 0.03,
    height: windowHeight * 0.2,
  },
  itemBorder: {
    height: windowWidth * 0.25,
    width: windowWidth * 0.27,
    position: 'absolute',
  },
  itemCountTxt: {
    position: 'absolute',
    fontSize: font.dashboardCountSize,
    fontWeight: 'bold',
    color: Color.titleColor,
  },
  itenCountView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    height: dpHeight(70),
  },
  itemTxt: {
    fontWeight: 'bold',
    fontSize: Fonts.dashboardTextSize,
    color: Color.titleColor,
  },
  itemBoxView: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  headerView: {
    backgroundColor: Color.bgColor,
    flexDirection: 'row',
  },
  headerTxtView: {
    justifyContent: 'space-between',
    width: '50%',
    flexGrow: 1,
  },
  headertxt: {
    color: Color.headtextColor,
    fontWeight: '700',
    fontSize: font.fontSizes20,
    paddingStart: '5%',
    paddingVertical: windowWidth * 0.025,
  },
  headerIconView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: '2%',
    alignContent: 'center',
    alignItems: 'center',
  },
  headerVectorView: {
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: '4%',
  },
  headerVector: {alignSelf: 'center'},
  headerFilterView: {
    paddingHorizontal: windowWidth * 0.02,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    paddingEnd: windowWidth * 0.05,
  },
  bottomTab: {alignItems: 'center', height: windowHeight * 0.09, padding: 10},

  bottomImg: {...bottomImg},
  bottomImg_dark: {
    ...bottomImg,
    backgroundColor: Color.bottomTab,
  },
  bottomImg_light: {
    ...bottomImg,
    backgroundColor: Color.white,
  },

  bottomTxt: {...bottomImg},
  bottomTxt_dark: {
    ...bottomTxt,
    color: Color.black,
  },
  bottomTxt_light: {
    ...bottomTxt,
    color: Color.white,
    fontWeight: '700',
  },

  cardmainboximage: {
    height: windowWidth * 0.25,
    width: windowWidth * 0.27,
    position: 'absolute',
  },
  cardmainboxstyle: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    paddingVertical: windowWidth * 0.08,
    paddingHorizontal: windowWidth * 0.016,
  },
  cardmainboxborder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: windowWidth * 0.05,
  },
  cardmainboxnumber: {
    position: 'absolute',
    fontSize: font.fontSize30,
    fontWeight: 'bold',
  },
  cardmainboxtext: {
    fontWeight: 'bold',
    fontSize: font.fontSizes15,
    color: Color.titleColor,
  },
  linear_gradient: {borderRadius: 15, borderWidth: 1, borderColor: '#FCE09C'},
  background_view: {position: 'absolute'},
});

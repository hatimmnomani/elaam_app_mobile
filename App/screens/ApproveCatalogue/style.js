/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {Color, font} from '../../constants';
import {dpFont, dpHeight, dpWidth} from '../../utils/SizeInDp';
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
    elevation: 4,
  },
  count: {
    height: windowWidth * 0.06,
    width: windowWidth * 0.06,
    borderRadius: 100,
    backgroundColor: Color.white,
    alignSelf: 'flex-end',
    position: 'absolute',
    marginTop: windowWidth * 0.02,
    right: dpWidth(4),
    alignContent: 'center',
    justifyContent: 'center',
  },
  countTxt: {
    fontSize: dpFont(13),
    color: Color.black,
    textAlign: 'center',
    fontWeight: '500',
    alignItems: 'center',
    alignSelf: 'center',
  },
  viewReward: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: windowWidth * 0.01,
  },
  catalogue: {
    fontSize: font.fontSizes16,
    color: Color.titleColor,
    marginLeft: windowWidth * 0.03,
    marginTop: windowWidth * 0.03,
    fontWeight: '500',
    alignSelf: 'center',
    alignContent: 'center',
  },
  card: {
    backgroundColor: Color.bgColor,
    alignItems: 'center',
    // paddingBottom: windowWidth * 0.06,
    borderRadius: 5,
    // flex: 1,
    // margin: windowWidth * 0.005,
    // paddingVertical: dpWidth(35),
    paddingBottom: dpWidth(34),
    paddingTop: dpWidth(15),
  },
  card2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: windowWidth * 0.02,
  },
  card3: {
    backgroundColor: Color.bgColor,
    borderRadius: 100,
  },
  achieveView: {
    flexDirection: 'row',
    paddingHorizontal: windowWidth * 0.05,
  },
  image: {
    height: windowWidth * 0.2,
    width: windowWidth * 0.2,
    borderRadius: 100,
  },
  text: {
    bottom: windowWidth * 0.02,
    color: Color.subtextColor,
    fontSize: font.fontSizes,
    fontWeight: 'bold',
  },
  text2: {
    bottom: windowWidth * 0.02,
    color: Color.subtextColor,
    fontSize: font.fontSizes,
    fontWeight: 'bold',
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
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.02,
    paddingVertical: windowWidth * 0.02,
    paddingHorizontal: windowWidth * 0.04,
    marginLeft: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e5b43b',
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
    position: 'relative',
    width: '100%',
    bottom: DeviceInfo.isTablet() ? '16%' : '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophytext2: {
    fontWeight: 'bold',
    color: Color.white,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: dpFont(11),
  },
  MainContainer: {
    backgroundColor: '#faf7e4',
    flex: 1,
  },
  BaseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  approverCatView: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.bgColor,
  },
  RewardView: {
    backgroundColor: Color.bgColor,
  },
  RewardTxt: {
    color: '#836f3b',
    fontSize: font.fontSizes16,
    fontWeight: 'bold',
    paddingLeft: '2%',
  },
  RewardList: {marginTop: '3%', marginBottom: windowHeight * 0.17},
  RewardBtn: {
    borderRadius: 5,
    justifyContent: 'center',
    marginLeft: '2%',
    height: windowHeight * 0.05,
    width: windowWidth * 0.09,
  },
  backIcon: {marginRight: '3%', alignSelf: 'center'},
  RewardListView: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: '8%',
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: '3%',
  },
  itemTitleView: {flexDirection: 'column', flex: 1},
  TitleHeading: {
    color: Color.black,
    fontSize: font.fontSizes12,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  TitleHeadingR: {
    color: Color.black,
    fontSize: font.fontSizes12,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  itemBorder: {
    borderRadius: 5,
    paddingHorizontal: 2,
    paddingVertical: 2,
  },
  TitleData: {
    color: Color.black,
    fontSize: font.fontSizes12,
    paddingTop: '2%',
  },
  TitleDataR: {
    color: Color.black,
    textAlign: 'right',
    fontSize: font.fontSizes11,
  },
  scrollView: {
    marginVertical: windowWidth * 0.05,
    marginHorizontal: windowWidth * 0.045,
  },
  lineargradientBorder: {
    borderRadius: 5,
    paddingHorizontal: windowWidth * 0.005,
    paddingVertical: windowWidth * 0.005,
  },
  TrophiesList: {
    backgroundColor: Color.bgColor,
    paddingBottom: windowWidth * 0.05,
  },
  redeemTxt: {
    fontSize: font.fontSizes22,
    fontWeight: 'bold',
    marginBottom: windowWidth * 0.02,
    color: 'black',
  },
  popupDataTxt: {
    fontSize: font.fontSizes17,
    fontWeight: '500',
    textAlign: 'center',
  },
  popUpConfirm: {flexDirection: 'row', margin: windowWidth * 0.035},
  descriptionTxt: {
    fontSize: font.fontSizes17,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'flex-start',
    color: Color.black,
    paddingHorizontal: '10%',
    paddingBottom: '10%',
  },
  descriptionData: {
    fontSize: font.fontSizes17,
    fontWeight: '500',
    textAlign: 'center',
    color: Color.grey,
  },
  titleTxt: {
    fontSize: font.fontSizes17,
    paddingHorizontal: '10%',
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'flex-start',
    color: Color.black,
  },
  titleData: {
    fontSize: font.fontSizes17,
    fontWeight: '500',
    color: Color.grey,
  },
  catalogueTxt: {
    fontSize: font.fontSizes22,
    fontWeight: 'bold',
    marginBottom: windowWidth * 0.02,
    color: 'black',
  },
  RewardListContainer: {
    marginBottom: 20,
    paddingHorizontal: '3%',
  },
  close_icon: {color: 'black', marginLeft: 33},
  icon_last_view: {width: '20%'},
  icon_start_view: {width: '80%'},
  icon_row_view: {flexDirection: 'row'},
  title_view: {alignItems: 'center'},
  img: {height: 150, width: 150, marginRight: '3.4%'},
  description_view: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  main_view: {paddingHorizontal: 10},
  card_style: {backgroundColor: Color.white},
  card_container_style: {justifyContent: 'center'},

  fast_img: {
    height: DeviceInfo.isTablet() ? 250 : 150,
    width: DeviceInfo.isTablet() ? 250 : 150,
    marginRight: '3.4%',
  },
  redeemTab: {
    ...tab,
    backgroundColor: Color.drawarActiveTextColor,
  },
  achieveTab: {
    ...tab,
    backgroundColor: Color.drawarActiveTintColor,
  },
  redeemTxt2: {
    ...tabTxt,
    color: Color.black,
  },
  achieveTxt: {
    ...tabTxt,
    color: Color.white,
  },
  redeemTrophyView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: dpHeight(9),
  },
});

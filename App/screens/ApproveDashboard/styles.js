/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { Dimensions, Platform, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Color, font } from '../../constants';
import { appScreen } from '../../utils/responsive/SizeUtil';
import { dpFont, dpHeight, dpWidth } from '../../utils/SizeInDp';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // marginBottom: windowWidth * 0.03,
    width: '100%',
  },
  BaseContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowWidth * 0.03,
  },
  main: {
    width: '100%',
    height: '100%',
    backgroundColor: Color.bgColor,
  },
  text: {
    color: Color.titleColor,
    // marginTop: 20,
    // marginBottom: 10,
    fontSize: font.fontSizes16,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
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
  card: {
    flex: 1,
    margin: windowWidth * 0.005,
    backgroundColor: Color.bgColor,
    alignItems: 'center',
    borderRadius: 5,
    paddingVertical: dpWidth(18),
  },
  title: {
    color: Color.titleColor,
    fontSize: font.fontSizes16,
    fontWeight: '500',
  },
  trophytext1: {
    position: 'relative',
    width: '100%',
    bottom: DeviceInfo.isTablet() ? '10%' : '9%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophytext2: {
    fontWeight: 'bold',
    color: Color.white,
    textAlign: 'center',
    marginRight: DeviceInfo.isTablet() ? '0%' : '1%',
    alignSelf: 'center',
    fontSize: dpFont(11),
  },
  linear: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: Color.black,
    fontSize: windowWidth * 0.035,
    fontWeight: '500',
    paddingHorizontal: windowWidth * 0.2,
    paddingVertical: windowWidth * 0.024,
  },
  img_border: {
    borderRadius: 5,
    // borderWidth:1,
    // paddingHoriontal: windowWidth * 0.005,
    // paddingVertical: windowWidth * 0.005,
    marginVertical: windowWidth * 0.05,
    // marginHorizontal: windowWidth * 0.04,
  },
  blue_throphy: {
    height: DeviceInfo.isTablet() ? 250 : 150,
    width: DeviceInfo.isTablet() ? 250 : 150,
    marginRight: '3%',
  },
  Redeemed_txt: {
    bottom: windowWidth * 0.03,
    color: Color.subtextColor,
    fontSize: font.fontSizes,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  scrol_view: {
    flex: 1,
    marginBottom: 0,
  },
  card_content_style: { alignItems: 'center' },
  drop_down_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
  },
  drop_down_view2: {
    flexDirection: 'row',
    width: '50%',
    alignItems: 'center',
    paddingRight: 8,
  },
  drop_down_ain_view: {
    width: '50%',
    alignItems: 'flex-end',
    paddingLeft: 8,
  },
  selectDrop_down_btn: {
    fontSize: font.fontSizes15,
    color: Color.bloodMoon,
    textAlign: 'center',
    paddingLeft: 8,
  },
  selectDrop_down_color: {
    backgroundColor: Color.bgColor,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Color.bloodMoon,
    height: 40,
    width: '100%',
  },
  durationDropDownTxt: {
    fontSize: font.fontSizes15,
    color: Color.bloodMoon,
    textAlign: 'center',
    paddingLeft: 8,
  },
  scrol_view2: {
    flex: 1,
    marginHorizontal: 15,
    paddingBottom: 0,
    backgroundColor: 'transparent',
  },
  filter_data_txt: {
    position: 'absolute',
    fontSize: font.fontSize30,
    fontWeight: 'bold',
    color: Color.titleColor,
  },
  approval_pending_txt: {
    fontWeight: 'bold',
    fontSize: font.fontSizes15,
    color: Color.titleColor,
  },
  approved_txt: {
    position: 'absolute',
    fontSize: font.fontSize30,
    fontWeight: 'bold',
    color: Color.titleColor,
  },
  approved_niyat_text: {
    fontWeight: 'bold',
    fontSize: font.fontSizes15,
    color: Color.titleColor,
  },
  back_icon: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginRight: '3%',
  },
  list_view: { marginTop: '3%' },
  input_style: {
    borderBottomWidth: 1.2,
    backgroundColor: 'transparent',
    borderBottomColor: Color.headtextColor,
    width: '45%',
    paddingHorizontal: 0,
    paddingLeft: 0,
    paddingTop: 0,
    marginLeft: 0,
    height: 40,
    paddingBottom: 2,
  },
  search_icon_style: {
    marginLeft: 0,
    marginRight: dpWidth(28),
  },
  linear_gredient: { borderRadius: 18 },
  border_img: {
    height: windowWidth * 0.25,
    width: windowWidth * 0.27,
    position: 'absolute',
  },
  niyat_box_view: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 5,
  },
  niyat_small_box_view: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    height: dpHeight(70),
  },
  niyat_box_back_view: {
    flexDirection: 'row',
    marginBottom: windowWidth * 0.09,
    paddingTop: windowWidth * 0.04,
    justifyContent: 'space-between',
  },
  pressable_view: {
    justifyContent: 'center',
    width: '47%',
    height: appScreen.height * 0.2,
  },
  durationDropDownTxt: {
    fontSize: font.fontSizes15,
    color: Color.bloodMoon,
    textAlign: 'right',
  },
});

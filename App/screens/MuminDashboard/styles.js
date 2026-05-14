/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import { Dimensions, StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Color, font } from '../../constants';
import { dpFont } from '../../utils/SizeInDp';

const windowWidth = Dimensions.get('window').width;
// eslint-disable-next-line no-unused-vars
const windowHeight = Dimensions.get('window').height;
export default style = StyleSheet.create({
  card: {
    flex: 1,
    marginBottom: windowWidth * 0.002,
    backgroundColor: Color.bgColor,
    alignItems: 'center',
    borderRadius: 5,
  },
  title: {
    color: Color.titleColor,
    fontSize: font.fontSizes16,
    fontWeight: '500',
    alignSelf: 'center',
  },
  button: {
    color: Color.black,
    fontSize: windowWidth * 0.04,
    fontWeight: '500',
    paddingHorizontal: windowWidth * 0.26,
    paddingVertical: windowWidth * 0.024,
  },
  button_quiz: {
    color: Color.black,
    fontSize: windowWidth * 0.04,
    fontWeight: '500',
    width: windowWidth * 0.8,
    textAlign: 'center',
    paddingVertical: windowWidth * 0.024,
  },
  linear: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: windowWidth * 0.01,
    marginTop: windowWidth * 0 - 86,
    color: Color.subtextColor,
    fontSize: font.fontSizes,
    fontWeight: 'normal',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: windowWidth * 0.03,
    width: '100%',
  },
  cardmainbox: {
    borderRadius: 18,
    width: '47%',
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
    justifyContent: 'center',
  },
  cardmainboxborder: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: windowWidth * 0.05,
  },
  cardmainboxnumber: {
    position: 'absolute',
    fontSize: font.dashboardCountSize,
    fontWeight: 'bold',
  },
  cardmainboxtext: {
    fontWeight: 'bold',
    fontSize: font.dashboardTextSize,
    color: Color.titleColor,
  },
  trophytext1: {
    position: 'relative',
    zIndex: 1000,
    width: '100%',
    bottom: DeviceInfo.isTablet() ? '27%' : '28%',
  },
  trophytext2: {
    fontWeight: 'bold',
    color: Color.black,
    textAlign: 'center',
    marginRight: '3%',
    fontSize: dpFont(12),
  },
  icon1text1: {
    flex: 1,
    position: 'absolute',
    top: windowWidth * 0.18,
    left: windowWidth * 0.25,
  },
  icon1text2: {
    fontWeight: 'bold',
    color: Color.black,
    fontSize: font.fontSizes20,
  },
  icon2text1: {
    flex: 1,
    position: 'absolute',
    top: windowWidth * 0.6,
    left: windowWidth * 0.25,
  },
  icon2text2: {
    fontWeight: 'bold',
    color: Color.black,
    fontSize: font.fontSizes23,
    justifyContent: 'center',
  },
  icontext2: {
    fontWeight: 'bold',
    color: Color.black,
    fontSize: font.fontSizes25,
    justifyContent: 'center',
    marginLeft: '15%',
    alignSelf: 'center',
  },
  gradientStyle: { borderRadius: 18 },
  totalNiytView: {
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    marginTop: windowHeight * 0.09,
  },
  troffyView: { alignItems: 'center', flex: 1, width: '100%' },
  totalDoneNiyatText: {
    color: Color.subtextColor,
    fontSize: font.fontSizes,
    position: 'absolute',
    marginTop: windowHeight * 0.22,
  },
  totalDoneNiyatView: {
    alignItems: 'center',
    flex: 1,
    position: 'absolute',
    marginTop: windowHeight * 0.1,
  },
  cardView: { alignItems: 'center' },
  linearGradientCard: {
    borderRadius: 5,
    paddingHorizontal: windowWidth * 0.005,
    paddingVertical: windowWidth * 0.005,
    marginVertical: windowWidth * 0.05,
  },
  redeemText: {
    bottom: windowWidth * 0.15,
    color: Color.subtextColor,
    fontSize: font.fontSizes,
  },
  scrolView: { flex: 1, marginHorizontal: windowWidth * 0.03 },
  antIcon: { justifyContent: 'center', alignSelf: 'center' },
  mainView: { width: '100%', height: '100%', backgroundColor: Color.bgColor },
  txt: {
    fontSize: font.fontSizes16,
    color: Color.titleColor,
    marginLeft: 10,
    marginTop: 14,
    fontWeight: '500',
  },
  dropDownView: { flexDirection: 'row', paddingHorizontal: '2%' },
  dropDownMainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  selectDropDownBtn: {
    fontSize: font.fontSizes15,
    color: Color.bloodMoon,
    textAlign: 'right',
    flex: 1,
    paddingRight: 10, // Add padding to prevent text from touching the icon
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.bgColor,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    minWidth: 150,
    alignSelf: 'center', // Center the button itself
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dropdownItemText: {
    fontSize: font.fontSizes15,
    color: Color.titleColor,
    textAlign: 'center',
    width: '100%',
  },
  dropdownMenu: {
    backgroundColor: Color.bgColor,
    borderRadius: 4,
    marginTop: 8,
    maxHeight: 200,
    minWidth: 150, // Match the button width
    width: 'auto',
  },
  mainCalligraphyPanel: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth * 0.7,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
});

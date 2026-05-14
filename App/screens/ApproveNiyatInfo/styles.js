/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import {StyleSheet, Dimensions} from 'react-native';
import {Color, font} from '../../constants/index';
import {dpHeight} from '../../utils/SizeInDp';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default styles = StyleSheet.create({
  row: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: Color.bgColor,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#e5b43b',
    borderRadius: 10,
  },
  text: {
    fontSize: font.fontSizes12,
    color: Color.titleColor,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  ctext: {
    fontSize: 14,
    color: Color.titleColor,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginBottom: 10,
    textAlign: 'center',
  },
  /* Niyat Infromation Model Style  */

  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },

  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 10,
  },
  modalView2: {
    marginHorizontal: '10%',
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    // paddingBottom: '10%',
    height: windowHeight / 3.9,
  },
  buttonClose: {
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingTop: 10,
  },
  textStyle: {
    color: Color.titleColor,
    fontSize: font.fontSizes20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  linear: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    color: Color.black,
    fontSize: windowWidth * 0.04,
    fontWeight: '500',

    paddingHorizontal: windowWidth * 0.1,
    paddingVertical: windowWidth * 0.015,
  },
  textBox: {
    borderColor: 'red',
    borderRadius: 5,
    borderWidth: 0.5,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'baseline',
    padding: 5,
    marginBottom: 10,
  },
  qtext: {
    fontSize: font.fontSizes12,
    color: Color.titleColor,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  scrollView: {flex: 1, height: height},
  revertView: {
    // flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    height: windowHeight,
  },
  gift_view: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
  },
  gift_txt: {
    fontSize: font.fontSizes25,
    fontWeight: 'bold',
    color: Color.bottomTab,
    paddingTop: '7%',
    textAlign: 'center',
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  close_icon: {
    paddingTop: '7%',
    // marginTop: 25,
    // left: 7,
  },
  button_View: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    position: 'absolute',
    bottom: dpHeight(20),
  },
  lineargradient2: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: windowWidth * 0.02,
    paddingVertical: windowWidth * 0.01,
    paddingHorizontal: windowWidth * 0.04,
    marginLeft: 10,
    marginHorizontal: 10,
  },
  buttontext1: {
    color: Color.headtextColor,
    fontSize: font.fontSizes15,
    fontWeight: '400',
  },
  buttontext2: {
    color: Color.black,
    fontSize: font.fontSizes15,
    fontWeight: '400',
  },
  itemBorder: {
    height: windowWidth * 0.25,
    width: windowWidth * 0.27,
    position: 'absolute',
  },
  scroll_view: {
    flexDirection: 'row',
    marginHorizontal: 15,
    marginVertical: 15,
  },
  niyat_txt: {
    fontSize: font.fontSizes16,
    fontWeight: 'bold',
    color: Color.titleColor,
    marginLeft: 10,
  },
  radioView: {flexDirection: 'row', marginBottom: 5},
  yes_txt: {
    fontSize: font.fontSizes,
    color: '#573802',
    marginLeft: 5,
    marginRight: 10,
  },
  no_txt: {
    fontSize: font.fontSizes,
    color: '#573802',
    marginLeft: 5,
  },
  trophy_view: {
    width: '100%',
    height: 30,
  },
  trophy_txt: {
    fontSize: font.fontSizes13,
    fontWeight: 'bold',
    color: Color.grey,
  },
  calanderView: {flexDirection: 'row', justifyContent: 'space-between'},

  niyatFillDateTxt: {
    fontSize: font.fontSizes,
    color: Color.titleColor,
    marginLeft: 10,
  },
  dateTxt: {fontSize: font.fontSizes, color: Color.titleColor},
  viewNiyatFormTxt: {
    fontSize: font.fontSizes,
    color: 'blue',
    marginLeft: 10,
  },
  timeboundTxt: {
    fontSize: font.fontSizes,
    color: Color.titleColor,
    marginBottom: 10,
  },
  pendingView: {
    marginLeft: 10,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'red',
  },
  doneView: {
    marginLeft: 10,
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: '#55A566',
  },
  pending_txt: {
    // backgroundColor: 'red',
    paddingHorizontal: 15,
    paddingVertical: 0.5,
    color: Color.titleColor,
    fontSize: font.fontSizes,
  },
  done_txt: {
    paddingHorizontal: 15,
    paddingVertical: 0.5,
    color: '#573802',

    fontSize: font.fontSizes,
  },

  revert_txt: {
    textAlign: 'center',
    color: '#573802',
    fontSize: font.fontSizes12,
    fontWeight: 'bold',
  },
});

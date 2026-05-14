/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {Color, font} from '../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    //backgroundColor:'#bb3609',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 90,
    marginBottom: 26,
    height: windowHeight * 0.35,
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
  },
  toast: {zIndex: 3000},
  liner_gradient: {paddingVertical: 10, flex: 1},
  imgView: {position: 'absolute', flex: 1},
  img_style: {height: height * 1.2, width: width},
  text: {
    color: Color.white,
    fontSize: font.fontSizes25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  txt_view: {
    backgroundColor: Color.WelcomePageSubBgColor,
    paddingVertical: 45,
    paddingHorizontal: 50,
    marginHorizontal: 20,
  },
});

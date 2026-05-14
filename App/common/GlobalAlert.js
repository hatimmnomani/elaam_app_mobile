import React from 'react';

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeModal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {setGlobalAlertData} from '../../redux/actions';
import {popup} from '../assets';

import {Color, font, string} from '../constants';
import {ReduxActionCreators} from '../redux/ActionsCreators';
import {MyConsole} from '../utils/MyConsole';
//import CloseButton from '../buttons/CloseButton';
import {appScreen} from '../utils/responsive/SizeUtil';

const GlobalAlert: React.FC = () => {
  const globalAlert = useSelector(state => state.CommonReducer.global_alert);
  MyConsole.log('GlobalAlert', globalAlert);
  const dispatch = useDispatch();

  return (
    <ReactNativeModal isVisible={globalAlert.isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.imgView}>
          <ImageBackground
            source={popup}
            resizeMode={'stretch'}
            style={styles.img_background}>
            <View style={styles.modalView}>
              <Text style={styles.redeemTxt}>{string.REDEEM_NOW_Button}</Text>
              <Text style={styles.popupDataTxt}>{string.NOTHAVE}</Text>
              <View style={styles.popUpConfirm}>
                {globalAlert.isCancel ? (
                  <TouchableOpacity onPress={() => {}}>
                    <LinearGradient
                      colors={Color.gradientColor}
                      mode="contained"
                      style={styles.lineargradient2}>
                      <Text style={styles.buttontext2}>{string.Cancel}</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : null}
                {globalAlert.isSubmit ? (
                  <TouchableOpacity
                    onPress={() => {
                      // getreduceTrophies();
                      // setModalVisible(false);
                    }}>
                    <LinearGradient
                      colors={Color.gradientColor}
                      mode="contained"
                      style={styles.lineargradient2}>
                      <Text style={styles.buttontext2}> {string.Confirm} </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          </ImageBackground>
        </View>
      </View>
    </ReactNativeModal>
  );
};
const styles = StyleSheet.create({
  buttontext2: {
    color: Color.black,
    fontSize: font.fontSizes15,
    fontWeight: '700',
  },
  lineargradient: {
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: appScreen.width * 0.03,
    height: appScreen.width * 0.1,
    width: appScreen.width * 0.39,
  },
  lineargradient2: {
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: appScreen.width * 0.02,
    paddingVertical: appScreen.width * 0.02,
    paddingHorizontal: appScreen.width * 0.04,
    marginLeft: 10,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#e5b43b',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: appScreen.width * 0.08,
  },
  modalView: {
    margin: '10%',
    // backgroundColor: 'white',
    borderRadius: 10,
    padding: appScreen.width * 0.01,
    alignItems: 'center',
  },
  redeemTxt: {
    fontSize: font.fontSizes22,
    fontWeight: 'bold',
    marginBottom: appScreen.width * 0.02,
    color: Color.bottomTab,
  },
  popupDataTxt: {
    fontSize: font.fontSizes17,
    fontWeight: '500',
    textAlign: 'center',
    color: Color.black,
  },
  popUpConfirm: {flexDirection: 'row', margin: appScreen.width * 0.035},
  imgView: {
    backgroundColor: Color.white,
    width: '80%',
    alignSelf: 'center',
    padding: '2%',
    borderRadius: 15,
  },
  img_background: {borderRadius: 10},
});

export default GlobalAlert;

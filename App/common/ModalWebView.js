// add webview in modal react native ?
import React from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useDispatch, useSelector} from 'react-redux';
import ReactNativeModal from 'react-native-modal';

import {useNavigation} from '@react-navigation/native';

import COLOR from '../constants/colors';
import Style from '../screens/Login/Style';
import {MyConsole} from '../utils/MyConsole';
import {ReduxActionCreators} from '../redux/ActionsCreators';
import {loading} from '../redux/LoaderAction';
import {handleOneLogin} from '../services/authServices';

const ModalWebView = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const itsUrl = useSelector(state => state.CommonReducer.itsUrl);
  const modalwebview = useSelector(state => state.CommonReducer.modalwebview);
  const hideModal = () => {
    dispatch(ReduxActionCreators.modalwebview(false));
  };
  const onNavigationStateChange = navState => {
    MyConsole.log('navState', navState);
    if (navState.url.includes('com.elaam.niyat://loggedin#code=')) {
      MyConsole.log('url', navState.url);
      dispatch(loading(true));

      dispatch(handleOneLogin(navState.url, navigation));
    }
  };
  const Spinner = () => (
    <View style={Style.activityContainer}>
      <ActivityIndicator size="large" color={COLOR.black} />
    </View>
  );
  return (
    <SafeAreaView>
      <ReactNativeModal
        onBackdropPress={hideModal}
        onRequestClose={hideModal}
        // statusBarTranslucent
        //transparent={true}
        visible={modalwebview}
        style={styles.modal}>
        <View style={styles.modalv}>
          <View style={styles.modalContainer}>
            <KeyboardAvoidingView
              behavior={Platform.select({ios: 'position', android: null})}
              enabled
              contentContainerStyle={{flex: 1}}
              keyboardVerticalOffset={Platform.select({
                ios: 0,
                android: 20,
              })}
              style={{flexGrow: 1}}>
              <WebView
                renderLoading={Spinner}
                style={Style.web_view}
                source={{uri: itsUrl}}
                onNavigationStateChange={onNavigationStateChange}
                cacheEnabled={false}
                bounces={false}
                ignoreSslError={true}
                startInLoadingState={true}
                showsHorizontalScrollIndicator={false}
                scalesPageToFit
              />
            </KeyboardAvoidingView>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalv: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  ActivityIndicatorStyle: {
    flex: 1,
    justifyContent: 'center',
  },
});
export default ModalWebView;

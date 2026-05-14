import FastImage from '@d11/react-native-fast-image';
import { Component } from 'react';
import {
   Dimensions,
   ImageBackground,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { CatalogueGift, popup } from '../../assets';
import { Color, font } from '../../constants';
import { appScreen } from '../../utils/responsive/SizeUtil';
import { dpWidth } from '../../utils/SizeInDp';
import AlertManager from './CustomisableAlertManager';

export function showAlert(...args) {
  const ref = AlertManager.getDefault();
  if (ref) {
    ref.showAlert(...args);
  }
}

export function closeAlert() {
  const ref = AlertManager.getDefault();
  if (ref) {
    ref.closeAlert();
  }
}

export default class CustomisableAlert extends Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      title: null,
      header: null,
      btnLabel: null,
      leftBtnLabel: null,
      message: null,
      customAlert: null,
      alertType: null,
      onPress: null,
      onDismiss: null,
      customIcon: null,
      _dismissable: false,
      _animationIn: null,
      _animationOut: null,
      modalProps: {},
      screenHeight: Dimensions.get('screen').height,
      screenWidth: Dimensions.get('screen').width,
      image: '',
    };
    this.changeEventListener = null;
  }

  componentDidMount() {
    AlertManager.register(this);
    this.changeEventListener = Dimensions.addEventListener(
      'change',
      ({ screen }) => {
        this.setState({
          screenHeight: screen.height,
          screenWidth: screen.width,
        });
      },
    );
  }

  componentWillUnmount() {
    AlertManager.unregister(this);
    // Dimensions.removeEventListener('change');
    if (this.changeEventListener.remove()) {
      this.changeEventListener.remove();
    }
  }

  showAlert = ({
    customIcon,
    title,
    header,
    message,
    customAlert,
    alertType,
    onPress,
    dismissable,
    onDismiss,
    modalProps,
    animationIn,
    animationOut,
    btnLabel,
    leftBtnLabel,
    image,
  } = {}) => {
    this.setState(
      {
        title,
        message,
        header,
        customAlert,
        alertType,
        btnLabel,
        leftBtnLabel,
        onPress,
        onDismiss,
        customIcon,
        _dismissable: dismissable,
        _animationIn: animationIn,
        _animationOut: animationOut,
        modalProps,
        image,
      },
      () => this.setState({ visible: true }),
    );
  };

  closeAlert = () => {
    this.setState({ visible: false });
  };

  render() {
    const {
      backdropStyle,
      alertContainerStyle,
      defaultType = 'error',
      animationIn,
      animationOut,
      textStyle,
      titleStyle,
      defaultTitle = '',
      btnStyle,
      btnLeftStyle,
      btnRightStyle,
      defaultLeftBtnLabel = 'Cancel',
      defaultRightBtnLabel = 'Ok',
      btnLabelStyle,
      btnLeftLabelStyle,
      defaultWarningIcon,
      defaultSuccessIcon,
      defaultErrorIcon,
      btnRightLabelStyle,
      dismissable = false,
      modalProps = {},
    } = this.props;

    const {
      customIcon,
      title,
      header,
      message,
      onPress,
      onDismiss,
      visible,
      customAlert,
      alertType,
      _dismissable,
      leftBtnLabel,
      _animationIn,
      _animationOut,
      btnLabel,
      screenHeight,
      screenWidth,
      image,
    } = this.state;

    function getImage() {
      if (customIcon) {
        if (customIcon === 'none') {
          return null;
        }
        return customIcon;
      } else if (defaultWarningIcon) {
        return defaultWarningIcon;
      } else if (defaultSuccessIcon) {
        return defaultSuccessIcon;
      } else if (defaultErrorIcon) {
        return defaultErrorIcon;
      } else {
        return (
          <Text>tte</Text>
          //   <Image
          //     source={
          //       type === 'success'
          //         ? require('./icons/success.png')
          //         : type === 'warning'
          //         ? require('./icons/warning.png')
          //         : require('./icons/error.png')
          //     }
          //     style={styles.img}
          //   />
        );
      }
    }

    const type = alertType || defaultType;
    const ___title = title || defaultTitle;
    const ___header = header || '';
    const ___dismissable = _dismissable || dismissable;
    const ___animationIne = _animationIn || animationIn;
    const ___animationOut = _animationOut || animationOut;

    const centerBtnStyle = { ...styles.btn, ...btnStyle };
    const leftBtnStyle = { ...centerBtnStyle, ...btnLeftStyle };
    const centerOrLeftBtnStyle =
      type === 'warning' ? leftBtnStyle : centerBtnStyle;

    return (
      <Modal
        {...{ ...modalProps, ...this.state.modalProps }}
        animationIn={___animationIne}
        animationOut={___animationOut}
        isVisible={visible}
        useNativeDriver
        supportedOrientations={['landscape', 'portrait']}
        deviceHeight={screenHeight}
        deviceWidth={screenWidth}
        style={{ margin: 0 }}
        onBackdropPress={() => (___dismissable ? this.closeAlert() : {})}
      >
        {/* <View style={{...styles.container, ...backdropStyle}}>
          {type === 'custom' ? (
            customAlert || (
              <Text onPress={this.closeAlert}>
                Custom alertTypes needs a customAlert prop! Click here to close
              </Text>
            )
          ) : (
            <View style={{...styles.content, ...alertContainerStyle}}>
              <View style={styles.img_container} />

              <Text style={{...styles.title, ...titleStyle}}>{___title}</Text>

              {!!message && (
                <Text style={{...styles.text, ...textStyle}}>{message}</Text>
              )}

              <View style={styles.actions}>
                <TouchableOpacity
                  style={centerOrLeftBtnStyle}
                  onPress={
                    type === 'warning'
                      ? () => {
                          onDismiss && onDismiss();
                          this.closeAlert();
                        }
                      : () => {
                          onPress && onPress();
                          this.closeAlert();
                        }
                  }>
                  <Text
                    style={{
                      ...styles.btnText,
                      ...btnLabelStyle,
                      ...btnLeftLabelStyle,
                    }}>
                    {type === 'warning'
                      ? leftBtnLabel || defaultLeftBtnLabel || 'Cancel'
                      : btnLabel || defaultRightBtnLabel || 'Ok'}
                  </Text>
                </TouchableOpacity>

                {type === 'warning' && (
                  <TouchableOpacity
                    onPress={onPress}
                    ...styles.btn, ...btnStyle, ...btnRightStyle}}>
                    <Text
                      style={{
                        ...styles.btnText,
                        ...btnLabelStyle,
                        ...btnRightLabelStyle,
                      }}>
                      {btnLabel || defaultRightBtnLabel}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
        </View> */}
        <View style={styles.centeredView}>
          <View
            style={{
              backgroundColor: Color.white,
              width: '80%',
              alignSelf: 'center',
              // padding: '2%',
              borderRadius: 15,
            }}
          >
            <ImageBackground
              source={popup}
              resizeMode={'stretch'}
              style={{
                borderRadius: 15,
              }}
            >
              <View style={styles.modalView}>
                {type === 'image' ? (
                  <View
                    // style={{
                    //   flexShrink: 1,
                    //   width: '100%',
                    //   height: dpWidth(250),
                    // }}
                    style={{
                      width: '100%',
                      //height: '60%',
                      alignItems: 'center',
                      //backgroundColor: 'red',
                    }}
                  >
                    {/* <TouchableOpacity
                      onPress={() => this.closeAlert()}
                      style={{
                        right: 0,
                        alignSelf: 'flex-end',
                        paddingVertical: 10,
                      }}>
                      <Ionicons
                        name="close"
                        color={COLOR.headtextColor}
                        size={dpWidth(30)}
                      />
                    </TouchableOpacity> */}
                    {/* <ReactNativeZoomableView
                      maxZoom={30}
                      // Give these to the zoomable view so it can apply the boundaries around the actual content.
                      // Need to make sure the content is actually centered and the width and height are
                      // dimensions when it's rendered naturally. Not the intrinsic size.
                      // For example, an image with an intrinsic size of 400x200 will be rendered as 300x150 in this case.
                      // Therefore, we'll feed the zoomable view the 300x150 size.
                      contentWidth={300}
                      contentHeight={150}>
                      <FastImage
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                        source={image ? {uri: image} : CatalogueGift}
                      />
                    </ReactNativeZoomableView> */}
                    <FastImage
                      style={{ width: dpWidth(200), height: dpWidth(200) }}
                      resizeMode={'contain'}
                      source={image ? { uri: image } : CatalogueGift}
                    />
                  </View>
                ) : null}
                <Text style={styles.redeemTxt}>{___header}</Text>
                <Text style={styles.popupDataTitle}>{___title}</Text>
                <Text style={styles.popupDataTxt}>{message}</Text>
                <View style={styles.popUpConfirm}>
                  {/* {globalAlert.isCancel ? ( */}

                  <TouchableOpacity
                    onPress={
                      type === 'warning'
                        ? () => {
                            onDismiss && onDismiss();
                            this.closeAlert();
                          }
                        : () => {
                            onPress && onPress();
                            this.closeAlert();
                          }
                    }
                  >
                    <LinearGradient
                      colors={['#f6f1ad', '#f6f1ad']}
                      mode="contained"
                      style={styles.lineargradient2}
                    >
                      <Text style={styles.buttontext1}>
                        {type === 'warning'
                          ? leftBtnLabel || defaultLeftBtnLabel || 'Cancel'
                          : btnLabel || defaultRightBtnLabel || 'Ok'}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  {/* ) : null} */}
                  {type === 'warning' ? (
                    <TouchableOpacity onPress={onPress}>
                      <LinearGradient
                        colors={Color.gradientColor}
                        mode="contained"
                        style={styles.lineargradient2}
                      >
                        <Text style={styles.buttontext2}>Confirm</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    paddingBottom: 5,
  },
  img_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 80,
    height: 80,
  },
  title: {
    textAlign: 'center',
    marginBottom: 15,
  },
  text: {
    textAlign: 'center',
    marginBottom: 20,
  },
  actions: {
    marginTop: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flexWrap: 'wrap-reverse',
  },
  btn: {
    marginBottom: 10,
    minWidth: 120,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    padding: 10,
    color: 'white',
  },
  buttontext2: {
    color: Color.black,
    fontSize: font.fontSizes15,
    fontWeight: '700',
  },
  buttontext1: {
    color: Color.black,
    fontSize: font.fontSizes15,
    fontWeight: '400',
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
    // justifyContent: 'flex-start',
    //alignSelf: 'flex-start',
  },
  popupDataTxt: {
    fontSize: font.fontSizes17,
    fontWeight: '500',
    textAlign: 'center',
    color: Color.black,
  },
  popupDataTitle: {
    fontSize: font.fontSizes20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Color.black,
  },
  popUpConfirm: { flexDirection: 'row', margin: appScreen.width * 0.035 },
});

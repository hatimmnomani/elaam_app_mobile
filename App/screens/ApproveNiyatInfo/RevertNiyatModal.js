import { useState } from 'react';
import {
   Dimensions,
   ImageBackground,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
// import Modal from 'react-native-modal';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from '../../constants';
import styles from './styles';
// import {ScrollView} from 'react-native-gesture-handler';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReactNativeModal from 'react-native-modal';
import { useDispatch } from 'react-redux';
import { popup } from '../../assets';
import { showAlert } from '../../common/CustomAlert';
import { MyConsole } from '../../utils/MyConsole';
import { revertNiyat } from '../ApproveDashboard/getApi';
import UselessTextInputMultiline from './Remark';
const { height, width } = Dimensions.get('window');

export const RevertNiyatModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [CategoryOpen, setCategoryOpen] = useState(false);
  const [AssetOpen, setAssetOpen] = useState(false);
  const navigation = useNavigation();
  const putRevertNiyat = async () => {
    const value = {
      niyatId: props.niyatid,
      remarks: description,
      roleName: props.roleName,
    };
    dispatch(revertNiyat(value, props, navigation));
  };
  //   useEffect(() => {}, []);
  MyConsole.log('role', props.roleName);
  return (
    <ReactNativeModal
      animationType="fade"
      transparent={true}
      avoidKeyboard={true}
      propagateSwipe={true}
      //statusBarTranslucent={true}
      visible={props.modalRevert}
      scrollOffset={500}
      backgroundColor={'#00000013'}
      style={{ margin: 0 }}
      onRequestClose={() => {
        props.setModalRevert(!props.modalRevert);
      }}
    >
      {/* <StatusBar /> */}
      <KeyboardAwareScrollView
        behavior="padding"
        keyboardVerticalOffset={500}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.revertView}>
          <View
            style={{
              backgroundColor: Color.white,
              width: '80%',
              alignSelf: 'center',
              padding: '2%',
              borderRadius: 15,
            }}
          >
            <ImageBackground
              source={popup}
              resizeMode={'stretch'}
              style={{
                borderRadius: 10,
              }}
            >
              <View
                style={[
                  styles.modalView2,
                  {
                    // backgroundColor: '#fceec4',
                    // paddingHorizontal: 15,
                    height: windowHeight / 2.8,
                  },
                ]}
              >
                <View style={styles.gift_view}>
                  <Text style={styles.gift_txt}>Revert Niyat</Text>
                </View>

                <View
                  style={{
                    width: '100%',
                    height: '40%',
                    // backgroundColor: 'white',
                    marginTop: '10%',
                    padding: '3%',
                    zIndex: 79,
                    justifyContent: 'center',
                  }}
                >
                  <UselessTextInputMultiline
                    onChange={text => {
                      (setDescription(text),
                        setCategoryOpen(false),
                        setAssetOpen(false));
                    }}
                    onFocus={() => (
                      setCategoryOpen(false),
                      setAssetOpen(false)
                    )}
                  />

                  <Text
                    style={{
                      paddingVertical: '3%',
                      color: 'red',
                      //   fontFamily: FONTS.j_Medium,
                      //   fontSize: SIZES.body5,
                    }}
                  >
                    Remarks should be upto 500 characters.
                  </Text>
                </View>

                <View style={styles.button_View}>
                  <TouchableOpacity
                    onPress={() => {
                      props.setModalRevert(!props.modalRevert);
                    }}
                  >
                    <LinearGradient
                      colors={['#f6f1ad', '#f6f1ad']}
                      mode="contained"
                      style={styles.lineargradient2}
                    >
                      <Text style={styles.buttontext1}> Cancel </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => {
                      if (description !== '') {
                        putRevertNiyat();
                      } else {
                        // Alert.alert('Please enter remarks');
                        showAlert({
                          header: '',
                          title: 'Please enter remarks',
                          //alertType: 'warning',
                          // onPress: () => {
                          //   MyConsole.log('BackHandler.exitApp');
                          // },
                        });
                      }
                    }}
                  >
                    <LinearGradient
                      colors={Color.gradientColor}
                      mode="contained"
                      style={styles.lineargradient2}
                    >
                      <Text style={styles.buttontext2}>Send</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </KeyboardAwareScrollView>
      {/* </View> */}
    </ReactNativeModal>
  );
};

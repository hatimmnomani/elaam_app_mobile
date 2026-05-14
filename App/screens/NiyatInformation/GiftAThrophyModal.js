import { useEffect, useState } from 'react';
import {
   Dimensions,
   ImageBackground,
   Platform,
   Text,
   TextInput,
   TouchableOpacity,
   View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import ReactNativeModal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import { popup } from '../../assets';
import { showAlert } from '../../common/CustomAlert';
import { Color } from '../../constants';
import { formatRoleName } from '../../utils/CommonFunction';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { dpHeight } from '../../utils/SizeInDp';
import { giftReward } from '../ApproveDashboard/getApi';
import styles from './styles';
const { height, width } = Dimensions.get('window');

export const GiftAThrophyModal = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [approver1, setApprover1] = useState('');
  const [approver2, setApprover2] = useState('');
  const [approver3, setApprover3] = useState('');

  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  const gift = useSelector(state => state.ApiReducer.blue_trophy);
  const approver = useSelector(state => state.ApiReducer.get_approver);
  MyConsole.log('giftapprover', approver);

  const giftRewardList = async () => {
    MyConsole.log('ooooo', props.trophies);

    if (approver1 + approver2 + approver3 <= 0) {
      if (Platform.OS == 'ios') {
        props.setModalGift(!props.modalGift);
        setTimeout(
          () =>
            showAlert({
              header: '',
              title: 'Please enter trophy count',
            }),
          1000,
        );
      } else {
        showAlert({
          header: '',
          title: 'Please enter trophy count',
        });
      }

      // eslint-disable-next-line prettier/prettier
    } else if (
      Number(approver1) + Number(approver2) + Number(approver3) >
      props.trophies
    ) {
      MyConsole.log('approver1', approver1 + approver2);
      MyConsole.log('approver2', approver2);
      MyConsole.log('approver3', approver3);
      MyConsole.log(
        'approver3',
        Number(approver1) + Number(approver2) + Number(approver3),
      );

      if (Platform.OS == 'ios') {
        props.setModalGift(!props.modalGift);
        setTimeout(
          () =>
            showAlert({
              header: '',
              title: 'Maximum trophies should be ' + props.trophies,
              alertType: 'warning',
            }),
          1000,
        );
      } else {
        showAlert({
          header: '',
          title: 'Maximum trophies should be ' + props.trophies,
          alertType: 'warning',
        });
      }
    } else {
      if (Platform.OS == 'ios') {
        props.setModalGift(!props.modalGift);
        setTimeout(
          () =>
            showAlert({
              header: 'Confirmation Message',
              title:
                'Are you sure with trophy allocations once submitted , you cannot make the changes' +
                ' ?',
              alertType: 'warning',
              onPress: async () => {
                const itsid = await MyAsyncStorage.getItem('itsid');
                const value = {
                  fromItsId: itsid,
                  niyatId: props.niyatid,
                  rewards:
                    props.approverone &&
                    props.approvertwo &&
                    props.approverthree
                      ? [
                          {
                            roleName: props.approverone,
                            trophyCount: approver1,
                          },
                          {
                            roleName: props.approvertwo,
                            trophyCount: approver2,
                          },
                          {
                            roleName: props.approverthree,
                            trophyCount: approver3,
                          },
                        ]
                      : props.approverone && props.approvertwo
                        ? [
                            {
                              roleName: props.approverone,
                              trophyCount: approver1,
                            },
                            {
                              roleName: props.approvertwo,
                              trophyCount: approver2,
                            },
                          ]
                        : props.approverone && props.approverthree
                          ? [
                              {
                                roleName: props.approverone,
                                trophyCount: approver1,
                              },
                              {
                                roleName: props.approverthree,
                                trophyCount: approver3,
                              },
                            ]
                          : props.approverone
                            ? [
                                {
                                  roleName: props.approverone,
                                  trophyCount: approver1,
                                },
                              ]
                            : props.approvertwo
                              ? [
                                  {
                                    roleName: props.approvertwo,
                                    trophyCount: approver2,
                                  },
                                ]
                              : props.approverthree
                                ? [
                                    {
                                      roleName: props.approverthree,
                                      trophyCount: approver3,
                                    },
                                  ]
                                : [],
                };
                dispatch(giftReward(value, props));
              },
            }),
          1000,
        );
      } else {
        showAlert({
          header: 'Confirmation Message',
          title:
            'Are you sure with trophy allocations once submitted , you cannot make the changes' +
            ' ?',
          alertType: 'warning',
          onPress: async () => {
            const itsid = await MyAsyncStorage.getItem('itsid');
            const value = {
              fromItsId: itsid,
              niyatId: props.niyatid,
              rewards:
                props.approverone && props.approvertwo && props.approverthree
                  ? [
                      {
                        roleName: props.approverone,
                        trophyCount: approver1,
                      },
                      {
                        roleName: props.approvertwo,
                        trophyCount: approver2,
                      },
                      {
                        roleName: props.approverthree,
                        trophyCount: approver3,
                      },
                    ]
                  : props.approverone && props.approvertwo
                    ? [
                        {
                          roleName: props.approverone,
                          trophyCount: approver1,
                        },
                        {
                          roleName: props.approvertwo,
                          trophyCount: approver2,
                        },
                      ]
                    : props.approverone && props.approverthree
                      ? [
                          {
                            roleName: props.approverone,
                            trophyCount: approver1,
                          },
                          {
                            roleName: props.approverthree,
                            trophyCount: approver3,
                          },
                        ]
                      : props.approverone
                        ? [
                            {
                              roleName: props.approverone,
                              trophyCount: approver1,
                            },
                          ]
                        : props.approvertwo
                          ? [
                              {
                                roleName: props.approvertwo,
                                trophyCount: approver2,
                              },
                            ]
                          : props.approverthree
                            ? [
                                {
                                  roleName: props.approverthree,
                                  trophyCount: approver3,
                                },
                              ]
                            : [],
            };
            dispatch(giftReward(value, props));
          },
        });
      }
    }
  };

  useEffect(() => {}, []);
  return (
    <ReactNativeModal
      animationType="fade"
      transparent={true}
      avoidKeyboard={true}
      propagateSwipe={true}
      visible={props.modalGift}
      scrollOffset={500}
      backgroundColor={'#00000013'}
      style={styles.modl}
      onRequestClose={() => {
        props.setModalGift(!props.modalGift);
      }}
    >
      <KeyboardAwareScrollView
        behavior="padding"
        keyboardVerticalOffset={500}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.centeredView}>
          <View style={styles.img_bacgrnd_view}>
            <ImageBackground
              source={popup}
              resizeMode={'stretch'}
              style={styles.img_background}
            >
              <View
                style={[
                  styles.modalView2,
                  {
                    height: windowHeight / 1.9,
                  },
                ]}
              >
                <View style={styles.gift_view}>
                  <Text style={styles.gift_txt}>GIFT A REWARD</Text>
                </View>

                <View style={styles.trophyView}>
                  <Text style={styles.trophyTxt}>Total Trophies:-</Text>
                  <Text style={styles.trophyCount}>{props.trophies}</Text>
                </View>

                {props.approverone ? (
                  <View style={[styles.modelInputView]}>
                    <Text numberOfLines={2} style={styles.modelInputText}>
                      {formatRoleName(props.approverone)} :{' '}
                      {approver.length > 0 ? approver[0].name : ''}
                    </Text>

                    <TextInput
                      keyboardType={'numeric'}
                      style={styles.modelInput}
                      value={approver1}
                      onChangeText={approver1 => setApprover1(approver1)}
                    />
                  </View>
                ) : null}
                {props.approvertwo ? (
                  <View
                    style={[styles.modelInputView, { marginTop: dpHeight(3) }]}
                  >
                    <Text numberOfLines={2} style={styles.modelInputText}>
                      {formatRoleName(props.approvertwo)} :{' '}
                      {approver.length > 1 ? approver[1].name : ''}
                    </Text>

                    <TextInput
                      style={styles.modelInput}
                      value={approver2}
                      onChangeText={approver2 => setApprover2(approver2)}
                    />
                  </View>
                ) : null}

                {props.approverthree ? (
                  <View
                    style={[styles.modelInputView, { marginTop: dpHeight(3) }]}
                  >
                    <Text numberOfLines={2} style={styles.modelInputText}>
                      {formatRoleName(props.approverthree)} :{' '}
                      {approver.length > 2
                        ? approver[2].name
                        : approver.length > 1
                          ? approver[1].name
                          : ''}
                    </Text>

                    <TextInput
                      style={styles.modelInput}
                      value={approver3}
                      onChangeText={approver3 => setApprover3(approver3)}
                    />
                  </View>
                ) : null}

                <View style={styles.button_View}>
                  <View style={styles.touchable_view}>
                    <TouchableOpacity
                      onPress={() => {
                        props.setModalGift(!props.modalGift);
                      }}
                    >
                      <LinearGradient
                        colors={['#f6f1ad', '#f6f1ad']}
                        mode="contained"
                        style={styles.lineargradient2}
                      >
                        <Text style={styles.buttontext1}> CANCEL </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.touchable_view}>
                    <TouchableOpacity
                      onPress={() => {
                        giftRewardList();
                      }}
                    >
                      <LinearGradient
                        colors={Color.gradientColor}
                        mode="contained"
                        style={styles.lineargradient2}
                      >
                        <Text style={styles.buttontext2}>SEND</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ReactNativeModal>
  );
};

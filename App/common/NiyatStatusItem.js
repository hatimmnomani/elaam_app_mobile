/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
import { useEffect, useState } from 'react';
import {
   Dimensions,
   Modal,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
// import WithLocalSvg from 'react-native-svg/css';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { DownloadIconSvg } from '../assets';
import NiyatDownload from '../assets/images/Elaam_Icons/NiyatDownload';
import NiyatView from '../assets/images/Elaam_Icons/NiyatView';
import { Color, font, string } from '../constants';
import { MyAsyncStorage } from '../utils/MyAsyncStorage';
import { MyConsole } from '../utils/MyConsole';
import { dpWidth } from '../utils/SizeInDp';
import { showAlert } from './CustomAlert';
import DownloadFile from './DownloadFile';
const windowWidth = Dimensions.get('window').width;

const NiyatStatusItem = ({ item, props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [headerTitle, setheaderTitle] = useState(true);
  const fileUrl = item.scannedNiyatUrl;
  useEffect(() => {
    APICallling();
  }, []);
  // const saveImageIOS = () => {
  //   CameraRoll.saveToCameraRoll(fileUrl, 'photo')
  //     .then(function (result) {
  //       MyConsole.log('save succeeded ' + result);
  //       setModalVisible(true);
  //     })
  //     .catch(function (error) {
  //       MyConsole.log('save failed ' + error);
  //       alert(error);
  //     });
  // };

  const APICallling = async () => {
    try {
      const ismumin = await MyAsyncStorage.getItem('isMumin');
      // MyConsole.log("header title is :", ismumin);

      if (ismumin === 'true') {
        setheaderTitle(true);
      } else {
        setheaderTitle(false);
      }
    } catch ({ response }) {
      MyConsole.log('error1', response);
    }
  };

  const checkIs = () => {
    setInterval(async () => {
      var che = await MyAsyncStorage.getItem('modelopen');
      // MyConsole.log('che', che);
      if (che === 'openn1') {
        // setModalVisible(true);
        //   showAlert({
        //     header: '',
        //     title: string.DownloadMsg,
        //     //alertType: 'warning',
        //     // onPress: () => {
        //     //   MyConsole.log('BackHandler.exitApp');
        //     // },
        //   });
        MyAsyncStorage.removeItem('modelopen');
      }
    }, 1000);
  };

  return (
    <View style={{ marginBottom: 20 }}>
      <LinearGradient
        colors={Color.gradientColor2}
        start={{ x: 0.2, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={{
          borderRadius: 5,
          padding: 2,
        }}
      >
        {/* <Card style={{backgroundColor: Color.bgColor}}>
          <Card.Content style={{justifyContent: 'center'}}> */}

        <View style={styless.linearView}>
          <View style={{ width: '100%' }}>
            <Text
              numberOfLines={2}
              style={{
                color: Color.titleColor,
                fontSize: font.fontSizes12,
                fontWeight: 'bold',
              }}
            >
              Question : - {item.niyatQuestionEnglish}
            </Text>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Title style={styless.niyatHeading}>NIYAT ID</Title>
              <Paragraph style={styless.niyatDetail}>{item.niyatId}</Paragraph>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Title style={styless.niyatHeading}>NIYAT DATE</Title>
              <Paragraph style={styless.niyatDetail}>
                {moment(item.niyatDate).format('DD-MM-YYYY')}
              </Paragraph>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Title style={styless.niyatHeading}>ITS ID</Title>
              <Paragraph style={styless.niyatDetail}>{item.itsId}</Paragraph>
            </View>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Title style={styless.niyatHeading}>JAMAAT</Title>
              <Paragraph style={styless.niyatDetail}>{item.jamaat}</Paragraph>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Title style={styless.niyatHeading}>JAMIAT</Title>
              <Paragraph style={styless.niyatDetail}>{item.jamiat}</Paragraph>
            </View>
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Title style={styless.niyatHeading}>DEPARTMENT</Title>
              <Paragraph style={styless.niyatDetail}>
                {item.departmentName}
              </Paragraph>
            </View>
          </View>

          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            <View style={{ flexDirection: 'column', flex: 1 }}>
              <Title style={styless.niyatHeading}>UMOOR</Title>
              <Paragraph style={styless.niyatDetail}>
                {item.umoorName}
              </Paragraph>
            </View>
            <TouchableOpacity
              onPress={() => {
                if (headerTitle) {
                  MyAsyncStorage.setItem(
                    'niyatid',
                    JSON.stringify(item.niyatId),
                  );
                  MyConsole.log(MyAsyncStorage.getItem('niyatid'));
                  navigation.navigate(string.NiyatInfromationScreen);
                } else {
                  MyAsyncStorage.setItem(
                    'niyatid',
                    JSON.stringify(item.niyatId),
                  );
                  navigation.navigate(string.ApproveNiyatInfo);
                }
              }}
              style={styless.viewTouch}
            >
              <View style={styless.downloadGradientView}>
                <LinearGradient
                  colors={Color.gradientColor2}
                  start={{ x: 0.2, y: 1.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styless.downloadGradient}
                >
                  {/* <WithLocalSvg asset={niyatView} height={14} width={14} /> */}
                  <NiyatView />
                </LinearGradient>
                <Text style={styless.viewTxt}>View</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                if (fileUrl || item.scannedNiyatUrl2) {
                  DownloadFile.checkPermission(fileUrl);
                  checkIs();
                  if (item.scannedNiyatUrl2) {
                    DownloadFile.checkPermission(item.scannedNiyatUrl2);
                  }
                } else {
                  showAlert({
                    header: '',
                    title: 'There is no any niyat form available',
                  });
                }
              }}
              style={styless.downloadTouch}
            >
              <View style={styless.downloadGradientView}>
                <LinearGradient
                  colors={Color.gradientColor2}
                  start={{ x: 0.2, y: 1.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styless.downloadGradient}
                >
                  {/* <WithLocalSvg
                      asset={niyatDownload}
                      height={14}
                      width={14}
                    /> */}
                  <NiyatDownload />
                </LinearGradient>
                <View>
                  <Text style={styless.downloadTxt}>Download</Text>
                </View>
              </View>
            </TouchableOpacity>

            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styless.centeredView}>
                <View style={styless.modalView}>
                  <View style={{ flexDirection: 'row', width: '100%' }}>
                    <View
                      style={{
                        width: '90%',
                      }}
                    />
                    <View style={{ width: '10%' }}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Icon
                          name="close"
                          size={24}
                          style={{ padding: '5%' }}
                          color={'black'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <DownloadIconSvg height={42} width={42} />
                  <Text style={styless.textStyle}>{string.DownloadMsg}</Text>
                </View>
              </View>
            </Modal>
          </View>
          {/* </Card.Content> */}
          {/* </Card> */}
        </View>
      </LinearGradient>
    </View>
  );
};
export default NiyatStatusItem;

const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
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
  },
  buttonClose: {
    marginLeft: 290,
  },
  textStyle: {
    color: '#573802',
    fontSize: font.fontSizes20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  downloadTxt: {
    color: Color.titleColor,
    fontSize: font.fontSizes12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: '2%',
  },
  viewTxt: {
    color: Color.titleColor,
    fontSize: font.fontSizes12,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingHorizontal: 5,
  },
  downloadGradient: {
    borderRadius: 5,
    justifyContent: 'center',
    padding: 8,
    marginLeft: '2%',
  },
  // {
  //   borderRadius: 5,
  //   justifyContent: 'center',
  //   padding: 8,
  //   marginLeft: '3%',
  //   // height: 25
  // }
  downloadGradientView: { flexDirection: 'row', alignItems: 'center' },
  downloadTouch: {
    marginVertical: '3%',
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#a98920',
    alignItems: 'center',
    borderRadius: 5,
    width: '25%',
    height: '80%',
  },
  viewTouch: {
    marginVertical: '3%',
    marginRight: dpWidth(5),
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#a98920',
    alignItems: 'center',
    borderRadius: 5,
    width: '25%',
    height: '80%',
  },
  niyatHeading: {
    color: Color.titleColor,
    flex: 1,
    fontSize: font.fontSizes12,
    fontWeight: 'bold',
  },
  niyatDetail: {
    color: Color.titleColor,
    flex: 1,
    fontSize: font.fontSizes11,
  },
  linearView: {
    backgroundColor: Color.bgColor,
    paddingVertical: dpWidth(10),
    paddingHorizontal: dpWidth(10),
    alignItems: 'center',
    borderRadius: 5,
  },
});

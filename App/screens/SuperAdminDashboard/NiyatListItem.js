
import { useEffect, useState } from 'react';
import {
   Modal,
   StyleSheet,
   Text,
   TouchableOpacity,
   View
} from 'react-native';
import { Paragraph, Title } from 'react-native-paper';
// import WithLocalSvg from 'react-native-svg/css';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { DownloadIconSvg } from '../../assets';
import DownloadN from '../../assets/images/Elaam_Icons/DownloadN';
import ViewN from '../../assets/images/Elaam_Icons/ViewN';
import DownloadFile from '../../common/DownloadFile';
import { Color, font, string } from '../../constants';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import styles from './style';

const NiyatListItem = ({ item, props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [headerTitle, setheaderTitle] = useState(true);
  const fileUrl = item.scannedNiyatUrl;
  useEffect(() => {
    APICallling();
  }, []);

  const APICallling = async () => {
    try {
      const ismumin = await MyAsyncStorage.getItem('isMumin');
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
      if (che === 'openn1') {
        setModalVisible(true);
        MyAsyncStorage.removeItem('modelopen');
      }
    }, 1000);
  };

  return (
    <View style={styles.list_item_view}>
      <LinearGradient
        colors={Color.gradientColor2}
        start={{ x: 0.2, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={styles.lineargradient}
      >
        <View style={styles.card}>
          {/* <Card style={styles.card}>
          <Card.Content style={styles.cardContent}> */}
          <View style={styles.qustionViw}>
            <Text numberOfLines={2} style={styles.question_heading}>
              Question : -
              <Text style={styles.question_txt}>
                {item.niyatQuestionEnglish}
              </Text>
            </Text>
          </View>

          <View style={styles.title_heading_outerView}>
            <View style={styles.title_headingView}>
              <Title style={styles.title_heading}>NIYAT ID</Title>
              <Paragraph style={styles.item_txt}>{item.niyatId}</Paragraph>
            </View>
            <View style={styles.title_headingView}>
              <Title style={styles.title_heading}>NIYAT DATE</Title>
              <Paragraph style={styles.item_txt}>
                {moment(item.niyatDate).format('DD-MM-YYYY')}
              </Paragraph>
            </View>
            <View style={styles.title_headingView}>
              <Title style={styles.title_heading}>ITS ID</Title>
              <Paragraph style={styles.item_txt}>{item.itsId}</Paragraph>
            </View>
          </View>

          <View style={styles.title_heading_outerView}>
            <View style={styles.title_headingView}>
              <Title style={styles.title_heading}>JAMAAT</Title>
              <Paragraph style={styles.item_txt}>{item.jamaat}</Paragraph>
            </View>
            <View style={styles.title_headingView}>
              <Title style={styles.title_heading}>JAMIAT</Title>
              <Paragraph style={styles.item_txt}>{item.jamiat}</Paragraph>
            </View>
            <View style={styles.title_headingView}>
              <Title style={styles.title_heading}>DEPARTMENT</Title>
              <Paragraph style={styles.item_txt}>
                {item.departmentName}
              </Paragraph>
            </View>
          </View>

          <View style={styles.title_heading_outerView}>
            <View style={styles.title_headingView}>
              <Title style={styles.title_heading}>UMOOR</Title>
              <Paragraph style={styles.item_txt}>{item.umoorName}</Paragraph>
            </View>

            <View style={styles.midView} />

            <View style={styles.approve_niyt_info_view}>
              <TouchableOpacity
                onPress={() => {
                  {
                    MyAsyncStorage.setItem(
                      'niyatid',
                      JSON.stringify(item.niyatId),
                    );
                    navigation.navigate(string.ApproveNiyatInfo);
                  }
                }}
                style={styles.approve_niyt_touchablity}
              >
                <LinearGradient
                  colors={Color.gradientColor2}
                  start={{ x: 0.2, y: 1.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styles.btn_view}
                >
                  <ViewN />
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  DownloadFile.checkPermission(fileUrl);
                  checkIs();
                  if (item.scannedNiyatUrl2) {
                    DownloadFile.checkPermission(item.scannedNiyatUrl2);
                  }
                  MyConsole.log('IMG_URL2', item.scannedNiyatUrl2);
                }}
              >
                <LinearGradient
                  colors={Color.gradientColor2}
                  start={{ x: 0.2, y: 1.0 }}
                  end={{ x: 1.0, y: 1.0 }}
                  style={styles.btn_view}
                >
                  <DownloadN />
                </LinearGradient>
              </TouchableOpacity>
            </View>

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
                  <View style={styles.modalInerViw}>
                    <View style={styles.iconOuterView} />
                    <View style={styles.closeIconView}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Icon
                          name="close"
                          size={24}
                          style={styles.iconStyle}
                          color={'black'}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>

                  {/* <WithLocalSvg
                      asset={DownloadIconSvg}
                      height={42}
                      width={42}
                    /> */}
                  <DownloadIconSvg height={42} width={42} />
                  <Text style={styless.textStyle}>{string.DownloadMsg}</Text>
                </View>
              </View>
            </Modal>
          </View>
          {/* </Card.Content>
        </Card> */}
        </View>
      </LinearGradient>
    </View>
  );
};
export default NiyatListItem;

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
});

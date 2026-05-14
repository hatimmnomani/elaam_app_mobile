import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
   Dimensions,
   FlatList,
   Image,
   LogBox,
   Modal,
   ScrollView,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { CatalogueGift, Trophy } from '../../assets';
import { closeAlert, showAlert } from '../../common/CustomAlert';
import { EmptyComponent } from '../../common/EmptyComponent';
import Header from '../../common/Header';
import Loader from '../../common/Loader';
import { MyFab } from '../../common/MyFab';
import { Color, font, string } from '../../constants';
import COLOR from '../../constants/colors';
import STRING from '../../constants/string';
import catalogueDashboard from '../../services/catalogueDashboard';
import MuminDashboard from '../../services/muminDashboard';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { dpFont, dpHeight } from '../../utils/SizeInDp';
import styles from './styles';
const windowWidth = Dimensions.get('window').width;

const CatalogueScreen = () => {
  const [redeemed, setReedemed] = useState(400);
  const [currentTab, setCurrentTab] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [redeem, setRedeem] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [popupdata, setpopupdata] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [catalogueId, setCatalogueId] = useState('');
  const focused = useIsFocused();

  const APICallling = async () => {
    try {
      //getNotification();
      getReedem();
      gettrophies();
      getPerticulrNumber();
    } catch (error) {}
  };

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    // APICallling();
    //getNotification();
    getReedem();
    gettrophies();
    getPerticulrNumber();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    // dispatch(
    //   ReduxActionCreators.global_alert({
    //     isVisible: true,
    //     header: '',
    //     title: '',
    //     subtitle: '',
    //     isCancel: false,
    //     isSubmit: true,
    //   }),
    // );
  }, []);

  const handleItemPress = (title) => {
    setCatalogueId(title.id);
    setpopupdata(title.trophies);
    showAlert({
      title:
        title.trophies > redeem.remainingTrophies
          ? ''
          : title.trophies + ' TROPHIES',
      header: string.REDEEM_NOW_Button,
      message:
        title.trophies > redeem.remainingTrophies
          ? string.NOTHAVE
          : string.HAVE,
      alertType:
        title.trophies > redeem.remainingTrophies ? '' : 'warning',
      onPress: () => {
        if (title.trophies > redeem.remainingTrophies) {
          showAlert({
            title: 'INSUFFICIENT TROPHIES',
            header: 'Cannot Redeem',
            message: `You need ${title.trophies - redeem.remainingTrophies} more trophies to redeem this item.`,
            alertType: 'error',
            onPress: () => {},
          });
        } else {
          closeAlert();
          getreduceTrophies(title.id);
        }
      },
    });
  };

  const handleRedeemPress = (title) => {
    setCatalogueId(title.id);
    setpopupdata(title.trophies);
   
    showAlert({
      title:
        title.trophies > redeem.remainingTrophies
          ? ''
          : title.trophies + ' TROPHIES',
      header: string.REDEEM_NOW_Button,
      message:
        title.trophies > redeem.remainingTrophies
          ? string.NOTHAVE
          : string.HAVE,
      alertType:
        title.trophies > redeem.remainingTrophies ? '' : 'warning',
      onPress: () => {
        if (title.trophies > redeem.remainingTrophies) {
          showAlert({
            title: 'INSUFFICIENT TROPHIES',
            header: 'Cannot Redeem',
            message: `You need ${title.trophies - redeem.remainingTrophies} more trophies to redeem this item.`,
            alertType: 'error',
            onPress: () => {},
          });
        } else {
          closeAlert();
          getreduceTrophies(title.id);
        }
      },
    });
    // setModalVisible(true);
  };

  useEffect(() => {
    setCurrentTab(true);
  }, [focused]);

  const getReedem = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    // MyConsole.log("token", itsid);
    // MyConsole.log("token", token);
    try {
      const { data } = await MuminDashboard.getTotalAndRedeemedTrophies(
        itsid,
        token,
      );
      // alert(data)
      // MyConsole.log("trophies", data.data);
      setRedeem(data.data);
      // MyConsole.log(redeem.remainingTrophies);
      setLoading(false);
    } catch (response) {
      setLoading(false);
      MyConsole.log('error1111', response);
    }
  };

  const [redeemtrophy, setRedeemTrophy] = useState([]);
  const gettrophies = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    // MyConsole.log('token', itsid);
    // MyConsole.log('token', token);
    try {
      const { data } = await catalogueDashboard.getAllActiveMuminCatalogues(
        itsid,
        token,
      );
      // alert(data)
      // MyConsole.log('trophies', data.data);
      setRedeemTrophy(data.data.MUMIN);
    } catch (error) {
      // MyConsole.log('jjjjj', error);
    }
  };
  const [trophyNum, setTrophyNum] = useState();
  const getPerticulrNumber = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    try {
      const { data } = await catalogueDashboard.getNumTrophies(token);
      // alert(data)
      // MyConsole.log('trophies', data.data);
      setTrophyNum(data.data.trophiesRedeemed);
      // MyConsole.log('huhuhuhuhuhu', data.data.trophiesRedeemed);
    } catch (err) {
      MyConsole.log('PER ERRROR', err);
    }
  };

  const [reducetrophyNum, setreducetrophyNum] = useState();
  const getreduceTrophies = async id => {
    //MyConsole.log('cat id', catalogueId);
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const values = {
        catalogueId: id,
        itsId: itsid,
      };
      const { data } = await catalogueDashboard.reduceTrophies(values, token);
      // alert(data)
      MyConsole.log('reducetrophyNum', data.data);
      // alert('Trophy Redeemed Successfully');
      showAlert({
        header: '',
        title: 'Trophy Redeemed Successfully',
        //alertType: 'warning',
        // onPress: () => {
        //   MyConsole.log('BackHandler.exitApp');
        // },
      });
      //setModalVisible(!modalVisible);
      APICallling();
      // setreducetrophyNum(data.data)
      // MyConsole.log('DDDDDDDD', data.data);
    } catch (err) {
      MyConsole.log('NNNNNN', err);
    }
  };

  const Item = ({ title }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              showAlert({
                title: title.itemTitle,
                message: title.description,
                alertType: 'image',
                image: title?.image_url,
                onPress: () => {
                  MyConsole.log('files deleted!');
                },
              });
            }}
          >
            <View style={styles.row1}>
              <View style={styles.card3}>
                <Image
                  resizeMode="cover"
                  source={
                    title?.image_url ? { uri: title?.image_url } : CatalogueGift
                  }
                  style={styles.image}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.card2}>
          <TouchableOpacity
            onPress={() => handleItemPress(title)}
          >
            <LinearGradient
              colors={Color.gradientColor}
              mode="contained"
              style={styles.lineargradient}
            >
              <Text style={styles.buttontext}>
                {' '}
                NEED {title.trophies} TROPHIES{' '}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const AchieveItem = ({ title }) => {
    return (
      <View>
        <View
          style={{
            flexDirection: 'row',
            paddingHorizontal: windowWidth * 0.05,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              showAlert({
                title: title.itemTitle,
                message: title.description,
                alertType: 'image',
                image: title?.image_url,
                // alertType: 'warning',
                onPress: () => {
                  MyConsole.log('files deleted!');
                },
              });
              // setTitle(title.itemTitle);
              // setDescription(title.description);
              // setdModalVisible(true);
            }}
          >
            <View style={styles.row1}>
              {title.ack > 0 && title.ack > 1 ? (
                <View style={styles.count}>
                  <Text style={styles.countTxt}>{title.ack}</Text>
                </View>
              ) : null}
              <View style={styles.card3}>
                <Image
                  resizeMode="cover"
                  source={
                    title?.image_url ? { uri: title?.image_url } : CatalogueGift
                  }
                  style={styles.image}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.card2}>
          <TouchableOpacity
            onPress={() => handleRedeemPress(title)}
          >
            {/* <LinearGradient
              colors={Color.gradientColor}
              mode="contained"
              style={styles.lineargradient}>
              <Text style={styles.buttontext}>
                {' '}
                NEED {title.trophies} TROPHIES{' '}
              </Text>
            </LinearGradient> */}
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const renderItem = ({ item }) =>
    currentTab ? <Item title={item} /> : <AchieveItem title={item} />;
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: Color.bgColor,
      }}
    >
      <Header />
      {isLoading ? null : (
        // <ActivityIndicator
        //   animating={true}
        //   color={Color.titleColor}
        //   size="small"
        // />
        <SafeAreaView
          style={{
            backgroundColor: Color.bgColor,
            // borderBottomWidth: windowWidth * 0.05,
          }}
        >
          <Text style={styles.catalogue}> {string.Catalogue} </Text>

          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            style={{
              marginVertical: windowWidth * 0.05,
              marginHorizontal: windowWidth * 0.045,
              // flexGrow: 1,
            }}
          >
            <View>
              <LinearGradient
                colors={Color.gradientColor2}
                start={{ x: 0.2, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                  borderRadius: 5,
                  // marginVertical: windowWidth * 0.05,
                  // marginHorizontal: windowWidth * 0.03,
                  // paddingHorizontal: windowWidth * 0.005,
                  // paddingVertical: windowWidth * 0.005,
                }}
              >
                <View style={styles.card}>
                  {/* <Card style={styles.card}> */}
                  {/* <Card.Content style={{alignItems: 'center'}}> */}
                  {/* <WithLocalSvg
                    asset={Trophy}
                    height={windowWidth * 0.6}
                    width={windowWidth * 0.78}
                    marginTop={windowWidth * 0 - 35}
                  /> */}
                  <Trophy
                    height={windowWidth * 0.6}
                    width={windowWidth * 0.78}
                    marginTop={windowWidth * 0 - 35}
                  />
                  <View style={styles.trophytext1}>
                    <Text style={styles.trophytext2}>
                      {redeem?.trophiesRedeemed + redeem?.remainingTrophies ||
                        0}
                    </Text>
                  </View>

                  {/* <Trophy height={250} width={320} marginTop={-40} /> */}
                  <Text style={styles.text}>
                    {string.Trophies_Redeemed} {redeem.trophiesRedeemed}
                  </Text>
                  <Text style={styles.text2}>
                    {string.Trophies_to_Redeem} {redeem.remainingTrophies}
                  </Text>
                  {/* </Card.Content> */}
                  {/* </Card> */}
                </View>
              </LinearGradient>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: dpHeight(9),
              }}
            >
              {/* <Title style={styles.reward}> {string.Reward} </Title> */}
              {/* <WithLocalSvg
                      asset={RewardIcon}
                      height={windowWidth * 0.08}
                      width={windowWidth * 0.3}
                    /> */}

              <View style={currentTab ? styles.achieveTab : styles.redeemTab}>
                <TouchableOpacity
                  onPress={() => {
                    (setCurrentTab(!false), gettrophies());
                  }}
                >
                  <Text
                    style={currentTab ? styles.achieveTxt : styles.redeemTxt}
                  >
                    {STRING.RedeemTxt}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={currentTab ? styles.redeemTab : styles.achieveTab}>
                <TouchableOpacity
                  onPress={() => {
                    (setCurrentTab(false), gettrophies());
                  }}
                >
                  <Text
                    style={currentTab ? styles.redeemTxt : styles.achieveTxt}
                  >
                    {STRING.AchieveTxt}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.row}>
              <LinearGradient
                colors={Color.gradientColor2}
                start={{ x: 0.2, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={{
                  borderRadius: 5,
                  paddingHorizontal: windowWidth * 0.005,
                  paddingVertical: windowWidth * 0.005,
                }}
              >
                <View
                  style={{
                    backgroundColor: Color.bgColor,
                    paddingBottom: windowWidth * 0.05,
                  }}
                >
                  <SafeAreaView style={styles.container}>
                    <FlatList
                      // nestedScrollEnabled
                      data={
                        currentTab
                          ? redeemtrophy.filter(
                              item => item.status === 'ACTIVE',
                            )
                          : redeemtrophy.filter(title => title.ack > 0)
                      }
                      showsHorizontalScrollIndicator={false}
                      showsVerticalScrollIndicator={false}
                      renderItem={renderItem}
                      numColumns={2}
                      keyExtractor={item => item.id}
                      ListEmptyComponent={EmptyComponent}
                    />
                  </SafeAreaView>
                </View>
              </LinearGradient>
            </View>
          </ScrollView>
          <View style={styles.centeredView}>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '90%' }} />
                    <View
                      style={{
                        width: '10%',
                      }}
                    >
                      <TouchableOpacity
                        style={{ alignItems: 'flex-end' }}
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Icon
                          name="close"
                          size={28}
                          color={Color.white}
                          style={{ color: 'black' }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: font.fontSizes22,
                      fontWeight: 'bold',
                      marginBottom: windowWidth * 0.02,
                      color: Color.bottomTab,
                    }}
                  >
                    {string.REDEEM_NOW_Button}
                  </Text>
                  <Text
                    style={{
                      fontSize: font.fontSizes17,
                      fontWeight: '500',
                      textAlign: 'center',
                      color: Color.black,
                    }}
                  >
                    {popupdata >= redeem.remainingTrophies
                      ? string.NOTHAVE
                      : popupdata + string.HAVE}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      margin: windowWidth * 0.035,
                    }}
                  >
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <LinearGradient
                        colors={Color.gradientColor}
                        mode="contained"
                        style={styles.lineargradient2}
                      >
                        <Text style={styles.buttontext2}>{string.Cancel}</Text>
                      </LinearGradient>
                    </TouchableOpacity>

                    {popupdata <= redeem.remainingTrophies && (
                      <TouchableOpacity
                        onPress={() => {
                          getreduceTrophies();
                          // setModalVisible(false);
                        }}
                      >
                        <LinearGradient
                          colors={Color.gradientColor}
                          mode="contained"
                          style={styles.lineargradient2}
                        >
                          <Text style={styles.buttontext2}>
                            {' '}
                            {string.Confirm}{' '}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="fade"
              transparent={true}
              visible={dmodalVisible}
              onRequestClose={() => {
                setdModalVisible(!dmodalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '90%' }} />
                    <View
                      style={{
                        width: '10%',
                        alignItems: 'flex-end',
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => setdModalVisible(!dmodalVisible)}
                      >
                        <Icon
                          name="close"
                          size={28}
                          color={Color.white}
                          style={{ color: 'black' }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text
                    style={{
                      fontSize: dpFont(15),
                      fontWeight: 'bold',
                      marginBottom: windowWidth * 0.02,
                      color: 'black',
                    }}
                  >
                    {string.Catalogue_detail}
                  </Text>
                  <Text
                    style={{
                      fontSize: font.fontSizes17,
                      paddingHorizontal: '10%',
                      fontWeight: '500',
                      textAlign: 'center',
                      alignSelf: 'flex-start',
                      color: COLOR.black,
                    }}
                  >
                    Title:{' '}
                    <Text
                      style={{
                        fontSize: font.fontSizes17,
                        fontWeight: '500',
                        //textAlign: 'center',
                        color: Color.grey,
                      }}
                    >
                      {title}
                    </Text>
                  </Text>
                  <Text
                    style={{
                      fontSize: font.fontSizes17,
                      fontWeight: '500',
                      textAlign: 'center',
                      alignSelf: 'flex-start',
                      color: COLOR.black,
                      paddingHorizontal: '10%',
                      paddingBottom: '10%',
                    }}
                  >
                    Description:{' '}
                    <Text
                      style={{
                        fontSize: font.fontSizes17,
                        fontWeight: '500',
                        textAlign: 'center',
                        color: Color.grey,
                      }}
                    >
                      {description}
                    </Text>
                  </Text>
                </View>
              </View>
            </Modal>
            {/* <Pressable */}
            {/* // style={[styles.button, styles.buttonOpen]} */}
            {/* onPress={() => setModalVisible(true)}> */}
            {/* <Text style={styles.textStyle}>Show Modal</Text> */}
            {/* </Pressable> */}
          </View>
        </SafeAreaView>
      )}
      <Loader />
      <MyFab />
    </View>
  );
};
export default CatalogueScreen;

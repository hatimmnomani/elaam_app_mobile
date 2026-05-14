import FastImage from '@d11/react-native-fast-image';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  LogBox,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { CatalogueGift } from '../../assets';
import { closeAlert, showAlert } from '../../common/CustomAlert';
import { EmptyComponent } from '../../common/EmptyComponent';
import Header from '../../common/Header';
import Loader from '../../common/Loader';
import { Color, string } from '../../constants';
import STRING from '../../constants/string';
import ApprovalScreen from '../../services/approvalScreen';
import catalogueDashboard from '../../services/catalogueDashboard';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { getBlueTrophy } from '../ApproveDashboard/getApi';
import styles from './style';
const windowWidth = Dimensions.get('window').width;
const ApproveCatalogue = () => {
  const redeem = useSelector(state => state.ApiReducer.blue_trophy);
  const [modalVisible, setModalVisible] = useState(false);
  const [dmodalVisible, setdModalVisible] = useState(false);
  const [currentTab, setCurrentTab] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [popupdata, setpopupdata] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [catalogueId, setCatalogueId] = useState('');
  const navigation = useNavigation();
  const [redeemtrophy, setRedeemTrophy] = useState([]);
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [reducetrophyNum, setreducetrophyNum] = useState();
  const [trophyNum, setTrophyNum] = useState();

  const APICallling = async () => {
    try {
      gettrophies();
      getPerticulrNumber();
    } catch (error) {}
  };
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    gettrophies();
    getPerticulrNumber();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const handleItemPress = title => {
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
      alertType: title.trophies > redeem.remainingTrophies ? '' : 'warning',
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

  const handleRedeemPress = title => {
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
      alertType: title.trophies > redeem.remainingTrophies ? '' : 'warning',
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

  useEffect(() => {
    setCurrentTab(true);
  }, [focused]);

  const gettrophies = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const { data } = await ApprovalScreen.getAllActiveApproverCatalogues(
        itsid,
        token,
      );
      setRedeemTrophy(data.data.APPROVERS);
      MyConsole.log(redeem.remainingTrophies);
      setLoading(false);
    } catch ({ response }) {
      MyConsole.log('jjjjj', response);
      setLoading(false);
    }
  };

  const getPerticulrNumber = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const { data } = await catalogueDashboard.getNumTrophies(token);
      setTrophyNum(data.data.trophiesRedeemed);
    } catch (err) {
      MyConsole.log('PER ERRROR', err);
    }
  };

  const getreduceTrophies = async id => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const values = {
        catalogueId: id,
        itsId: itsid,
      };
      MyConsole.log('reducetrophyNum', values);
      const { data, config } = await catalogueDashboard.redeemBlueTrophies(
        values,
        token,
      );
      showAlert({
        header: '',
        title: 'Trophy Redeemed Successfully',
      });
      MyConsole.log('reducetrophyNum', data);
      APICallling();
      dispatch(getBlueTrophy(itsid));
    } catch (err) {
      MyConsole.log('NNNNNN', err);
    }
  };
  const Item = ({ title }) => (
    <View>
      <StatusBar backgroundColor={Color.bgColor} barStyle="dark-content" />
      <View style={styles.description_view}>
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
        <TouchableOpacity onPress={() => handleItemPress(title)}>
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

  const AchieveItem = ({ title }) => {
    return (
      <View>
        <View style={styles.achieveView}>
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
          <TouchableOpacity onPress={() => handleRedeemPress(title)} />
        </View>
      </View>
    );
  };
  const renderItem = ({ item }) =>
    currentTab ? <Item title={item} /> : <AchieveItem title={item} />;
  return (
    <View style={styles.approverCatView}>
      <Header />
      {isLoading ? null : (
        <SafeAreaView  style={styles.RewardView}>
          <View style={styles.viewReward}>
            <Text style={styles.catalogue}>{string.Catalogue} </Text>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate(string.RewardList);
              }}
            >
              <LinearGradient
                colors={Color.gradientColor}
                mode="contained"
                style={styles.lineargradient2}
              >
                <Text style={styles.buttontext2}>VIEW REWARD LIST</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            nestedScrollEnabled={true}
            keyboardShouldPersistTaps="handled"
            style={styles.scrollView}
          >
            <View>
              <LinearGradient
                colors={Color.gradientColor2}
                start={{ x: 0.2, y: 1.0 }}
                end={{ x: 1.0, y: 1.0 }}
                style={styles.lineargradientBorder}
              >
                <View style={styles.card}>
                  {/* <Card style={styles.card}> */}
                  {/* <Card.Content style={styles.title_view}> */}
                  <FastImage
                    style={styles.fast_img}
                    source={require('../../assets/images/Elaam_Icons/blue_trophy.png')}
                  />
                  <View style={styles.trophytext1}>
                    <Text style={styles.trophytext2}>
                      {redeem?.trophiesRedeemed + redeem?.remainingTrophies ||
                        0}
                    </Text>
                  </View>
                  <Text style={styles.text}>
                    {string.Trophies_Redeemed} {redeem?.trophiesRedeemed ?? 0}
                  </Text>
                  <Text style={styles.text2}>
                    {string.Trophies_to_Redeem} {redeem?.remainingTrophies ?? 0}
                  </Text>
                  {/* </Card.Content> */}
                  {/* </Card> */}
                </View>
              </LinearGradient>
            </View>
            <View style={styles.redeemTrophyView}>
              <View style={currentTab ? styles.achieveTab : styles.redeemTab}>
                <TouchableOpacity
                  onPress={() => {
                    (setCurrentTab(!false), gettrophies());
                  }}
                >
                  <Text
                    style={currentTab ? styles.achieveTxt : styles.redeemTxt2}
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
                    style={currentTab ? styles.redeemTxt2 : styles.achieveTxt}
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
                style={styles.lineargradientBorder}
              >
                <View style={styles.TrophiesList}>
                  <View style={styles.title_view} />
                  <SafeAreaView style={styles.container}>
                    <FlatList
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
                  <View style={styles.icon_row_view}>
                    <View style={styles.icon_start_view} />
                    <View style={styles.icon_last_view}>
                      <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                      >
                        <Icon
                          name="close"
                          size={28}
                          color={Color.white}
                          style={styles.close_icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.redeemTxt}>
                    {string.REDEEM_NOW_Button}
                  </Text>
                  <Text style={styles.popupDataTxt}>
                    {(popupdata >= redeem?.remainingTrophies ?? 0)
                      ? string.NOTHAVE
                      : popupdata + string.HAVE}
                  </Text>
                  <View style={styles.popUpConfirm}>
                    {popupdata <= (redeem?.remainingTrophies ?? 0) && (
                      <TouchableOpacity
                        onPress={() => {
                          getreduceTrophies();
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
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                      <LinearGradient
                        colors={Color.gradientColor}
                        mode="contained"
                        style={styles.lineargradient2}
                      >
                        <Text style={styles.buttontext2}>{string.Cancel}</Text>
                      </LinearGradient>
                    </TouchableOpacity>
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
                  <View style={styles.icon_row_view}>
                    <View style={styles.icon_start_view} />
                    <View style={styles.icon_last_view}>
                      <TouchableOpacity
                        onPress={() => setdModalVisible(!dmodalVisible)}
                      >
                        <Icon
                          name="close"
                          size={28}
                          color={Color.white}
                          style={styles.close_icon}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={styles.catalogueTxt}>
                    {string.Catalogue_detail}
                  </Text>
                  <Text style={styles.titleTxt}>
                    Title: <Text style={styles.titleData}>{title}</Text>
                  </Text>
                  <Text style={styles.descriptionTxt}>
                    Description:{' '}
                    <Text style={styles.descriptionData}>{description}</Text>
                  </Text>
                </View>
              </View>
            </Modal>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={styles.textStyle}>Show Modal</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      )}
      <Loader />
      {/* <MyFab /> */}
    </View>
  );
};
export default ApproveCatalogue;

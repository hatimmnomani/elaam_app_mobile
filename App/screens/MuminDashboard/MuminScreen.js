import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useState } from 'react';
import {
  BackHandler,
  Dimensions,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';
import LinearGradient from 'react-native-linear-gradient';
import { Card, Title } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch, useSelector } from 'react-redux';
import GoldTrophy from '../../assets/images/Elaam_Icons/GoldTrophy';
import Reward from '../../assets/images/Elaam_Icons/RewardIcon';
import TotalTrophy from '../../assets/images/Elaam_Icons/TotalTrophy';
import Trophy from '../../assets/images/Elaam_Icons/Trophy';
import { Header } from '../../common';
import { showAlert } from '../../common/CustomAlert';
import CustomCard from '../../common/CustomCard';
import Loader from '../../common/Loader';
import { MyFab } from '../../common/MyFab';
import { Color, string } from '../../constants/index';
import { selectTime } from '../../constants/string';
import DashBoardCard from '../../quiz/components/QuizDescriptionPage/DashBoardCard';
import QuizButton from '../../quiz/components/QuizDescriptionPage/QuizButton';
import { checkQuizAccess } from '../../quiz/redux/actions';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import MuminDashboard from '../../services/muminDashboard';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { QUIZ_ACCESS_CONFIG } from '../../utils/quizAccessConfig';
import styles from './styles';
import WelcomePopup from './WelcomePopup';
const MuminScreen = () => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [totalNiyat, setTotalNiyat] = useState(0);
  const [redeem, setRedeem] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [shadow, setShadow] = useState(false);
  // Get filter state from Redux
  const muminStartDate = useSelector(
    s => s.CommonReducer.mumin_filter_start_date,
  );
  const muminEndDate = useSelector(s => s.CommonReducer.mumin_filter_end_date);
  const muminDuration = useSelector(
    s => s.CommonReducer.mumin_selected_duration,
  );
  const { accessAllowed } = useSelector(state => state.quiz);

  // Local state for component (initialized from Redux)
  const [startDate, setStartDate] = useState(muminStartDate);
  const [endDate, setEndDate] = useState(muminEndDate);
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  // Configurable quiz access polling interval (20 seconds default)
  const QUIZ_ACCESS_POLL_INTERVAL = 20000; // 20 seconds in milliseconds

  // Quiz access polling effect
  useEffect(() => {
    if (!focused || accessAllowed || !QUIZ_ACCESS_CONFIG.ENABLED) {
      return;
    }

    MyConsole.log(
      'Starting quiz access polling every',
      QUIZ_ACCESS_CONFIG.POLL_INTERVAL / 1000,
      'seconds',
    );

    const pollQuizAccess = () => {
      if (accessAllowed) {
        MyConsole.log('Quiz access granted, stopping polling');
        return;
      }

      dispatch(checkQuizAccess())
        .then(allowed => {
          if (allowed) {
            MyConsole.log('Quiz access granted during polling');
          }
        })
        .catch(error => {
          MyConsole.log('Error checking quiz access:', error);
        });
    };

    // Initial check
    pollQuizAccess();

    // Set up interval for polling
    const intervalId = setInterval(
      pollQuizAccess,
      QUIZ_ACCESS_CONFIG.POLL_INTERVAL,
    );

    // Cleanup function
    return () => {
      MyConsole.log('Stopping quiz access polling');
      clearInterval(intervalId);
    };
  }, [focused, accessAllowed, dispatch]);

  // Main data loading effect
  useEffect(() => {
    if (!focused) {
      return;
    }

    // Sync local state with Redux when screen is focused (e.g., returning from Niyat list)
    if (startDate !== muminStartDate || endDate !== muminEndDate) {
      MyConsole.log(
        'Syncing filter state from Redux:',
        muminDuration,
        muminStartDate,
        muminEndDate,
      );
      setStartDate(muminStartDate);
      setEndDate(muminEndDate);
      setSelectedValue(muminDuration);
    }

    // Load data with current dates
    getNotification(muminStartDate, muminEndDate);
    getReedem();
    getTotalNiayt();

    async function fetchData() {
      // You can await here
      let checkIs = await MyAsyncStorage.getItem('isCheckMumin');
      setWhichDas(checkIs);
    }

    fetchData();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [focused]);
  const backAction = () => {
    if (focused) {
      if (navigation.canGoBack()) {
        navigation.goBack();
      } else {
        showAlert({
          header: 'Hold on!',
          message: 'Are you sure you want to Exit App ?',
          alertType: 'warning',
          onPress: () => {
            MyConsole.log('BackHandler.exitApp');
            RNExitApp.exitApp();
          },
        });
      }
      return true;
    }
  };
  const fetchData = async (
    apiFunction,
    setLoadingCallback,
    setCallback,
    ...params
  ) => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const { data } = await apiFunction(itsid, token, ...params);
      setCallback(data.data);
      setLoadingCallback(false);
    } catch ({ response }) {
      setLoadingCallback(false);
      MyConsole.log('error', response.data.errorMessage);
    }
  };
  // Get all niyat status
  const getNotification = async (sDate = startDate, eDate = endDate) => {
    fetchData(
      MuminDashboard.getAllNiyatStatusin,
      setLoading,
      setCompleted,
      sDate,
      eDate,
    );
  };
  // Get total and redeemed trophies
  const getReedem = async () => {
    fetchData(
      MuminDashboard.getTotalAndRedeemedTrophies,
      setLoading,
      setRedeem,
    );
  };
  // Get total niyat
  const getTotalNiayt = async () => {
    fetchData(MuminDashboard.getTotalNiyat, setLoading, setTotalNiyat);
  };
  const [whichDas, setWhichDas] = useState('Das');
  const [selectedValue, setSelectedValue] = useState('Last 3 Month');
  const Update = (selectedValue, itemIndex) => {
    setSelectedValue(selectedValue);
    // Dispatch to Redux
    dispatch(ReduxActionCreators.mumin_selected_duration(selectedValue));
    if (itemIndex >= 0 && itemIndex <= 4) {
      const monthsArray = [1, 3, 6, 12, 180];
      setStartDateAndEndDate(itemIndex, monthsArray[itemIndex]);
    } else {
      // Handle invalid itemIndex if needed
      MyConsole.log('Invalid itemIndex');
    }
  };
  const setStartDateAndEndDate = (itemIndex, months) => {
    const newEndDate = moment().format('YYYY-MM-DD');
    const newStartDate = moment()
      .subtract(months, 'month')
      .format('YYYY-MM-DD');
    setEndDate(newEndDate);
    setStartDate(newStartDate);
    // Dispatch to Redux instead of AsyncStorage
    dispatch(ReduxActionCreators.mumin_filter_start_date(newStartDate));
    dispatch(ReduxActionCreators.mumin_filter_end_date(newEndDate));
    // Pass new dates directly to avoid async state issues
    getNotification(newStartDate, newEndDate);
    MyConsole.log(
      `${
        itemIndex + 1
      }st SELECTED IS => EndDate ${newEndDate} StartDate IS => ${newStartDate}`,
    );
  };
  return (
    <View style={styles.mainView}>
      <StatusBar backgroundColor={Color.bgColor} barStyle="dark-content" />
      <WelcomePopup />
      <Header />
      <View style={styles.dropDownMainView}>
        <Text style={styles.txt} />
        <View style={styles.dropDownView}>
          <SelectDropdown
            data={selectTime}
            onSelect={(selectedItem, index) => {
              Update(selectedItem, index);
            }}
            renderButton={(selectedItem, isOpened) => (
              <View style={styles.dropdownButton}>
                <Text style={[styles.selectDropDownBtn]}>
                  {selectedItem || 'All'}
                </Text>
                <AntDesign
                  name={isOpened ? 'caretup' : 'caretdown'}
                  size={14}
                  color={Color.bloodMoon}
                  style={styles.antIcon}
                />
              </View>
            )}
            renderItem={(item, index, isSelected) => (
              <View
                style={[
                  styles.dropdownItem,
                  isSelected && { backgroundColor: '#f5f5f5' },
                ]}
              >
                <Text
                  style={[
                    styles.dropdownItemText,
                    isSelected && { color: Color.bloodMoon, fontWeight: '600' },
                  ]}
                >
                  {item}
                </Text>
              </View>
            )}
            dropdownStyle={styles.dropdownMenu}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
      {isLoading ? null : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={styles.scrolView}
        >
          {accessAllowed && (
            <LinearGradient
              colors={Color.gradientColor2}
              start={{ x: 0.2, y: 1.0 }}
              end={{ x: 1.0, y: 1.0 }}
              style={[
                styles.linearGradientCard,
                { marginVertical: windowWidth * 0.007 },
              ]}
            >
              <View style={styles.card}>
                {/* <Card style={styles.card}> */}
                <Card.Content style={styles.cardView}>
                  {/* <Title style={styles.title}> {string.Quiz} </Title>
                  <Reward
                    width={DeviceInfo.isTablet() ? 200 : 101}
                    height={DeviceInfo.isTablet() ? 60 : 25}
                    viewBox={
                      DeviceInfo.isTablet() ? '0 0 100 20' : '0 0 101 20'
                    }
                  /> */}
                  <DashBoardCard />

                  {/* Quiz Button */}

                  <View style={styles.buttonContainer}>
                    <QuizButton
                      onPress={() => {
                        navigation.navigate(string.Quiz);
                      }}
                    />
                  </View>
                  {/* <TouchableOpacity style={{ marginBottom: 10 }}>
                    <LinearGradient
                      colors={Color.gradientColor}
                      mode="contained"
                      style={[styles.linear]}
                    >
                      <Text
                        onPress={() => {
                          navigation.navigate(string.Quiz);
                        }}
                        style={styles.button_quiz}
                      >
                        {string.IstefadaIlmiyaQuiz}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity> */}
                </Card.Content>
                {/* </Card> */}
              </View>
            </LinearGradient>
          )}

          <LinearGradient
            colors={Color.gradientColor2}
            start={{ x: 0.2, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.linearGradientCard}
          >
            <View style={styles.card}>
              {/* <Card style={styles.card}> */}
              <Card.Content style={styles.cardView}>
                <Title style={styles.title}> {string.Reward} </Title>
                <Reward
                  width={DeviceInfo.isTablet() ? 200 : 101}
                  height={DeviceInfo.isTablet() ? 60 : 25}
                  viewBox={DeviceInfo.isTablet() ? '0 0 200 60' : '0 0 101 20'}
                />
                <Trophy
                  height={windowWidth * 0.6}
                  width={windowWidth * 0.6}
                  marginTop={windowWidth * 0 - 43}
                />
                <View style={styles.trophytext1}>
                  <Text style={styles.trophytext2}>
                    {redeem.trophiesRedeemed + redeem.remainingTrophies || 0}
                  </Text>
                </View>
                <Text style={styles.redeemText}>
                  {string.Trophies_Redeemed} {redeem.trophiesRedeemed}
                </Text>
                <TouchableOpacity>
                  <LinearGradient
                    colors={Color.gradientColor}
                    mode="contained"
                    marginTop={windowWidth * 0 - 48}
                    style={styles.linear}
                  >
                    <Text
                      onPress={() => {
                        dispatch(ReduxActionCreators.d_tab_type('Catalogue'));
                        navigation.navigate(string.CatalogueScreen);
                      }}
                      style={styles.button}
                    >
                      {' '}
                      {string.REDEEM_NOW_Button}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Card.Content>
              {/* </Card> */}
            </View>
          </LinearGradient>
          <LinearGradient
            colors={Color.gradientColor2}
            start={{ x: 0.2, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.linearGradientCard}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.cardView}>
                <View style={styles.cardView}>
                  <View style={styles.troffyView}>
                    <TotalTrophy height={windowHeight * 0.25} />
                    <View style={styles.totalDoneNiyatView}>
                      <Text style={styles.icon1text2}>{totalNiyat}</Text>
                    </View>
                    <Text style={styles.totalDoneNiyatText}>
                      {string.Total_Niyat_Done}{' '}
                    </Text>
                  </View>
                  <View style={styles.troffyView}>
                    <GoldTrophy height={windowHeight * 0.3} />
                    <View style={styles.totalNiytView}>
                      <Text style={styles.icon2text2}>
                        {string.Total_Niyat_Global}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.text}> {string.Level_Gold} </Text>
                </View>
              </Card.Content>
            </Card>
          </LinearGradient>
          <View style={styles.row}>
            <CustomCard
              onPress={() => {
                setShadow(false);
                navigation.navigate(string.ActiveNiyatList, {
                  cardTital: 'TOTAL NIYATS',
                  statNum: 0,
                  sDate: startDate,
                  eDate: endDate,
                });
              }}
              cardTitle={string.TOTAL_NIYATS}
              number={completed.totalNiyat ?? 0}
            />
            <CustomCard
              onPress={() => {
                setShadow(false);
                navigation.navigate(string.ActiveNiyatList, {
                  cardTital: 'ACTIVE',
                  statNum: 1,
                  sDate: startDate,
                  eDate: endDate,
                });
              }}
              cardTitle={string.ACTIVE}
              number={completed.active ?? 0}
            />
          </View>
          <View style={styles.row}>
            <CustomCard
              onPress={() => {
                setShadow(false);
                navigation.navigate(string.ActiveNiyatList, {
                  cardTital: 'APPROVAL PENDING',
                  statNum: 2,
                });
              }}
              cardTitle={string.APPROVAL_PENDING}
              number={completed.approvalPending ?? 0}
            />
            <CustomCard
              onPress={() => {
                setShadow(false);
                navigation.navigate(string.ActiveNiyatList, {
                  cardTital: 'COMPLETED',
                  statNum: 3,
                  sDate: startDate,
                  eDate: endDate,
                });
              }}
              cardTitle={string.COMPLETED}
              number={completed.completed ?? 0}
            />
          </View>
        </ScrollView>
      )}
      <MyFab />
      <Loader />
    </View>
  );
};
export default MuminScreen;

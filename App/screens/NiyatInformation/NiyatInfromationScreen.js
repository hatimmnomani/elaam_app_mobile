import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import {
   ImageBackground,
   Modal,
   Pressable,
   StatusBar,
   Text,
   View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CalenderIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { DownloadIconSvg, mubarakbtn, TimeSvg } from '../../assets';
import { Header } from '../../common';
import BottomSheet from '../../common/BottomSheet';
import DownloadFile from '../../common/DownloadFile';
import InfoSheet from '../../common/InfoSheet';
import styles from './styles';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import Trophy from '../../assets/images/Elaam_Icons/Trophy';
import { showAlert } from '../../common/CustomAlert';
import Loader from '../../common/Loader';
import { MyFab } from '../../common/MyFab';
import { Color, font, string } from '../../constants';
import COLOR from '../../constants/colors';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import muminDashboard from '../../services/muminDashboard';
import { formatRoleName } from '../../utils/CommonFunction';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { secondsToDhms } from '../../utils/MyCustomTime';
import { getGiftTrophy } from '../ApproveDashboard/getApi';
import { GiftAThrophyModal } from './GiftAThrophyModal';

const NiyatInfromationScreen = props => {
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refRBSheet3 = useRef();

  const refInfoSheet = useRef();
  const refInfoSheet2 = useRef();
  const refInfoSheet3 = useRef();

  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalGift, setModalGift] = useState(false);
  const [niyatData, setNiyatData] = useState({});
  const [requestButton, setRequestButton] = useState(false);
  const [niyat, setNiyat] = useState([]);
  const [niyatDate, setNiyatDate] = useState('2022-01-01');
  const [niyatQuestionEnglish, setNiyatQuestionEnglish] = useState('');
  const [approverone, setApproverone] = useState('');
  const [approvertwo, setApprovertwo] = useState('');
  const [approverthree, setApproverthree] = useState('');
  const [isapproverone, setisApproverone] = useState(false);
  const [isselfapprove, setisselfApprove] = useState(false);
  const [isapprovertwo, setisApprovertwo] = useState(false);
  const [isapproverthree, setisApproverthree] = useState(false);

  const [isGifted, setisGifted] = useState(false);
  // isGifted
  const [loading, setLoading] = useState(true);
  const [document, setDocument] = useState('');
  const [document2, setDocument2] = useState('');

  const [niyatId, setNiyatId] = useState('');
  const [completedDate, setCompletedDate] = useState('');
  const [timebound, setTimeBound] = useState('');
  const [role, setRole] = useState('');
  const [days, setDays] = useState('');
  const [firstdays, setFirstDays] = useState('');
  const [seconddays, setSecondDays] = useState('');
  const [thirddays, setThirdDays] = useState('');

  const [status, setStatus] = useState('');
  const [trophies, setTrophies] = useState('');
  const [trophies2, setTrophies2] = useState('');
  const [niyatType, setNiyatType] = useState('');

  const [itsApproved, setItsApproved] = useState('');
  const [isits, setIsIts] = useState(false);
  const [completedValue, setCompletedValue] = useState('');
  const [commitedValue, setCommitedValue] = useState('');
  const [name, setName] = useState('');

  var decoded;
  const openSheet = () => {
    refRBSheet.current.open();
    // setRole(approverone);
  };
  const openSheet2 = () => {
    refRBSheet2.current.open();
    // setRole(approverone);
  };
  const openSheet3 = () => {
    refRBSheet3.current.open();
    // setRole(approverone);
  };
  const openSecond = () => {
    refInfoSheet.current.open();
  };

  const openSecond2 = () => {
    refInfoSheet2.current.open();
  };
  const completeNiyat = async () => {
    MyConsole.log('sending....');
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    MyConsole.log('token', token);
    try {
      const values = {
        completedValue: niyatData?.commitedValue,
        niyatId: niyatId,
      };
      MyConsole.log('request values', values);
      const { data } = await muminDashboard.completeNiyat(values, token);
      showAlert({
        message: data.message,
        onPress: () => {
          MyConsole.log('files deleted!');
        },
      });
      if (niyatData?.niyatType === 'ITS APPROVED') {
        setIsIts(true);
      }
      MyConsole.log('data1', data);
      getNotification();
    } catch ({ response }) {
      MyConsole.log('errorNotiii', response);
    }
  };
  const getApproverDetails = async role => {
    if (role != null) {
      dispatch(ReduxActionCreators.appr_name(''));
      dispatch(ReduxActionCreators.appr_mobile(''));
      dispatch(ReduxActionCreators.appr_email(''));
      MyConsole.log('sending....' + niyatId);
      MyConsole.log('Role....' + role);
      const roleToLog = role ? role.replace('Saheb', '').trim() : role;
      MyConsole.log('Role....' + roleToLog);
      const token = await MyAsyncStorage.getItem('userToken');
      const itsid = await MyAsyncStorage.getItem('itsid');
      MyConsole.log('token', token);
      try {
        const values = {
          niyatId: niyatId,
          roleName: roleToLog,
        };

        MyConsole.log('sending2....' + niyatId);

        const { data, config } = await muminDashboard.approverdetail(
          values,
          token,
        );
        MyConsole.log('data1', config);
        MyConsole.log('data1', data);
        dispatch(ReduxActionCreators.appr_name(data.data.name ?? ''));
        dispatch(ReduxActionCreators.appr_mobile(data.data.mobileNumber ?? ''));
        dispatch(ReduxActionCreators.appr_email(data.data.email ?? ''));
      } catch (response) {
        MyConsole.log('errorNotii1', response);
        dispatch(ReduxActionCreators.appr_name(''));
        dispatch(ReduxActionCreators.appr_mobile(''));
        dispatch(ReduxActionCreators.appr_email(''));
      }
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      setLoading(true);
      console.debug('screen takes focus ondid focus');
      setIsIts(false);
      getNotification();
    });
    setLoading(true);
    console.debug('screen takes focus useEffect');
    setIsIts(false);
    getNotification();
    return unsubscribe;
  }, []);

  const getNotification = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('niyatid');
    MyConsole.log('niyatid', itsid);
    try {
      const { data } = await muminDashboard.getNiyat(itsid, token);
      MyConsole.log('niyat information', data);
      setNiyatData(data?.data[0]);

      // setCommitedValue(data.data[0].commitedValue);
      setNiyatDate(data.data[0].niyatDate);
      setApproverone(data.data[0].approver1);
      setRole(data.data[0].approver2);
      setApprovertwo(data.data[0].approver2);
      setRole(data.data[0].approver3);
      setApproverthree(data.data[0].approver3);
      setCompletedDate(data.data[0].completedDate);
      setNiyatId(data.data[0].niyatId);
      setDocument(data.data[0].scannedNiyatUrl);
      setDocument2(data.data[0].scannedNiyatUrl2);

      setStatus(data.data[0].status);
      setTrophies(data.data[0].trophiesAwarded);
      setCompletedValue(data.data[0].completedValue);
      setisGifted(data.data[0].isGifted);
      setName(data.data[0].name);
      if (data.data[0].status === '2' || data.data[0].status === '3') {
        setRequestButton(true);
      }
      if (data.data[0].firstApprovalDate != null) {
        MyConsole.log('first approve date' + data.data[0].firstApprovalDate);

        setisApproverone(true);
        var now = moment(new Date());
        var nowa = moment(data.data[0].firstApprovalDate);
        MyConsole.log('now', now);
        end = moment(data.data[0].selfCompletedDate); // another date
        var duration = moment.duration(nowa.diff(end));
        var hr = duration.asSeconds();
        setFirstDays(hr | 0);
        MyConsole.log('log first', hr | 0);
      } else {
        setisApproverone(false);
      }

      if (data.data[0].secondApprovalDate != null) {
        setisApprovertwo(true);

        var nowa = moment(data.data[0].secondApprovalDate);
        MyConsole.log('now', nowa);
        end = moment(data.data[0].selfCompletedDate); // another date
        var duration = moment.duration(nowa.diff(end));
        var hr = duration.asSeconds();
        setSecondDays(hr | 0);
        MyConsole.log('log first', hr | 0);
      } else {
        setisApprovertwo(false);
      }
      if (data.data[0].thirdApprovalDate != null) {
        setisApproverthree(true);

        var nowa = moment(data.data[0].thirdApprovalDate);
        MyConsole.log('now', nowa);
        end = moment(data.data[0].selfCompletedDate); // another date
        var duration = moment.duration(nowa.diff(end));
        var hr = duration.asSeconds();
        setThirdDays(hr | 0);
        MyConsole.log('log first', hr | 0);
      } else {
        setisApproverthree(false);
      }
      MyConsole.log('first approve date' + data.data[0].firstApprovalDate);
      if (data.data[0].selfCompletedDate != null) {
        setisselfApprove(true);
        setRequestButton(true);
        MyConsole.log('first approve date' + data.data[0].selfCompletedDate);
        var sdate = data.data[0].selfCompletedDate;
        var end = moment(sdate);
        var now = moment(new Date());
        MyConsole.log('now approve date ' + end); // another date
        MyConsole.log('now approve date ' + now); // another date
        var duration = moment.duration(now.diff(end));
        var hr = duration.asSeconds();
        setDays(duration.asSeconds() | 0);
        var sec = duration.asSeconds();
        MyConsole.log(hr | 0);
        MyConsole.log('days', days);
      } else {
        setDays('0');
      }
      setNiyat(data.data);
      MyConsole.log('alldata', niyat[0].niyatType);
      setLoading(false);
      if (status === '2' || status === '3') {
        setRequestButton(true);
      }
      MyConsole.log('first', isapproverone);
    } catch ({ response }) {
      setLoading(false);
      MyConsole.log('erro', response);
    }
  };
  const showError = message => {
    showAlert({
      header: 'Alert',
      title: message,
    });
  };

  const getGiftApprover = async props => {
    const value = {
      niyatId: niyatId,
      roleName:
        approverone && approvertwo && approverthree
          ? [approverone, approvertwo, approverthree]
          : approverone && approvertwo
            ? [approverone, approvertwo]
            : approverone && approverthree
              ? [approverone, approverthree]
              : approverone
                ? [approverone]
                : approvertwo
                  ? [approvertwo]
                  : approverthree
                    ? [approverthree]
                    : [],
    };
    MyConsole.log('approver33', value);
    dispatch(getGiftTrophy(value));
  };

  const checkIs = () => {
    setInterval(async () => {
      var che = await MyAsyncStorage.getItem('modelopen');

      if (che === 'openn1') {
        //   showAlert({
        //     header: '',
        //     title: string.DownloadMsg,
        //   });
        MyAsyncStorage.removeItem('modelopen');
      }
    }, 3000);
  };

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: Color.bgColor }}>
      <Header />
      <StatusBar backgroundColor={COLOR.bgColor} barStyle="dark-content" />
      <GiftAThrophyModal
        key={modalGift}
        setModalGift={setModalGift}
        modalGift={modalGift}
        trophies={niyatData?.trophiesAwarded}
        approverone={approverone ?? ''}
        approvertwo={approvertwo ?? ''}
        approverthree={approverthree ?? ''}
        niyatid={niyatId}
        setisGifted={setisGifted}
      />

      <BottomSheet
        reff={refRBSheet}
        role={approverone}
        niyatid={niyatId}
        key={approverone + 'a'}
        name={approverone}
        showError={showError}
      />

      <BottomSheet
        reff={refRBSheet2}
        role={approvertwo}
        niyatid={niyatId}
        key={approvertwo + 'b'}
        name={approvertwo}
        showError={showError}
      />

      <BottomSheet
        reff={refRBSheet3}
        role={approverthree}
        niyatid={niyatId}
        key={approverthree + 'c'}
        name={approverthree}
        showError={showError}
      />
      <InfoSheet
        reff={refInfoSheet}
        role={approverone}
        niyatId={niyatId}
        key={approverone + 'f'}
      />
      <InfoSheet
        reff={refInfoSheet2}
        role={approvertwo}
        niyatId={niyatId}
        key={approvertwo + 'e'}
      />
      <InfoSheet
        reff={refInfoSheet3}
        role={approverthree}
        niyatId={niyatId}
        key={approverthree + 'd'}
      />

      {/* Start=>  Niyat Information Model................ */}
      {!loading ? (
        <ScrollView>
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
                <Pressable
                  style={styles.buttonClose}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Icon name="close" size={30} color={'black'} />
                </Pressable>
                <DownloadIconSvg height={42} width={42} />
                <Text style={styles.textStyle}>{string.DownloadMsg}</Text>
              </View>
            </View>
          </Modal>
          {/* End=> Niyat Infromation  model */}

          <View style={styles.niyatInfo_heading_view}>
            <Icon
              name="arrow-back-outline"
              size={22}
              width={18}
              height={17}
              color={Color.titleColor}
              onPress={() => {
                navigation.replace(string.MuminDrawerNavigators);
              }}
            />
            <Text style={styles.niyatInfo_heading_txt}>Niyat Information</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>
              Mumin Name: <Text style={styles.mumin_name_txt}> {name}</Text>
            </Text>
            <Text style={styles.text}>
              {niyatData?.niyatQuestionEnglish} (Commited value:{' '}
              {niyatData?.commitedValue == '1'
                ? 'yes'
                : niyatData?.commitedValue == '2'
                  ? 'No'
                  : niyatData?.commitedValue}
              )
            </Text>

            {niyatData?.questType === 'RADIO' ||
            niyatData?.questType === 'CHECKBOX' ? (
              <View>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                  <Icon
                    name={
                      niyatData?.commitedValue === '1' ||
                      niyatData?.commitedValue === 'yes' ||
                      niyatData?.commitedValue === 'Yes'
                        ? 'radio-button-on-outline'
                        : 'radio-button-off-outline'
                    }
                    size={20}
                    color="orange"
                  />
                  <Text style={styles.yes_txt}>Yes</Text>
                  <Icon
                    name={
                      niyatData?.commitedValue === '2' ||
                      niyatData?.commitedValue === 'No' ||
                      niyatData?.commitedValue === 'no'
                        ? 'radio-button-on-outline'
                        : 'radio-button-off-outline'
                    }
                    size={20}
                    color="orange"
                  />
                  <Text style={styles.no_txt}>No</Text>
                </View>
              </View>
            ) : (
              <View style={styles.textBox}>
                <Text style={styles.qtext}>
                  {niyatData?.commitedValue}
                  {'            '}
                </Text>
              </View>
            )}

            <View
              style={{
                width: '100%',
                height: 30,
              }}
            >
              <Text
                style={{
                  fontSize: font.fontSizes14,
                  fontWeight: 'bold',
                  color: Color.titleColor,
                }}
              >
                Trophy Rewards on Niyat Completion :
                {niyatData.trophiesToWon ?? 0}
              </Text>
            </View>

            <View style={styles.fill_date_view}>
              <View style={{ flexDirection: 'row' }}>
                <CalenderIcon
                  name="calendar"
                  size={12}
                  color={Color.titleColor}
                />
                <Text style={styles.fill_date_txt}>Niyat Fill Date</Text>
              </View>
              <Text
                style={{ fontSize: font.fontSizes, color: Color.titleColor }}
              >
                {moment(niyatDate).format('DD-MM-YYYY')}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                MyConsole.log('url', document);
                if (document || document2) {
                  DownloadFile.checkPermission(document);
                  if (document2) {
                    DownloadFile.checkPermission(document2);
                  }
                } else {
                  showAlert({
                    header: '',
                    title: 'There is no any niyat form available',
                  });
                }
                checkIs();
              }}
              style={{
                flexDirection: 'row',
                marginTop: 10,
                marginBottom: 10,
              }}
            >
              <Icon name="document-text-outline" size={12} color="#573802" />
              <Text
                style={{
                  fontSize: font.fontSizes,
                  color: '#573802',
                  marginLeft: 10,
                }}
              >
                View Niyat Form
              </Text>
            </TouchableOpacity>

            {niyatData?.niyatType === 'SELF TIMEBOUND' ||
            niyatData?.niyatType === 'AAMIL and TIMEBOUND' ? (
              <Text
                style={{
                  fontSize: font.fontSizes,
                  color: Color.titleColor,
                  marginBottom: 10,
                }}
              >
                Days Left: {niyatData?.days}
              </Text>
            ) : null}

            {niyatData?.niyatType == 'ITS APPROVED' ? (
              <View>
                {isits ? (
                  <Text style={styles.text}>{niyatData?.itsApproved}</Text>
                ) : null}
              </View>
            ) : null}
            {niyatData?.status === '3' ? (
              <View>
                <View
                  style={{
                    elevation: 6,
                    width: '100%',
                    marginVertical: '4%',
                  }}
                >
                  <ImageBackground
                    resizeMode="contain"
                    style={{
                      justifyContent: 'flex-start',
                      width: '100%',
                      height: 35,
                    }}
                    source={mubarakbtn}
                  />
                </View>
                <Text numberOfLines={1} style={styles.ctext}>
                  YOU HAVE COMPLETED THE NIYAT
                </Text>
              </View>
            ) : (
              <Pressable
                style={{ marginTop: 10 }}
                onPress={() => {
                  if (niyatData?.status === '1') {
                    completeNiyat();
                    setRequestButton(true);
                  }
                }}
              >
                <LinearGradient
                  colors={
                    niyatData?.status != '1'
                      ? ['#fbedc5', '#fbedc5']
                      : ['#fff7dc', '#e5b43b']
                  }
                  style={{ borderRadius: 2, elevation: 6, padding: 10 }}
                >
                  <Text
                    style={{
                      textAlign: 'center',
                      color: requestButton ? '#2F3337' : Color.titleColor,
                      fontSize: font.fontSizes12,
                      fontWeight: 'bold',
                    }}
                  >
                    REQUEST FOR UPDATE
                  </Text>
                </LinearGradient>
              </Pressable>
            )}
          </View>
          {niyatData?.status === '3' && niyatData?.trophiesAwarded > 0 ? (
            <View
              style={{
                paddingVertical: 1,
                backgroundColor: Color.bgColor,
                elevation: 6,
                marginVertical: '4%',
                borderWidth: 2,
                justifyContent: 'center',
                alignSelf: 'center',
                borderColor: '#e5b43b',
                borderRadius: 8,
                width: '93%',
                paddingBottom: '2%',
              }}
            >
              <View style={styles.trophy_view}>
                <Trophy height={'100%'} width={'100%'} />
                <Text style={styles.trophy_txt}>
                  {niyatData?.trophiesAwarded}
                </Text>
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text
                  style={{
                    marginBottom: '3%',
                    fontSize: font.fontSizes20,
                    color: 'red',
                    fontWeight: '500',
                    marginHorizontal: '4%',
                    textAlign: 'center',
                  }}
                >
                  You have achieved {niyatData?.trophiesAwarded} trophies for
                  this Niyat
                </Text>
                <View
                  style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                  }}
                >
                  <TouchableOpacity
                    style={{ marginHorizontal: 10 }}
                    onPress={() => {
                      navigation.navigate(string.CatalogueScreen);
                    }}
                  >
                    <LinearGradient
                      colors={Color.gradientColor}
                      mode="contained"
                      style={styles.linear}
                    >
                      <Text style={styles.button}> REDEEM NOW </Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  {niyatData?.status !== '1' &&
                  niyatData?.niyatType !== 'ITS APPROVED' &&
                  niyatData?.niyatType !== 'SELF TIMEBOUND' &&
                  niyatData?.niyatType !== 'SELF APPROVED' ? (
                    <TouchableOpacity
                      style={{ marginHorizontal: 10 }}
                      onPress={() => {
                        if (isGifted) {
                          showAlert({
                            message: 'Already Gifted',
                            onPress: () => {
                              MyConsole.log('files deleted!');
                            },
                          });
                        } else {
                          setModalGift(true);
                          getGiftApprover();
                        }
                      }}
                    >
                      <LinearGradient
                        colors={Color.gradientColor}
                        mode="contained"
                        style={styles.linear}
                      >
                        <Text style={styles.button}> GIFT A TROPHY </Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}
          {niyatData?.status !== '1' &&
          niyatData?.niyatType !== 'ITS APPROVED' &&
          niyatData?.niyatType !== 'SELF TIMEBOUND' &&
          niyatData?.niyatType !== 'SELF APPROVED' &&
          requestButton ? (
            <View style={styles.row}>
              <Text style={styles.request_submit_txt}>
                {string.requestSubmitMsg}
              </Text>
              <Text
                onPress={() => {
                  setRole(approverone);
                  getApproverDetails(approverone);
                  openSecond();
                }}
                style={styles.approverone_txt}
              >
                {formatRoleName(approverone)}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TimeSvg />
                <Text
                  style={{
                    color: Color.titleColor,
                    fontSize: font.fontSizes,
                    marginLeft: 5,
                  }}
                >
                  {' '}
                  {isapproverone
                    ? secondsToDhms(firstdays)
                    : secondsToDhms(days)}
                </Text>
                {!isapproverone ? (
                  <View style={styles.pendingView}>
                    <Text style={styles.pending_txt}>Pending</Text>
                  </View>
                ) : (
                  <View style={styles.doneView}>
                    <Text style={styles.done_txt}>Done</Text>
                  </View>
                )}
              </View>

              <TouchableOpacity
                activeOpacity={niyatData?.status === '3' ? 1 : 0}
                onPress={() => {
                  if (niyatData?.status !== '3' && !isapproverone) {
                    openSheet();
                  }
                }}
                style={{ marginTop: 10 }}
              >
                <LinearGradient
                  colors={Color.gradientColor}
                  style={{ borderRadius: 2, elevation: 6, padding: 10 }}
                >
                  <Text style={styles.send_msg_txt}>SEND MESSAGE</Text>
                </LinearGradient>
              </TouchableOpacity>
              {approvertwo != null ? (
                <View style={{ marginTop: 10 }}>
                  <Text
                    onPress={() => {
                      setRole(approvertwo);
                      getApproverDetails(approvertwo);
                      openSecond();
                    }}
                    style={{
                      fontSize: font.fontSizes,
                      color: Color.titleColor,
                      textDecorationLine: 'underline',
                      textDecorationStyle: 'solid',
                      marginTop: 10,
                    }}
                  >
                    {formatRoleName(approvertwo)}
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TimeSvg />
                    <Text
                      style={{
                        color: Color.titleColor,
                        fontSize: font.fontSizes,
                        marginLeft: 5,
                      }}
                    >
                      {isapprovertwo
                        ? secondsToDhms(seconddays)
                        : secondsToDhms(days)}
                    </Text>
                    {!isapprovertwo ? (
                      <View style={styles.pendingView}>
                        <Text style={styles.pending_txt}>Pending</Text>
                      </View>
                    ) : (
                      <View style={styles.doneView}>
                        <Text style={styles.done_txt}>Done</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    activeOpacity={niyatData?.status === '3' ? 1 : 0}
                    onPress={() => {
                      if (niyatData?.status !== '3' && !isapprovertwo) {
                        openSheet2();
                      }
                    }}
                    style={{ marginTop: 10 }}
                  >
                    <LinearGradient
                      colors={Color.gradientColor}
                      style={{ borderRadius: 2, elevation: 6, padding: 10 }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: Color.titleColor,
                          fontSize: font.fontSizes12,
                          fontWeight: 'bold',
                        }}
                      >
                        SEND MESSAGE
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : null}

              {approverthree != null ? (
                <View style={{ marginTop: 10 }}>
                  <Text
                    onPress={() => {
                      setRole(approverthree);
                      getApproverDetails(approverthree);
                      openSecond();
                    }}
                    style={{
                      fontSize: font.fontSizes,
                      color: Color.titleColor,
                      textDecorationLine: 'underline',
                      textDecorationStyle: 'solid',
                      marginTop: 10,
                    }}
                  >
                    {formatRoleName(approverthree)}
                  </Text>
                  <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <TimeSvg />
                    <Text
                      style={{
                        color: Color.titleColor,
                        fontSize: font.fontSizes,
                        marginLeft: 5,
                      }}
                    >
                      {isapproverthree
                        ? secondsToDhms(thirddays)
                        : secondsToDhms(days)}
                    </Text>
                    {!isapproverthree ? (
                      <View style={styles.pendingView}>
                        <Text style={styles.pending_txt}>Pending</Text>
                      </View>
                    ) : (
                      <View style={styles.doneView}>
                        <Text style={styles.done_txt}>Done</Text>
                      </View>
                    )}
                  </View>
                  <TouchableOpacity
                    activeOpacity={niyatData?.status === '3' ? 1 : 0}
                    onPress={() => {
                      if (niyatData?.status !== '3' && !isapproverthree) {
                        openSheet3();
                      }
                    }}
                    style={{ marginTop: 10 }}
                  >
                    <LinearGradient
                      colors={Color.gradientColor}
                      style={{ borderRadius: 2, elevation: 6, padding: 10 }}
                    >
                      <Text
                        style={{
                          textAlign: 'center',
                          color: Color.titleColor,
                          fontSize: font.fontSizes12,
                          fontWeight: 'bold',
                        }}
                      >
                        SEND MESSAGE
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      ) : null}
      <Loader />
      <MyFab />
    </View>
  );
};
export default NiyatInfromationScreen;

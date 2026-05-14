import { useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import {
  Modal,
  Pressable,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

/* import components with icon */
import { useIsFocused } from '@react-navigation/native';
import { jwtDecode } from 'jwt-decode';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';
import CalenderIcon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';
import { DownloadIconSvg, TimeSvg } from '../../assets';
import { Header } from '../../common';
import BottomSheet from '../../common/BottomSheet';
import { showAlert } from '../../common/CustomAlert';
import DownloadFile from '../../common/DownloadFile';
import InfoSheet from '../../common/InfoSheet';
import Loader from '../../common/Loader';
import { MyFab } from '../../common/MyFab';
import { Color, font } from '../../constants/index';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import authService from '../../services/authServices';
import muminDashboard from '../../services/muminDashboard';
import { formatRoleName } from '../../utils/CommonFunction';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { RevertNiyatModal } from './RevertNiyatModal';
import styles from './styles';

const ApproveNiyatInfo = () => {
  const focused = useIsFocused();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();
  const refInfoSheet = useRef();
  const refInfoSheet2 = useRef();

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [requestButton, setRequestButton] = useState(false);
  const [isLoading, setLoading] = useState(true);
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

  const [document, setDocument] = useState('');
  const [document2, setDocument2] = useState('');

  const [niyatId, setNiyatId] = useState('');
  const [completedDate, setCompletedDate] = useState('');
  const [selfcompletedDate, setSelfCompletedDate] = useState('');
  const [role, setRole] = useState('');
  const [days, setDays] = useState('0');
  const [status, setStatus] = useState('');
  const [trophies, setTrophies] = useState('');
  const [trophies2, setTrophies2] = useState('');
  const [niyatType, setNiyatType] = useState('');
  const [authority, setAuthority] = useState('');
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [completedValue, setCompletedValue] = useState('');
  const [commitedValue, setCommitedValue] = useState('');
  const [firstdays, setFirstDays] = useState('0');
  const [seconddays, setSecondDays] = useState('0');
  const intervalRef = useRef(null);
  const [thirddays, setThirdDays] = useState('');

  const [name, setName] = useState('');
  const [questType, setQuesType] = useState('');
  const [timebound, setTimeBound] = useState('');
  const [test, setTest] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [aname, setAName] = useState('');
  var now = moment(new Date()); //todays date
  var end = moment('2022-02-18'); // another date
  const [info, setInfo] = useState([]);
  const [modalRevert, setModalRevert] = useState(false);

  const openSheet = () => {
    refRBSheet.current.open();
  };
  const openSheet2 = () => {
    refRBSheet2.current.open();
  };
  const openSecond = () => {
    refInfoSheet.current.open();
  };

  function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? ' day, ' : ' days, ') : '';
    var hDisplay = h > 0 ? h + (h == 1 ? ' hr, ' : ' hrs, ') : '';
    var mDisplay = m > 0 ? m + (m == 1 ? ' min ' : ' mins ') : '';
    var sDisplay = s > 0 ? s + (s == 1 ? ' second' : ' secs') : '';
    if (seconds < 60) {
      return seconds + 'sec';
    }
    return dDisplay + hDisplay + mDisplay;
  }
  /* Fetch Data from Notification API */
  const APICallling = async () => {
    try {
      const itsid = await MyAsyncStorage.getItem('itsid');
      const pass = await MyAsyncStorage.getItem('password');
      const ismumin = await MyAsyncStorage.getItem('isMumin');
      const values = {
        isMumin: ismumin,
        itsId: itsid,
        password: pass,
      };
      const { data } = await authService.login(values);
      MyConsole.log(data.token);
      await MyAsyncStorage.setItem('userToken', 'Bearer ' + data.token);
      getNiyatInfoByIdin();
      var decoded = jwtDecode(data.token);
      MyConsole.log('decoded', decoded.Roles[0].authority);
      setAuthority(decoded.Roles[0].authority);
    } catch ({ response }) {
      MyConsole.log('error', response);
    }
  };
  const getApproverDetails = async role => {
    if (role != null) {
      dispatch(ReduxActionCreators.appr_name(''));
      dispatch(ReduxActionCreators.appr_mobile(''));
      dispatch(ReduxActionCreators.appr_email(''));
      MyConsole.log('sending....' + niyatId);
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

        const { data } = await muminDashboard.approverdetail(values, token);
        dispatch(ReduxActionCreators.appr_name(data.data.name));
        dispatch(ReduxActionCreators.appr_mobile(data.data.mobileNumber));
        dispatch(ReduxActionCreators.appr_email(data.data.email));
        MyConsole.log('data1', data);
      } catch ({ response }) {
        dispatch(ReduxActionCreators.appr_name(''));
        dispatch(ReduxActionCreators.appr_mobile(''));
        dispatch(ReduxActionCreators.appr_email(''));
        MyConsole.log('errorNotii1', response);
      }
    }
  };
  useEffect(() => {
    getNiyatInfoByIdin();
  }, [focused]);
  const getNiyatInfoByIdin = async () => {
    setLoading(true);
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('niyatid');

    try {
      const { data } = await muminDashboard.getNiyat(itsid, token);
      MyConsole.log('data1', data);
      setInfo(data);
      setTimeBound(data.data[0].days);
      setNiyatQuestionEnglish(data.data[0].niyatQuestionEnglish);
      setQuesType(data.data[0].questType);
      setNiyatDate(data.data[0].niyatDate);
      setApproverone(data.data[0].approver1);
      setRole(data.data[0].approver1);
      setApprovertwo(data.data[0].approver2);
      setApproverthree(data.data[0].approver3);
      setCompletedDate(data.data[0].completedDate);
      setNiyatId(data.data[0].niyatId);
      setDocument(data.data[0].scannedNiyatUrl);
      setDocument2(data.data[0].scannedNiyatUrl2);
      setStatus(data.data[0].status);
      setTrophies(data.data[0].trophiesAwarded);
      setTrophies2(data.data[0].trophiesToWon);
      setCompletedValue(data.data[0].completedValue);
      setCommitedValue(data.data[0].commitedValue);
      setName(data.data[0].name);
      MyConsole.log(data.data[0].niyatType);
      setNiyatType(data.data[0].niyatType);
      MyConsole.log('status button', status);
      if (data.data[0].status === '2' || data.data[0].status === '3') {
        setRequestButton(true);
      }
      MyConsole.log('request button', requestButton);
      if (data.data[0].firstApprovalDate != null) {
        MyConsole.log('first approve date' + data.data[0].firstApprovalDate);

        setisApproverone(true);
        var now = moment(new Date());
        var nowa = moment(data.data[0].firstApprovalDate);
        MyConsole.log('now', nowa);
        end = moment(data.data[0].selfCompletedDate);
        MyConsole.log('end', nowa); // another date
        var duration = moment.duration(nowa.diff(end));
        //  days = duration.asDays();
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
      MyConsole.log('complete approve date' + data.data[0].completedDate);
      if (data.data[0].selfCompletedDate != null) {
        setisselfApprove(true);
        setRequestButton(true);
        MyConsole.log('first approve date' + data.data[0].completedDate);
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
        setDays(0);
      }

      setNiyatDate(data.data[0].niyatDate);
      setApproverone(data.data[0].approver1);
      setRole(data.data[0].approver1);
      setApprovertwo(data.data[0].approver2);
      setCompletedDate(data.data[0].completedDate);
      setNiyatId(data.data[0].niyatId);
      setDocument(data.data[0].scannedNiyatUrl);
      setDocument2(data.data[0].scannedNiyatUrl2);

      setStatus(data.data[0].status);
      setTrophies(data.data[0].trophiesAwarded);
      setTrophies2(data.data[0].trophiesToWon);
      setCompletedValue(data.data[0].completedValue);
      MyConsole.log('alldata', niyat[0].niyatType);
      setLoading(false);
    } catch ({ response }) {
      MyConsole.log('errorNotiii', response);
      setLoading(false);
    }

    const decodee = await MyAsyncStorage.getItem('decode');
    const dvalue = JSON.parse(decodee);
    let roleAuthority;
    if (dvalue.Roles[0].authority === 'Mumin') {
      roleAuthority = dvalue.Roles[1].authority;
    } else {
      roleAuthority = dvalue.Roles[0].authority;
    }
    setAuthority(roleAuthority);
    // Set view-only mode for Khidmat Ramadaniyah role
    setIsViewOnly(roleAuthority === 'Khidmat Ramadaniyah');
  };

  const approveNiyat = async () => {
    MyConsole.log('sending....');
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    const rolee = await MyAsyncStorage.getItem('Role');
    MyConsole.log('token', token);
    MyConsole.log('role', rolee);
    try {
      const values = {
        niyatId: niyatId,
        roleName: rolee,
      };
      const { data } = await muminDashboard.approvalNiyat(values, token);
      showAlert({
        header: '',
        title: data.message,
      });
      refRBSheet.current.close();
      getNiyatInfoByIdin();
      MyConsole.log('data1', data);
    } catch ({ response }) {
      MyConsole.log('errorNoti', response.data);
      showAlert({
        header: '',
        title: response.data.errorMessage,
      });
    }
  };
  const checkIs = () => {
    // Clear any existing interval to prevent multiple timers
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(async () => {
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

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  const showError = message => {
    showAlert({
      header: 'Alert',
      title: message,
    });
    MyConsole.log('after showAlert ');
  };

  return (
    <View style={{ flex: 1, width: '100%', backgroundColor: Color.bgColor }}>
      <Header />
      <StatusBar backgroundColor={'transparent'} barStyle="dark-content" />
      <RevertNiyatModal
        key={modalRevert}
        setModalRevert={setModalRevert}
        modalRevert={modalRevert}
        niyatid={niyatId}
        roleName={role}
      />

      <BottomSheet
        reff={refRBSheet}
        role={approverone}
        niyatid={niyatId}
        key={approverone + '_bottom1'}
        showError={showError}
        name={name}
      />

      <BottomSheet
        reff={refRBSheet2}
        role={approvertwo}
        niyatid={niyatId}
        key={approvertwo + '_bottom2'}
        showError={showError}
        name={name}
      />
      <InfoSheet
        reff={refInfoSheet}
        role={approverone}
        niyatId={niyatId}
        key={approverone}
      />
      <InfoSheet
        reff={refInfoSheet2}
        role={approvertwo}
        niyatId={niyatId}
        key={approvertwo}
      />

      {/* Start=>  Niyat Information Model................ */}
      {isLoading ? null : (
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
                <Text style={styles.textStyle}>
                  Your form has been downloaded
                </Text>
              </View>
            </View>
          </Modal>
          {/* End=> Niyat Infromation  model */}

          <View style={styles.scroll_view}>
            <Icon
              name="arrow-back-outline"
              size={22}
              width={18}
              height={17}
              color={Color.titleColor}
              onPress={() => {
                navigation.goBack(null);
              }}
            />
            <Text style={styles.niyat_txt}>Niyat Information</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.text, { color: Color.grey }]}>
              Mumin Name: {name}
            </Text>
            <Text style={styles.text}>
              {niyatQuestionEnglish} (Commited value:{' '}
              {commitedValue == '1'
                ? 'yes'
                : commitedValue == '2'
                  ? 'No'
                  : commitedValue}
              )
            </Text>

            {questType === 'RADIO' || questType === 'CHECKBOX' ? (
              <View>
                <View style={styles.radioView}>
                  <Icon
                    name={
                      commitedValue === '1' ||
                      commitedValue === 'yes' ||
                      commitedValue === 'Yes'
                        ? 'radio-button-on-outline'
                        : 'radio-button-off-outline'
                    }
                    size={20}
                    color={Color.grey}
                  />
                  <Text style={styles.yes_txt}>Yes</Text>
                  <Icon
                    name={
                      commitedValue === '2' ||
                      commitedValue === 'No' ||
                      commitedValue === 'no'
                        ? 'radio-button-on-outline'
                        : 'radio-button-off-outline'
                    }
                    size={20}
                    color={Color.grey}
                  />
                  <Text style={styles.no_txt}>No</Text>
                </View>
              </View>
            ) : (
              <View style={styles.textBox}>
                <Text style={styles.qtext}>
                  {commitedValue}
                  {'            '}
                </Text>
              </View>
            )}
            <View style={styles.trophy_view}>
              <Text style={styles.trophy_txt}>
                Trophy Rewards on Niyat Completion :{trophies2 ? trophies2 : 0}
              </Text>
            </View>
            <View style={styles.calanderView}>
              <View style={{ flexDirection: 'row' }}>
                <CalenderIcon
                  name="calendar"
                  size={12}
                  color={Color.titleColor}
                />
                <Text style={styles.niyatFillDateTxt}>Niyat Fill Date</Text>
              </View>
              <Text style={styles.dateTxt}>
                {moment(niyatDate).format('DD-MM-YYYY')}
              </Text>
            </View>
            <TouchableOpacity
              style={{ flexDirection: 'row', marginTop: 10 }}
              onPress={() => {
                MyConsole.log('url', document);
                DownloadFile.checkPermission(document);
                if (document2) {
                  DownloadFile.checkPermission(document2);
                }
                checkIs();
              }}
            >
              <Icon
                name="document-text-outline"
                size={12}
                color={Color.titleColor}
              />
              <Text style={styles.viewNiyatFormTxt}>View Niyat Form</Text>
            </TouchableOpacity>
            {niyatType === 'SELF TIMEBOUND' ||
            niyatType === 'AAMIL and TIMEBOUND' ? (
              <Text style={styles.timeboundTxt}>Days Left: {timebound}</Text>
            ) : null}
          </View>

          {niyatType !== 'ITS APPROVED' &&
          niyatType !== 'SELF TIMEBOUND' &&
          niyatType !== 'SELF APPROVED' &&
          requestButton ? (
            <View style={styles.row}>
              <Text
                onPress={() => {
                  setRole(approverone);
                  getApproverDetails(approverone);
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
                {formatRoleName(info.data[0].approver1)}
              </Text>

              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TimeSvg />

                <Text
                  style={{
                    color: '#573802',
                    fontSize: font.fontSizes,
                    marginLeft: 5,
                  }}
                >
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

              <Pressable
                style={{
                  marginTop: 10,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                onPress={() => setRequestButton(true)}
              >
                <LinearGradient
                  colors={
                    approverone != authority || status === '3'
                      ? ['#fbedc5', '#fbedc5']
                      : ['#fff7dc', '#e5b43b']
                  }
                  style={{ borderRadius: 10, elevation: 6, padding: 10 }}
                >
                  <Text
                    onPress={() => {
                      if (approverone == authority && status !== '3') {
                        setRole(approverone);
                        openSheet();
                      }
                    }}
                    style={styles.revert_txt}
                  >
                    SEND MESSAGE
                  </Text>
                </LinearGradient>

                {status === '3' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <LinearGradient
                      colors={['#fbedc5', '#fbedc5']}
                      style={{ borderRadius: 10, elevation: 6, padding: 10 }}
                    >
                      <Text style={styles.revert_txt}>Approve Niyat</Text>
                    </LinearGradient>

                    <LinearGradient
                      colors={
                        ['#fbedc5', '#fbedc5']
                        // approverone != authority
                        //   ? ['#fbedc5', '#fbedc5']
                        //   : ['#fff7dc', '#e5b43b']
                      }
                      style={{
                        borderRadius: 10,
                        elevation: 6,
                        padding: 10,
                        paddingHorizontal: '2%',
                      }}
                    >
                      <Text style={styles.revert_txt}>Revert Niyat</Text>
                    </LinearGradient>
                  </View>
                ) : (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                  >
                    <LinearGradient
                      colors={
                        approverone != authority || isViewOnly
                          ? ['#fbedc5', '#fbedc5']
                          : ['#fff7dc', '#e5b43b']
                      }
                      style={{ borderRadius: 10, elevation: 6, padding: 10 }}
                    >
                      <Text
                        onPress={() => {
                          if (approverone == authority && !isViewOnly) {
                            setRole(approverone);
                            setTest('123456');
                            MyAsyncStorage.setItem('Role', approverone);
                            approveNiyat();
                          }
                        }}
                        style={styles.revert_txt}
                      >
                        Approve Niyat
                      </Text>
                    </LinearGradient>
                    <LinearGradient
                      colors={
                        approverone != authority || isViewOnly
                          ? ['#fbedc5', '#fbedc5']
                          : ['#fff7dc', '#e5b43b']
                      }
                      style={{
                        borderRadius: 10,
                        elevation: 6,
                        padding: 10,
                        paddingHorizontal: '2%',
                      }}
                    >
                      <Text
                        onPress={() => {
                          if (approverone == authority && !isViewOnly) {
                            setRole(approverone);
                            setModalRevert(true);
                          }
                        }}
                        style={styles.revert_txt}
                      >
                        Revert Niyat
                      </Text>
                    </LinearGradient>
                  </View>
                )}
              </Pressable>
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
                      color: '#573802',
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
                        color: '#573802',
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
                  <Pressable
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => setRequestButton(true)}
                  >
                    <LinearGradient
                      colors={
                        approvertwo != authority || status === '3'
                          ? ['#fbedc5', '#fbedc5']
                          : ['#fff7dc', '#e5b43b']
                      }
                      style={{ borderRadius: 10, elevation: 6, padding: 10 }}
                    >
                      <Text
                        onPress={() => {
                          if (approvertwo == authority && status !== '3') {
                            setRole(approvertwo);
                            openSheet2();
                          }
                        }}
                        style={styles.revert_txt}
                      >
                        SEND MESSAGE
                      </Text>
                    </LinearGradient>

                    {status === '3' ? (
                      <View style={styles.calanderView}>
                        <LinearGradient
                          colors={['#fbedc5', '#fbedc5']}
                          style={{
                            borderRadius: 10,
                            elevation: 6,
                            padding: 10,
                          }}
                        >
                          <Text style={styles.revert_txt}>Approve Niyat</Text>
                        </LinearGradient>

                        <LinearGradient
                          colors={
                            ['#fbedc5', '#fbedc5']
                            // approverone != authority
                            //   ? ['#fbedc5', '#fbedc5']
                            //   : ['#fff7dc', '#e5b43b']
                          }
                          style={{
                            borderRadius: 10,
                            elevation: 6,
                            padding: 10,
                            paddingHorizontal: '2%',
                          }}
                        >
                          <Text
                            // onPress={() => {
                            //   if (approverone == authority) {
                            //     setModalRevert(true);
                            //   }
                            // }}
                            style={styles.revert_txt}
                          >
                            Revert Niyat
                          </Text>
                        </LinearGradient>
                      </View>
                    ) : (
                      <View style={styles.calanderView}>
                        <LinearGradient
                          colors={
                            approvertwo != authority || isViewOnly
                              ? ['#fbedc5', '#fbedc5']
                              : ['#fff7dc', '#e5b43b']
                          }
                          style={{
                            borderRadius: 10,
                            elevation: 6,
                            padding: 10,
                          }}
                        >
                          <Text
                            onPress={() => {
                              if (approvertwo == authority && !isViewOnly) {
                                setRole(approvertwo);
                                setTest('123453456');
                                MyAsyncStorage.setItem('Role', approvertwo);
                                approveNiyat();
                              }
                            }}
                            style={{
                              textAlign: 'center',
                              color: '#573802',
                              fontSize: font.fontSizes12,
                              fontWeight: 'bold',
                            }}
                          >
                            Approve Niyat
                          </Text>
                        </LinearGradient>

                        <LinearGradient
                          colors={
                            approvertwo != authority || isViewOnly
                              ? ['#fbedc5', '#fbedc5']
                              : ['#fff7dc', '#e5b43b']
                          }
                          style={{
                            borderRadius: 10,
                            elevation: 6,
                            padding: 10,
                            paddingHorizontal: '2%',
                          }}
                        >
                          <Text
                            onPress={() => {
                              if (approvertwo == authority && !isViewOnly) {
                                setRole(approvertwo);
                                setModalRevert(true);
                              }
                            }}
                            style={{
                              textAlign: 'center',
                              color: '#573802',
                              fontSize: font.fontSizes12,
                              fontWeight: 'bold',
                            }}
                          >
                            Revert Niyat
                          </Text>
                        </LinearGradient>
                      </View>
                    )}
                  </Pressable>
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
                      color: '#573802',
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
                        color: '#573802',
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
                  <Pressable
                    style={{
                      marginTop: 10,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => setRequestButton(true)}
                  >
                    <LinearGradient
                      colors={
                        approverthree != authority || status === '3'
                          ? ['#fbedc5', '#fbedc5']
                          : ['#fff7dc', '#e5b43b']
                      }
                      style={{ borderRadius: 10, elevation: 6, padding: 10 }}
                    >
                      <Text
                        onPress={() => {
                          if (approverthree == authority && status !== '3') {
                            setRole(approverthree);

                            openSheet2();
                          }
                        }}
                        style={styles.revert_txt}
                      >
                        SEND MESSAGE
                      </Text>
                    </LinearGradient>

                    {status === '3' ? (
                      <View style={styles.calanderView}>
                        <LinearGradient
                          colors={['#fbedc5', '#fbedc5']}
                          style={{
                            borderRadius: 10,
                            elevation: 6,
                            padding: 10,
                          }}
                        >
                          <Text style={styles.revert_txt}>Approve Niyat</Text>
                        </LinearGradient>

                        <LinearGradient
                          colors={
                            ['#fbedc5', '#fbedc5']
                            // approverone != authority
                            //   ? ['#fbedc5', '#fbedc5']
                            //   : ['#fff7dc', '#e5b43b']
                          }
                          style={{
                            borderRadius: 10,
                            elevation: 6,
                            padding: 10,
                            paddingHorizontal: '2%',
                          }}
                        >
                          <Text style={styles.revert_txt}>Revert Niyat</Text>
                        </LinearGradient>
                      </View>
                    ) : (
                      <View style={styles.calanderView}>
                        <LinearGradient
                          colors={
                            approverthree != authority || isViewOnly
                              ? ['#fbedc5', '#fbedc5']
                              : ['#fff7dc', '#e5b43b']
                          }
                          style={{
                            borderRadius: 10,
                            elevation: 6,
                            padding: 10,
                          }}
                        >
                          <Text
                            onPress={() => {
                              if (approverthree == authority && !isViewOnly) {
                                setRole(approverthree);
                                setTest('123453456');
                                MyAsyncStorage.setItem('Role', approverthree);
                                approveNiyat();
                              }
                            }}
                            style={styles.revert_txt}
                          >
                            Approve Niyat
                          </Text>
                        </LinearGradient>

                        <LinearGradient
                          colors={
                            approverthree != authority || isViewOnly
                              ? ['#fbedc5', '#fbedc5']
                              : ['#fff7dc', '#e5b43b']
                          }
                          style={{
                            borderRadius: 10,
                            elevation: 6,
                            padding: 10,
                            paddingHorizontal: '2%',
                          }}
                        >
                          <Text
                            onPress={() => {
                              if (approverthree == authority && !isViewOnly) {
                                setRole(approverthree);
                                setModalRevert(true);
                              }
                            }}
                            style={styles.revert_txt}
                          >
                            Revert Niyat
                          </Text>
                        </LinearGradient>
                      </View>
                    )}
                  </Pressable>
                </View>
              ) : null}
            </View>
          ) : null}
        </ScrollView>
      )}
      <Loader />
      <MyFab />
    </View>
  );
};
export default ApproveNiyatInfo;

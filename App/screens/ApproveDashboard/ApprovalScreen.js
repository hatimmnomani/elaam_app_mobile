import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import {
  BackHandler,
  FlatList,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { DownloadIconSvg } from '../../assets';
import { Header } from '../../common';
import { showAlert } from '../../common/CustomAlert';
import { EmptyComponent } from '../../common/EmptyComponent';
import Loader from '../../common/Loader';
import NiyatStatusItem from '../../common/NiyatStatusItem';
import COLOR from '../../constants/colors';
import { Color, string } from '../../constants/index';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import ApprovalScreen from '../../services/approvalScreen';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import ApprovalHeader from './ApprovalHeader';
import {
  checkDeptHead,
  checkUmmorHead,
  getBlueTrophy,
  getJamaatActiveNiyatListForPending,
  getPendingNiyatList,
} from './getApi';
import styles from './styles';

const ApprovalDashboard = () => {
  const dispatch = useDispatch();
  const token_Decode = useSelector(s => s.CommonReducer.token_Decode);
  const a_dropdown_selected = useSelector(
    s => s.ApiReducer.a_dropdown_selected,
  );
  const approval_pending_list = useSelector(
    s => s.ApiReducer.approval_pending_list,
  );
  const approver_local_data = useSelector(
    s => s.ApiReducer.approver_local_data,
  );
  const pending_search = useSelector(s => s.ApiReducer.pending_search);
  const selected_date = useSelector(s => s.CommonReducer.selected_date);
  const checkaamil = obj => obj.authority === 'Aamil';
  const checkMuavinAamil = obj => obj.authority === 'Muavin Aamil';
  const chceckUmmor = obj => obj.authority === 'Umoor Coordinator';
  const checkJamiatMasool = obj => obj.authority === 'Jamiat Masool';
  const checkKhidmatRamadaniyah = obj =>
    obj.authority === 'Khidmat Ramadaniyah';
  const navigation = useNavigation();
  const focused = useIsFocused();
  const [approved, setApproved] = useState(0);
  const [jammatid, setJammatId] = useState('');
  const [shouldCShow, setShouldCShow] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [approvalNiyat, setApprovalNiyat] = useState([]);
  const [jamaatList, setjamaatList] = useState([]);
  const [ajamaat, setAjamaat] = useState([]);
  const [jamaat, setjamaat] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [test, settest] = useState('fgh');
  const [totalPages, setTotalPages] = useState(1);
  const [filterData, setfilterData] = useState([]);

  const [cmasterData, setCMasterData] = useState([]);
  const [search, setsearch] = useState('');
  const [csearch, setCsearch] = useState('');
  const [pageNo, setPageNo] = useState(1);
  const [pendingPageNo, setPendingPageNo] = useState(0);
  const initialLoadRef = useRef(false);

  var now = moment();
  var date = new Date().getDate();
  moment().format('YYYY-MM-DD');
  var endDate = now.format('YYYY-MM-DD');
  var startDate = moment()
    .date(1)
    .month(now.month())
    .year(now.year())
    .format('YYYY-MM-DD');
  var dateee = moment().subtract(240, 'month').format('YYYY-MM-DD');
  const Update = (selectedValue, itemIndex, newDateValue = null) => {
    const monthsToSubtract = [1, 3, 6, 12, 180];
    const months = monthsToSubtract[itemIndex];
    startDate = date;
    dateee = moment().subtract(months, 'month').format('YYYY-MM-DD');
    setCMasterData([]);
    setLoading(true);
    getapproveNiyats(newDateValue || selectedValue);

    // Get the correct ID based on role (id for jamaat/jamiat, umoorId for umoor)
    const dropdownId = a_dropdown_selected?.umoorId || a_dropdown_selected?.id;
    getAllActiveNiyatList(pageNo, dropdownId);

    // Reload pending list for Khidmat Ramadaniyah role when date filter changes
    if (
      token_Decode?.Roles?.some(checkKhidmatRamadaniyah) &&
      Object.keys(a_dropdown_selected).length !== 0
    ) {
      dispatch(
        getJamaatActiveNiyatListForPending(
          0,
          a_dropdown_selected.id,
          pending_search,
          approval_pending_list,
          setPendingPageNo,
          newDateValue || selectedValue,
        ),
      );
    }
  };

  useEffect(() => {
    MyConsole.log('fjamaat change', pending_search);
    // Only run search effect after initial load is complete
    // Initial load is handled by a_dropdown_selected useEffect
    if (
      initialLoadRef.current &&
      focused &&
      Object.keys(a_dropdown_selected).length !== 0 &&
      (pending_search.length === 8 || pending_search.length === 0)
    ) {
      // Search changes should reload both pending and approved data
      updateDropDown(a_dropdown_selected, 0, pending_search, false);
    }
    // updateDropDown(fjamaat, 0);
  }, [pending_search]);
  // useEffect(() => {
  //   MyConsole.log('fjamaat change', pending_search);
  //   if (
  //     approver_local_data?.approval_search.length === 8 ||
  //     approver_local_data?.approval_search.length === 0
  //   ) {
  //     searchCFilter(approver_local_data?.approval_search);
  //   }
  //   // updateDropDown(fjamaat, 0);
  // }, [approver_local_data?.approval_search]);
  useEffect(() => {
    MyConsole.log('a_dropdown_selected change', a_dropdown_selected);
    if (focused && Object.keys(a_dropdown_selected).length !== 0) {
      // Skip approved data loading on initial mount (already done by focused useEffect)
      // Only load pending data via updateDropDown
      updateDropDown(a_dropdown_selected, 0, 0, true);
      // Mark initial load as complete
      initialLoadRef.current = true;
    }
  }, [a_dropdown_selected]);

  // Reset and reload state when screen is focused (e.g., returning from Mumin view)
  useEffect(() => {
    if (focused) {
      MyConsole.log('Resetting state - screen focused');
      setCMasterData([]);
      setPendingPageNo(0);
      setPageNo(1);
      initialLoadRef.current = false;
      // Reset pending list in Redux to trigger reload
      dispatch(
        ReduxActionCreators.approval_pending_list({ list: [], count: 0 }),
      );

      // Reload pending data if dropdown is already selected
      if (Object.keys(a_dropdown_selected).length !== 0) {
        MyConsole.log('Reloading pending data on focus');
        updateDropDown(a_dropdown_selected, 0, pending_search, true);
        initialLoadRef.current = true;
      }
    }
  }, [focused]);
  useEffect(() => {
    if (focused && token_Decode?.Roles?.some(checkDeptHead)) {
      MyConsole.log('dept  inside');
      dispatch(
        getPendingNiyatList(
          0,
          '',
          '',
          pending_search,
          approval_pending_list,
          setPendingPageNo,
        ),
      );
    }
  }, [focused, pending_search]);

  // Reload approved count and list when date filter changes
  useEffect(() => {
    if (focused && Object.keys(a_dropdown_selected).length !== 0) {
      MyConsole.log('Date filter changed, reloading data');
      setCMasterData([]);
      setLoading(true);
      getapproveNiyats();
      const dropdownId =
        a_dropdown_selected?.umoorId || a_dropdown_selected?.id;
      getAllActiveNiyatList(0, dropdownId);
      // Reload pending list for Khidmat Ramadaniyah role
      if (token_Decode?.Roles?.some(checkKhidmatRamadaniyah)) {
        dispatch(
          getJamaatActiveNiyatListForPending(
            0,
            a_dropdown_selected.id,
            pending_search,
            approval_pending_list,
            setPendingPageNo,
            selected_date,
          ),
        );
      }
      // Reload pending list for Umoor Coordinator role
      if (
        token_Decode?.Roles?.some(chceckUmmor) ||
        token_Decode?.Roles?.some(checkUmmorHead)
      ) {
        dispatch(
          getPendingNiyatList(
            0,
            '',
            a_dropdown_selected?.umoorId || '',
            pending_search,
            approval_pending_list,
            setPendingPageNo,
          ),
        );
      }
    }
  }, [selected_date, focused]);

  const backAction = async () => {
    const shouldShows = await MyAsyncStorage.getItem('ShouldShow');
    if (shouldShows === 'false') {
      MyAsyncStorage.setItem('ShouldShow', 'true');
      // setShouldShow(true);
      setShouldCShow(false);
      // setIsChange('Approval Pending');
      setsearch('');
      setCsearch('');
      return true;
    } else {
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
  const getReedem = async () => {
    dispatch(getBlueTrophy(token_Decode?.sub));
  };
  useEffect(() => {
    if (focused) {
      getReedem();
      // Load count and dropdown data
      getapproveNiyats();
      setDefaultData();
    }
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [focused]);
  const setDefaultData = async () => {
    dispatch(
      ReduxActionCreators.approver_local_data({
        ...approver_local_data,
        approved_search: '',
        hide_header: false,
        show_pending_list: true,
        header: 'Approval Pending',
      }),
    );
    dispatch(ReduxActionCreators.pending_search(''));
    setsearch('');
    setPageNo(1);
    setPendingPageNo(0);
  };

  // Helper to get dates from selected_date Redux state or passed value
  const getDatesFromSelectedDate = (dateValue = null) => {
    const monthsMap = {
      'Last 1 Month': 1,
      'Last 3 Month': 3,
      'Last 6 Month': 6,
      '1 year': 12,
      All: 240,
    };
    const dateToUse = dateValue || selected_date;
    const months = monthsMap[dateToUse] || 240;
    return {
      endDate: moment().format('YYYY-MM-DD'),
      startDate: moment().subtract(months, 'month').format('YYYY-MM-DD'),
    };
  };

  const getapproveNiyats = async (dateValue = null) => {
    const token = await MyAsyncStorage.getItem('userToken');
    const dates = getDatesFromSelectedDate(dateValue);
    // const decodee = await MyAsyncStorage.getItem('decode');
    // const token_Decode = JSON.parse(decodee);
    if (token_Decode.Roles[0].authority.includes('Mumin')) {
      if (token_Decode.Roles[1].authority.includes('Dept Head')) {
        let did = token_Decode.DepartmentId[0];
        await MyAsyncStorage.setItem('DepartmentId', JSON.stringify(did));
        try {
          const values = {
            endDate: dates.endDate,
            startDate: dates.startDate,
            departmentId: did,
            status: 3,
          };
          MyConsole.log('dept -- values', values);
          const { data } = await ApprovalScreen.getDepartmentData(
            values,
            token,
          );
          MyConsole.log('dept --', data);

          // setApproved(data.data[0].statusCountDto.completed);
          setApproved(data?.data[0]?.statusCountDto?.completed ?? 0);

          let sum = data.data.reduce((a, c) => {
            return a + c.statusCountDto.completed;
          }, 0);
          setApproved(sum);
          setApprovalNiyat(data.data);
          setLoading(false);
        } catch ({ response }) {
          setLoading(false);
        }
      } else if (
        token_Decode.Roles[1].authority.includes('Aamil') ||
        token_Decode.Roles[1].authority.includes('Muavin Aamil') ||
        token_Decode.Roles[1].authority.includes('Khidmat Ramadaniyah')
      ) {
        MyConsole.log('Aamil ApprovedNiyat');
        // Use selected jamaat from dropdown (Redux), fallback to first jamaat from token
        const currentJamaatId =
          a_dropdown_selected?.id || token_Decode.JamaatId[0];
        MyConsole.log('currentJamaatId', currentJamaatId);
        try {
          const values = {
            endDate: dates.endDate,
            startDate: dates.startDate,
            id: currentJamaatId,
            jamaatId: currentJamaatId,
            status: 3,
          };
          const { data } = await ApprovalScreen.getJamaatActiveNiyatList(
            values,
            token,
          );
          MyConsole.log('Aamil ApprovedNiyat completed count', data);
          // setApproved(data.data[0].statusCountDto.completed);
          setApproved(data?.data[0]?.statusCountDto?.completed ?? 0);

          let sum = data.data.reduce((a, c) => {
            return a + c.statusCountDto.completed;
          }, 0);
          setApproved(sum);
          setApprovalNiyat(data.data);
          setLoading(false);
          const jslit = token_Decode.JamaatId;
          const myArrayFiltered = jamaatList.filter(el => {
            return jslit.some(f => {
              return f === el.id;
            });
          });
          setAjamaat(myArrayFiltered);
          var names = myArrayFiltered.map(function (i) {
            return i.jamaatName;
          });
          setjamaat(names);
        } catch ({ response }) {
          setLoading(false);
        }
      } else if (token_Decode.Roles[1].authority.includes('Jamiat Masool')) {
        // Use selected jamiat from dropdown (Redux), fallback to first jamiat from token
        const currentJamiatId =
          a_dropdown_selected?.id || token_Decode.JamiatId[0];
        MyConsole.log('JamiatId', currentJamiatId);
        try {
          const values = {
            endDate: dates.endDate,
            startDate: dates.startDate,
            id: currentJamiatId,
            jamiatId: currentJamiatId,
            status: 3,
          };
          MyConsole.log('JamaatId', values);
          const { data } = await ApprovalScreen.getJamiatData(values, token);
          setApproved(data.data[0].statusCountDto.completed);
          let sum = data.data.reduce((a, c) => {
            return a + c.statusCountDto.completed;
          }, 0);
          setApproved(sum);
          setApprovalNiyat(data.data);
          setLoading(false);
          setLoading(false);
        } catch ({ response }) {
          setLoading(false);
          MyConsole.log('error ApprovedNiyat', response);
        }
      } else if (
        token_Decode.Roles[1].authority.includes('Umoor Coordinator')
      ) {
        let jid = token_Decode.JamaatId[0];
        await MyAsyncStorage.setItem('JamaatId', JSON.stringify(jid));
        // Use selected umoor from dropdown (Redux), fallback to first from token
        const currentUmoorId =
          a_dropdown_selected?.umoorId || token_Decode.UmoorId[0];
        try {
          const values = {
            startDate: dates.startDate,
            endDate: dates.endDate,
            id: currentUmoorId,
            jamaatId: jid,
            umoorId: currentUmoorId,
            status: 3,
            pageNo: 0,
            pageSize: 40000,
          };
          MyConsole.log('values22', values);
          const { data } = await ApprovalScreen.getNiyatDataList(values, token);
          MyConsole.log('Umoor Coordinator complete count22', data);
          if (data.data.length === 0) {
            setApproved(0);
          } else {
            setApproved(data.data[0].statusCountDto.completed);
          }
          let sum = data.data.reduce((a, c) => {
            return a + c.statusCountDto.completed;
          }, 0);
          setApproved(sum);
        } catch ({ response }) {
          MyConsole.log('error Umoor Coordinator2', response);
        }
      } else if (token_Decode.Roles[1].authority.includes('Umoor Head')) {
        MyConsole.log('umoor head inside');
        let uid = token_Decode.UmoorId[0];
        await MyAsyncStorage.setItem('UmoorId', JSON.stringify(uid));
        try {
          const values = {
            endDate: dates.endDate,
            startDate: dates.startDate,
            umoorId: uid,
            status: 3,
          };
          const { data } = await ApprovalScreen.getUmoorData(values, token);
          // setApproved(data.data[0].statusCountDto.completed);
          setApproved(data?.data[0]?.statusCountDto?.completed ?? 0);

          let sum = data.data.reduce((a, c) => {
            return a + c.statusCountDto.completed;
          }, 0);
          setApproved(sum);
          setApprovalNiyat(data.data);
          setLoading(false);
        } catch ({ response }) {
          setLoading(false);
        }
      }
    } else if (token_Decode.Roles[0].authority.includes('Dept Head')) {
      let did = token_Decode.DepartmentId[0];
      await MyAsyncStorage.setItem('DepartmentId', JSON.stringify(did));
      try {
        const values = {
          endDate: dates.endDate,
          startDate: dates.startDate,
          departmentId: did,
          status: 3,
        };
        MyConsole.log('dept -- values', values);
        const { data } = await ApprovalScreen.getDepartmentData(values, token);
        MyConsole.log('dept -- data', data);
        setApproved(data?.data[0]?.statusCountDto?.completed ?? 0);
        let sum = data.data.reduce((a, c) => {
          return a + c.statusCountDto.completed;
        }, 0);
        setApproved(sum);
        setApprovalNiyat(data.data);
        setLoading(false);
      } catch ({ response }) {
        setLoading(false);
      }
    } else if (
      token_Decode.Roles[0].authority.includes('Aamil') ||
      token_Decode.Roles[0].authority.includes('Muavin Aamil') ||
      token_Decode.Roles[0].authority.includes('Khidmat Ramadaniyah')
    ) {
      // Use selected jamaat from dropdown (Redux), fallback to first jamaat from token
      const currentJamaatId =
        a_dropdown_selected?.id || token_Decode.JamaatId[0];
      MyConsole.log('amiljid JamaatId', currentJamaatId);
      try {
        const values = {
          endDate: dates.endDate,
          startDate: dates.startDate,
          id: currentJamaatId,
          jamaatId: currentJamaatId,
          status: 3,
        };
        MyConsole.log('amil values', values);
        const { data } = await ApprovalScreen.getJamaatActiveNiyatList(
          values,
          token,
        );
        MyConsole.log('amil data', data.data);
        MyConsole.log('amil value', values);
        // setApproved(data.data[0].statusCountDto?.completed ?? 0);
        setApproved(data?.data[0]?.statusCountDto?.completed ?? 0);

        let sum = data.data.reduce((a, c) => {
          return a + c.statusCountDto.completed;
        }, 0);
        setApproved(sum);
        // MyConsole.log('amil sum', sum);
        setApprovalNiyat(data.data);
        setLoading(false);
        const jslit = token_Decode.JamaatId;
        const myArrayFiltered = jamaatList.filter(el => {
          return jslit.some(f => {
            return f === el.id;
          });
        });
        setAjamaat(myArrayFiltered);
        var names = myArrayFiltered.map(function (i) {
          return i.jamaatName;
        });
        setjamaat(names);
      } catch ({ response }) {
        setLoading(false);
      }
    } else if (token_Decode.Roles[0].authority.includes('Jamiat Masool')) {
      // Use selected jamiat from dropdown (Redux), fallback to first jamiat from token
      const currentJamiatId =
        a_dropdown_selected?.id || token_Decode.JamiatId[0];
      try {
        const values = {
          endDate: dates.endDate,
          startDate: dates.startDate,
          id: currentJamiatId,
          jamiatId: currentJamiatId,
          status: 3,
        };
        const { data } = await ApprovalScreen.getJamiatData(values, token);
        MyConsole.log('Jamiat Masool complete count', data);
        setApproved(data?.data[0]?.statusCountDto.completed);
        let sum = data.data.reduce((a, c) => {
          return a + c.statusCountDto.completed;
        }, 0);
        setApproved(sum);
        setApprovalNiyat(data.data);
        setLoading(false);
        setLoading(false);
      } catch ({ response }) {
        setLoading(false);
        MyConsole.log('error ApprovedNiyat', response);
      }
    } else if (token_Decode.Roles[0].authority.includes('Umoor Coordinator')) {
      // Use selected umoor from dropdown (Redux), fallback to first from token
      const currentUmoorId =
        a_dropdown_selected?.umoorId || token_Decode.UmoorId[0];
      try {
        const values = {
          startDate: dates.startDate,
          endDate: dates.endDate,
          id: currentUmoorId,
          jamaatId: currentUmoorId,
          umoorId: currentUmoorId,
          status: 3,
          pageNo: 0,
          pageSize: 40000,
        };
        const { data } = await ApprovalScreen.getNiyatDataList(values, token);
        MyConsole.log('datadatadata_', data);
        setApproved(data.data[0].statusCountDto.completed);
        let sum = data.data.reduce((a, c) => {
          return a + c.statusCountDto.completed;
        }, 0);
        setApproved(sum);
      } catch ({ response }) {
        MyConsole.log('error Umoor Coordinator3', response);
      }
    } else if (token_Decode.Roles[0].authority.includes('Umoor Head')) {
      let uid = token_Decode.UmoorId[0];
      await MyAsyncStorage.setItem('UmoorId', JSON.stringify(uid));
      try {
        const values = {
          endDate: dates.endDate,
          startDate: dates.startDate,
          umoorId: uid,
          status: 3,
        };
        const { data } = await ApprovalScreen.getUmoorData(values, token);
        setApproved(data.data[0].statusCountDto.completed);
        let sum = data.data.reduce((a, c) => {
          return a + c.statusCountDto.completed;
        }, 0);
        setApproved(sum);
        setApprovalNiyat(data.data);
        setLoading(false);
      } catch ({ response }) {
        setLoading(false);
      }
    }
  };

  const setNiyatData = async (values, token, role) => {
    try {
      MyConsole.log('values', values);
      // let data;
      if (
        role === 'Aamil' ||
        role === 'Muavin Aamil' ||
        role === 'Khidmat Ramadaniyah'
      ) {
        const { data } = await ApprovalScreen.getNiyatList(values, token);
        MyConsole.log(' getNiyatList data', data);
        setCMasterData(
          Array.isArray(data.data) ? data.data : (data?.data?.niyatData ?? []),
        );
      } else {
        const { data } = await ApprovalScreen.getAllActiveNiyatList(
          values,
          token,
        );
        MyConsole.log(' getAllActiveNiyatList data', data);
        const niyatList = Array.isArray(data.data)
          ? data.data
          : data.data.niyatData;
        setCMasterData(
          values.pageNo && values.pageNo > 1
            ? [...cmasterData, ...niyatList]
            : niyatList,
        );
        setTotalPages(data?.data?.pagination?.totalPages);
      }
      // setCMasterData(data.data.niyatData || data.data); // Adjust if needed
      setLoading(false);
    } catch ({ response }) {
      setLoading(false);
      MyConsole.log(`Error fetching ${role} Niyat Data`, response);
    }
  };

  const getNiyatValues = async (
    dvalue,
    role,
    pageNo,
    searchQuery,
    selectedJamaatId = null,
  ) => {
    MyConsole.log('dvalue', dvalue, 'selectedJamaatId', selectedJamaatId);
    const dates = getDatesFromSelectedDate();
    let jid, uid;

    // Use selected values from dropdown (Redux) or passed parameter, fallback to token values
    if (
      role === 'Aamil' ||
      role === 'Muavin Aamil' ||
      role === 'Khidmat Ramadaniyah'
    ) {
      jid = selectedJamaatId || a_dropdown_selected?.id || dvalue.JamaatId[0];
    } else if (role === 'Umoor Coordinator') {
      jid = dvalue.JamaatId[0];
      uid = a_dropdown_selected?.umoorId || dvalue.UmoorId[0];
      MyConsole.log(`jid = ${jid}   ++++++++++   uid = ${uid}`);
    } else if (role === 'Umoor Head') {
      uid = a_dropdown_selected?.umoorId || dvalue.UmoorId[0];
    }

    let params = {
      endDate: dates.endDate,
      startDate: dates.startDate,
      departmentId: role === 'Dept Head' ? dvalue.DepartmentId[0] : 0,
      id:
        role === 'Jamiat Masool'
          ? a_dropdown_selected?.id || dvalue.JamiatId[0]
          : jid,
      jamaatId:
        role === 'Aamil' ||
        role === 'Umoor Coordinator' ||
        role === 'Muavin Aamil' ||
        role === 'Khidmat Ramadaniyah'
          ? jid
          : 0,
      jamiatId:
        role === 'Jamiat Masool'
          ? a_dropdown_selected?.id || dvalue.JamiatId[0]
          : 0,
      // niyatId: 0,
      // niyatQuestId: 0,
      // reportKey: '',
      search: searchQuery ?? '',
      status: 3,
      templateId: 0,
      umoorId: role === 'Umoor Coordinator' ? uid : 0,
      pageNo: pageNo, // Set the appropriate default value for pageNo
    };
    MyConsole.log('amil param', params);

    if (role === 'Umoor Coordinator') {
      params.niyatQuestId = 0;
      params.reportKey = '';
      params.niyatId = 0;
      if (pageNo && pageNo != 0) {
        params.pageNo = pageNo;
      }
    }
    return params;
  };

  const getAllActiveNiyatList = async (pageNo, selectedJamaatId = null) => {
    MyConsole.log('getAllActiveNiyatList', pageNo);
    MyConsole.log('selectedJamaatId', selectedJamaatId);
    const token = await MyAsyncStorage.getItem('userToken');
    // const decodee = await MyAsyncStorage.getItem('decode');
    // const token_Decode = JSON.parse(decodee);
    // Find the first role with authority other than "Mumin"
    const roleOtherThanMumin = token_Decode.Roles.find(
      role => role.authority !== 'Mumin',
    );

    // Extract the value of authority other than "Mumin"
    const authorityOtherThanMumin = roleOtherThanMumin
      ? roleOtherThanMumin.authority
      : null;
    const values = await getNiyatValues(
      token_Decode,
      authorityOtherThanMumin,
      pageNo,
      approver_local_data?.approved_search || '',
      selectedJamaatId,
    );
    await setNiyatData(values, token, authorityOtherThanMumin);
    // if (token_Decode.Roles[0].authority.includes('Mumin')) {
    //   const role = token_Decode.Roles[1].authority;
    //   const values = await getNiyatValues(token_Decode, role, pageNo);
    //   await setNiyatData(values, token, role);
    // } else {
    //   const role = token_Decode.Roles[0].authority;
    //   const values = await getNiyatValues(token_Decode, role);
    //   await setNiyatData(values, token, role);
    // }
  };

  const renderItem = ({ item }) => <NiyatStatusItem item={item} />;
  const onEndReached = () => {
    MyConsole.log('reach end');
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
      // Pass selected jamaat ID for pagination
      getAllActiveNiyatList(
        pageNo + 1,
        a_dropdown_selected?.id || a_dropdown_selected?.umoorId,
      );
    }
  };

  const onEndReachedPending = () => {
    MyConsole.log('reach end pending');
    MyConsole.log('pending page count', pendingPageNo < filterData?.count / 10);
    MyConsole.log('pending count filter1', approval_pending_list?.count / 10.0);
    MyConsole.log('pending count filter2', approval_pending_list?.count);
    MyConsole.log('pageno', pendingPageNo);
    if (
      approval_pending_list?.count &&
      pendingPageNo + 1 < approval_pending_list?.count / 10.0
    ) {
      // const jiid = await MyAsyncStorage.getItem('jid');
      MyConsole.log('fjamaat', a_dropdown_selected);
      MyConsole.log('inside if pageno', pendingPageNo);
      updateDropDown(a_dropdown_selected, pendingPageNo + 1, pending_search);
      setPendingPageNo(pendingPageNo + 1);
    }
  };

  const cfilterData = cmasterData;

  useEffect(() => {
    // Trigger API search for approved list when ITS id is complete (8) or cleared
    const q = approver_local_data?.approved_search ?? '';
    if (!focused) return;
    if (q.length === 8 || q.length === 0) {
      setPageNo(1);
      // Pass selected jamaat/umoor ID for search
      getAllActiveNiyatList(
        1,
        a_dropdown_selected?.id || a_dropdown_selected?.umoorId,
      );
    }
  }, [focused, approver_local_data?.approved_search, a_dropdown_selected]);

  const updateDropDown = async (
    itemValue,
    pageNo,
    search_its_id,
    isInitialLoad = false,
  ) => {
    MyConsole.log('updateDropDown', itemValue);
    if (
      token_Decode.Roles.some(checkaamil) ||
      token_Decode.Roles.some(checkMuavinAamil)
    ) {
      MyConsole.log('valueee', itemValue.jamaatName);
      // searchPendingFilter(itemValue.jamaatName);
      dispatch(
        getPendingNiyatList(
          pageNo,
          itemValue.id,
          '',
          search_its_id,
          approval_pending_list,
          setPendingPageNo,
        ),
      );
      MyConsole.log(' selected jamaat id', itemValue.id);
      // Clear old data and show loader
      setCMasterData([]);
      setLoading(true);
      // Load approved data (pass page 1 on initial load, 0 on dropdown change)
      getAllActiveNiyatList(isInitialLoad ? 1 : 0, itemValue.id);
      getapproveNiyats();
    } else if (token_Decode.Roles.some(checkKhidmatRamadaniyah)) {
      MyConsole.log('Khidmat Ramadaniyah dropdown', itemValue.jamaatName);
      dispatch(
        getJamaatActiveNiyatListForPending(
          pageNo,
          itemValue.id,
          search_its_id,
          approval_pending_list,
          setPendingPageNo,
          selected_date,
        ),
      );
      MyConsole.log(
        ' selected jamaat id for Khidmat Ramadaniyah',
        itemValue.id,
      );
      // Skip approved list load on initial mount - will be loaded by focused useEffect
      // Only load on dropdown changes
      if (!isInitialLoad) {
        // Clear old data and show loader
        setCMasterData([]);
        setLoading(true);
        getAllActiveNiyatList(0, itemValue.id);
      }
      getapproveNiyats();
    } else if (
      token_Decode.Roles.some(chceckUmmor) ||
      token_Decode.Roles.some(checkUmmorHead)
    ) {
      // searchPendingUmoorFilter(itemValue.umoorName);
      MyConsole.log(' updateDropDown.umoorId ', itemValue);
      dispatch(
        getPendingNiyatList(
          pageNo,
          '',
          itemValue.umoorId,
          search_its_id,
          approval_pending_list,
          setPendingPageNo,
        ),
      );
      MyConsole.log(' selected umoor id', itemValue.umoorId ?? itemValue);
      // Clear old data and show loader
      setCMasterData([]);
      setLoading(true);
      // Load approved data (pass page 1 on initial load, 0 on dropdown change)
      getAllActiveNiyatList(isInitialLoad ? 1 : 0, itemValue.umoorId);
      getapproveNiyats();
    } else if (token_Decode.Roles.some(checkJamiatMasool)) {
      // searchPendingUmoorFilter(itemValue.jamiatName);
      dispatch(
        getPendingNiyatList(
          pageNo,
          itemValue.id,
          '',
          search_its_id,
          approval_pending_list,
          setPendingPageNo,
        ),
      );
      MyConsole.log(' selected jamiat id', itemValue.id);
      // Clear old data and show loader
      setCMasterData([]);
      setLoading(true);
      // Load approved data (pass page 1 on initial load, 0 on dropdown change)
      getAllActiveNiyatList(isInitialLoad ? 1 : 0, itemValue.id);
      getapproveNiyats();
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.main}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <StatusBar backgroundColor={COLOR.bgColor} barStyle="dark-content" />
      <Header />
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
              <Icon name="close" size={14} color={Color.black} />
            </Pressable>
            <DownloadIconSvg height={42} width={42} />
            <Text style={styles.textStyle}>{string.DownloadMsg}</Text>
          </View>
        </View>
      </Modal>
      <View style={styles.scrol_view}>
        <View style={styles.scrol_view2}>
          <FlatList
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="interactive"
            onEndReachedThreshold={0.1}
            maintainVisibleContentPosition={{
              minIndexForVisible: 0,
              autoscrollToTopThreshold: 10,
            }}
            contentContainerStyle={{
              paddingBottom: Platform.OS === 'ios' ? 20 : 100,
            }}
            ListHeaderComponent={
              <ApprovalHeader
                approved={approved}
                setShouldCShow={setShouldCShow}
                shouldCShow={shouldCShow}
                Update={Update}
                search={search}
                setsearch={setsearch}
              />
            }
            data={
              approver_local_data?.show_pending_list
                ? approval_pending_list?.list
                : cfilterData
            }
            renderItem={renderItem}
            onEndReached={
              approver_local_data?.show_pending_list
                ? onEndReachedPending
                : onEndReached
            }
            ListEmptyComponent={EmptyComponent}
          />
        </View>
      </View>
      <Loader />
      {/* <MyFab /> */}
    </KeyboardAvoidingView>
  );
};

export default ApprovalDashboard;

import moment from 'moment';
import { showAlert } from '../../common/CustomAlert';
import { string } from '../../constants';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import ApprovalScreen, { getAllUmoorlist } from '../../services/approvalScreen';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';

export const checkaamil = obj => obj.authority === 'Aamil';
export const checkMuavinAamil = obj => obj.authority === 'Muavin Aamil';
export const chceckUmmor = obj => obj.authority === 'Umoor Coordinator';
export const checkUmmorHead = obj => obj.authority === 'Umoor Head';
export const checkJamiatMasool = obj => obj.authority === 'Jamiat Masool';
export const checkDeptHead = obj => obj.authority === 'Dept Head';
export const checkKhidmatRamadaniyah = obj =>
  obj.authority === 'Khidmat Ramadaniyah';

export const getBlueTrophy = params => async dispatch => {
  MyConsole.log('getApiData', params);

  try {
    const { data, config } =
      await ApprovalScreen.getTotalAndRedeemedAndBalanceBlueTrophies(params);
    dispatch(ReduxActionCreators.blue_trophy(data.data));
  } catch (err) {
    MyConsole.log('blue trophy error', err.response);
  }
};
export const getAllJamiat = token_Decode => async dispatch => {
  MyConsole.log('getAllJamiat');

  try {
    const { data, config } = await ApprovalScreen.getAllJamiat();
    MyConsole.log('getAllJamiat', data);
    const f_data = data?.data?.filter(el => {
      return token_Decode?.JamiatId?.some(f => {
        return f == el.id;
      });
    });
    dispatch(ReduxActionCreators.allJamatList(f_data));
    dispatch(ReduxActionCreators.a_dropdown_selected(f_data[0]));
  } catch (err) {
    MyConsole.log('getAllJamiat error', err.response);
  }
};
export const getAllUmoor = token_Decode => async dispatch => {
  MyConsole.log('getAllUmoor iside');

  try {
    MyConsole.log('getAllUmoor iside1');
    const { data, config } = await getAllUmoorlist();
    MyConsole.log('getAllUmoor data', data);
    const f_data = data?.data?.filter(el => {
      return token_Decode?.UmoorId?.some(f => {
        return f == el.umoorId;
      });
    });
    dispatch(ReduxActionCreators.allJamatList(f_data));
    dispatch(ReduxActionCreators.a_dropdown_selected(f_data[0]));
  } catch (err) {
    MyConsole.log('getAllUmoor error', err);
  }
};
export const getAllJamaatAPI = token_Decode => async dispatch => {
  MyConsole.log('getAllJamiat');

  try {
    const { data, config } = await ApprovalScreen.getAllJamaat();
    MyConsole.log('getAllJamiat', data);
    const f_data = data?.data?.filter(el => {
      return token_Decode?.JamaatId?.some(f => {
        return f == el.id;
      });
    });
    MyConsole.log('getAllJamiat f_data', f_data);
    dispatch(ReduxActionCreators.allJamatList(f_data));
    dispatch(ReduxActionCreators.a_dropdown_selected(f_data[0]));
  } catch (err) {
    MyConsole.log('getAllJamiat error', err.response);
  }
};

export const getGiftTrophy = params => async dispatch => {
  MyConsole.log('getApproverData', params);

  try {
    const { data, config } = await ApprovalScreen.getApprover(params);
    MyConsole.log('gift trophy', data);
    dispatch(ReduxActionCreators.get_approver(data.data));
  } catch (err) {
    MyConsole.log('gift error', err.response);
  }
};

export const giftReward = (params, props) => async dispatch => {
  MyConsole.log('getGiftData', params);

  try {
    const { data, config } = await ApprovalScreen.giftReward(params);
    MyConsole.log('giftReward', data);
    props.setModalGift(!props.modalGift);
    if (data.message === 'Trophy gifted!') {
      showAlert({
        header: '',
        title: 'Trophy gifted successfully !',
      });
      props.setisGifted(true);
    } else {
      showAlert({
        header: '',
        title: data.message,
      });
    }
  } catch (err) {
    MyConsole.log('giftReward', err.response);
  }
};

export const revertNiyat = (params, props, navigation) => async dispatch => {
  MyConsole.log('revertNiyatData', params);

  try {
    const { data, config } = await ApprovalScreen.revertNiyat(params);
    MyConsole.log('rewartNiyat', data);
    props.setModalRevert(!props.modalRevert);
    showAlert({
      header: '',
      title: data.message,
    });
    navigation.navigate(string.ApprovalScreen);
  } catch (err) {
    MyConsole.log('revert', err.response);
  }
};

export const getPendingNiyatList =
  (
    pendingPageNo,
    jamaatId,
    umoorId,
    search_its_id,
    approval_pending_list,
    setPendingPageNo,
  ) =>
  async dispatch => {
    MyConsole.log('getPendingParampendingPageNo', pendingPageNo);
    console.log('getPendingNiyatList jamaatId ', jamaatId);
    console.log('getPendingNiyatList umoorId ', umoorId);
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      // MyConsole.log('getPendingParam', itsid);
      MyConsole.log('getPendingParampendingPageNo', pendingPageNo);
      MyConsole.log('getPendingNiyatList umoorId ', umoorId);
      if (pendingPageNo === 0) {
        setPendingPageNo(0);
      }
      const { data, config } = await ApprovalScreen.pendingApprovals(
        itsid,
        pendingPageNo,
        jamaatId,
        umoorId,
        search_its_id,
      );
      MyConsole.log('getPendingNiyatListconfig', config);
      MyConsole.log('getPendingNiyatListdata', data.data);
      MyConsole.log('approval_pending_list', approval_pending_list);

      dispatch(
        ReduxActionCreators.approval_pending_list(
          pendingPageNo > 0
            ? {
                list: [...approval_pending_list.list, ...data.data.list],
                count: data.data.count,
              }
            : (data.data ?? {}),
        ),
      );

      // setLoading(false);
    } catch (error) {
      MyConsole.log('error1', error);
    }
  };

export const getJamaatActiveNiyatListForPending =
  (
    pendingPageNo,
    jamaatId,
    search_its_id,
    approval_pending_list,
    setPendingPageNo,
    dateFilter = 'All',
  ) =>
  async dispatch => {
    MyConsole.log(
      'getJamaatActiveNiyatListForPending pendingPageNo',
      pendingPageNo,
    );
    console.log('getJamaatActiveNiyatListForPending jamaatId ', jamaatId);
    const itsid = await MyAsyncStorage.getItem('itsid');
    const token = await MyAsyncStorage.getItem('userToken');
    try {
      if (pendingPageNo === 0) {
        setPendingPageNo(0);
      }

      // Calculate dates based on selected date filter
      const monthsMap = {
        'Last 1 Month': 1,
        'Last 3 Month': 3,
        'Last 6 Month': 6,
        '1 year': 12,
        All: 240,
      };
      const months = monthsMap[dateFilter] || 240;
      const endDatee = moment().format('YYYY-MM-DD');
      const startDatee = moment()
        .subtract(months, 'month')
        .format('YYYY-MM-DD');

      // First call: getJamaatActiveNiyatList for count (only on first page)
      let pendingCount = approval_pending_list?.count || 0;
      if (pendingPageNo === 0) {
        const countValues = {
          startDate: startDatee,
          endDate: endDatee,
          search: '%',
          jamiatId: 0,
          jamaatId: jamaatId || 0,
          name: 'Jamaat',
          status: 2,
          pageNo: 0,
          pageSize: 2000,
        };

        const { data: countData } =
          await ApprovalScreen.getJamaatActiveNiyatList(countValues, token);
        MyConsole.log(
          'getJamaatActiveNiyatListForPending count data',
          countData.data,
        );
        pendingCount =
          Array.isArray(countData.data) && countData.data.length > 0
            ? countData.data[0].statusCountDto?.approvalPending || 0
            : 0;
      }

      // Second call: getNiyatList for actual list data
      const listValues = {
        startDate: startDatee,
        endDate: endDatee,
        search: search_its_id || '',
        jamaatId: jamaatId || 0,
        jamiatId: 0,
        departmentId: 0,
        umoorId: 0,
        niyatQuestId: 0,
        status: 2,
        pageNo: pendingPageNo,
        pageSize: 10,
      };

      const { data: listData } = await ApprovalScreen.getNiyatList(
        listValues,
        token,
      );
      MyConsole.log(
        'getJamaatActiveNiyatListForPending list data',
        listData.data,
      );
      MyConsole.log('approval_pending_list', approval_pending_list);

      const niyatList = Array.isArray(listData.data)
        ? listData.data
        : listData.data?.niyatData || [];

      dispatch(
        ReduxActionCreators.approval_pending_list({
          list:
            pendingPageNo > 0
              ? [...(approval_pending_list?.list || []), ...niyatList]
              : niyatList,
          count: pendingCount,
        }),
      );
    } catch (error) {
      MyConsole.log('getJamaatActiveNiyatListForPending error', error);
    }
  };

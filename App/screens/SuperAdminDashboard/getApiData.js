import {showAlert} from '../../common/CustomAlert';
import {string} from '../../constants';
import {ReduxActionCreators} from '../../redux/ActionsCreators';
import ApprovalScreen from '../../services/approvalScreen';
import {MyConsole} from '../../utils/MyConsole';
export const getApiData =
  (params, tab_type, dashboard_title) => async dispatch => {
    MyConsole.log('getApiData', params);

    try {
      MyConsole.log('tab_type', tab_type);
      MyConsole.log('tab_type', string.Jamaat);
      const {data, config} =
        dashboard_title !== string.Dashboard && Object.keys(params).length === 3
          ? await ApprovalScreen.getDepartmentNiyatStatusData(params)
          : 'search' in params
          ? await ApprovalScreen.getNiyatDataList(params)
          : await ApprovalScreen.getNiyatStatus(params);
      MyConsole.log('data', data);
      dispatch(ReduxActionCreators.get_data_count(data.data));

      MyConsole.log('getApiData', data.data);

      MyConsole.log('getApiData2', config);
      if (data.data) {
        const obj = Array.isArray(data.data)
          ? data.data[0].statusCountDto
          : data.data;
        const approval_pending = obj.approvalPending ?? 0;
        const active = obj.active ?? 0;
        const total_niyats = obj.totalNiyat ?? 0;
        const completed = obj.completed ?? 0;
        dispatch(
          ReduxActionCreators.multiple_niyat({
            approval_pending,
            active,
            total_niyats,
            completed,
          }),
        );
      } else {
        MyConsole.log('getApiData8');
      }
    } catch (err) {
      MyConsole.log('getApiData error', err);
      dispatch(
        ReduxActionCreators.multiple_niyat({
          approval_pending: 0,
          active: 0,
          total_niyats: 0,
          completed: 0,
        }),
      );
    }
  };

export const filterAndDispatch = (arr, dispatch) => {
  let approval_pending = arr.reduce((a, c) => {
    return a + c.statusCountDto.approvalPending;
  }, 0);
  MyConsole.log('approval_pending cound', approval_pending);
  let active = arr.reduce((a, c) => {
    return a + c.statusCountDto.active;
  }, 0);
  MyConsole.log('active cound', active);
  let total_niyats = arr.reduce((a, c) => {
    return a + c.statusCountDto.totalNiyat;
  }, 0);
  MyConsole.log('total_niyats cound', total_niyats);
  let completed = arr.reduce((a, c) => {
    return a + c.statusCountDto.completed;
  }, 0);
  MyConsole.log('completed count', completed);

  dispatch(
    ReduxActionCreators.multiple_niyat({
      approval_pending,
      active,
      total_niyats,
      completed,
    }),
  );
};

export const getNiyatList = (params, tab_type, data_list) => async dispatch => {
  // MyConsole.log('getNiyatList');
  if (params.pageNo === 0) {
    dispatch(ReduxActionCreators.get_data_list([]));
  }
  try {
    MyConsole.log('tab_type', tab_type);
    const {data, config} = await ApprovalScreen.getNiyatList(params);
    // MyConsole.log('getNiyatList', config);
    // MyConsole.log('getNiyatList', data);

    dispatch(
      ReduxActionCreators.get_data_list(
        params.pageNo === 0
          ? data.data ?? []
          : [...data_list, ...(data.data ?? [])],
      ),
    );

    // MyConsole.log('getNiyatList', data);
  } catch (response) {
    MyConsole.log('getNiyatList error', response);
  }
};

export const sendMessage =
  (params, message_title, navigation) => async dispatch => {
    MyConsole.log('message_title');

    try {
      MyConsole.log('message_title', message_title);
      MyConsole.log('message_title', params);
      const {data, config} = await ApprovalScreen.sendMessage(params);
      MyConsole.log('sendMessage', data);
      MyConsole.log('sendMessage', config);
      if (data.message === 'Your message has been sent successfully.') {
        showAlert({
          // title: title.itemTitle,
          message: data.message,
          // alertType: 'warning',
          onPress: () => {
            MyConsole.log('files deleted!');
          },
        });
        // alert(data.message);

        navigation.goBack(null);
      } else {
        showAlert({
          // title: title.itemTitle,
          message: data.message,
          // alertType: 'warning',
          onPress: () => {
            MyConsole.log('files deleted!');
          },
        });
        // alert(data.message);
      }
    } catch (err) {
      MyConsole.log('getApiData', err.response);
    }
  };
export const getSubRole = params => async dispatch => {
  MyConsole.log('subRole');

  try {
    MyConsole.log('subRole', params);

    const {data, config} = await ApprovalScreen.subRole(params);
    dispatch(ReduxActionCreators.sub_role_list(data.data));
    MyConsole.log('sub_role_list', data.data);
  } catch (err) {
    MyConsole.log('sub_role_list error', err.response);
  }
};

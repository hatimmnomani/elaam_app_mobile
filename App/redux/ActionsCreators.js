import { ACTION_TYPES } from './ActionTypes';

export const ReduxActionCreators = {
  company: payload => ({type: ACTION_TYPES.NAME, payload}),
  loginRes: payload => ({type: ACTION_TYPES.LOGIN_RES, payload}),
  appr_name: payload => ({type: ACTION_TYPES.APPR_NAME, payload}),
  appr_email: payload => ({type: ACTION_TYPES.APPR_EMAIL, payload}),
  appr_mobile: payload => ({type: ACTION_TYPES.APPR_MOBILE, payload}),
  dashboard_title: payload => ({type: ACTION_TYPES.DASHBOARD_TITLE, payload}),
  message_title: payload => ({type: ACTION_TYPES.MESSAGE_TITLE, payload}),
  niyat_type: payload => ({type: ACTION_TYPES.NIYAT_TYPE, payload}),
  start_date: payload => ({type: ACTION_TYPES.START_DATE, payload}),
  end_date: payload => ({type: ACTION_TYPES.END_DATE, payload}),
  get_data_count: payload => ({type: ACTION_TYPES.GET_DATA_COUNT, payload}),
  get_sub_role: payload => ({type: ACTION_TYPES.GET_SUB_ROLE, payload}),
  get_send_message: payload => ({type: ACTION_TYPES.GET_SEND_MESSAGE, payload}),
  total_niyats: payload => ({type: ACTION_TYPES.TOTAL_NIYATS, payload}),
  completed: payload => ({type: ACTION_TYPES.COMPLETED, payload}),
  active: payload => ({type: ACTION_TYPES.ACTIVE, payload}),
  approval_pending: payload => ({type: ACTION_TYPES.APPROVAL_PENDING, payload}),
  get_data_list: payload => ({type: ACTION_TYPES.GET_DATA_LIST, payload}),
  tab_type: payload => ({type: ACTION_TYPES.TAB_TYPE, payload}),
  filter_list: payload => ({type: ACTION_TYPES.FILTER_LIST, payload}),
  selected_date: payload => ({type: ACTION_TYPES.SELECTED_DATE, payload}),
  multiple_niyat: payload => ({type: ACTION_TYPES.MULTIPLE_VALUES, payload}),
  filterData: payload => ({type: ACTION_TYPES.FILTER_DATA, payload}),
  sub_role_list: payload => ({type: ACTION_TYPES.SUB_ROLE, payload}),
  blue_trophy: payload => ({type: ACTION_TYPES.BLUE_TROPHY, payload}),
  get_approver: payload => ({type: ACTION_TYPES.GET_APPROVER, payload}),
  selectedFilterId: payload => ({
    type: ACTION_TYPES.SELECTED_FILTER_ID,
    payload,
  }),
  d_tab_type: payload => ({
    type: ACTION_TYPES.D_TAB_TYPE,
    payload,
  }),
  global_alert: payload => ({type: ACTION_TYPES.GLOBAL_ALERT, payload}),
  show_call: payload => ({type: ACTION_TYPES.SHOW_CALL, payload}),
  userType: payload => ({type: ACTION_TYPES.USER_TYPE, payload}),
  token_Decode: payload => ({
    type: ACTION_TYPES.TOKEN_DECODE,
    payload,
  }),
  modalwebview: payload => ({
    type: ACTION_TYPES.MODAL_WEB_VIEW,
    payload,
  }),
  itsUrl: payload => ({
    type: ACTION_TYPES.ITSURL,
    payload,
  }),
  allJamatList: payload => ({
    type: ACTION_TYPES.ALLJAMATLIST,
    payload,
  }),
  allJamiatList: payload => ({
    type: ACTION_TYPES.ALLJAMIATLIST,
    payload,
  }),
  selectedFilterJamiatId: payload => ({
    type: ACTION_TYPES.SELECTED_FILTER_JAMIAT_ID,
    payload,
  }),
  selectedFilterJamatId: payload => ({
    type: ACTION_TYPES.SELECTED_FILTER_JAMAT_ID,
    payload,
  }),
  a_dropdown_selected: payload => ({
    type: ACTION_TYPES.A_DROPDOWN_SELECTED,
    payload,
  }),
  approved_niyat_list: payload => ({
    type: ACTION_TYPES.APPROVED_NIYAT_LIST,
    payload,
  }),
  approval_pending_list: payload => ({
    type: ACTION_TYPES.APPROVAL_PENDING_LIST,
    payload,
  }),
  approver_local_data: payload => ({
    type: ACTION_TYPES.APPROVER_LOCAL_DATA,
    payload,
  }),
  pending_search: payload => ({
    type: ACTION_TYPES.PENDING_SEARCH,
    payload,
  }),
  mumin_filter_start_date: payload => ({
    type: ACTION_TYPES.MUMIN_FILTER_START_DATE,
    payload,
  }),
  mumin_filter_end_date: payload => ({
    type: ACTION_TYPES.MUMIN_FILTER_END_DATE,
    payload,
  }),
  mumin_selected_duration: payload => ({
    type: ACTION_TYPES.MUMIN_SELECTED_DURATION,
    payload,
  }),
};

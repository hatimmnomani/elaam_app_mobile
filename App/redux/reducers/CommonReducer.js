import moment from 'moment';
import { string } from '../../constants';
import { ACTION_TYPES } from '../ActionTypes';

const initialState = {
  company: '',
  appr_name: 'NAME',
  appr_email: 'EMAIL',
  appr_mobile: 'MOBILE',
  dashboard_title: 'DASHBOARD',
  message_title: 'umoor head',
  niyat_type: 'TOTAL NIYATS',
  start_date: string.defaultStartDate,
  end_date: moment().format('YYYY-MM-DD'), //'2022-09-30',
  selectedFilterId: 0,
  selectedFilterJamiatId: 0,
  selectedFilterJamatId: 0,
  tab_type: 'Jamiat',
  d_tab_type: string.Dashboard,
  filter_list: [],
  selected_date: 'All',
  active: 0,
  approval_pending: 0,
  total_niyats: 0,
  completed: 0,
  show_call: false,
  global_alert: {
    isVisible: false,
    header: '',
    title: '',
    subtitle: '',
    isCancel: false,
    isSubmit: true,
    onSubmit: null,
    onCancel: null,
  },
  modalwebview: false,
  itsUrl: '',
  userType: '',
  token_Decode: {},
  mumin_filter_start_date: moment().subtract(180, 'month').format('YYYY-MM-DD'),
  mumin_filter_end_date: moment().format('YYYY-MM-DD'),
  mumin_selected_duration: 'Last 3 Month',
};

export const CommonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.COMPANY:
      return { ...state, company: action.payload };
    case ACTION_TYPES.APPR_EMAIL:
      return { ...state, appr_email: action.payload };
    case ACTION_TYPES.APPR_MOBILE:
      return { ...state, appr_mobile: action.payload };
    case ACTION_TYPES.APPR_NAME:
      return { ...state, appr_name: action.payload };
    case ACTION_TYPES.DASHBOARD_TITLE:
      return { ...state, dashboard_title: action.payload };
    case ACTION_TYPES.NIYAT_TYPE:
      return { ...state, niyat_type: action.payload };
    case ACTION_TYPES.START_DATE:
      return { ...state, start_date: action.payload };
    case ACTION_TYPES.END_DATE:
      return { ...state, end_date: action.payload };
    case ACTION_TYPES.SELECTED_FILTER_ID:
      return { ...state, selectedFilterId: action.payload };
    case ACTION_TYPES.TAB_TYPE:
      return { ...state, tab_type: action.payload };
    case ACTION_TYPES.FILTER_LIST:
      return { ...state, filter_list: action.payload };
    case ACTION_TYPES.SELECTED_DATE:
      return { ...state, selected_date: action.payload };
    case ACTION_TYPES.ACTIVE:
      return { ...state, active: action.payload };
    case ACTION_TYPES.APPROVAL_PENDING:
      return { ...state, approval_pending: action.payload };
    case ACTION_TYPES.TOTAL_NIYATS:
      return { ...state, total_niyats: action.payload };
    case ACTION_TYPES.COMPLETED:
      return { ...state, completed: action.payload };
    case ACTION_TYPES.MULTIPLE_VALUES:
      return { ...state, ...action.payload };
    case ACTION_TYPES.MESSAGE_TITLE:
      return { ...state, message_title: action.payload };
    case ACTION_TYPES.D_TAB_TYPE:
      return { ...state, d_tab_type: action.payload };
    case ACTION_TYPES.GLOBAL_ALERT:
      return { ...state, global_alert: action.payload };
    case ACTION_TYPES.SHOW_CALL:
      return { ...state, show_call: action.payload };
    case ACTION_TYPES.USER_TYPE:
      return { ...state, userType: action.payload };
    case ACTION_TYPES.TOKEN_DECODE:
      return { ...state, token_Decode: action.payload };
    case ACTION_TYPES.MODAL_WEB_VIEW:
      return { ...state, modalwebview: action.payload };
    case ACTION_TYPES.ITSURL:
      return { ...state, itsUrl: action.payload };
    case ACTION_TYPES.SELECTED_FILTER_JAMIAT_ID:
      return { ...state, selectedFilterJamiatId: action.payload };
    case ACTION_TYPES.SELECTED_FILTER_JAMAT_ID:
      return { ...state, selectedFilterJamatId: action.payload };
    case ACTION_TYPES.MUMIN_FILTER_START_DATE:
      return { ...state, mumin_filter_start_date: action.payload };
    case ACTION_TYPES.MUMIN_FILTER_END_DATE:
      return { ...state, mumin_filter_end_date: action.payload };
    case ACTION_TYPES.MUMIN_SELECTED_DURATION:
      return { ...state, mumin_selected_duration: action.payload };
    default:
      return state;
  }
};

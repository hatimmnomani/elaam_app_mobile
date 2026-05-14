import {ACTION_TYPES} from '../ActionTypes';

const initialState = {
  loginRes: '',
  get_data_count: [],
  get_data_list: [],
  filter_data_list: [],
  sub_role_list: [],
  blue_trophy: {},
  get_approver: [],
  allJamatList: [],
  allJamiatList: [],
  a_dropdown_selected: {},
  approval_pending_list: {},
  approved_niyat_list: {},
  pending_search: '',
  approver_local_data: {
    pending_search: '',
    approved_search: '',
    header: 'Approver Pending',
    show_pending_list: true,
    hide_header: false,
  },
};

export const ApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION_TYPES.LOGIN_RES:
      return {...state, loginRes: action.payload};
    case ACTION_TYPES.GET_DATA_COUNT:
      return {...state, get_data_count: action.payload};
    // case ACTION_TYPES.TOTAL_NIYATS:
    //   return {...state, total_niyats: action.payload};
    // case ACTION_TYPES.ACTIVE:
    //   return {...state, active: action.payload};
    case ACTION_TYPES.SUB_ROLE:
      return {...state, sub_role_list: action.payload};
    case ACTION_TYPES.GET_DATA_LIST:
      return {...state, get_data_list: action.payload};
    case ACTION_TYPES.FILTER_DATA:
      return {...state, filter_data_list: action.payload};
    case ACTION_TYPES.BLUE_TROPHY:
      return {...state, blue_trophy: action.payload};
    case ACTION_TYPES.GET_APPROVER:
      return {...state, get_approver: action.payload};
    case ACTION_TYPES.ALLJAMATLIST:
      return {...state, allJamatList: action.payload};
    case ACTION_TYPES.ALLJAMIATLIST:
      return {...state, allJamiatList: action.payload};
    case ACTION_TYPES.A_DROPDOWN_SELECTED:
      return {...state, a_dropdown_selected: action.payload};
    case ACTION_TYPES.APPROVED_NIYAT_LIST:
      return {...state, approved_niyat_list: action.payload};
    case ACTION_TYPES.APPROVAL_PENDING_LIST:
      return {...state, approval_pending_list: action.payload};
    case ACTION_TYPES.APPROVER_LOCAL_DATA:
      return {...state, approver_local_data: action.payload};
    case ACTION_TYPES.PENDING_SEARCH:
      return {...state, pending_search: action.payload};

    default:
      return state;
  }
};

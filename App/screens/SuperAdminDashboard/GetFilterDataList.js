import {string} from '../../constants';
import {urls} from '../../constants/string';
import {ReduxActionCreators} from '../../redux/ActionsCreators';
import ApprovalScreen from '../../services/approvalScreen';
import {MyConsole} from '../../utils/MyConsole';

export const getFilterDataList = type => async dispatch => {
  try {
    MyConsole.log('calling getFilterDataList ', type);
    const response = await ApprovalScreen.getFilterList(
      type === string.Jamaat
        ? urls.GET_ALL_JAMAAT
        : type === string.Jamiat
        ? urls.GET_ALL_JAMIAT
        : type === string.Umoor
        ? urls.GET_ALL_ACTIVE_UMOOR
        : type === string.Department
        ? urls.GET_ALL_ACTIVE_DEPART
        : urls.GET_ALL_NIYAT,
    );
    dispatch(ReduxActionCreators.filterData(response.data.data));
  } catch (err) {
    MyConsole.log('error', err);
  }
};
export const getAllDropDownJamaat = () => async dispatch => {
  try {
    MyConsole.log('calling getAllDropDownJamaat ');
    const response = await ApprovalScreen.getAllJamaat();
    dispatch(ReduxActionCreators.allJamatList(response.data.data));
  } catch (err) {
    MyConsole.log('error getAllDropDownJamaat', err);
  }
};

export const getAllDropDownJamiat = () => async dispatch => {
  try {
    MyConsole.log('calling getAllDropDownJamiat ');
    const response = await ApprovalScreen.getAllJamiat();
    dispatch(ReduxActionCreators.allJamiatList(response.data.data));
  } catch (err) {
    MyConsole.log('error getAllDropDownJamiat', err);
  }
};

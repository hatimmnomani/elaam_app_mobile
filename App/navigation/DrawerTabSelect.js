import {string} from '../constants';
import {ReduxActionCreators} from '../redux/ActionsCreators';
import {MyConsole} from '../utils/MyConsole';

export const drawerTabSelect = (dispatch, screenName, screenTitle) => {
  MyConsole.log('screenName', screenName);
  MyConsole.log('screenTitle', screenTitle);

  if (!screenName) {
    return;
  }
  const drawerTabType =
    screenName == string.ApprovalScreen ||
    screenName == string.MuminScreen ||
    screenName == string.ActiveNiyatList ||
    screenName == string.NiyatInfromationScreen ||
    screenName == string.ApproveNiyatInfo ||
    screenName == string.Scanner
      ? string.Dashboard
      : screenName == string.SuperAdminScreen &&
        screenTitle == string.FMB_DASHBOARD
      ? string.FMB_DASHBOARD
      : screenName == string.SuperAdminScreen &&
        screenTitle == string.HQHB_Dashboard
      ? string.HQHB_Dashboard
      : screenName == string.SuperAdminScreen &&
        screenTitle == string.Mahad_Al_Zahra_Dashboard
      ? string.Mahad_Al_Zahra_Dashboard
      : screenName == string.SuperAdminScreen && screenTitle == string.Dashboard
      ? string.Dashboard
      : screenName.includes('Catalogue')
      ? 'Catalogue'
      : screenName.includes('Notification')
      ? 'Notification'
      : screenName == string.PrivacyPolicy
      ? string.PrivacyPolicy
      : '';

  dispatch(ReduxActionCreators.d_tab_type(drawerTabType));
};

import DeviceInfo from 'react-native-device-info';
import {dpFont} from '../utils/SizeInDp';

const Fonts = {
  fontSizes: 14,
  fontSizes16: 16,
  fontSizes12: 12,
  fontSizes11: 11,
  fontSizes13: 13,
  fontSizes15: 15,
  fontSizes10: 10,
  fontSizes17: 17,
  fontSizes18: 18,
  fontSizes20: 20,
  fontSizes22: 22,
  fontSizes23: 23,
  fontSizes25: 25,
  fontSize30: 30,
  dashboardCountSize: dpFont(DeviceInfo.isTablet() ? 15 : 22),
  dashboardTextSize: dpFont(DeviceInfo.isTablet() ? 11 : 12),
};
export default Fonts;

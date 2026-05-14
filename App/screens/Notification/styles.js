/* eslint-disable no-undef */
import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { Color, font } from '../../constants';
export default style = StyleSheet.create({
  container: {
    flex: 1,
  },
  row: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    backgroundColor: Color.bgColor,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#e5b43b',
  },
  desc: {
    flex: 1,
    fontSize: font.fontSizes11,
    color: Color.titleColor,
  },
  text: {
    fontSize: font.fontSizes12,
    color: Color.titleColor,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  icon_view: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  date_text: {
    color: Color.titleColor,
    fontSize: font.fontSizes12,
    marginLeft: 5,
  },
  main_view: { flex: 1, width: '100%', backgroundColor: Color.bgColor },

  notificcation_txt: {
    fontSize: font.fontSizes16,
    fontWeight: 'bold',
    color: Color.titleColor,
    marginVertical: 15,
    marginLeft: 15,
  },

  txt_view: {
    flexDirection: 'column',
    marginLeft: DeviceInfo.isTablet() ? '5.2%' : '12%',
    marginBottom: '1%',
  },
  parent_view_icon: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subject_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subject_text_container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  time_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 80,
    maxWidth: 120,
  },
  its_view: {
    flexDirection: 'column',
    marginBottom: '1%',
  },
});

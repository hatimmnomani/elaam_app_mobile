import {StyleSheet, Dimensions} from 'react-native';
import {Color, font} from '../../constants';
export const Style = StyleSheet.create({
  input: {
    height: 40,
    margin: 8,
    borderColor: Color.white,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderWidth: 1,
    padding: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    borderColor: Color.white,
    marginBottom: 20,
    color: Color.white,
  },

  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  txtinput: {
    borderBottomWidth: 1,
    borderColor: Color.white,
    backgroundColor: '#87290b',
    fontSize: font.fontSizes20,
  },
  img: {
    width: 100,
    height: 200,
  },
  card: {
    marginTop: 30,
    backgroundColor: '#87290b',
    borderRadius: 10,
    marginHorizontal: '3%',
    // padding: 10
  },
  view1: {
    flex: 1,
    // justifyContent: 'center',
    // backgroundColor: "#bb3609",
    // padding: 20
  },

  view2: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
    alignItems: 'center',
  },
  txt1: {
    color: '#fbc02d',
    fontSize: font.fontSizes15,
  },
  txt2: {
    color: '#ffffff',
    fontSize: font.fontSizes15,
    marginRight: '1%',
  },
  txt3: {
    textAlign: 'center',
    marginTop: 20,
    color: '#06666a',
    fontSize: font.fontSizes15,
    marginBottom: '3%',
    fontWeight: 'bold',
  },

  button: {
    color: Color.black,
    fontSize: font.fontSizes16,
    fontWeight: '500',
    paddingHorizontal: 110,
    paddingVertical: 12,
    borderRadius: 20,
    textAlign: 'center',
  },
  activityContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: Color.white,
    height: '100%',
    width: '100%',
  },
  img_view: {
    height: 200,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
  },
  linear_gradient: {borderRadius: 7},

  img_background: {flex: 1, justifyContent: 'center'},
  web_view: {
    flex: 1,
    marginTop: 40,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  login_desc_view: {padding: '5%'},
  liner_gradient_view: {marginTop: '8%'},
});
export default Style;

import {StyleSheet, Dimensions} from 'react-native';
import {Color, font} from '../../../constants';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Color.bgColor,
  },
  gradient: {
    flex: 1,
    paddingVertical: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  questionContainer: {
    flex: 1,
    backgroundColor: Color.bgColor,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#977931',
    overflow: 'hidden',
    maxWidth: 434,
    alignSelf: 'center',
    margin: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 47,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '500',
    color: Color.white,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  titleContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: Color.bgColor,
  },
  titleText: {
    fontSize: 48,
    fontWeight: '500',
    color: Color.black,
    textAlign: 'center',
    writingDirection: 'rtl',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  contentImage: {
    width: 391,
    height: 498,
    borderRadius: 50,
  },
  optionsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  optionButton: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginVertical: 8,
  },
  optionGradient: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 39,
  },
  optionText: {
    fontSize: 24,
    fontWeight: '500',
    color: Color.white,
    textAlign: 'center',
  },
  backButtonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'flex-start',
  },
  backButton: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 175,
    height: 51,
  },
  backButtonGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
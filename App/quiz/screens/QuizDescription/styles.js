import {StyleSheet, Dimensions} from 'react-native';
import {Color, font} from '../../../../App/constants';

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
  quizContainer: {
    flex: 1,
    backgroundColor: Color.bgColor,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Color.SatoimoBrown,
    overflow: 'hidden',
    maxWidth: 434,
    alignSelf: 'center',
    margin: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerImage: {
    width: '100%',
    height: 47,
  },
  panelImage: {
    width: '100%',
    height: 492,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 300,
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  arabicText: {
    fontSize: 24,
    fontWeight: '500',
    color: Color.black,
    textAlign: 'center',
    lineHeight: 36,
    writingDirection: 'rtl',
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  quizButtonContainer: {
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
  },
  quizButtonGradient: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  quizButtonText: {
    fontSize: 32,
    fontWeight: '500',
    color: Color.white,
    textAlign: 'center',
  },
});
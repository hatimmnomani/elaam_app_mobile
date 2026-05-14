import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Platform,
} from 'react-native';
import { BlurView } from '@react-native-community/blur';
import { Color } from '../../../constants';
import { quizTheme } from '../../theme/quizTheme';

const QuestionTitle = ({ title }) => {
  return (
    <View style={styles.answerContainer}>
      {/* <ImageBackground
        source={require('../../assets/header_bg.png')}
        style={styles.backgroundImage}
      > */}
      {/* <BlurView
          style={styles.blurView}
          blurType="xlight"
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        /> */}
      <View style={styles.content}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      {/* </ImageBackground> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    width: '90%',
    alignSelf: 'center',
    // elevation: 5,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },
  answerContainer: {
    marginTop: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: quizTheme.borderRadius.section,
    marginHorizontal: 20,
    alignItems: 'center',
    ...quizTheme.shadows.card,
    // height: 100,
  },
  backgroundImage: {
    width: '100%',
    padding: 16,
  },
  blurView: {
    ...StyleSheet.absoluteFill,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  },
  titleText: {
    // Explicit typography per spec
    fontFamily: quizTheme.typography.fontFamily,
    fontWeight: '500',
    fontStyle: 'normal',
    fontSize: quizTheme.typography.sizes.title,
    // lineHeight: 48, // 100% line-height relative to font size
    letterSpacing: 0,
    color: Color.black,
    textAlign: 'center',
    textAlignVertical: 'center',
    includeFontPadding: false,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    // textShadowOffset: { width: 1, height: 1 },
    // textShadowRadius: 2,
    writingDirection: 'rtl',
  },
});

export default QuestionTitle;

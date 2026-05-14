import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from '../../../../App/constants';
import { QuizDescriptionPage } from '../../components/QuizDescriptionPage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { appScreen } from '../../../utils/responsive/SizeUtil';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserQuizzes } from '../../redux/actions';
import SecureScreen from '../../components/SecureScreen';

const QuizDescriptionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { quizzesLoading, quizzes } = useSelector(state => state.quiz);

  useEffect(() => {
    dispatch(fetchUserQuizzes());
  }, [dispatch]);

  const handleStartQuiz = quiz => {
    // Navigate with selected quiz id/details
    navigation.navigate('QuizQuestionScreen', { quizId: quiz?.quizId, quiz });
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
    // Navigate back to previous screen
    navigation.goBack();
  };

  return (
    <SecureScreen>
      <ImageBackground
        source={require('../../assets/quiz_background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView edges={['top', 'bottom']} style={styles.backgroundImage}>
          <StatusBar backgroundColor={Color.bgColor} barStyle="dark-content" />
          <View style={styles.overlay}>
            {quizzesLoading ? (
              <ActivityIndicator />
            ) : (
              <QuizDescriptionPage
                onBackPress={handleBackPress}
                quizzes={quizzes}
                onStartQuiz={handleStartQuiz}
              />
            )}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SecureScreen>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: appScreen.width,
    height: appScreen.height,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizDescriptionScreen;

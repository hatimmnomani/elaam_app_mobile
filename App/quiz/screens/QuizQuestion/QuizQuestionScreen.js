import React, { useMemo, useState } from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  ImageBackground,
  Alert,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { Color } from '../../../constants';
import { QuizQuestionPage } from '../../components/QuizQuestionPage';
import { MyConsole } from '../../../utils/MyConsole';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { submitAnswerAndStore } from '../../redux/actions';
import QuizService from '../../services/quizService';
import { showAlert } from '../../../common/CustomAlert';
import SecureScreen from '../../components/SecureScreen';

const QuizQuestionScreen = () => {
  MyConsole.log('QuizQuestionScreen');
  const navigation = useNavigation();
  const route = useRoute();
  const { quizzes } = useSelector(state => state.quiz);
  const [selectedOption, setSelectedOption] = useState(null);
  const dispatch = useDispatch();

  const incomingQuiz = route?.params?.quiz;
  const incomingQuizId = route?.params?.quizId;
  const quiz = useMemo(() => {
    if (incomingQuiz) return incomingQuiz;
    if (incomingQuizId && Array.isArray(quizzes)) {
      return quizzes.find(q => q.quizId === incomingQuizId);
    }
    return null;
  }, [incomingQuiz, incomingQuizId, quizzes]);

  const question = useMemo(() => {
    return quiz?.questions?.[0] || null;
  }, [quiz]);

  const questionTitle = question?.questionText || '';
  const websiteOptions = Array.isArray(question?.options)
    ? question.options
    : [];
  const questionDescription = question?.questionDescription || '';
  const quizDescription = quiz?.quizHeader || '';

  const handleOptionSelect = option => {
    console.log('Selected option:', option);
    setSelectedOption(option);
  };

  const handleBackPress = () => {
    console.log('Back button pressed');
    // Navigate back to previous screen
    navigation.goBack();
  };

  const handleSubmit = async option => {
    const answer = option || selectedOption;
    try {
      if (!quiz || !question) {
        showAlert({ title: 'Quiz', message: 'Quiz data not available' });
        return;
      }
      if (!answer) {
        showAlert({
          title: 'Select an option',
          message: 'Please select an option to continue.',
        });
        return;
      }
      // Confirm submission
      Alert.alert(
        'Confirm Submission',
        `Submit your answer: "${String(answer)}"?`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Submit',
            style: 'default',
            onPress: async () => {
              try {
                await dispatch(
                  submitAnswerAndStore(quiz.quizId, {
                    questionId: question.questionId,
                    answer: String(answer),
                  }),
                );
                navigation.navigate('QuizResultScreen');
              } catch (e) {
                MyConsole.log('submitAnswer error', e?.response || e);
                showAlert({
                  title: 'Submission Failed',
                  message:
                    e?.response?.data?.message ||
                    'Unable to submit answer. Please try again.',
                });
              }
            },
          },
        ],
      );
    } catch (e) {
      MyConsole.log('submitAnswer error', e?.response || e);
      showAlert({
        title: 'Submission Failed',
        message:
          e?.response?.data?.message ||
          'Unable to submit answer. Please try again.',
      });
    }
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
            <QuizQuestionPage
              questionTitle={quizDescription}
              questionDescription={questionTitle}
              websiteOptions={websiteOptions}
              onOptionSelect={handleOptionSelect}
              onBackPress={handleBackPress}
              onSubmit={() => handleSubmit(selectedOption)}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SecureScreen>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default QuizQuestionScreen;

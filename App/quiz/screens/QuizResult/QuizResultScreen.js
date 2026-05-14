import React, { useMemo } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import SecureScreen from '../../components/SecureScreen';
import SuccessHeader from '../../components/SuccessHeader';
import InfoSection from '../../components/InfoSection';
import PrizeButton from '../../components/PrizeButton';
import { useSelector } from 'react-redux';
import { appScreen } from '../../../utils/responsive/SizeUtil';
import { useNavigation } from '@react-navigation/native';
import BackNavigationButton from '../../components/BackNavigationButton';
import { RichTextParser } from '../../components/RichTextContent/parser';
import { mockQuizResultData } from '../../mockData/quizResultMockData';

const QuizResultScreen = () => {
  const navigation = useNavigation();
  const { submissionResult } = useSelector(state => state.quiz);

  const isCorrect = !!submissionResult?.isCorrect;
  const headerText = submissionResult
    ? isCorrect
      ? 'Congratulations!'
      : 'Better Luck Next Time'
    : mockQuizResultData.headerText;

  // Parse answer descriptions using RichTextParser
  const correctAnswerContent = useMemo(() => {
    if (!submissionResult?.correctAnswerDesc) return null;
    try {
      const parsed = JSON.parse(submissionResult.correctAnswerDesc);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // Try formatted text parsing
      try {
        const formatted = RichTextParser.parseFormattedText(
          submissionResult.correctAnswerDesc,
        );
        if (formatted.length > 0) {
          return formatted;
        }
      } catch (e) {
        // Fall back to plain text
      }
    }
    return RichTextParser.parseTextToContent(
      submissionResult.correctAnswerDesc,
    );
  }, [submissionResult?.correctAnswerDesc]);

  const wrongAnswerContent = useMemo(() => {
    if (!submissionResult?.wrongAnswerDesc) return null;
    try {
      const parsed = JSON.parse(submissionResult.wrongAnswerDesc);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch (e) {
      // Try formatted text parsing
      try {
        const formatted = RichTextParser.parseFormattedText(
          submissionResult.wrongAnswerDesc,
        );
        if (formatted.length > 0) {
          return formatted;
        }
      } catch (e) {
        // Fall back to plain text
      }
    }
    return RichTextParser.parseTextToContent(submissionResult.wrongAnswerDesc);
  }, [submissionResult?.wrongAnswerDesc]);

  const correctAnswerText = submissionResult
    ? isCorrect
      ? correctAnswerContent || 'Your answer is correct!'
      : wrongAnswerContent ||
        (submissionResult?.correctAnswer
          ? `Correct answer: ${submissionResult.correctAnswer}`
          : 'Your answer is not correct.')
    : mockQuizResultData.correctAnswerText;

  // Get the appropriate description based on whether the answer was correct
  const answerDescription = submissionResult
    ? isCorrect
      ? correctAnswerContent
      : wrongAnswerContent
    : null;

  const websiteUrl = submissionResult ? '' : mockQuizResultData.websiteUrl;

  const infoTitle = mockQuizResultData.sectionTitle;
  const infoMainTitle = submissionResult ? '' : mockQuizResultData.mainTitle;
  const infoParagraphs = [
    answerDescription, // Show the detailed description first
  ].filter(Boolean); // Remove any empty strings

  const handlePrizePress = () => {
    navigation.navigate('PrizePageScreen');
    // Alert.alert(
    //   'Prize Claimed!',
    //   'Congratulations! Your prize has been claimed successfully.',
    //   [{ text: 'OK', onPress: () => console.log('Prize claimed') }],
    // );
  };
  const handleBackPress = () => {
    // Alert.alert('Navigation', 'Going back to previous screen', [
    //   { text: 'OK', onPress: () => console.log('Back pressed') },
    // ]);
    navigation.navigate('CompletionScreen');
  };

  return (
    <SecureScreen>
      <ImageBackground
        source={require('../../assets/quiz_background.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              {/* Success Header with Icon */}
              <SuccessHeader
                headerText={headerText}
                correctAnswerText={
                  submissionResult?.correctAnswer ??
                  submissionResult?.submittedAnswer
                }
                websiteUrl={websiteUrl}
                isCorrect={isCorrect}
              />

              {/* Information Section */}
              <InfoSection
                title={infoTitle}
                mainTitle={mockQuizResultData.mainTitle}
                contentParagraphs={infoParagraphs}
              />

              {/* Statistics Section */}
              {/* <StatisticsSection
              title={mockQuizResultData.didYouKnowTitle}
              statistics={mockQuizResultData.statistics}
            /> */}
              {isCorrect ? (
                /* Show Prize Button for correct answers */
                <PrizeButton
                  prizeDescription={mockQuizResultData.prizeDescription}
                  buttonText={mockQuizResultData.prizeButtonText}
                  onPress={handlePrizePress}
                />
              ) : (
                /* Show Share and Back buttons for incorrect answers */
                <>
                  <BackNavigationButton onPress={handleBackPress} />
                </>
              )}
            </ScrollView>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SecureScreen>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: appScreen.width,
  },
  container: {
    flex: 1,
    width: appScreen.width,
  },
  scrollView: {
    flex: 1,
    width: appScreen.width,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  backgroundImage: {
    flex: 1,
    width: appScreen.width,
    height: '100%',
  },
});

export default QuizResultScreen;

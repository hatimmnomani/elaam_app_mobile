import React from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { completionTheme } from '../../theme/completionTheme';
import { mockCompletionData } from '../../completionMockData';
import CompletionHeader from '../../components/CompletionHeader';
import TrophyAwardImage from '../../components/TrophyAwardImage';
import CongratulationsContent from '../../components/CongratulationsContent';
import ElaamApplicationButton from '../../components/ElaamApplicationButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { string } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CompletionScreen = () => {
  const navigation = useNavigation();
  const { submissionResult } = useSelector(state => state.quiz);

  const userData = submissionResult?.userData;
  const userScore = userData?.userScore || '0';
  const userName = userData?.name || 'مستخدم';

  // Determine achievement level based on score
  const getAchievementLevel = score => {
    const numScore = parseInt(score);
    if (numScore >= 90) return 'ممتاز';
    if (numScore >= 80) return 'جيد جداً';
    if (numScore >= 70) return 'جيد';
    return 'محاولة جيدة';
  };

  const achievementLevel = getAchievementLevel(userScore);

  const handleApplicationPress = () => {
    Alert.alert(
      'Aelaam Application',
      'Congratulations! Opening the main Aelaam Application.',
      [
        {
          text: 'Continue',
          onPress: () => navigation.navigate(string.WelcomeScreen),
        },
      ],
    );
  };

  return (
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
            {/* Completion Header */}
            <CompletionHeader headerText={mockCompletionData.headerText} />

            {/* Trophy Award Image with Text Overlay */}
            <TrophyAwardImage
              imageSource={mockCompletionData.trophyImage}
              overlayText={`${userScore}`}
              textPosition="center"
              textStyle={{
                fontSize: 18,
                color: '#FFFFFF',
                fontWeight: 'bold',
                textShadowColor: '#FFD700',
                textShadowOffset: { width: 2, height: 0 },
                textShadowRadius: 15,
                backgroundColor: 'transparent', // Changed to transparent
              }}
            />

            {/* Congratulations Content */}
            <CongratulationsContent
              content={`${mockCompletionData.congratulationsText}`}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)', // Semi-transparent background to show background image
                ...completionTheme.shadows.content, // Standardized shadow
              }}
            />

            {/* Elaam Application Button */}
            <ElaamApplicationButton
              buttonText={mockCompletionData.applicationButtonText}
              onPress={handleApplicationPress}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    // backgroundColor: completionTheme.colors.background,
  },
  container: {
    flex: 1,
    // borderWidth: 2,
    // borderColor: completionTheme.colors.primary,
    // borderRadius: completionTheme.borderRadius.card,
    // margin: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
});

export default CompletionScreen;

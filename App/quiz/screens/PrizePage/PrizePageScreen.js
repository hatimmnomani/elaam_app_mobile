import React, { useMemo } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import { prizePageTheme } from '../../theme/prizePageTheme';
import { mockPrizePageData } from '../../prizePageMockData';
import PrizePageHeader from '../../components/PrizePageHeader';
import ReligiousGatheringImage from '../../components/ReligiousGatheringImage';
import {
  ContentRenderer,
  RichTextParser,
} from '../../components/RichTextContent';
import WebsiteLinkButton from '../../components/WebsiteLinkButton';
import ShareButton from '../../components/ShareButton';
import BackNavigationButton from '../../components/BackNavigationButton';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { QuestionHeader } from '../../components/QuizQuestionPage';
import { quizTheme } from '../../theme/quizTheme';
import { useSelector } from 'react-redux';
import { MyConsole } from '../../../utils/MyConsole';

const PrizePageScreen = () => {
  const navigation = useNavigation();
  const { submissionResult } = useSelector(state => state.quiz);

  const userData = submissionResult?.userData;
  const trophy = submissionResult?.trophy;
  const description = trophy?.description;
  MyConsole.log('trophy', trophy);
  MyConsole.log('description', description);
  MyConsole.log('userData', userData);
  const image = trophy?.image;

  // Use trophy image if available, otherwise fall back to default image
  const displayImage =
    image &&
    typeof image === 'string' &&
    image.trim() !== '' &&
    image !== 'null' &&
    image !== 'undefined'
      ? { uri: image }
      : mockPrizePageData.gatheringImage;

  // Parse description content using RichTextParser smart parsing
  const parsedDescription = useMemo(() => {
    if (!description) return [];

    // If description is already structured content (array), use it directly
    if (Array.isArray(description)) {
      return description;
    }

    // If description is an object, use as-is
    if (description && typeof description === 'object') {
      return description;
    }

    // If description is a string, try to parse it
    if (typeof description === 'string') {
      try {
        const parsed = JSON.parse(description);
        if (Array.isArray(parsed)) {
          return parsed;
        }
        if (parsed && typeof parsed === 'object') {
          return parsed;
        }
      } catch (e) {
        // Try formatted text parsing
        try {
          const formatted = RichTextParser.parseFormattedText(description);
          if (formatted.length > 0) {
            return formatted;
          }
        } catch (e) {
          // Fall back to plain text
        }
      }

      // Convert plain text to structured content
      return RichTextParser.parseTextToContent(description);
    }

    return [];
  }, [description]);
  const handleBackPress = () => {
    // Alert.alert('Navigation', 'Going back to previous screen', [
    //   { text: 'OK', onPress: () => console.log('Back pressed') },
    // ]);
    navigation.navigate('CompletionScreen');
  };

  return (
    <ImageBackground
      source={require('../../assets/quiz_background.png')}
      style={styles.backgroundImage}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            <View style={[styles.headerContainer]}>
              <QuestionHeader title={mockPrizePageData.headerText} />
            </View>

            {/* Religious Gathering Image */}
            <ReligiousGatheringImage imageSource={displayImage} />
            <View style={styles.contentSection}>
              {/* Main Arabic Text Content */}
              <ContentRenderer
                content={parsedDescription}
                style={{
                  backgroundColor: quizTheme.colors.contentBackground, // Standardized background
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  borderRadius: quizTheme.borderRadius.section,
                  ...quizTheme.shadows.content, // Standardized shadow
                }}
              />
            </View>

            {/* Bottom Section Text */}
            {/* <ContentRenderer
              content={
                Array.isArray(mockPrizePageData.bottomSectionText)
                  ? mockPrizePageData.bottomSectionText
                  : RichTextParser.parseTextToContent(
                      mockPrizePageData.bottomSectionText,
                    )
              }
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                paddingHorizontal: 20,
                paddingVertical: 20,
              }}
            /> */}

            {/* Website Link Button */}
            {/* <WebsiteLinkButton
              websiteUrl={mockPrizePageData.websiteUrl}
              fullUrl={mockPrizePageData.websiteFullUrl}
            /> */}

            {/* Share Button */}
            <ShareButton
              score={userData?.userScore || '0'}
              name={userData?.name || ''}
              shareText={mockPrizePageData.shareButtonText}
            />

            {/* Back Navigation Button */}
            <BackNavigationButton onPress={handleBackPress} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    // backgroundColor: prizePageTheme.colors.background,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    // backgroundColor: prizePageTheme.colors.background,
    // borderWidth: 2,
    // borderColor: prizePageTheme.colors.primary,
    // borderRadius: prizePageTheme.borderRadius.card,
    // margin: 10,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  headerContainer: {
    backgroundColor: quizTheme.colors.primary,
    width: '100%',
    alignItems: 'center',
    height: 47,
  },
});

export default PrizePageScreen;

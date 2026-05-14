import React from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable } from 'react-native';
import { Color } from '../../../../App/constants';
import DecorativeHeader from './DecorativeHeader';
import MainCalligraphyPanel from './MainCalligraphyPanel';
import QuizButton from './QuizButton';
import QuizCard from '../../assets/QuizCard';
import { appScreen } from '../../../utils/responsive/SizeUtil';
import { showAlert } from '../../../common/CustomAlert';
import ShareButton from '../ShareButton';
import { quizTheme } from '../../theme/quizTheme';
import { ContentRenderer, RichTextParser } from '../RichTextContent';

const QuizDescriptionPage = ({ onBackPress, quizzes = [], onStartQuiz }) => {
  const currentQuiz =
    Array.isArray(quizzes) && quizzes.length > 0 ? quizzes[0] : null;

  // Convert quizDescription to structured content for rich text preview
  const content = React.useMemo(() => {
    if (!currentQuiz?.quizDescription) {
      return RichTextParser.createSampleContent();
    }

    const description = currentQuiz.quizDescription;

    // Check if it's already structured content (JSON)
    if (typeof description === 'string') {
      try {
        const parsed = JSON.parse(description);
        if (Array.isArray(parsed)) {
          return parsed; // Use structured content directly
        }
      } catch (e) {
        // Not JSON, try formatted text parsing
        try {
          const formattedContent =
            RichTextParser.parseFormattedText(description);
          if (formattedContent.length > 0) {
            return formattedContent;
          }
        } catch (e) {
          // Fall back to plain text parsing
        }
      }
    }

    // Parse as plain text using RichTextParser
    return RichTextParser.parseTextToContent(description);
  }, [currentQuiz?.quizDescription]);

  const handleMainButtonPress = () => {
    if (currentQuiz) {
      if (currentQuiz.canPlay) {
        onStartQuiz && onStartQuiz(currentQuiz);
      } else {
        showAlert({
          title: 'Already Completed',
          message: "You've already completed today's quiz",
        });
      }
    } else {
      // fallback to original onQuizClick if no quiz data available
      // onQuizClick && onQuizClick();
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Top decorative header */}
        <DecorativeHeader />

        {/* Main calligraphy panel */}
        <MainCalligraphyPanel />

        {/* Content section */}
        <View style={styles.contentSection}>
          {/* Rich text content preview with editor compatibility */}
          {/* <ContentRenderer
            content={content}
            style={styles.contentRenderer}
          /> */}
          <ContentRenderer
            content={
              Array.isArray(content)
                ? content
                : RichTextParser.parseTextToContent(content)
            }
            style={{
              backgroundColor: quizTheme.colors.contentBackground, // Standardized background
              paddingHorizontal: 20,
              paddingVertical: 20,
              borderRadius: quizTheme.borderRadius.section,
              ...quizTheme.shadows.content, // Standardized shadow
            }}
          />
          {/* Quiz button */}
          <View style={styles.buttonContainer}>
            <QuizButton onPress={handleMainButtonPress} />
          </View>
        </View>
        {/* Share Button */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: appScreen.width,
    overflow: 'hidden',
    maxWidth: appScreen.width,
    alignSelf: 'center',
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentSection: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    minHeight: 300,
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
  contentRenderer: {
    backgroundColor: quizTheme.colors.contentBackground, // Standardized background
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: quizTheme.borderRadius.section,
    ...quizTheme.shadows.content, // Standardized shadow
  },
});

export default QuizDescriptionPage;

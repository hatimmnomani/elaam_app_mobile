import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContentRenderer, RichTextParser } from '../RichTextContent';
import { quizTheme } from '../../theme/quizTheme';

const QuestionContent = ({ style, questionDescription }) => {
  // Convert questionDescription to structured content for rich text preview
  const content = React.useMemo(() => {
    if (!questionDescription) {
      return RichTextParser.createSampleContent();
    }

    // Check if it's already structured content (JSON)
    if (typeof questionDescription === 'string') {
      try {
        const parsed = JSON.parse(questionDescription);
        if (Array.isArray(parsed)) {
          return parsed; // Use structured content directly
        }
      } catch (e) {
        // Not JSON, try formatted text parsing
        try {
          const formattedContent = RichTextParser.parseFormattedText(questionDescription);
          if (formattedContent.length > 0) {
            return formattedContent;
          }
        } catch (e) {
          // Fall back to plain text parsing
        }
      }
    }

    // Parse as plain text using RichTextParser
    return RichTextParser.parseTextToContent(questionDescription);
  }, [questionDescription]);

  return (
    <View style={[styles.container, style]}>
      <ContentRenderer
        content={content}
        style={styles.contentRenderer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: quizTheme.borderRadius.section,
    ...quizTheme.shadows.card,
  },
  contentRenderer: {
    // ContentRenderer will handle its own styling
    // This ensures compatibility with rich text parser
  },
});

export default QuestionContent;

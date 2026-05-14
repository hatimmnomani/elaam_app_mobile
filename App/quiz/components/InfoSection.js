import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { quizTheme } from '../theme/quizTheme';
import { ContentRenderer, RichTextParser } from './RichTextContent';

const InfoSection = ({ title, mainTitle, contentParagraphs }) => {
  // Parse contentParagraphs using RichTextParser for rich text support
  const parsedContent = useMemo(() => {
    if (!contentParagraphs || contentParagraphs.length === 0) {
      return [];
    }

    return contentParagraphs
      .map((item, index) => {
        // If item is already structured content (array), use it directly
        if (Array.isArray(item)) {
          return item;
        }

        // If item is an object, use as-is
        if (item && typeof item === 'object') {
          return item;
        }

        // If item is a string, try to parse it
        if (typeof item === 'string') {
          try {
            const parsed = JSON.parse(item);
            if (Array.isArray(parsed)) {
              return parsed;
            }
            if (parsed && typeof parsed === 'object') {
              return parsed;
            }
          } catch (e) {
            // Try formatted text parsing
            try {
              const formatted = RichTextParser.parseFormattedText(item);
              if (formatted.length > 0) {
                return formatted;
              }
            } catch (e) {
              // Fall back to plain text
            }
          }

          // Convert plain text to structured content
          return RichTextParser.parseTextToContent(item);
        }

        return [];
      })
      .filter(content => content && content.length > 0);
  }, [contentParagraphs]);

  return (
    <View style={styles.container}>
      {/* Section title */}
      {/* <Text style={styles.sectionTitle}>{title}</Text> */}

      {/* Main title with underline */}
      {/* {mainTitle?.toString().trim().length > 0 && (
        <Text style={styles.mainTitle}>{mainTitle}</Text>
      )} */}

      {/* Content paragraphs with rich text support */}
      <View style={styles.contentContainer}>
        {parsedContent.map((content, index) => (
          <View key={index} style={styles.contentWrapper}>
            <ContentRenderer content={content} style={styles.contentRenderer} />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: quizTheme.colors.contentBackground, // Standardized background
    marginHorizontal: 20,
    marginVertical: 15,
    padding: 20,
    borderRadius: quizTheme.borderRadius.section,
    ...quizTheme.shadows.content, // Standardized shadow
  },
  sectionTitle: {
    fontSize: quizTheme.typography.sizes.header,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.secondary,
    fontFamily: quizTheme.typography.fontFamily,
    textAlign: 'center',
    writingDirection: 'rtl',
    ...(quizTheme.typography.textStyles?.heading || {
      includeFontPadding: false,
      textAlignVertical: 'center',
    }), // Prevent cropping with fallback
  },
  mainTitle: {
    fontSize: quizTheme.typography.sizes.header,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.text,
    fontFamily: quizTheme.typography.fontFamily,
    writingDirection: 'rtl',
    textDecorationLine: 'underline',
    ...(quizTheme.typography.textStyles?.heading || {
      includeFontPadding: false,
      textAlignVertical: 'center',
    }), // Prevent cropping with fallback
    paddingVertical: 20,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  contentWrapper: {
    marginBottom: 15,
  },
  contentRenderer: {
    // ContentRenderer handles its own styling
    // This ensures proper rich text rendering
  },
  contentText: {
    fontSize: quizTheme.typography.sizes.body,
    fontWeight: quizTheme.typography.weights.medium,
    color: quizTheme.colors.text,
    fontFamily: quizTheme.typography.fontFamily,
    textAlign: 'right',
    writingDirection: 'rtl',
    ...(quizTheme.typography.textStyles?.body || {
      includeFontPadding: false,
      textAlignVertical: 'center',
      lineHeight: 24,
    }), // Prevent cropping with fallback
    marginBottom: 15,
  },
});

export default InfoSection;

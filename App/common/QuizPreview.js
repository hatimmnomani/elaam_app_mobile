import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Content, Block, InlineText, ParagraphBlock, HeadingBlock, ListBlock, ListItem } from './quizPreviewTypes';

const renderInlineText = (inline, index) => {
  let textComponent = <Text key={index}>{inline.text}</Text>;

  const textStyle = {};

  if (inline.style.bold) {
    textComponent = <Text style={{ fontWeight: 'bold' }}>{textComponent}</Text>;
  }
  if (inline.style.italic) {
    textStyle.fontStyle = 'italic';
  }
  if (inline.style.underline) {
    textStyle.textDecorationLine = 'underline';
  }
  if (inline.style.strikethrough) {
    textStyle.textDecorationLine = 'line-through';
  }
  if (inline.style.color) {
    textStyle.color = inline.style.color;
  }
  if (inline.style.fontFamily) {
    textStyle.fontFamily = inline.style.fontFamily;
  }

  if (Object.keys(textStyle).length > 0) {
    return <Text key={index} style={textStyle}>{inline.text}</Text>;
  }

  return <Text key={index}>{inline.text}</Text>;
};

const renderBlock = (block, index) => {
  const blockStyle: any = {
    fontSize: block.style.fontSize || 16,
    color: block.style.color || '#000',
    textAlign: block.style.textAlign || 'left',
    writingDirection: block.style.direction || 'ltr',
  };

  switch (block.type) {
    case 'heading':
      const headingBlock = block; // TypeScript casting removed for JavaScript
      const HeadingComponent = () => {
        const headingStyle = {
          ...blockStyle,
          fontWeight: 'bold',
          marginVertical: 8,
        };

        switch (headingBlock.level) {
          case 1:
            return <Text key={block.id || index} style={[headingStyle, { fontSize: 24 }]}>{headingBlock.children.map(renderInlineText)}</Text>;
          case 2:
            return <Text key={block.id || index} style={[headingStyle, { fontSize: 20 }]}>{headingBlock.children.map(renderInlineText)}</Text>;
          case 3:
            return <Text key={block.id || index} style={[headingStyle, { fontSize: 18 }]}>{headingBlock.children.map(renderInlineText)}</Text>;
          default:
            return <Text key={block.id || index} style={[headingStyle, { fontSize: 18 }]}>{headingBlock.children.map(renderInlineText)}</Text>;
        }
      };
      return <HeadingComponent key={block.id || index} />;

    case 'paragraph':
      const paragraphBlock = block; // TypeScript casting removed for JavaScript
      return (
        <Text key={block.id || index} style={[blockStyle, { marginVertical: 4 }]}>
          {paragraphBlock.children.map(renderInlineText)}
        </Text>
      );

    case 'list-bullet':
      const listBlock = block; // TypeScript casting removed for JavaScript
      return (
        <View key={block.id || index} style={{ marginVertical: 4 }}>
          {listBlock.items.map((item, itemIndex) => (
            <View key={item.id || itemIndex} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ marginRight: 8, fontSize: blockStyle.fontSize }}>•</Text>
              <Text style={{ flex: 1, ...blockStyle }}>
                {item.children.map(renderInlineText)}
              </Text>
            </View>
          ))}
        </View>
      );

    case 'list-numbered':
      const numberedListBlock = block; // TypeScript casting removed for JavaScript
      return (
        <View key={block.id || index} style={{ marginVertical: 4 }}>
          {numberedListBlock.items.map((item, itemIndex) => (
            <View key={item.id || itemIndex} style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              <Text style={{ marginRight: 8, fontSize: blockStyle.fontSize }}>{itemIndex + 1}.</Text>
              <Text style={{ flex: 1, ...blockStyle }}>
                {item.children.map(renderInlineText)}
              </Text>
            </View>
          ))}
        </View>
      );

    default:
      return null;
  }
};

const QuizPreview = ({ content, style }) => {
  return (
    <ScrollView
      style={[styles.previewContainer, style]}
      contentContainerStyle={styles.contentContainer}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.contentWrapper}>
        {content.map((block, index) => renderBlock(block, index))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  previewContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    maxHeight: 400,
  },
  contentContainer: {
    padding: 16,
  },
  contentWrapper: {
    flex: 1,
  },
});

export default QuizPreview;

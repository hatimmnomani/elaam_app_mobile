import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import type {
  Content,
  Block,
  InlineText,
  ParagraphBlock,
  HeadingBlock,
  ListBlock,
  ListItem,
} from './types';

const renderInline = (
  inline: InlineText,
  index: number,
  blockDirection?: 'rtl' | 'ltr',
) => {
  let element: React.ReactNode = inline.text;
  const style: any = {
    includeFontPadding: false,
    textAlignVertical: 'center',
  };

  if (inline.style.bold) {
    style.fontWeight = 'bold';
  }
  if (inline.style.italic) {
    style.fontStyle = 'italic';
  }
  if (inline.style.underline) {
    style.textDecorationLine = 'underline';
  }
  if (inline.style.strikethrough) {
    style.textDecorationLine = 'line-through';
  }
  if (inline.style.color) {
    style.color = inline.style.color;
  }
  if (inline.style.fontFamily) {
    style.fontFamily =
      inline.style.fontFamily === 'fatemiregular'
        ? Platform.OS === 'ios'
          ? 'FatemiMaqala-Regular'
          : 'fatemiregular'
        : inline.style.fontFamily;
  }

  if (Object.keys(style).length > 1) {
    // More than just includeFontPadding and textAlignVertical
    return (
      <Text
        key={index}
        style={style}
        adjustsFontSizeToFit={true}
        minimumFontScale={0.8}
      >
        {element}
      </Text>
    );
  }

  return (
    <Text key={index} adjustsFontSizeToFit={true} minimumFontScale={0.8}>
      {element}
    </Text>
  );
};

const renderBlock = (block: Block, index: number) => {
  const blockStyle: any = {
    fontSize: block.style.fontSize || 16,
    color: block.style.color || '#000000',
    textAlign:
      block.style.textAlign ||
      (block.style.direction === 'rtl' ? 'right' : 'left'),
    writingDirection: block.style.direction === 'rtl' ? 'rtl' : 'ltr',
    // Prevent text cropping
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: (block.style.fontSize || 16) * 1.4, // Dynamic line height
    paddingVertical: 2, // Add small padding to prevent cropping
  };

  // Handle platform-specific font family for blocks
  if (block.style.fontFamily) {
    blockStyle.fontFamily =
      block.style.fontFamily === 'fatemiregular'
        ? Platform.OS === 'ios'
          ? 'FatemiMaqala-Regular'
          : 'fatemiregular'
        : block.style.fontFamily;
  }

  switch (block.type) {
    case 'heading':
      const headingLevel = (block as HeadingBlock).level;
      const headingStyle = {
        ...blockStyle,
        fontWeight: 'bold',
        fontSize: headingLevel === 1 ? 24 : headingLevel === 2 ? 20 : 18,
        marginVertical: 8,
        paddingVertical: 4, // Prevent cropping
      };
      return (
        <Text
          key={block.id || index}
          style={headingStyle}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
        >
          {(block as HeadingBlock).children.map((inline, index) =>
            renderInline(inline, index, block.style.direction),
          )}
        </Text>
      );
    case 'paragraph':
      const paragraphStyle = {
        ...blockStyle,
        marginVertical: 6,
        paddingVertical: 2, // Prevent cropping
        lineHeight: Math.max(24, (block.style.fontSize || 16) * 1.4), // Ensure minimum line height
      };
      return (
        <Text
          key={block.id || index}
          style={paragraphStyle}
          adjustsFontSizeToFit={true}
          minimumFontScale={0.8}
        >
          {(block as ParagraphBlock).children.map((inline, index) =>
            renderInline(inline, index, block.style.direction),
          )}
        </Text>
      );
    case 'list-bullet':
      return (
        <View
          key={block.id || index}
          style={[
            { marginVertical: 8, alignItems: 'flex-start', width: '100%' },
          ]}
        >
          {(block as ListBlock).items.map((item, itemIndex) => (
            <View
              key={item.id || itemIndex}
              style={{
                flexDirection:
                  block.style.direction === 'rtl' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                width: '100%',
                justifyContent:
                  block.style.textAlign === 'center' ? 'center' : 'flex-start',
                paddingVertical: 2, // Prevent cropping
                marginVertical: 2,
              }}
            >
              <Text
                style={{
                  marginLeft: block.style.direction === 'rtl' ? 8 : 0,
                  marginRight: block.style.direction === 'rtl' ? 0 : 8,
                  textAlign: block.style.textAlign,
                  includeFontPadding: false,
                  textAlignVertical: 'center',
                }}
              >
                •
              </Text>
              <View style={{ flex: 1, paddingVertical: 2 }}>
                {item.children.map((inline, index) =>
                  renderInline(inline, index, block.style.direction),
                )}
              </View>
            </View>
          ))}
        </View>
      );
    case 'list-numbered':
      return (
        <View
          key={block.id || index}
          style={[
            { marginVertical: 8, alignItems: 'flex-start', width: '100%' },
          ]}
        >
          {(block as ListBlock).items.map((item, itemIndex) => (
            <View
              key={item.id || itemIndex}
              style={{
                flexDirection:
                  block.style.direction === 'rtl' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                width: '100%',
                justifyContent:
                  block.style.textAlign === 'center' ? 'center' : 'flex-start',
                paddingVertical: 2, // Prevent cropping
                marginVertical: 2,
              }}
            >
              <Text
                style={{
                  marginLeft: block.style.direction === 'rtl' ? 8 : 0,
                  marginRight: block.style.direction === 'rtl' ? 0 : 8,
                  textAlign: block.style.textAlign,
                  includeFontPadding: false,
                  textAlignVertical: 'center',
                }}
              >
                {itemIndex + 1}.
              </Text>
              <View style={{ flex: 1, paddingVertical: 2 }}>
                {item.children.map((inline, index) =>
                  renderInline(inline, index, block.style.direction),
                )}
              </View>
            </View>
          ))}
        </View>
      );
    default:
      return null;
  }
};

interface ContentRendererProps {
  content: Content;
  style?: any;
}

const ContentRenderer: React.FC<ContentRendererProps> = ({
  content,
  style,
}) => {
  return (
    <View style={[styles.container, style]}>
      {content.map((block, index) => renderBlock(block, index))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ContentRenderer;

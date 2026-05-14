import React from 'react';
import { Text, View, StyleSheet, ImageBackground } from 'react-native';
import { Color } from '../../../../App/constants';
import { BlurView } from '@react-native-community/blur';
import { prizePageTheme } from '../../theme/prizePageTheme';

/**
 * ArabicTextContent - A flexible component for rendering Arabic/RTL text with multiple styled segments
 *
 * @param {Object} props
 * @param {Array} props.texts - Array of text objects with content and optional style
 * @param {Object} props.containerStyle - Style for the container view
 * @param {Object} props.defaultTextStyle - Default style for all text segments
 * @returns {React.ReactElement}
 */
const ArabicTextContent = ({
  texts = [
    {
      content:
        'سؤال نسس Attempt كري نسس جواب اْثثواني  كوشش كرو انسس\n مولانا ط ع ني ايك نادر ذكر، ناياب تصوير سي بركة لئي\n نسس Trophies حاصل كرو.\nالاستفادة العلمية نا اخر ما Total Trophy Count نا مطابق اثث نسس جائزة ملسسس.',
      style: {},
    },
  ],
  containerStyle = {},
  defaultTextStyle = {},
}) => {
  // Default text style that applies to all text segments
  const baseTextStyle = {
    fontSize: prizePageTheme.typography.sizes.body,
    fontWeight: prizePageTheme.typography.weights.medium,
    color: prizePageTheme.colors.text,
    fontFamily: prizePageTheme.typography.fontFamily,
    textAlign: 'right',
    lineHeight: 32,
    writingDirection: 'rtl',
  };

  return (
    // <ImageBackground
    //   source={require('../../assets/text_bg.png')}
    //   style={[styles.container, containerStyle]}
    // >
    <View style={styles.textContainer}>
      <Text style={[styles.baseText, defaultTextStyle]}>
        {texts.map((text, index) => (
          <Text
            key={index}
            style={[baseTextStyle, text.style]}
            numberOfLines={text.numberOfLines}
            ellipsizeMode={text.ellipsizeMode || 'tail'}
          >
            {text.content}
            {index < texts.length - 1 ? ' ' : ''}
          </Text>
        ))}
      </Text>
    </View>
    // </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    // marginHorizontal: 20,
    // marginVertical: 10,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: prizePageTheme.borderRadius.section,
    ...prizePageTheme.shadows.card,
    //height mathch parent
    // height: '100%',
  },
  baseText: {
    textAlign: 'center',
  },
});

export default ArabicTextContent;

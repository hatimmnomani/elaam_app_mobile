import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { completionTheme } from '../theme/completionTheme';
import { dpHeight } from '../../utils/SizeInDp';
import { mockCompletionData } from '../completionMockData';

const CongratulationsContent = ({ content, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.contentTextNext}>{'مبارك مہنى!'}</Text>
      <Text style={styles.contentText}>{content}</Text>
      <Text style={styles.contentText2}>
        {'حضوراعلى نا كلمات نورانية سي استنارة كري نے بركة حاصل كيدي،'}
      </Text>
      <Text style={styles.contentText2}>
        {' الدعوة الهادية اعلى الله منارها نا ادارات ني معلومات حاصل كيدي،'}
      </Text>
      <Text style={styles.contentText2}>
        {'حضوراعلى ني نوادر شانات نو ذخيرة كيدو،'}
      </Text>
      <Text style={styles.contentText2}>
        {' خير نا كامو ما، دعوة انے رب الدعوة ني خدمة كيدي،'}
      </Text>
      <Text style={styles.contentText3}>
        {'خدا تعالى اٰپ نے افضل الجزاءاٰپے!'}

        {/* {'خداتع  اٰپ نے افضل الجزاءاٰپے!'} */}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: completionTheme.colors.contentBackground, // Standardized background
    marginHorizontal: 20,
    marginVertical: 15,
    paddingVertical: 25,
    paddingHorizontal: 20,
    borderRadius: completionTheme.borderRadius.section,
    ...completionTheme.shadows.content, // Standardized shadow
  },
  contentText: {
    fontSize: completionTheme.typography.sizes.body,
    fontWeight: completionTheme.typography.weights.medium,
    color: completionTheme.colors.text,
    fontFamily: completionTheme.typography.fontFamily,
    textAlign: 'center',
    // writingDirection: 'rtl',
    ...completionTheme.typography.textStyles?.body,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 38,
    marginTop: dpHeight(20),

    // Prevent cropping with fallback
  },
  contentText2: {
    fontSize: completionTheme.typography.sizes.body,
    fontWeight: completionTheme.typography.weights.medium,
    color: completionTheme.colors.text,
    fontFamily: completionTheme.typography.fontFamily,
    textAlign: 'center',
    // writingDirection: 'rtl',
    ...completionTheme.typography.textStyles?.body,
    includeFontPadding: false,
    textAlignVertical: 'center',
    lineHeight: 38,

    // Prevent cropping with fallback
  },
  contentText3: {
    writingDirection: 'rtl',
    fontSize: completionTheme.typography.sizes.body,
    fontWeight: completionTheme.typography.weights.medium,
    color: completionTheme.colors.text,
    fontFamily: completionTheme.typography.fontFamily,
    textAlign: 'center',
    // writingDirection: 'rtl',
    ...completionTheme.typography.textStyles?.body,
    includeFontPadding: false,
    textAlignVertical: 'top',
    lineHeight: 45,

    // Prevent cropping with fallback
  },
  contentTextNext: {
    fontSize: completionTheme.typography.sizes.body,
    fontWeight: completionTheme.typography.weights.medium,
    color: completionTheme.colors.secondary,
    fontFamily: completionTheme.typography.fontFamily,
    textAlign: 'center',
    // writingDirection: 'rtl',
    ...completionTheme.typography.textStyles?.body,
    includeFontPadding: false,
    textAlignVertical: 'center',
    ...(Platform.OS === 'android' && { lineHeight: 26 }),
    // Prevent cropping with fallback
  },
});

export default CongratulationsContent;

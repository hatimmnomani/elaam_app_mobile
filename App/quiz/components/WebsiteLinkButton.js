import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Linking, Alert} from 'react-native';
import {prizePageTheme} from '../theme/prizePageTheme';

const WebsiteLinkButton = ({websiteUrl, fullUrl}) => {
  const handleLinkPress = async () => {
    try {
      const supported = await Linking.canOpenURL(fullUrl);
      if (supported) {
        await Linking.openURL(fullUrl);
      } else {
        Alert.alert('Error', 'Cannot open this URL');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open website');
    }
  };

  return (
    <TouchableOpacity style={styles.linkButton} onPress={handleLinkPress}>
      <Text style={styles.linkText}>{websiteUrl}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  linkButton: {
    backgroundColor: prizePageTheme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    ...prizePageTheme.shadows.card,
  },
  linkText: {
    fontSize: prizePageTheme.typography.sizes.link,
    fontWeight: prizePageTheme.typography.weights.medium,
    color: prizePageTheme.colors.linkBlue,
    fontFamily: prizePageTheme.typography.fontFamily,
    textAlign: 'center',
  },
});

export default WebsiteLinkButton;
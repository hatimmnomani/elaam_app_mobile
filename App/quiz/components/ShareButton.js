import { Alert, StyleSheet, Text, TouchableOpacity } from 'react-native';
import FileSystem from 'react-native-file-access';
import Share from 'react-native-share';
import QuizService from '../services/quizService';
import { prizePageTheme } from '../theme/prizePageTheme';

const ShareButton = ({
  shareText = 'Default message',
  score = '95',
  name = 'شهادة الإنجاز',
}) => {
  const handleShare = async () => {
    try {
      console.log('Fetching image from API...');

      // 1. Fetch binary image data from API using service
      const arrayBuffer = await QuizService.getCertificateImage(score, name);

      // 2. Convert ArrayBuffer → Base64
      const base64 = arrayBufferToBase64(arrayBuffer);

      // 3. Save the image as a file
      // const filePath = `${RNFS.CachesDirectoryPath}/certificate.png`;
      // await RNFS.writeFile(filePath, base64, 'base64');
      // 3. Save the image as a file
      const filePath = `${FileSystem.cacheDirectory}certificate.png`;
      await FileSystem.writeFile(filePath, base64, 'base64');

      console.log('Image saved to:', filePath);

      // 4. Share the image
      await Share.open({
        url: `file://${filePath}`,
        type: 'image/png',
      });
    } catch (error) {
      console.error('Error while sharing:', error);
      Alert.alert('Error', 'Failed to share content');
    }
  };

  // Helper: Convert ArrayBuffer to Base64
  const arrayBufferToBase64 = buffer => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return global.btoa
      ? global.btoa(binary) // if btoa exists
      : Buffer.from(binary, 'binary').toString('base64'); // fallback for RN
  };

  return (
    <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
      <Text style={styles.shareText}>{shareText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  shareButton: {
    backgroundColor: prizePageTheme.colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginHorizontal: 20,
    marginVertical: 10,
    alignItems: 'center',
    ...prizePageTheme.shadows.card,
  
  },
  shareText: {
    fontSize: prizePageTheme.typography.sizes.subtitle,
    fontWeight: prizePageTheme.typography.weights.medium,
    color: prizePageTheme.colors.text,
    fontFamily: prizePageTheme.typography.fontFamily,
    textAlign: 'center',
    lineHeight: 40,
  },
});

export default ShareButton;

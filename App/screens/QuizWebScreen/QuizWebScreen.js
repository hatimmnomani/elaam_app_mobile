import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Color } from '../../constants';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import SecureScreen from '../../quiz/components/SecureScreen';

const QUIZ_URL = 'https://quiz.aelaam53.com/#token=';

const QuizWebScreen = () => {
  const [token, setToken] = useState(null);

  
  useEffect(() => {
   //   console.log(MyAsyncStorage.getItem('userToken'),"token check")
    MyAsyncStorage.getItem('userToken').then(setToken);
  }, []);

  if (token === null) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={Color.titleColor} />
      </View>
    );
  }

  return (
    <SecureScreen>
      <SafeAreaView style={styles.container} edges={['bottom']}>
        <WebView
          source={{ uri: `${QUIZ_URL}${token}` }}
          startInLoadingState
          renderLoading={() => (
            <View style={styles.loader}>
              <ActivityIndicator size="large" color={Color.titleColor} />
            </View>
          )}
          style={styles.webview}
        />
      </SafeAreaView>
    </SecureScreen>
  );
};

export default QuizWebScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  webview: { flex: 1 },
  loader: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

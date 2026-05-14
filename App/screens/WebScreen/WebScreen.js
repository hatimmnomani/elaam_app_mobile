import { useRoute } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import Config from 'react-native-config';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import { Header } from '../../common';

const WebScreen = props => {
  const route = useRoute();
  return (
    <SafeAreaView style={style.Container}>
      {!route.params ? <Header /> : null}
      <WebView
        source={{ uri: Config.PRIVACYPOLICY_URL }}
        startInLoadingState={true}
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default WebScreen;
const style = StyleSheet.create({
  Container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
});

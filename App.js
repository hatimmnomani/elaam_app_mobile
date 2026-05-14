import messaging from '@react-native-firebase/messaging';
import { NavigationContainer } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { LogBox, StatusBar } from 'react-native';
import publicIP from 'react-native-public-ip';
import { Provider } from 'react-redux';
import CustomisableAlert from './App/common/CustomAlert';
import forGroundNotification from './App/common/forGroundNotification';
import { CombineNavigation, navigationRef } from './App/navigation/Navigators';
import { store } from './App/redux/Store';
import { hasNotificationPermission } from './App/utils/CommonFunction';
import { MyAsyncStorage } from './App/utils/MyAsyncStorage';
import { MyConsole } from './App/utils/MyConsole';

function App() {
  const [token, setToken] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const getData = async () => {
    console.log('App.js useEffect');
    try {
      const value = await MyAsyncStorage.getItem('userToken');
      //MyConsole.log('token', value);
      if (value !== null) {
        // value previously stored
        //MyConsole.log('token', value);
        setToken(true);
        //  navigation.navigate("WelcomeScreen")
      }
    } catch (e) {
      // error reading value
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      MyConsole.log('Authorization status:', authStatus);
      notificationListener();
      forGroundNotification();
      getFcmToken();
    }
  };

  const notificationListener = () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      MyConsole.log(
        ' Open For Background State => ',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          MyConsole.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
        }
      });
  };

  const getFcmToken = async () => {
    // let fcmToken = await MyAsyncStorage.getItem('fcmToken');
    const fcmToken = await messaging().getToken();
    MyConsole.log('FCM DEVICE NEW TOKEN ====>>', fcmToken);
    await MyAsyncStorage.setItem('fcmToken', fcmToken);
    publicIP()
      .then(async ip => {
        MyConsole.log('ip', ip);
        await MyAsyncStorage.setItem('deviceIP', ip);
      })
      .catch(error => {
        // MyConsole.log(error);
      });
    //MyConsole.log('FCM DEVICE OLDER TOKEN => ', fcmToken);
    if (!fcmToken) {
      try {
        // eslint-disable-next-line no-shadow
        const fcmToken = await messaging().getToken();
        if (fcmToken) {
          //MyConsole.log('FCM DEVICE NEW TOKEN ====>>', fcmToken);
          await MyAsyncStorage.setItem('fcmToken', fcmToken);
        }
      } catch (error) {
        MyConsole.log('ERRORRR IS ', error);
        MyConsole.log('ERRORRR IS MES', error.message);
      }
    }
  };
  useEffect(() => {
    const initializeApp = async () => {
      try {
        // Load fonts first
        //   await loadFonts();
        //   setFontsLoaded(true);

        // Then initialize other app functionality
        requestUserPermission();
        hasNotificationPermission();

        // notificationListener();
        LogBox.ignoreLogs([
          "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
        ]);
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        getData();
      } catch (error) {
        console.error('Error initializing app:', error);
        setFontsLoaded(true); // Continue even if font loading fails
      }
    };

    initializeApp();
  }, []);
  // Show loading screen while fonts are loading
  {
    /* if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#ffffff',
        }}
      >
        <Text style={{ fontSize: 18, color: '#333' }}>Loading fonts...</Text>
      </View>
    );
  }   */
  }

  return (
    <Provider store={store}>
      <NavigationContainer testID="appComponent" ref={navigationRef}>
        {/* <ForGroundNotification /> */}
        <StatusBar
          backgroundColor={'transparent'}
          // translucent={true}
          barStyle="dark-content"
        />

        <CombineNavigation />
        <CustomisableAlert />
        {/* <GlobalAlert /> */}
      </NavigationContainer>
    </Provider>
  );
}
export default App;

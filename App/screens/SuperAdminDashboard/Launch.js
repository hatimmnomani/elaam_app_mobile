import FastImage from '@d11/react-native-fast-image';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { splash_ani } from '../../assets';
import { string } from '../../constants';
import { isProductionEnvironment } from '../../utils/CommonFunction';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { appScreen } from '../../utils/responsive/SizeUtil';
const Launch = () => {
  const focused = useIsFocused();
  const navigation = useNavigation();
  const [hideSplash, setHideSplash] = useState(false);
  const getData = async () => {
    setTimeout(changeScreen, 2000);
  };
  useEffect(() => {
    getData();
  }, []);
  const changeScreen = async () => {
    //alert('Hello!');
    try {
      const value = await MyAsyncStorage.getItem('IdToken');
      // const isLog = await MyAsyncStorage.getItem('isLogin');
      const decodee = await MyAsyncStorage.getItem('decode');
      const checksuperadmin = obj => obj.authority === 'Super Admin';
      const checkmumin = obj => obj.authority === 'Mumin';
      const dvalue = JSON.parse(decodee);
      // MyConsole.log('isLog', value);
      if (value !== null) {
        MyConsole.log('calling Noti API');
        // await getNotification();
        // value previously stored
        MyConsole.log('Moving to Dashboard');
        MyAsyncStorage.setItem('isMumin', 'false');
        // navigation.navigate('ApproveDrawerNavigators');
        // if (dvalue.Roles.some(checksuperadmin)) {
        //   MyAsyncStorage.setItem('isMumin', 'false');
        //   MyAsyncStorage.setItem('isSuperAdmin', 'true');
        //   MyAsyncStorage.setItem('isCheckMumin', '');
        //   navigation.reset({
        //     index: 0,
        //     routes: [
        //       {
        //         name: 'SuperAdminDrawerNavigators',
        //         state: {
        //           routes: [
        //             {
        //               name: 'SuperAdminScreen',
        //             },
        //           ],
        //         },
        //       },
        //     ],
        //   });
        // } else {

        // }
        if (dvalue.Roles.length < 2) {
          if (dvalue.Roles.some(checkmumin)) {
            MyAsyncStorage.setItem('isMumin', 'true');
            MyAsyncStorage.setItem('isCheckMumin', 'Mumin');
            MyAsyncStorage.setItem('isSuperAdmin', 'false');
            // navigation.navigate('MuminDrawerNavigators');
            navigation.reset({
              index: 0,
              routes: [{ name: string.MuminDrawerNavigators }],
            });
          } else {
            MyAsyncStorage.setItem('isMumin', 'false');
            MyAsyncStorage.setItem('isCheckMumin', '');
            MyAsyncStorage.setItem('isSuperAdmin', 'false');
            //navigation.navigate('ApproveDrawerNavigators');
            navigation.reset({
              index: 0,
              routes: [{ name: string.ApproveDrawerNavigators }],
            });
          }
        } else {
          //  setToken(true);
          //navigation.navigate('WelcomeScreen');
          navigation.reset({
            index: 0,
            routes: [{ name: string.WelcomeScreen }],
          });
        }
        //pushNotification();
      } else {
        //MyConsole.log('tokennnnn1', value);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: isProductionEnvironment() ? 'ITSLOGIN' : string.LoginScreen,
            },
          ],
        });
      }
    } catch (e) {
      MyConsole.log('auth error', e);
      // error reading value
    }
  };
  // const changeScreen = async () => {
  //   try {
  //     MyAsyncStorage.setItem('isMumin', 'false');
  //     MyAsyncStorage.setItem('isSuperAdmin', 'true');
  //     MyAsyncStorage.setItem('isCheckMumin', '');
  //     navigation.reset({
  //       index: 0,
  //       routes: [
  //         {
  //           name: 'SuperAdminDrawerNavigators',
  //           state: {
  //             routes: [
  //               {
  //                 name: 'SuperAdminScreen',
  //               },
  //             ],
  //           },
  //         },
  //       ],
  //     });
  //   } catch (e) {
  //     MyConsole.log('error', e);
  //   }
  // };
  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="dark-content"
      />
      <TouchableOpacity
        activeOpacity={1}
        style={styles.touch}
        onPress={() => {
          // setHideSplash(!hideSplash);
          getData();
        }}
      >
        <FastImage source={splash_ani} style={styles.fast_img} />
      </TouchableOpacity>
    </View>
  );
};
export default Launch;
const styles = StyleSheet.create({
  fast_img: {
    flex: 1,
    justifyContent: 'center',
    width: appScreen.width,
    height: appScreen.height,
  },
  container: { flex: 1 },
  touch: {
    flex: 1,
    justifyContent: 'center',
    width: appScreen.width,
    height: appScreen.height,
  },
});

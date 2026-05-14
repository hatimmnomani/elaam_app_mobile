/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import React, {useState, useEffect} from 'react';
import PushNotification, {Importance} from 'react-native-push-notification';
import messaging, {firebase} from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {MyConsole} from '../utils/MyConsole';

const forGroundNotification = () => {
  // useEffect(() => {
    // const initialise = async () => {
      // await firebase.initializeApp();
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        MyConsole.log('Recived in ForeGround => ', remoteMessage);
        const {notification, messageId,data} = remoteMessage;
        PushNotification.createChannel(
          {
            channelId: '120993456', // (required)
            channelName: 'Elaam', // (required)
            channelDescription: 'elaam elam', // (optional) default: undefined.
            playSound: true, // (optional) default: true
            soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
            importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
            vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
          },
          created => MyConsole.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
        );
        if (Platform.OS == 'ios') {
          // PushNotificationIOS.addNotificationRequest({
          //   id: messageId,
          //   body: notification.body,
          //   title: notification.title,
          //   sound: 'default',
          // });
          PushNotificationIOS.addNotificationRequest({
            id: messageId,
            title: notification.title,
            body: notification.body,
            repeats: false,
          });
        } else {
          // PushNotification.localNotification({
          //   channelId: '123456',
          //   id: messageId,
          //   body: notification.body,
          //   title: notification.title,
          //   soundName: 'default',
          //   vibration: true,
          //   playSound: true,
          // });
          PushNotification.localNotification({
          channelId: '120993456',
          id: '1212',
          body: notification.body,
          title: notification.title,
          message: notification.body,
          soundName: 'default',
          vibration: true,
          playSound: true,
          userInfo: data,
      });
        }
      });
      return unsubscribe;
    // };
  //   const cleanup = initialise();
  //   return cleanup;
  // // }, []);
  // return null;
};

export default forGroundNotification;

import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { FAB, MD2Colors } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { group } from '../assets';
import CallIcon from '../assets/images/Elaam_Icons/CallIcon';
import { Color, font, string } from '../constants';
import { ReduxActionCreators } from '../redux/ActionsCreators';
import { dpFont, dpHeight, dpWidth } from '../utils/SizeInDp';
import CallItem from './CallItem';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import DeviceInfo from 'react-native-device-info';
import { contactNo } from '../constants/string';

export const MyFab = () => {
  const dispatch = useDispatch();
  const show_call = useSelector(state => state.CommonReducer.show_call);
  const closeCall = () => {
    dispatch(ReduxActionCreators.show_call(false));
  };
  const x = useSharedValue(dpWidth(340));
  const y = useSharedValue(0);
  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {
      ctx.startX = x.value;
      ctx.startY = y.value;
    },
    onActive: (event, ctx) => {
      x.value = event.translationX + ctx.startX;
      y.value = event.translationY + ctx.startY;
    },
  });
  const reset = () => {
    x.value = withSpring(dpWidth(340));
    y.value = withSpring(0);
  };
  const _style = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }, { translateY: y.value }],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={eventHandler}>
      <Animated.View style={[styles.box, _style]}>
        <Text> </Text>
        <View>
          {show_call ? (
            <ReactNativeModal
              animationType="fade"
              transparent={true}
              avoidKeyboard={true}
              propagateSwipe={true}
              statusBarTranslucent={true}
              visible={true}
              onBackdropPress={closeCall}
              scrollOffset={500}
              backgroundColor={'rgba(0, 0, 0, 0.25)'}
              style={styles.modal}
              onRequestClose={closeCall}
            >
              <View style={{ flex: 1 }}>
                <View style={styles.phone_view}>
                  <ImageBackground source={group} style={styles.img_back}>
                    <View style={{ paddingVertical: dpWidth(26) }}>
                      <CallItem phoneNo={contactNo.support1} />
                      <CallItem phoneNo={contactNo.support2} />
                      {/* <CallItem phoneNo={contactNo.support3} /> */}
                      <Text style={styles.timingTxt}>
                        {contactNo.helpLineTime}
                      </Text>
                      <Text style={styles.call_txt}>{contactNo.startTime}</Text>
                      <Text style={styles.call_txt}>{contactNo.endTime}</Text>
                    </View>
                  </ImageBackground>
                </View>
                {/* <FAB
                  iconTextColor="#FFFFFF"
                  onClickAction={() => {
                    closeCall();
                  }}
                  visible={true}
                  iconTextComponent={
                    <CallIcon height={dpHeight(65)} width={dpHeight(65)} />
                  }
                /> */}
                <View
                  style={{
                    position: 'absolute',
                    bottom: dpHeight(16),
                    right: 16,
                  }}
                >
                  <CallIcon
                    onPress={() => {
                      closeCall();
                    }}
                    height={dpHeight(60)}
                    width={dpHeight(60)}
                  />
                </View>
              </View>
            </ReactNativeModal>
          ) : (
            // <FAB
            //   iconTextColor="#FFFFFF"
            //   onClickAction={() => {
            //     dispatch(ReduxActionCreators.show_call(true));
            //   }}
            //   visible={true}
            //   iconTextComponent={
            //     <CallIcon height={dpHeight(65)} width={dpHeight(65)} />
            //   }
            // />

            <CallIcon
              onPress={() => {
                dispatch(ReduxActionCreators.show_call(true));
              }}
              style={{
                position: 'relative',
                bottom: dpHeight(5),
                right: dpHeight(60),
              }}
              height={dpHeight(60)}
              width={dpHeight(60)}
            />
          )}
        </View>
      </Animated.View>
    </PanGestureHandler>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  box: {
    position: 'absolute',
    bottom: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  no_data_txt_style: {
    marginTop: '10%',
    color: MD2Colors.grey400,
    textAlign: 'center',
    fontSize: dpFont(20),
    fontWeight: '700',
  },
  modal: { margin: 0 },
  phone_view: {
    position: 'absolute',
    bottom: dpHeight(DeviceInfo.isTablet() ? 45 : 62),
    right: dpWidth(DeviceInfo.isTablet() ? 0.5 : 20),
  },
  img_back: { width: dpHeight(180), height: dpHeight(150) },
  call_txt: {
    color: Color.SatoimoBrown,
    fontSize: dpFont(12),
    fontWeight: '500',
    textAlign: 'center',
  },
  timingTxt: {
    color: Color.SatoimoBrown,
    fontSize: dpFont(12),
    fontWeight: '500',
    textAlign: 'center',
    paddingTop: 4,
  },
});

import React from 'react';
import { useSelector } from 'react-redux';
import Lottie from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
const Loader = () => {
  const loading = useSelector(state => state.loader);
  // const animationProgress = useRef(new Animated.Value(0));
  return loading ? (
    <View style={styles.loaderView}>
      <LottieView
        autoPlay
        loop
        //resizeMode="contain"
        //autoSize
        source={require('../../assets/loader.json')}
        style={styles.loaderWidth}
        // <Spinner
        //   visible={loading}
        //   size={80}
        //   textContent={''}
        //   textStyle={{color: COLOR.white}}
        //   color={COLOR.bottomTab}
      />
    </View>
  ) : null;
};

const styles = StyleSheet.create({
  loaderView: {
    // backgroundColor: '#dadada',
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderWidth: {
    width: 100,
    height: 100,
  },
});

export default Loader;

/* eslint-disable prettier/prettier */
import React, { useState ,useEffect} from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Animated } from 'react-native';
import { Color } from '../constants';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import { dpFont, dpHeight, dpWidth } from '../utils/SizeInDp';
import { useIsFocused } from '@react-navigation/native';

export const Tabs = props => {
  const [active, setActive] = useState(props.selectedTab);
  const [xTabOne, setxTabOne] = useState(0);
  const [xTabTwo, setxTabTwo] = useState(0);
  const [xTabThree, setxTabThree] = useState(0);
  const [isTabThree, setisTabThree] = useState(props.tabThree);
  const [translateX, settranslateX] = useState(new Animated.Value(0));
  const focused = useIsFocused();
  const handleSlide = (type, tabtype) => {
    props.onTabPressed(tabtype);
    Animated.spring(translateX, {
      toValue: type,
      duration: 100,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    setActive(0); handleSlide(xTabOne, 0);
  }, [focused]);
  return (
    <View style={styles.btnRow}>
      <View style={styles.topRow}>
        <Animated.View style={[styles.animView, { width: isTabThree ? '35%' : '50%', transform: [{ translateX }] }]} />
        <TouchableOpacity style={styles.touchViewRight}
          onLayout={event => setxTabOne(event.nativeEvent.layout.x)}
          onPress={() => { setActive(0); handleSlide(xTabOne, 0); }}>
          <Ionicons
            name="search"
            color={active === 0 ? Color.white : Color.bottomTab}
            size={dpWidth(22)} />
          <Text style={[styles.tabText, { color: active === 0 ? Color.white : Color.bottomTab }]}>

            {' '}
            {props.tabOne}
          </Text>
        </TouchableOpacity>
        {isTabThree ? (
          <TouchableOpacity
            style={styles.touchViewCenter}
            onLayout={event => setxTabThree(event.nativeEvent.layout.x)}
            onPress={() => {
              setActive(2); handleSlide(xTabThree, 2);
            }}>
            <Text style={[styles.tabText, { color: active === 2 ? Color.white : Color.bottomTab }]}>
              {isTabThree ? isTabThree : ''}
            </Text>
          </TouchableOpacity>
        ) : null}

        <TouchableOpacity
          style={styles.touchViewLeft}
          onLayout={event => setxTabTwo(event.nativeEvent.layout.x)}
          onPress={() => {
            setActive(1); handleSlide(xTabTwo, 1);
          }}>
          <Entypo
            name="calendar"
            color={active === 1 ? Color.white : Color.bottomTab}
            size={dpWidth(22)} />

          <Text style={[styles.tabText, { color: active === 1 ? Color.white : Color.bottomTab }]} >
            {'  '}
            {props.tabTwo}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  btnRow: {
    width: '95%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  topRow: {
    flexDirection: 'row',
    marginVertical: dpHeight(5),
    height: dpHeight(45), backgroundColor: Color.white,
    // marginTop: dpHeight(5),
    position: 'relative',
  },
  animView: {
    position: 'absolute',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: Color.bottomTab,
    borderRadius: dpWidth(10),
  },
  touchViewRight: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: dpWidth(10),
    borderWidth: dpFont(1),
    borderColor: '#F2EBB9',
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  touchViewCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //borderRadius: CommonSize.font_5,
    borderWidth: dpWidth(1),
    borderColor: '#F2EBB9',
    // borderLeftWidth: 0,
    //borderTopLeftRadius: 0,
    //borderBottomLeftRadius: 0,
  },
  touchViewLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: dpWidth(10),
    borderWidth: dpWidth(1),
    borderColor: '#F2EBB9',
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  tabText: {
    fontSize: dpFont(12),
    // fontFamily: fonts.Oxanium_SemiBold,
  },
});

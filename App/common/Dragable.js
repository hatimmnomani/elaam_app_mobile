import React, {Component} from 'react';
import {StyleSheet, View, Text, PanResponder, Animated} from 'react-native';
import FAB from 'react-native-fab';
import {calling} from '../assets';

import CallIcon from '../assets/images/Elaam_Icons/CallIcon';
import {dpHeight, dpWidth} from '../utils/SizeInDp';
export default class Draggable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDraggable: true,
      dropAreaValues: null,
      pan: new Animated.ValueXY(),
      opacity: new Animated.Value(1),
    };
  }

  componentWillMount() {
    this._val = {x: 0, y: 0};
    this.state.pan.addListener(value => (this._val = value));

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderGrant: (e, gesture) => {
        this.state.pan.setOffset({
          x: this._val.x,
          y: this._val.y,
        });
        this.state.pan.setValue({x: 0, y: 0});
      },
      onPanResponderMove: Animated.event([
        null,
        {dx: this.state.pan.x, dy: this.state.pan.y},
      ]),
      onPanResponderRelease: (e, gesture) => {
        // if (this.isDropArea(gesture)) {
        //   Animated.timing(this.state.opacity, {
        //     toValue: 0,
        //     duration: 1000,
        //   }).start(() =>
        //     this.setState({
        //       showDraggable: false,
        //     }),
        //   );
        // }
      },
    });
  }

  isDropArea(gesture) {
    return gesture.moveY < 200;
  }

  //   render() {
  //     return (
  //       <View style={{width: '20%', alignItems: 'center'}}>
  //         {this.renderDraggable()}
  //       </View>
  //     );
  //   }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform(),
    };
    // if (this.state.showDraggable) {
    return (
      <Animated.Image
        {...this.panResponder.panHandlers}
        style={[panStyle, styles.img]}
        source={calling}>
        {/* <View> */}
        {/* <FAB
          buttonColor="red"
          iconTextColor="#FFFFFF"
          onClickAction={() => {
            MyConsole.log('FAB pressddded');
            //dispatch(ReduxActionCreators.show_call(true));
          }}
          visible={true}
          iconTextComponent={
            <CallIcon height={dpHeight(65)} width={dpHeight(65)} />
          }
        /> */}
        {/* </View> */}
      </Animated.Image>
    );
    // }
  }
}
let CIRCLE_RADIUS = 30;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  ballContainer: {
    height: 200,
  },
  circle: {
    backgroundColor: '#00000000',
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    borderRadius: CIRCLE_RADIUS,
  },
  row: {
    flexDirection: 'row',
  },
  dropZone: {
    height: 200,
    backgroundColor: '#00334d',
  },
  text: {
    marginTop: 25,
    marginLeft: 5,
    marginRight: 5,
    textAlign: 'center',
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
  },
  img: {
    height: dpHeight(65),
    width: dpHeight(65),
    backgroundColor: '#ffffff00',
  },
});

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {phone} from '../assets';
import {Color} from '../constants';
import {dpFont, dpWidth} from '../utils/SizeInDp';

const CallItem = props => {
  const handleCall = () => Linking.openURL(`tel:${props.phoneNo}`);
  return (
    <TouchableOpacity onPress={handleCall}>
      <View style={styles.phone_view}>
        <Image source={phone} style={{marginHorizontal: 20}} />
        <Text style={styles.phone_txt}>{props.phoneNo}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default CallItem;
const styles = StyleSheet.create({
  phone_view: {
    flexDirection: 'row',
    paddingVertical: dpWidth(2),
    justifyContent: 'center',
    paddingEnd: 20,
    alignItems: 'center',
  },
  phone_txt: {
    color: Color.SatoimoBrown,
    fontSize: dpFont(12),
    fontWeight: '500',
    alignItems: 'center',
  },
});

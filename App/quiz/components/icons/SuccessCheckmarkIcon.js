import React from 'react';
import {View, StyleSheet} from 'react-native';
import CheckCircleIcon from 'react-native-vector-icons/MaterialIcons';

const SuccessCheckmarkIcon = ({size = 60, color = '#00C853'}) => {
  return (
    <View style={[styles.container, {backgroundColor: color}]}>
      <CheckCircleIcon name="check" size={size * 0.6} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{rotate: '0deg'}],
  },
});

export default SuccessCheckmarkIcon;
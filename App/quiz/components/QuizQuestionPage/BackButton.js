import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Color } from '../../../constants';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

const BackButton = ({ onPress, style }) => {
  return (
    <Pressable
      style={[styles.buttonContainer, style]}
      onPress={onPress}
      android_ripple={{ color: Color.titleColor }}
    >
      <LinearGradient
        colors={[Color.SatoimoBrown, Color.titleColor]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Icon
          name="arrow-back-outline"
          size={26}
          color={Color.white}
          // onPress={onPress}
          style={styles.backIcon}
        />
      </LinearGradient>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 30,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: 175,
    height: 51,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    marginRight: '3%',
    alignSelf: 'center',
  },
});

export default BackButton;

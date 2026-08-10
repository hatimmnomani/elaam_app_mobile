import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {completionTheme} from '../theme/completionTheme';

const ElaamApplicationButton = ({buttonText, onPress}) => {
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      Alert.alert(
        'Aelaam Application',
        'Opening Aelaam Application...',
        [{text: 'OK', onPress: () => console.log('Aelaam Application pressed')}]
      );
    }
  };

  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={handlePress}>
      <LinearGradient
        colors={[completionTheme.colors.primary, '#b48811']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        style={styles.gradientButton}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 25,
    overflow: 'hidden',
    marginHorizontal: 20,
    marginVertical: 20,
    ...completionTheme.shadows.card,
  },
  gradientButton: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: completionTheme.typography.sizes.button,
    fontWeight: completionTheme.typography.weights.medium,
    color: completionTheme.colors.textOnPrimary,
    // fontFamily: completionTheme.typography.fontFamily,
    textAlign: 'center',
  },
});

export default ElaamApplicationButton;
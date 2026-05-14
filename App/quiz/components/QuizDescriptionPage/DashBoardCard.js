import FastImage from '@d11/react-native-fast-image';
import { StyleSheet, View } from 'react-native';
import { appScreen } from '../../../utils/responsive/SizeUtil';

const DashBoardCard = ({ style }) => {
  console.log('DashBoardCard rendered');
  return (
    <View style={[styles.container, style]}>
      <FastImage
        source={require('../../assets/calibary_pannel.png')}
        style={[styles.panelImage, style]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  panelImage: {
    width: appScreen.width * 0.9,
    height: appScreen.width * 0.9,
    resizeMode: 'contain',
    backgroundColor: 'transparent',
  },
});

export default DashBoardCard;

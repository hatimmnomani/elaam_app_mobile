import FastImage from '@d11/react-native-fast-image';
import { StyleSheet, View } from 'react-native';
import { dpHeight } from '../../../utils/SizeInDp';

const MainCalligraphyPanel = ({ style }) => {
  return (
    <View style={styles.container}>
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
    margin: 10,
  },
  panelImage: {
    width: '100%',
    height: dpHeight(260),
  },
});

export default MainCalligraphyPanel;

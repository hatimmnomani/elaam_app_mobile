import { StyleSheet, Text } from 'react-native';
import { MD2Colors } from 'react-native-paper';
import { useSelector } from 'react-redux';

import { dpFont } from '../utils/SizeInDp';

export const EmptyComponent = () => {
  const loading = useSelector(state => state.loader);
  return (
    <Text style={styles.no_data_txt_style}>
      {loading ? '' : 'No records Found'}
    </Text>
  );
};
const styles = StyleSheet.create({
  no_data_txt_style: {
    marginTop: '10%',
    marginBottom: '10%',
    color: MD2Colors.grey400,
    textAlign: 'center',
    fontSize: dpFont(20),
    fontWeight: '700',
  },
});

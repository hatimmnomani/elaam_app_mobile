import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { StyleSheet, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Color } from '../../../constants';
import COLOR from '../../../constants/colors';
import { MyConsole } from '../../../utils/MyConsole';
import { dpFont, dpWidth } from '../../../utils/SizeInDp';

const SearchTab = props => {
  const { clampedScroll } = props;
  const refMessage = React.useRef();
  const focused = useIsFocused();
  useEffect(() => {
    refMessage.current.clear();
  }, [focused]);

  return (
    <View style={[styles.container]}>
      <TextInput
        placeholder={`Search ${props.heading}...`}
        style={styles.formField}
        ref={refMessage}
        placeholderTextColor={COLOR.black}
        maxLength={props.heading === 'ITS ID' ? 8 : undefined}
        keyboardType={props.heading === 'ITS ID' ? 'number-pad' : 'default'}
        onChangeText={val => {
          MyConsole.log('val', val);
          props.onSearch(val);
        }}
      />
      <Ionicons
        name="search"
        color={Color.bottomTab}
        size={dpWidth(20)}
        style={styles.serach_icon_style}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: '#F2EBB9',
    borderRadius: 10,
    borderWidth: 1,
    width: '95%',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },

  formField: {
    fontSize: dpFont(13),
    paddingVertical: '3%',
    paddingHorizontal: '4%',
    width: '100%',
  },
  serach_icon_style: {
    right: dpWidth(15),
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'right',
  },
});

export default SearchTab;

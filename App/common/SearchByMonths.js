/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
// import {Picker} from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import { Color, font } from '../constants/index';

import SelectDropdown from 'react-native-select-dropdown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { MyAsyncStorage } from '../utils/MyAsyncStorage';
import { MyConsole } from '../utils/MyConsole';

export default SearchByMonths = () => {
  const selectTime = [
    'Last 1 Month',
    'Last 2 Month',
    'Last 3 Month',
    '1 year',
    'All',
  ];
  const isFocused = useIsFocused();

  const [whichDas, setWhichDas] = useState('Das');

  useEffect(async () => {
    let checkIs = await MyAsyncStorage.getItem('isCheckMumin');
    setWhichDas(checkIs);
    MyConsole.log('yyryreeeyryr =>> ', checkIs);
    // MyConsole.log('NEW DATE ', getDateis)
  }, []);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
      }}
    >
      <Text
        style={{
          fontSize: font.fontSizes16,
          color: Color.titleColor,
          marginLeft: 10,
          marginTop: 14,
          fontWeight: '500',
        }}
      >
        {' '}
        {whichDas} Dashboard{' '}
      </Text>
      <View style={{ flexDirection: 'row', paddingHorizontal: '2%' }}>
        <SelectDropdown
          buttonStyle={{
            backgroundColor: '#fcf9e5',
          }}
          buttonTextStyle={{
            fontSize: font.fontSizes15,
            color: '#b73109',
          }}
          dropdownBackgroundColor="#fcf9e5"
          data={selectTime}
          onSelect={(selectedItem, index) => {
            // Update(selectedItem, index);
          }}
        />
        <AntDesign
          style={{ justifyContent: 'center', alignSelf: 'center' }}
          name="caretdown"
          color="#b73109"
        />
      </View>
    </View>
  );
};

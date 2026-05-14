/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';

import {Color, font, string} from '../../../constants';
import {dpFont, dpHeight, dpWidth} from '../../../utils/SizeInDp';
import {appScreen} from '../../../utils/responsive/SizeUtil';
import {useSelector} from 'react-redux';
import {MyConsole} from '../../../utils/MyConsole';

const FilterTab = ({item, selectedItem, setSelectedItem}) => {
  const [headerTitle, setheaderTitle] = useState(true);
  const [count, setcount] = useState(0);
  const navigation = useNavigation();
  const search_title = useSelector(state => state.CommonReducer.tab_type);

  const onPress = () => setSelectedItem(item);
  MyConsole.log('filter item', item);
  return (
    <TouchableOpacity style={styles.touchability} onPress={onPress}>
      <View style={styles.main_view}>
        <View style={styles.name_vw_style}>
          <Text style={styles.txt_name_style}>
            {'name' in item
              ? item.name
              : search_title === string.Jamaat
              ? item.jamaatName
              : search_title === string.Jamiat
              ? item.jamiatName
              : search_title === string.Umoor
              ? item.umoorName
              : search_title === string.Department
              ? item.departmentName
              : item.question_eng}
          </Text>
          <RadioButton.Android
            status={
              !selectedItem
                ? 'unchecked'
                : ((search_title === string.Jamaat ||
                    search_title === string.Niyat ||
                    ('name' in item && 'name' in selectedItem) ||
                    search_title === string.Jamiat) &&
                    selectedItem.id === item.id) ||
                  (search_title === string.Department &&
                    item.departmentId &&
                    selectedItem.departmentId === item.departmentId) ||
                  (search_title === string.Umoor &&
                    item.umoorId &&
                    selectedItem.umoorId === item.umoorId)
                ? 'checked'
                : 'unchecked'
            }
            initial={0}
            color={Color.bottomTab}
            onPress={onPress}
            buttonSize={dpWidth(15)}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
export default React.memo(FilterTab);

const styles = StyleSheet.create({
  txt_name_style: {
    fontWeight: '300',
    maxWidth: appScreen.width - dpWidth(80),
  },
  name_vw_style: {
    borderBottomWidth: 2,
    backgroundColor: '#fff',
    marginHorizontal: '3%',
    paddingHorizontal: '4%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: dpHeight(50),
    alignItems: 'center',
    borderBottomColor: '#cfcfbd',
  },
  touchability: {backgroundColor: Color.bgColor},
  main_view: {marginVertical: '1%'},
});

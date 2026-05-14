import { useIsFocused, useNavigation } from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { MD2Colors } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { backg } from '../../assets';
import { EmptyComponent } from '../../common/EmptyComponent';
import { Tabs } from '../../common/Tabs';
import { Color, font, string } from '../../constants';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import { MyConsole } from '../../utils/MyConsole';
import { dpFont, dpHeight, dpWidth } from '../../utils/SizeInDp';
import { appScreen } from '../../utils/responsive/SizeUtil';
import SearchTab from '../SuperAdminDashboard/common/searchTab';
import {
  getAllDropDownJamaat,
  getAllDropDownJamiat,
  getFilterDataList,
} from './GetFilterDataList';
import FilterTab from './common/FilterTab';

const selectTime = [
  { id: 1, name: 'Last 1 Month' },
  { id: 3, name: 'Last 3 Months' },
  { id: 6, name: 'Last 6 Months' },
  { id: 12, name: '1 year' },
  { id: 240, name: 'All' },
];

const Filter = () => {
  const [selectedTab, selectTab] = useState(0);
  const [searchData, setSearchData] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedJamaatItem, setselectedJamaatItem] = useState('');
  const [selectedJamiatItem, setselectedJamiatItem] = useState('');

  const [selectedDateItem, setSelectedDateItem] = useState('');
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const search_title = useSelector(state => state.CommonReducer.tab_type);
  const allJamatList = useSelector(state => state.ApiReducer.allJamatList);
  const allJamiatList = useSelector(state => state.ApiReducer.allJamiatList);
  MyConsole.log('allJamatList', allJamatList);
  MyConsole.log('allJamiatList', allJamiatList);

  const [selectedValue, setSelectedValue] = useState('All');
  // const selectTime = [
  //   'Last 1 Month',
  //   'Last 3 Month',
  //   'Last 6 Month',
  //   '1 year',
  //   'All',
  // ];

  const filter_data_list = useSelector(
    state => state.ApiReducer.filter_data_list,
  );
  const selectedFilterId = useSelector(
    state => state.CommonReducer.selectedFilterId,
  );
  const refDrop = React.useRef(null);
  const refDrop2 = React.useRef(null);

  const start_date = useSelector(state => state.CommonReducer.start_date);
  const fJamaatList = allJamatList?.filter(el => {
    //MyConsole.log('myArrayFiltered', el);
    return el.jamiatId == selectedJamiatItem?.id;
  });
  MyConsole.log('fJamaatList', fJamaatList);
  const filteredList = !focused
    ? []
    : searchData
      ? filter_data_list.filter(item => {
          try {
            return item[
              search_title === string.Jamaat
                ? 'jamaatName'
                : search_title === string.Jamiat
                  ? 'jamiatName'
                  : search_title === string.Umoor
                    ? 'umoorName'
                    : search_title === string.Department
                      ? 'departmentName'
                      : 'question_eng'
            ]
              .toLowerCase()
              .includes(searchData.toLowerCase());
          } catch (error) {
            return true;
          }
        })
      : filter_data_list;
  useEffect(() => {
    selectTab(0);
    if (focused) {
      dispatch(
        ReduxActionCreators.multiple_niyat({
          selectedFilterJamiatId: 0,
          selectedFilterJamatId: 0,
        }),
      );
    }
  }, [focused]);
  useEffect(() => {
    if (focused) {
      dispatch(getFilterDataList(search_title));
      if (selectedFilterId !== 0) {
        let item = {};
        item[
          search_title === string.Jamaat ||
          search_title === string.Jamiat ||
          search_title === string.Niyat
            ? 'id'
            : search_title === string.Umoor
              ? 'umoorId'
              : 'departmentId' //search_title === string.Department
        ] = selectedFilterId;
        setSelectedItem(item);
        MyConsole.log('item############### ', item);
      }
      MyConsole.log('start_date', start_date);
      MyConsole.log('string.defaultStartDate', string.defaultStartDate);
      if (start_date != string.defaultStartDate) {
        let dateItem = {
          id: monthDiff(moment(start_date).toDate(), new Date()),
        };
        setSelectedDateItem(dateItem);
        MyConsole.log('dateItem ############### ', dateItem);
      }
      if (
        search_title === string.Niyat ||
        search_title === string.Umoor ||
        search_title === string.Department
      ) {
        dispatch(getAllDropDownJamaat());
        dispatch(getAllDropDownJamiat());
      }
    }
  }, [search_title, focused]);

  const monthDiff = (d1, d2) => {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  };

  const clearFilter = () => {
    setSelectedItem('');
    setSelectedDateItem('');
  };
  const applyPress = () => {
    dispatch(
      ReduxActionCreators.multiple_niyat({
        selectedFilterId: !selectedItem
          ? 0
          : search_title === string.Jamaat
            ? selectedItem.id
            : search_title === string.Jamiat
              ? selectedItem.id
              : search_title === string.Umoor
                ? selectedItem.umoorId
                : search_title === string.Department
                  ? selectedItem.departmentId
                  : selectedItem.question_eng,
        start_date: !selectedDateItem
          ? string.defaultStartDate
          : moment()
              .subtract(selectedDateItem.id, 'month')
              .format('YYYY-MM-DD'),
      }),
    );
    setSelectedItem('');
    setSelectedDateItem('');
    setselectedJamaatItem('');
    setselectedJamiatItem('');

    if (refDrop) {
      refDrop?.current?.reset();
    }
    if (refDrop2) {
      refDrop2?.current?.reset();
    }

    goBack();
  };
  const goBack = () => {
    setSearchData('');
    selectTab(0);
    navigation.goBack(null);
  };
  const renderItem = ({ item, index }) => (
    <FilterTab
      item={item}
      selectedItem={selectedTab === 0 ? selectedItem : selectedDateItem}
      setSelectedItem={
        selectedTab === 0 ? setSelectedItem : setSelectedDateItem
      }
    />
  );

  const keyExtractor = (item, index) => index.toString();
  const FooterComponet = () => <View style={styles.footer} />;
  return (
    <SafeAreaView style={styles.safeView}>
      <View style={styles.mainView}>
        <View style={styles.bgView}>
          <Image source={backg} style={{ width: appScreen.width }} />
        </View>
        <TouchableOpacity onPress={goBack}>
          <Icon
            name="arrow-back-outline"
            size={29}
            color={Color.bottomTab}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Tabs
        tabOne={'SEARCH'}
        tabTwo={'DATE'}
        onTabPressed={selectTab}
        selectedTab={selectedTab}
      />

      {selectedTab === 0 ? (
        <View style={styles.serachTavView}>
          <SearchTab heading={search_title} onSearch={setSearchData} />
        </View>
      ) : null}
      {search_title === 'Niyat' ||
      search_title === 'Umoor' ||
      search_title === 'Department' ? (
        <View style={styles.dropdownview}>
          <SelectDropdown
            buttonStyle={styles.dropbutton}
            defaultButtonText={'Select Jamiat'}
            buttonTextStyle={styles.droptxt}
            dropdownBackgroundColor={Color.bgColor}
            data={allJamiatList}
            ref={refDrop}
            onSelect={(itemValue, itemIndex) => {
              // Update(itemValue, itemIndex);
              setselectedJamiatItem(itemValue);
              dispatch(
                ReduxActionCreators.selectedFilterJamiatId(itemValue.id),
              );
            }}
            buttonTextAfterSelection={(selectedItem, index, item) =>
              selectedItem.jamiatName
            }
            rowTextForSelection={(item, index) => item.jamiatName}
            renderDropdownIcon={isOpened => {
              return (
                <FontAwesome
                  name={isOpened ? 'chevron-up' : 'chevron-down'}
                  color={'#b73109'}
                  size={18}
                />
              );
            }}
          />
          <View style={styles.dropbuttonView}>
            {fJamaatList.length > 0 ? (
              <SelectDropdown
                buttonStyle={[styles.dropbutton, { width: '100%' }]}
                // defaultButtonText={selectedValue}
                defaultButtonText={'Select Jamaat'}
                buttonTextStyle={styles.droptxt}
                dropdownBackgroundColor={Color.bgColor}
                data={fJamaatList}
                ref={refDrop2}
                onSelect={(itemValue, itemIndex) => {
                  // Update(itemValue, itemIndex);
                  //  dispatch(getAllDropDownJamaat);
                  setselectedJamaatItem(itemValue);
                  dispatch(
                    ReduxActionCreators.selectedFilterJamatId(itemValue.id),
                  );
                }}
                buttonTextAfterSelection={(selectedItem, index, item) =>
                  selectedItem.jamaatName
                }
                rowTextForSelection={(item, index) => item.jamaatName}
                renderDropdownIcon={isOpened => {
                  return (
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={'#b73109'}
                      size={18}
                    />
                  );
                }}
              />
            ) : null}
          </View>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={clearFilter}
        style={
          selectedTab === 0 ? styles.clear_vw_style1 : styles.clear_vw_style2
        }
      >
        <MaterialIcons
          name="cleaning-services"
          color={Color.bottomTab}
          size={dpWidth(15)}
        />
        <Text style={styles.clear_txt_style}> CLEAR</Text>
      </TouchableOpacity>

      <View style={styles.listView}>
        <FlatList
          data={selectedTab === 0 ? filteredList : selectTime}
          contentContainerStyle={styles.content_container_style}
          renderItem={renderItem}
          extraData={selectTab === 0 ? selectedItem : selectedDateItem}
          ListFooterComponent={FooterComponet}
          keyExtractor={keyExtractor}
          ListEmptyComponent={EmptyComponent}
        />
      </View>

      <TouchableOpacity style={styles.apply_vw_style} onPress={applyPress}>
        <Text style={styles.apply_txt_style}>Apply</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Filter;
const clear_vw_base_style = {
  paddingTop: '5%',
  flexDirection: 'row',
  alignSelf: 'flex-end',
  paddingHorizontal: '4%',
  marginVertical: '2%',
};
const styles = StyleSheet.create({
  apply_vw_style: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: Color.bottomTab,
    height: dpHeight(50),
    justifyContent: 'center',
  },
  apply_txt_style: {
    color: '#fff',
    textAlign: 'center',
    fontSize: dpFont(12),
    fontWeight: '700',
  },
  no_data_txt_style: {
    marginTop: '20%',
    color: MD2Colors.grey400,
    textAlign: 'center',
    fontSize: dpFont(30),
    fontWeight: '700',
  },
  clear_vw_style1: { ...clear_vw_base_style },
  clear_vw_style2: { ...clear_vw_base_style, paddingTop: '2%' },
  clear_txt_style: {
    fontWeight: '500',
    color: Color.black,
    fontSize: dpFont(12),
    textAlign: 'center',
  },
  content_container_style: { paddingBottom: 5 },
  footer: { height: dpHeight(250) },
  safeView: { height: '100%', backgroundColor: Color.bgColor },
  mainView: { backgroundColor: Color.bgColor },
  bgView: { position: 'absolute', backgroundColor: Color.bgColor },
  icon: { padding: '3%' },
  serachTavView: { paddingTop: '2%' },
  listView: { height: appScreen.height - dpHeight(100) },

  dropdownview: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingTop: 15,
    marginHorizontal: 15,
  },
  dropbutton: {
    backgroundColor: Color.white,
    borderWidth: 0.5,
    borderColor: Color.bottomTab,
    borderRadius: 10,
    width: '48%',
  },
  dropbuttonView: {
    width: '48%',
  },
  droptxt: {
    fontSize: font.fontSizes15,
    color: '#000',
    textAlign: 'center',
  },
});

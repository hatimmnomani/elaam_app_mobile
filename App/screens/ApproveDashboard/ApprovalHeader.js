import FastImage from '@d11/react-native-fast-image';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card, TextInput, Title } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import Reward_icon from '../../assets/images/Elaam_Icons/Reward_Icon';
import CustomCard from '../../common/CustomCard';
import { Color, string } from '../../constants';
import { selectTime } from '../../constants/string';
import { ReduxActionCreators } from '../../redux/ActionsCreators';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { appScreen } from '../../utils/responsive/SizeUtil';
import {
  chceckUmmor,
  checkJamiatMasool,
  checkKhidmatRamadaniyah,
  checkMuavinAamil,
  checkUmmorHead,
  checkaamil,
} from './getApi';
import styles from './styles';
function ApprovalHeader(props) {
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const navigation = useNavigation();
  const [shouldShow, setShouldShow] = useState(true);
  const [fjamaat, setfjamaat] = useState([]);
  const [defaultIndex, setDefaultIndex] = useState(0);
  const [csearch, setCsearch] = useState('');
  // const [approved, setApproved] = useState(0);
  const [isChange, setIsChange] = useState('Pending');
  // const [shouldCShow, setShouldCShow] = useState(false);
  // const [search, setsearch] = useState('');

  const redeem = useSelector(s => s.ApiReducer.blue_trophy);
  const token_Decode = useSelector(s => s.CommonReducer.token_Decode);
  const allJamatList = useSelector(s => s.ApiReducer.allJamatList);
  const a_dropdown_selected = useSelector(
    s => s.ApiReducer.a_dropdown_selected,
  );
  const approval_pending_list = useSelector(
    s => s.ApiReducer.approval_pending_list,
  );
  const approver_local_data = useSelector(
    s => s.ApiReducer.approver_local_data,
  );
  const pending_search = useSelector(s => s.ApiReducer.pending_search);
  const selected_date = useSelector(s => s.CommonReducer.selected_date);
  const [selectedValue, setSelectedValue] = useState(selected_date || 'All');
  const dropDownRef = useRef(null);
  const dateDropDownRef = useRef(null);

  // Sync dropdown with Redux a_dropdown_selected when screen is focused
  useEffect(() => {
    if (
      focused &&
      allJamatList.length > 0 &&
      Object.keys(a_dropdown_selected).length > 0
    ) {
      // Find the index of the selected item in the list
      const selectedIndex = allJamatList.findIndex(item => {
        // Match by id or umoorId depending on the item structure
        const itemId = item.id || item.umoorId;
        const selectedId =
          a_dropdown_selected.id || a_dropdown_selected.umoorId;
        return itemId === selectedId;
      });

      if (selectedIndex !== -1 && dropDownRef?.current) {
        MyConsole.log('Syncing dropdown to index:', selectedIndex);
        setDefaultIndex(selectedIndex);
        dropDownRef.current.selectIndex(selectedIndex);
      }
    }
  }, [focused, allJamatList, a_dropdown_selected]);

  // Sync date dropdown with Redux selected_date when screen is focused
  useEffect(() => {
    if (focused && selected_date) {
      MyConsole.log('Syncing date dropdown to:', selected_date);
      setSelectedValue(selected_date);
      // Find the index in selectTime array
      const dateIndex = selectTime.indexOf(selected_date);
      if (dateIndex !== -1 && dateDropDownRef?.current) {
        dateDropDownRef.current.selectIndex(dateIndex);
      }
    }
  }, [focused, selected_date]);

  const updateDropdownChange = (itemValue, itemIndex) => {
    setDefaultIndex(itemIndex);
    MyConsole.log('itemValue umoorName', itemValue);
    dispatch(ReduxActionCreators.a_dropdown_selected(itemValue));
    setfjamaat(itemValue);
  };
  const onChangeText = text => {
    MyConsole.log('itemValue umoorName', text);
    // dispatch(
    //   ReduxActionCreators.approver_local_data({
    //     ...approver_local_data,
    //     pending_search: text,
    //   }),
    // );
    dispatch(ReduxActionCreators.pending_search(text));
    // props.setsearch(text);
  };
  const onChangedApproved = text => {
    MyConsole.log('itemValue umoorName', text);
    dispatch(
      ReduxActionCreators.approver_local_data({
        ...approver_local_data,
        approved_search: text,
      }),
    );
    // props.setsearch(text);
  };
  const createSelectDropdown = (role, defaultTextKey, buttonTextKey) => {
    return token_Decode?.Roles?.some(role) ? (
      <SelectDropdown
        ref={dropDownRef}
        defaultValueByIndex={defaultIndex}
        testID={`approvalHeader-${buttonTextKey}-dropdown`}
        data={allJamatList}
        onSelect={updateDropdownChange}
        renderButton={(selectedItem, isOpened) => (
          <View
            style={[
              styles.selectDrop_down_color,
              {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}
          >
            <Text
              style={[styles.selectDrop_down_btn, { flex: 1 }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {(selectedItem && selectedItem[buttonTextKey]) ||
                a_dropdown_selected?.[defaultTextKey] ||
                ''}
            </Text>
            <FontAwesome
              name={isOpened ? 'chevron-up' : 'chevron-down'}
              color={Color.bloodMoon}
              size={18}
              style={{ marginLeft: 8, paddingRight: 12 }}
            />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View style={{ paddingVertical: 10, paddingHorizontal: 12 }}>
            <Text style={{ color: Color.titleColor }}>
              {item[buttonTextKey]}
            </Text>
          </View>
        )}
      />
    ) : null;
  };
  return (
    <View>
      {!approver_local_data?.hide_header ? (
        <View>
          <LinearGradient
            colors={Color.gradientColor2}
            start={{ x: 0.2, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.img_border}
          >
            <Card style={styles.card}>
              <Card.Content style={styles.card_content_style}>
                <Title style={styles.title}> {string.Reward} </Title>
                <View
                  style={{
                    height: appScreen.width * 0.08,
                    width: appScreen.width * 0.3,
                  }}
                >
                  {/* <WithLocalSvg
                    asset={RewardIcon}
                    height={appScreen.width * 0.08}
                    width={appScreen.width * 0.3}
                  /> */}
                  <Reward_icon
                    height={appScreen.width * 0.08}
                    width={appScreen.width * 0.3}
                  />
                </View>

                <FastImage
                  style={styles.blue_throphy}
                  source={require('../../assets/images/Elaam_Icons/blue_trophy.png')}
                />
                <View style={styles.trophytext1}>
                  <Text style={styles.trophytext2}>
                    {redeem?.totalTrophies || 0}
                  </Text>
                </View>
                <Text style={styles.Redeemed_txt}>
                  {string.Trophies_Redeemed} {redeem?.trophiesRedeemed ?? 0}
                </Text>
                {!token_Decode?.Roles?.some(checkKhidmatRamadaniyah) && (
                  <TouchableOpacity>
                    <LinearGradient
                      colors={Color.gradientColor}
                      mode="contained"
                      marginTop={appScreen.width * 0 - 2}
                      style={styles.linear}
                    >
                      <Text
                        onPress={() => {
                          navigation.navigate(string.ApproveCatalogue);
                          dispatch(ReduxActionCreators.d_tab_type('Catalogue'));
                        }}
                        style={styles.button}
                      >
                        {' '}
                        {string.REDEEM_NOW_Button}{' '}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                )}
              </Card.Content>
            </Card>
          </LinearGradient>
          <View style={styles.drop_down_view}>
            <View style={styles.drop_down_view2}>
              {createSelectDropdown(checkaamil, 'jamaatName', 'jamaatName')}
              {createSelectDropdown(
                checkMuavinAamil,
                'jamaatName',
                'jamaatName',
              )}
              {createSelectDropdown(
                checkKhidmatRamadaniyah,
                'jamaatName',
                'jamaatName',
              )}
              {createSelectDropdown(chceckUmmor, 'umoorName', 'umoorName')}
              {createSelectDropdown(
                checkJamiatMasool,
                'jamiatName',
                'jamiatName',
              )}
              {/* {createSelectDropdown(checkDeptHead, 'jamiatName', 'jamiatName')} */}
              {createSelectDropdown(checkUmmorHead, 'umoorName', 'umoorName')}
            </View>
            <View style={styles.drop_down_ain_view}>
              <SelectDropdown
                ref={dateDropDownRef}
                data={selectTime}
                testID="approvalHeader-duration-dropdown"
                onSelect={(itemValue, itemIndex) => {
                  setSelectedValue(itemValue);
                  dispatch(ReduxActionCreators.selected_date(itemValue));
                  props.Update(itemValue, itemIndex);
                }}
                renderButton={(selectedItem, isOpened) => (
                  <View
                    style={[
                      styles.selectDrop_down_color,
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      },
                    ]}
                  >
                    <Text style={[styles.durationDropDownTxt, { flex: 1 }]}>
                      {selectedItem || selectedValue}
                    </Text>
                    <FontAwesome
                      name={isOpened ? 'chevron-up' : 'chevron-down'}
                      color={Color.bloodMoon}
                      size={18}
                      style={{ marginLeft: 8, paddingRight: 12 }}
                    />
                  </View>
                )}
                renderItem={(item, index, isSelected) => (
                  <View style={{ paddingVertical: 10, paddingHorizontal: 12 }}>
                    <Text style={{ color: Color.titleColor }}>{item}</Text>
                  </View>
                )}
              />
            </View>
          </View>
          <View style={styles.niyat_box_back_view}>
            <View style={styles.row}>
              <CustomCard
                onPress={() => {
                  dispatch(
                    ReduxActionCreators.approver_local_data({
                      ...approver_local_data,
                      show_pending_list: true,
                      hide_header: true,
                      header: 'Approval Pending',
                    }),
                  );
                  dispatch(ReduxActionCreators.pending_search(''));
                  MyAsyncStorage.setItem('ShouldShow', 'false');
                  setShouldShow(false);
                  props.setShouldCShow(false);
                  setIsChange('Approval Pending');
                }}
                cardTitle={string.APPROVAL_PENDING}
                number={approval_pending_list?.count ?? 0}
              />
              <CustomCard
                onPress={() => {
                  MyAsyncStorage.setItem('ShouldShow', 'false');
                  setShouldShow(false);
                  dispatch(
                    ReduxActionCreators.approver_local_data({
                      ...approver_local_data,
                      show_pending_list: false,
                      hide_header: true,
                      header: 'Approved Niyats',
                    }),
                  );
                  dispatch(ReduxActionCreators.pending_search(''));
                  props.setShouldCShow(true);

                  setIsChange('Approved Niyats');
                }}
                cardTitle={string.APPROVED_NIYATS}
                number={props?.approved ?? 0}
              />
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.BaseContainer}>
        <View style={styles.drop_down_view2}>
          {approver_local_data?.hide_header ? (
            <Icon
              name="arrow-back-outline"
              size={26}
              color={Color.titleColor}
              onPress={() => {
                MyAsyncStorage.setItem('ShouldShow', 'true');
                setShouldShow(true);
                // props.setShouldCShow(false),
                dispatch(
                  ReduxActionCreators.approver_local_data({
                    ...approver_local_data,
                    show_pending_list: true,
                    header: 'Approval Pending',
                    pending_search: '',
                    approved_search: '',
                    hide_header: false,
                  }),
                );
                dispatch(ReduxActionCreators.pending_search(''));
              }}
              style={styles.back_icon}
            />
          ) : null}
          <Text style={styles.text}> {approver_local_data?.header} </Text>
        </View>
        {!approver_local_data?.show_pending_list ? (
          <TextInput
            style={styles.input_style}
            underlineColor={'transparent'}
            cursorColor={Color.titleColor}
            selectionColor={Color.titleColor}
            contentStyle={{ paddingLeft: 0 }}
            theme={{
              colors: {
                primary: 'transparent',
                placeholder: Color.headtextColor,
              },
            }}
            keyboardType="number-pad"
            value={approver_local_data?.approved_search}
            placeholderTextColor={Color.headtextColor}
            onChangeText={onChangedApproved}
            placeholder={'Search by ITS ID'}
            left={
              <TextInput.Icon
                icon="magnify"
                size={18}
                color={Color.headtextColor}
                style={styles.search_icon_style}
              />
            }
          />
        ) : (
          <TextInput
            style={styles.input_style}
            underlineColor={'transparent'}
            cursorColor={Color.titleColor}
            selectionColor={Color.titleColor}
            contentStyle={{ paddingLeft: 0 }}
            theme={{
              colors: {
                primary: 'transparent',
                placeholder: Color.headtextColor,
              },
            }}
            value={pending_search}
            onChangeText={onChangeText}
            placeholder={'Search by ITS ID'}
            placeholderTextColor={Color.headtextColor}
            keyboardType="number-pad"
            left={
              <TextInput.Icon
                icon="magnify"
                size={18}
                color={Color.headtextColor}
                style={styles.search_icon_style}
              />
            }
          />
        )}
      </View>
    </View>
  );
}
export default ApprovalHeader;

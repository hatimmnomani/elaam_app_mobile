import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useRef, useState } from 'react';
import { FlatList, KeyboardAvoidingView, Text, View } from 'react-native';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import { Header } from '../../common';
import { EmptyComponent } from '../../common/EmptyComponent';
import Loader from '../../common/Loader';
import { MyFab } from '../../common/MyFab';
import NiyatStatusItem from '../../common/NiyatStatusItem';
import { Color, string } from '../../constants';
import authService from '../../services/authServices';
import MuminDashboard from '../../services/muminDashboard';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { dpHeight } from '../../utils/SizeInDp';
import styles from './styles';

const ActiveNiyatList = props => {
  const focused = useIsFocused();
  // Get dates from Redux (Mumin filter state)
  const muminStartDate = useSelector(
    s => s.CommonReducer.mumin_filter_start_date,
  );
  const muminEndDate = useSelector(s => s.CommonReducer.mumin_filter_end_date);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [pageNo, setPageNo] = useState(0);
  const [isListScrollable, setIsListScrollable] = useState(false); // Track if list is scrollable

  const onContentSizeChange = (contentWidth, contentHeight) => {
    setIsListScrollable(contentHeight > 0); // Check if content is greater than FlatList height
  };
  const onRefresh = () => {
    //set isRefreshing to true
    setIsRefreshing(true);
    getNiyatListF(pageNo);
    // and set isRefreshing to false at the end of your callApiMethod()
  };

  let cardTit = props.route.params.cardTital;

  const navigation = useNavigation();

  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [isFooterLoading, setFooterLoading] = useState(false);
  const [masterData, setMasterData] = useState([]);
  const isInitialMount = useRef(true);

  useEffect(() => {
    setLoading(false);
    if (focused) {
      setMasterData([]);
      setPageNo(0);
      setTotalPages(0);
      getNiyatListF(0);
      setsearch('');
    }
  }, [focused]);

  const APICallling = async () => {
    try {
      const itsid = await MyAsyncStorage.getItem('itsid');
      const pass = await MyAsyncStorage.getItem('password');
      const ismumin = await MyAsyncStorage.getItem('isMumin');

      const values = {
        isMumin: ismumin,
        itsId: itsid,
        password: pass,
      };
      const { data } = await authService.login(values);
      // alert(data)
      //
      await MyAsyncStorage.setItem('userToken', 'Bearer ' + data.token);
      getNiyatList(pageNo);
    } catch ({ response }) {
      MyConsole.log('error1', response);
    }
  };
  const getNiyatListF = async pageNo => {
    MyConsole.log('pageNu', pageNo);
    try {
      let statusNum = props.route.params.statNum;
      const itsid = await MyAsyncStorage.getItem('itsid');
      // Use dates from Redux instead of AsyncStorage
      const startDate = muminStartDate;
      const endDate = muminEndDate;
      MyConsole.log(`LLLLLLLEND DATE  ${endDate} jjjjjjSTARTDATE ${startDate}`);
      MyConsole.log('STATUS NUM IS ', statusNum);
      const token = await MyAsyncStorage.getItem('userToken');
      const { config, data } = await MuminDashboard.getNyitList(
        itsid,
        token,
        statusNum,
        startDate,
        endDate,
        pageNo,
        search, // Pass search parameter to API
      );
      MyConsole.log('congig', config);
      MyConsole.log('getNiyatListF data', data?.data?.niyatData);
      setMasterData(data?.data?.niyatData);
      setTotalPages(data?.data?.pagination?.totalPages);
      setLoading(false);
      setFooterLoading(false);
      setIsRefreshing(false);
    } catch ({ response }) {
      MyConsole.log('error', response);
      setLoading(false);
    }
  };
  const getNiyatList = async pageNo => {
    MyConsole.log('pageNu', pageNo);
    try {
      let statusNum = props.route.params.statNum;
      const itsid = await MyAsyncStorage.getItem('itsid');
      // Use dates from Redux instead of AsyncStorage
      const startDate = muminStartDate;
      const endDate = muminEndDate;
      MyConsole.log(`LLLLLLLEND DATE  ${endDate} jjjjjjSTARTDATE ${startDate}`);
      MyConsole.log('STATUS NUM IS ', statusNum);
      const token = await MyAsyncStorage.getItem('userToken');
      const { config, data } = await MuminDashboard.getNyitList(
        itsid,
        token,
        statusNum,
        startDate,
        endDate,
        pageNo,
        search, // Pass search parameter to API
      );
      MyConsole.log('congig', config);
      MyConsole.log('datalist', data);
      setMasterData(
        masterData?.length === 0
          ? data?.data?.niyatData
          : [...masterData, ...data?.data?.niyatData],
      );
      setTotalPages(data?.data?.pagination?.totalPages);
      setLoading(false);
      setFooterLoading(false);
      setIsRefreshing(false);
    } catch ({ response }) {
      MyConsole.log('error', response);
      setLoading(false);
    }
  };
  const ListFooter = () => {
    //View to set in Footer
    return (
      <View style={styles.headerFooterStyle}>
        {isFooterLoading ? <ActivityIndicator /> : null}
      </View>
    );
  };
  const [search, setsearch] = useState('');

  // Handle search text changes
  useEffect(() => {
    // Skip the initial render
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const searchTimer = setTimeout(() => {
      if (focused) {
        setPageNo(0);
        getNiyatListF(0);
      }
    }, 500); // 500ms debounce delay

    return () => clearTimeout(searchTimer);
  }, [search]); // Removed focused from dependencies

  const onEndReached = () => {
    if (!isListScrollable) return;
    MyConsole.log('reach end');
    if (pageNo < totalPages) {
      setPageNo(pageNo + 1);
      getNiyatList(pageNo + 1);
    }
  };

  // Use masterData directly as it now contains filtered results from server
  const filterData = !focused ? [] : masterData;
  const searchFilter = text => {
    setsearch(text);
    // The API call will be triggered by the useEffect above
    // This provides debouncing and prevents multiple API calls
  };
  const renderItem = ({ item }) => <NiyatStatusItem item={item} />;
  return (
    <KeyboardAvoidingView style={styles.MainContainer}>
      <Header />
      <View style={styles.first_view}>
        <View style={styles.BaseContainer}>
          <View style={styles.bach_arow_icon_view}>
            <Icon
              name="arrow-back-outline"
              size={26}
              color={Color.titleColor}
              onPress={() => {
                navigation.navigate(string.MuminScreen);
              }}
              style={styles.bach_arow_icon}
            />
            <Text style={styles.text}> {cardTit} </Text>
          </View>

          <TextInput
            value={search}
            onChangeText={text => {
              setsearch(text);
            }}
            mode="flat"
            dense
            style={[
              styles.txt_input,
              {
                marginHorizontal: 0,
                paddingHorizontal: 0,
                alignSelf: 'stretch',
              },
            ]}
            underlineColor={Color.headtextColor}
            activeUnderlineColor={Color.headtextColor}
            placeholderTextColor={Color.headtextColor}
            placeholder={string.SearchbyUMOOR}
            contentStyle={{ paddingHorizontal: 0 }}
            left={<TextInput.Icon icon="magnify" color={Color.headtextColor} />}
          />
        </View>
        {isLoading ? null : (
          <View style={styles.list_view}>
            <FlatList
              data={filterData}
              contentContainerStyle={{ paddingBottom: dpHeight(50) }}
              renderItem={renderItem}
              onRefresh={onRefresh}
              onEndReachedThreshold={0.5}
              onContentSizeChange={onContentSizeChange} // Detect content size change
              onEndReached={onEndReached}
              ListEmptyComponent={EmptyComponent}
              refreshing={isRefreshing}
            />
          </View>
        )}
      </View>
      <Loader />
      <MyFab />
    </KeyboardAvoidingView>
  );
};
export default ActiveNiyatList;

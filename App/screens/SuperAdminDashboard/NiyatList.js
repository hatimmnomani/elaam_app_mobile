import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { backg } from '../../assets';
import Uparrow from '../../assets/images/Elaam_Icons/Uparrow';
import { EmptyComponent } from '../../common/EmptyComponent';
import Loader from '../../common/Loader';
import { Color, string } from '../../constants';
import { MyConsole } from '../../utils/MyConsole';
import { appScreen } from '../../utils/responsive/SizeUtil';
import SearchTab from '../SuperAdminDashboard/common/searchTab';
import NiyatListItem from '../SuperAdminDashboard/NiyatListItem';
import Header from './common/Header';
import { getNiyatList } from './getApiData';
import styles from './style';

const NiyatList = () => {
  const n_type = useSelector(state => state.CommonReducer.niyat_type);
  const navigation = useNavigation();
  const flatListRef = React.useRef();
  const [redeemtrophy, setRedeemTrophy] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  const renderItem = ({ item }) => <NiyatListItem item={item} />;
  const selectedFilterJamiatId = useSelector(
    state => state.CommonReducer.selectedFilterJamiatId,
  );
  const selectedFilterJamatId = useSelector(
    state => state.CommonReducer.selectedFilterJamatId,
  );
  const focused = useIsFocused();
  const filter_data_list = useSelector(
    state => state.ApiReducer.filter_data_list,
  );
  // const selectedFilterJamiatId = useSelector(
  //   state => state.CommonReducer.selectedFilterJamiatId,
  // );
  // const selectedFilterJamatId = useSelector(
  //   state => state.CommonReducer.selectedFilterJamatId,
  // );
  MyConsole.log('filter_data_list', filter_data_list);
  const end_date = useSelector(state => state.CommonReducer.end_date);
  const start_date = useSelector(state => state.CommonReducer.start_date);
  const niyat_list = useSelector(state => state.ApiReducer.get_data_list);
  const search_title = useSelector(state => state.CommonReducer.tab_type);
  const dashboardTitle = useSelector(
    state => state.CommonReducer.dashboard_title,
  );
  const dispatch = useDispatch();
  const refContainer = React.useRef();
  const onRefresh = () => {};
  const tab_type = useSelector(state => state.CommonReducer.tab_type);
  const selectedFilterId = useSelector(
    state => state.CommonReducer.selectedFilterId,
  );
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setPageNo(0);
    MyConsole.log('set page 0');
    setSearchData('');
  }, [focused]);

  useEffect(() => {
    MyConsole.log('SuperAdminDashboard', dashboardTitle);
    if (focused) {
      let params = {
        endDate: end_date,
        search: searchData && searchData.length === 8 ? searchData : '',
        startDate: start_date,
        status: 1,
        pageNo: pageNo,
        pageSize: 100,
      };
      if (dashboardTitle !== string.Dashboard) {
        params.departmentId =
          dashboardTitle === string.FMB_DASHBOARD
            ? 1
            : dashboardTitle === string.HQHB_Dashboard
              ? 3
              : dashboardTitle === string.Mahad_Al_Zahra_Dashboard
                ? 2
                : 1;
      }
      if (n_type) {
        params.status =
          n_type === string.ACTIVE
            ? 1
            : n_type === string.APPROVAL_PENDING
              ? 2
              : n_type === string.COMPLETED
                ? 3
                : 0;
      }
      if (selectedFilterId !== 0) {
        params[
          tab_type === string.Jamaat
            ? 'jamaatId'
            : tab_type === string.Jamiat
              ? 'jamiatId'
              : tab_type === string.Umoor
                ? 'umoorId'
                : tab_type === string.Department
                  ? 'departmentId'
                  : 'niyatQuestId'
        ] =
          tab_type === string.Niyat
            ? filter_data_list.find(x => x.question_eng === selectedFilterId)
                ?.id
            : selectedFilterId;
      }
      if (selectedFilterJamatId !== 0) {
        params.jamaatId = selectedFilterJamatId;
      }
      if (selectedFilterJamiatId !== 0) {
        params.jamiatId = selectedFilterJamiatId;
      }
      if (searchData && searchData.length !== 0 && searchData.length !== 8) {
        return;
      }
      setLoading(true);
      dispatch(getNiyatList(params, tab_type, niyat_list)).finally(() =>
        setLoading(false),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    dashboardTitle,
    tab_type,
    n_type,
    start_date,
    selectedFilterId,
    searchData,
    focused,
    pageNo,
  ]);

  const toTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const onScroll = () => {
    if (!hasScrolled) setHasScrolled(true);
  };

  const onEndReached = () => {
    if (!hasScrolled || isLoading || !niyat_list?.length) return;
    if (searchData && searchData.length !== 0 && searchData.length !== 8)
      return;

    const totalPages = niyat_list?.[0]?.totalPages ?? 0;
    const nextPage = pageNo + 1;

    if (nextPage < totalPages) {
      setPageNo(nextPage);
    }
    MyConsole.log('onEndReached', pageNo);
  };
  const onSearch = val => {
    setSearchData(val);
    if (val.length === 0 || val.length === 8) {
      setPageNo(0);
    }
  };
  const filteredList = niyat_list;
  return (
    <SafeAreaView style={styles.niyat_container}>
      <View>
        <View style={styles.backgroundImg}>
          <Image source={backg} style={{ width: appScreen.width }} />
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(null);
            navigation.navigate(string.SuperAdminScreen);
          }}
        >
          <Icon
            name="arrow-back-outline"
            size={29}
            color={Color.bottomTab}
            style={styles.back_icon}
          />
        </TouchableOpacity>
      </View>

      <Header heading={n_type} />
      <View style={styles.niyat_search_view}>
        <SearchTab heading="ITS ID" onSearch={onSearch} />
      </View>

      <View style={styles.niyat_list_view}>
        <FlatList
          data={filteredList}
          contentContainerStyle={{ paddingBottom: 5 }}
          renderItem={renderItem}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ref={flatListRef}
          onScroll={onScroll}
          onEndReachedThreshold={0.2}
          onEndReached={
            !niyat_list?.length || isLoading ? undefined : onEndReached
          }
          ListEmptyComponent={EmptyComponent}
        />
      </View>
      <View style={styles.uparrow_view}>
        <Uparrow onPress={() => toTop()} />
      </View>
      <Loader />
    </SafeAreaView>
  );
};
export default NiyatList;

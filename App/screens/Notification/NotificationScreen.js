import { useIsFocused } from '@react-navigation/native';
import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Header } from '../../common';
import { EmptyComponent } from '../../common/EmptyComponent';
import Loader from '../../common/Loader';
import { MyFab } from '../../common/MyFab';
import { Color } from '../../constants';
import authService from '../../services/authServices';
import Notification from '../../services/notification';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import styles from './styles';

const NotificationDashboard = () => {
  const mounted = useRef(true);

  useEffect(() => {
    return () => {
      mounted.current = false;
    };
  }, []);
  const focused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setIsRefreshing(true);
      setPageNo(0);
      await getNotification(0);
    } catch (error) {
      console.error('Error during refresh:', error);
    } finally {
      // Ensure we always set isRefreshing to false, even if there's an error
      if (mounted.current) {
        setIsRefreshing(false);
      }
    }
  };
  const [isLoading, setLoading] = useState(true);
  const [notification_list, setData] = useState([]);
  const [token] = useState('');
  const [pageNo, setPageNo] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [selectedIds, setSelectedIds] = useState([]);

  /* Fetch Data from Notification API */
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
      await MyAsyncStorage.setItem('userToken', 'Bearer ' + data.token);
      getNotification();
    } catch ({ response }) {
      MyConsole.log('error', response);
    }
  };
  useEffect(() => {
    setPageNo(0);
  }, [focused]);

  useEffect(() => {
    getNotification(pageNo);
  }, [pageNo]);
  /* Read Notification API */
  const readNotification = async id => {
    const token = await MyAsyncStorage.getItem('userToken');
    try {
      const { data } = await Notification.readNotification(id, token);
      setLoading(false);
    } catch ({ response }) {
      MyConsole.log('errorNoti', response.data);
    }
  };
  //  find difference of time
  function secondsToDhms(seconds) {
    seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor((seconds % (3600 * 24)) / 3600);
    var m = Math.floor((seconds % 3600) / 60);
    var s = Math.floor(seconds % 60);

    var dDisplay = d > 0 ? d + (d === 1 ? ' day, ' : ' days ') : '';
    var hDisplay = h > 0 ? h + (h === 1 ? ' hr, ' : ' hrs ') : '';
    var mDisplay = m > 0 ? m + (m === 1 ? ' min, ' : ' mins ') : '';
    var sDisplay = s > 0 ? s + (s === 1 ? ' sec' : ' secs') : '';
    if (d > 0) {
      return dDisplay;
    } else if (h > 0) {
      return hDisplay;
    } else if (m > 0) {
      return mDisplay;
    }
    if (seconds < 60) {
      return +seconds + 'sec';
    }
    return dDisplay + hDisplay + mDisplay;
  }
  /* Fetch Data from Notification API */
  const getNotification = async pagenu => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const { data } = await Notification.getNotificationPagination(
        itsid,
        pagenu,
        limit,
      );
      MyConsole.log('data1', data);
      MyConsole.log('data1', data.data.notificationData);

      setLoading(false);
      setData(
        pageNo === 0
          ? (data.data.notificationData ?? [])
          : [...notification_list, ...(data.data.notificationData ?? [])],
      );

      setTotalPage(data.data.pagination.totalPages);
      setIsRefreshing(false);
    } catch (response) {
      MyConsole.log('errorNoti', response);
    }
  };
  const onEndReached = () => {
    if (totalPage > pageNo) {
      MyConsole.log('onEndReached', pageNo);
      setPageNo(pageNo + 1);
    }
    MyConsole.log('onEndReached', pageNo);
  };

  return (
    <View style={styles.main_view}>
      <Header key={selectedIds} />
      <Text style={styles.notificcation_txt}>Notifications</Text>
      {isLoading ? null : (
        <FlatList
          data={notification_list}
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          ListEmptyComponent={EmptyComponent}
          onEndReached={onEndReached}
          renderItem={({ item }) => (
            <View style={styles.row}>
              <Pressable
                onPress={() => {
                  let ids;
                  if (selectedIds.includes(item.id)) {
                    ids = selectedIds;
                    MyConsole.log(ids);
                  } else {
                    ids = [...selectedIds, item.id];
                    MyConsole.log(ids);
                  }
                  setData(
                    notification_list.map(x =>
                      x.id === item.id ? { ...x, read: true } : x,
                    ),
                  );
                  setSelectedIds(ids);
                  readNotification(item.id);
                }}
              >
                <View style={styles.parent_view_icon}>
                  <View style={{ width: '10%' }}>
                    <Icon
                      name={
                        item.read === true
                          ? 'radio-button-on-outline'
                          : 'radio-button-off-outline'
                      }
                      size={28}
                      color={Color.titleColor}
                    />
                  </View>
                  <View style={{ width: '90%' }}>
                    <View style={styles.its_view}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          marginBottom: 5,
                        }}
                      >
                        <Text style={styles.text}>
                          ITS ID: - {item.fromItsId}
                        </Text>
                        <View style={styles.time_container}>
                          <Icon
                            name="time-outline"
                            size={16}
                            color={Color.titleColor}
                          />
                          <Text style={styles.date_text} numberOfLines={1}>
                            {moment(moment.utc(item.notifDate).toDate())
                              .local()
                              .fromNow()}
                          </Text>
                        </View>
                      </View>

                      <Text style={styles.text}>
                        Sender Name: - {item.fromName}
                      </Text>
                    </View>

                    <View style={styles.subject_text_container}>
                      <Text style={styles.text}>{item.subject}</Text>
                    </View>
                    <Text style={styles.desc}>{item.message}</Text>
                  </View>
                </View>
              </Pressable>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      )}
      <Loader />
      <MyFab />
    </View>
  );
};

export default NotificationDashboard;

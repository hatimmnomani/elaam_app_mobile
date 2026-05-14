import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
   Dimensions,
   FlatList,
   LogBox,
   SafeAreaView,
   Text,
   View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import Loader from '../../common/Loader';
import { MyFab } from '../../common/MyFab';
import { Color } from '../../constants';
import ApprovalScreen from '../../services/approvalScreen';
import catalogueDashboard from '../../services/catalogueDashboard';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import RewardListItem from './RewardListItem';
import styles from './style';

const RewardList = props => {
  const focused = useIsFocused();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const renderItem = ({ item }) => <RewardListItem item={item} />;
  const [redeemtrophy, setRedeemTrophy] = useState([]);
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;
  const [trophyNum, setTrophyNum] = useState();

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    gettrophies();
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const gettrophies = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const { data } = await ApprovalScreen.getViewRewardList(itsid);
      setRedeemTrophy(data.data);
    } catch ({ response }) {
      MyConsole.log('jjjjj', response);
    }
  };

  const getPerticulrNumber = async () => {
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    try {
      const { data } = await catalogueDashboard.getNumTrophies(token);
      setTrophyNum(data.data.trophiesRedeemed);
    } catch (err) {
      MyConsole.log('PER ERRROR', err);
    }
  };

  const keyExtractor = (item, index) => index.toString();

  return (
    <SafeAreaView style={styles.MainContainer}>
      {/* <Header /> */}
      <View style={styles.main_view}>
        <View style={styles.RewardListView}>
          <LinearGradient
            colors={['#836f3b', '#836f3b']}
            start={{ x: 0.2, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.RewardBtn}
          >
            <Icon
              name="arrow-back-outline"
              size={26}
              color={Color.white}
              onPress={() => {
                navigation.goBack(null);
              }}
              style={styles.backIcon}
            />
          </LinearGradient>

          <Text style={styles.RewardTxt}> View Reward List </Text>
        </View>

        <View style={styles.RewardList}>
          <FlatList
            data={redeemtrophy}
            contentContainerStyle={{ paddingBottom: 5 }}
            renderItem={renderItem}
            refreshing={isRefreshing}
            keyExtractor={keyExtractor}
          />
        </View>
      </View>
      <Loader />
      <MyFab />
    </SafeAreaView>
  );
};
export default RewardList;

/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
   Image,
   Platform,
   SafeAreaView,
   Text,
   View
} from 'react-native';
import { CheckBox, Input } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { backg } from '../../assets';
import { showAlert } from '../../common/CustomAlert';
import Loader from '../../common/Loader';
import { Color, string } from '../../constants';
import COLOR from '../../constants/colors';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import { appScreen } from '../../utils/responsive/SizeUtil';
import Header from './common/Header';
import { getSubRole, sendMessage } from './getApiData';
import style from './style';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'forth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Fifth Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Sixth Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];
const SendMessage = ({ item, props }) => {
  const [headerTitle, setheaderTitle] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const focused = useIsFocused();
  const [expanded, setExpanded] = React.useState(true);
  const [Umoor, setUmoor] = useState(false);
  const [Department, setDepartment] = useState(false);
  const [Aamil, setAamil] = useState(false);
  const [Jamiat, setJamiat] = useState(false);
  const [UmoorC, setUmoorC] = useState(false);
  const [checkAll, setcheckAll] = useState(false);
  const [send, setSend] = useState(false);
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [id, setId] = useState([]);
  const [totalCount, setTotal] = useState(5);
  const [limit, setLimit] = useState(10);
  const handlePress = () => setExpanded(!expanded);
  const refSubject = React.useRef();
  const refMessage = React.useRef();
  const sub_role_list = useSelector(state => state.ApiReducer.sub_role_list);
  MyConsole.log('sub_role_list page', sub_role_list);

  useEffect(() => {
    if (focused) {
      dispatch(
        getSubRole([
          Umoor
            ? 'UMOOR'
            : Department
              ? 'DEPARTMENT'
              : Aamil
                ? 'JAMAAT'
                : Jamiat
                  ? 'JAMIAT'
                  : UmoorC
                    ? 'UMOOR'
                    : '',
        ]),
      );
    }
  }, [headerTitle, Umoor, Department, Aamil, Jamiat, UmoorC, focused]);
  useEffect(() => {
    setLimit(10);
    setData(sub_role_list.slice(0, 10));
  }, [sub_role_list]);
  useEffect(() => {
    if (focused) {
      refMessage.current.clear();
      refSubject.current.clear();
      setMessage('');
      setSubject('');
      setUmoorC(false);
      setDepartment(false);
      setAamil(false);
      setJamiat(false);
      setUmoor(false);
      setcheckAll(false);
      setSend(false);
      setId([]);
    }
  }, [focused]);
  const showMore = () => {
    setLimit(limit + 10);
    setData(sub_role_list.slice(0, limit + 10));
  };
  const searchItems = text => {
    if (text === '') {
      setLimit(10);
      setData(sub_role_list.slice(0, 10));
      selectAllId(checkAll);
      return;
    }
    let newData = sub_role_list.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();
      if (text.length > 0) {
        return itemData.indexOf(textData) > -1;
      }
    });
    setData(newData);
  };
  const onSubmit = async () => {
    MyConsole.log('send');
    const itsid = await MyAsyncStorage.getItem('itsid');
    if (Department || Umoor || Aamil || Jamiat || UmoorC) {
      MyConsole.log('check');

      if (subject.length <= 0) {
        showAlert({
          // title: title.itemTitle,
          message: 'Please enter Subject',
          // alertType: 'warning',
          onPress: () => {
            MyConsole.log('files deleted!');
          },
        });
        // alert('Please enter Subject');
      } else if (message.length <= 0) {
        showAlert({
          // title: title.itemTitle,
          message: 'Please enter Message',
          // alertType: 'warning',
          onPress: () => {
            MyConsole.log('files deleted!');
          },
        });
        // alert('Please enter Message');
      } else {
        setSend(true);
        let params = {
          itsId: itsid,
          subject: subject,
          message: message,
          roleName: Umoor
            ? 'UMOOR'
            : Department
              ? 'DEPARTMENT'
              : Aamil
                ? 'JAMAAT'
                : Jamiat
                  ? 'JAMIAT'
                  : UmoorC
                    ? 'UMOOR'
                    : 'UMOOR',
          roleId: Umoor
            ? 5
            : Department
              ? 4
              : Aamil
                ? 3
                : Jamiat
                  ? 2
                  : UmoorC
                    ? 6
                    : 5,
          roleEntityId: id.length > 0 ? id : sub_role_list.map(a => a.id),
        };
        dispatch(sendMessage(params, '', navigation));
      }
    } else {
      showAlert({
        // title: title.itemTitle,
        message: 'Please select any role',
        // alertType: 'warning',
        onPress: () => {
          MyConsole.log('files deleted!');
        },
      });
      // Alert.alert('Please select any role');
    }
  };
  const selectAllId = status => {
    if (status) {
      let result = sub_role_list.map(a => a.id);
      MyConsole.log('id list ', result);
      setId(result);
    } else {
      setId([]);
    }
  };
  return (
    <SafeAreaView style={style.safeView}>
      <View style={style.bGView}>
        <Image source={backg} style={{ width: appScreen.width }} />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack(null);
        }}
      >
        <Icon
          name="arrow-back-outline"
          size={29}
          color={Color.bottomTab}
          style={style.iconStyyle}
        />
      </TouchableOpacity>
      <Header heading="SEND MESSAGE" />
      <KeyboardAwareScrollView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={style.umoorHeadMainView}>
          <View style={style.umoorHeadView}>
            <View style={style.ummorCheckBoxView}>
              <CheckBox
                checked={Umoor}
                checkedColor={Color.headtextColor}
                containerStyle={{
                  padding: 0,
                  margin: 0,
                }}
                onPress={() => {
                  (setUmoor(!Umoor),
                    setDepartment(false),
                    setAamil(false),
                    setJamiat(false),
                    setUmoorC(false));
                  setcheckAll(false);
                  setId([]);
                }}
              />
              <Text>UMOOR HEAD</Text>
            </View>

            {Umoor && (
              <View style={style.messageView}>
                {id.length <= 0 ? (
                  <Text style={style.messageTxt}>{string.UmoorHMessage}</Text>
                ) : null}

                <View style={style.chckBoxView}>
                  <CheckBox
                    checked={checkAll}
                    checkedColor={Color.headtextColor}
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                    }}
                    onPress={() => {
                      setcheckAll(!checkAll);
                      selectAllId(!checkAll);
                    }}
                  />
                  <Text>Select All</Text>
                  <View style={style.inputView}>
                    <Input
                      style={style.inputStyle}
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                      }}
                      placeholder="Search..."
                      onChangeText={value => searchItems(value)}
                    />
                  </View>
                </View>

                <View style={style.listView}>
                  <FlatList
                    data={data}
                    numColumns={2}
                    columnWrapperStyle={{
                      marginTop: '4%',
                      flex: 1,
                    }}
                    horizontal={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={style.listchckBoxView}>
                        <CheckBox
                          checked={id.includes(item.id)}
                          checkedColor={Color.headtextColor}
                          containerStyle={{
                            padding: 0,
                            margin: 0,
                          }}
                          onPress={() => {
                            const newIds = [...id];
                            const index = newIds.indexOf(item.id);
                            if (index > -1) {
                              newIds.splice(index, 1);
                              setcheckAll(false);
                            } else {
                              newIds.push(item.id);
                              if (newIds.length === sub_role_list.length) {
                                setcheckAll(true);
                              }
                            }
                            setId(newIds);

                            MyConsole.log('id', item.id);
                          }}
                        />
                        <Text style={style.item_name_txt}>{item.name}</Text>
                      </View>
                    )}
                  />
                </View>
                {data.length < sub_role_list.length ? (
                  <View>
                    <TouchableOpacity
                      onPress={showMore}
                      style={style.show_more_touch}
                    >
                      <View style={style.show_more_view}>
                        <Text style={style.show_more_txt}>Show More</Text>
                        <AntDesign
                          name="arrowdown"
                          size={16}
                          color={COLOR.headtextColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
          </View>

          <View style={style.chech_outside_view}>
            <View style={style.check_view}>
              <CheckBox
                checked={Department}
                checkedColor={Color.headtextColor}
                containerStyle={{
                  padding: 0,
                  margin: 0,
                }}
                onPress={() => {
                  (setDepartment(!Department),
                    setUmoor(false),
                    setAamil(false),
                    setJamiat(false),
                    setUmoorC(false));
                  setcheckAll(false);
                  setId([]);
                }}
              />
              <Text>DEPARTMENT HEAD</Text>
            </View>

            {Department && (
              <View style={style.messageView}>
                {id.length <= 0 ? (
                  <Text style={style.messageTxt}>
                    {string.DepartmentHMessage}
                  </Text>
                ) : null}
                <View style={style.chckBoxView}>
                  <CheckBox
                    checked={checkAll}
                    checkedColor={Color.headtextColor}
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                    }}
                    onPress={() => {
                      setcheckAll(!checkAll);
                      selectAllId(!checkAll);
                    }}
                  />
                  <Text>Select All</Text>
                  <View style={style.inputView}>
                    <Input
                      style={style.inputStyle}
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                      }}
                      placeholder="Search..."
                      onChangeText={value => searchItems(value)}
                    />
                  </View>
                </View>

                <View style={style.listView}>
                  <FlatList
                    data={data}
                    numColumns={2}
                    columnWrapperStyle={{
                      marginTop: '4%',
                      flex: 1,
                    }}
                    horizontal={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={style.listchckBoxView}>
                        <CheckBox
                          checked={id.includes(item.id)}
                          checkedColor={Color.headtextColor}
                          containerStyle={{
                            padding: 0,
                            margin: 0,
                          }}
                          onPress={() => {
                            const newIds = [...id];
                            const index = newIds.indexOf(item.id);
                            if (index > -1) {
                              newIds.splice(index, 1);
                              setcheckAll(false);
                            } else {
                              newIds.push(item.id);
                              if (newIds.length === sub_role_list.length) {
                                setcheckAll(true);
                              }
                            }
                            setId(newIds);

                            MyConsole.log('id', item.id);
                          }}
                        />
                        <Text style={style.item_name_txt}>{item.name}</Text>
                      </View>
                    )}
                  />
                </View>
                {data.length < sub_role_list.length ? (
                  <View>
                    <TouchableOpacity
                      onPress={showMore}
                      style={style.show_more_touch}
                    >
                      <View style={style.show_more_view}>
                        <Text style={style.show_more_txt}>Show More</Text>
                        <AntDesign
                          name="arrowdown"
                          size={16}
                          color={COLOR.headtextColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
          </View>

          <View style={style.chech_outside_view}>
            <View style={style.check_view}>
              <CheckBox
                checked={Aamil}
                checkedColor={Color.headtextColor}
                containerStyle={{
                  padding: 0,
                  margin: 0,
                }}
                onPress={() => {
                  (setAamil(!Aamil),
                    setDepartment(false),
                    setUmoor(false),
                    setJamiat(false),
                    setUmoorC(false));
                  setcheckAll(false);
                  setId([]);
                }}
              />
              <Text>AAMIL SAHEB</Text>
            </View>

            {Aamil && (
              <View style={style.messageView}>
                {id.length <= 0 ? (
                  <Text style={style.messageTxt}>{string.AamilSMessage}</Text>
                ) : null}
                <View style={style.chckBoxView}>
                  <CheckBox
                    checked={checkAll}
                    checkedColor={Color.headtextColor}
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                    }}
                    onPress={() => {
                      setcheckAll(!checkAll);
                      selectAllId(!checkAll);
                    }}
                  />
                  <Text>Select All</Text>
                  <View style={style.inputView}>
                    <Input
                      style={style.inputStyle}
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                      }}
                      placeholder="Search..."
                      onChangeText={value => searchItems(value)}
                    />
                  </View>
                </View>

                <View style={style.listView}>
                  <FlatList
                    data={data}
                    numColumns={2}
                    columnWrapperStyle={{
                      marginTop: '4%',
                      flex: 1,
                    }}
                    horizontal={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={style.listchckBoxView}>
                        <CheckBox
                          checked={id.includes(item.id)}
                          checkedColor={Color.headtextColor}
                          containerStyle={{
                            padding: 0,
                            margin: 0,
                          }}
                          onPress={() => {
                            const newIds = [...id];
                            const index = newIds.indexOf(item.id);
                            if (index > -1) {
                              newIds.splice(index, 1);
                              setcheckAll(false);
                            } else {
                              newIds.push(item.id);
                              if (newIds.length === sub_role_list.length) {
                                setcheckAll(true);
                              }
                            }
                            setId(newIds);

                            MyConsole.log('id', item.id);
                          }}
                        />
                        <Text style={style.item_name_txt}>{item.name}</Text>
                      </View>
                    )}
                  />
                </View>
                {data.length < sub_role_list.length ? (
                  <View>
                    <TouchableOpacity
                      onPress={showMore}
                      style={style.show_more_touch}
                    >
                      <View style={style.show_more_view}>
                        <Text style={style.show_more_txt}>Show More</Text>
                        <AntDesign
                          name="arrowdown"
                          size={16}
                          color={COLOR.headtextColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
          </View>

          <View style={style.chech_outside_view}>
            <View style={style.check_view}>
              <CheckBox
                checked={Jamiat}
                checkedColor={Color.headtextColor}
                containerStyle={{
                  padding: 0,
                  margin: 0,
                }}
                onPress={() => {
                  (setJamiat(!Jamiat),
                    setDepartment(false),
                    setAamil(false),
                    setUmoor(false),
                    setUmoorC(false));
                  setcheckAll(false);
                  setId([]);
                }}
              />
              <Text>JAMIAT MASOOL</Text>
            </View>

            {Jamiat && (
              <View style={style.messageView}>
                {id.length <= 0 ? (
                  <Text style={style.messageTxt}>{string.JamiatMMessage}</Text>
                ) : null}
                <View style={style.chckBoxView}>
                  <CheckBox
                    checked={checkAll}
                    checkedColor={Color.headtextColor}
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                    }}
                    onPress={() => {
                      setcheckAll(!checkAll);
                      selectAllId(!checkAll);
                    }}
                  />
                  <Text>Select All</Text>
                  <View style={style.inputView}>
                    <Input
                      style={style.inputStyle}
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                      }}
                      placeholder="Search..."
                      onChangeText={value => searchItems(value)}
                    />
                  </View>
                </View>

                <View style={style.listView}>
                  <FlatList
                    data={data}
                    numColumns={2}
                    columnWrapperStyle={{
                      marginTop: '4%',
                      flex: 1,
                    }}
                    horizontal={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={style.listchckBoxView}>
                        <CheckBox
                          checked={id.includes(item.id)}
                          checkedColor={Color.headtextColor}
                          containerStyle={{
                            padding: 0,
                            margin: 0,
                          }}
                          onPress={() => {
                            const newIds = [...id];
                            const index = newIds.indexOf(item.id);
                            if (index > -1) {
                              newIds.splice(index, 1);
                              setcheckAll(false);
                            } else {
                              newIds.push(item.id);
                              if (newIds.length === sub_role_list.length) {
                                setcheckAll(true);
                              }
                            }
                            setId(newIds);

                            MyConsole.log('id', item.id);
                          }}
                        />
                        <Text style={style.item_name_txt}>{item.name}</Text>
                      </View>
                    )}
                  />
                </View>
                {data.length < sub_role_list.length ? (
                  <View>
                    <TouchableOpacity
                      onPress={showMore}
                      style={style.show_more_touch}
                    >
                      <View style={style.show_more_view}>
                        <Text style={style.show_more_txt}>Show More</Text>
                        <AntDesign
                          name="arrowdown"
                          size={16}
                          color={COLOR.headtextColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
          </View>

          <View style={style.chech_outside_view}>
            <View style={style.check_view}>
              <CheckBox
                checked={UmoorC}
                checkedColor={Color.headtextColor}
                containerStyle={{
                  padding: 0,
                  margin: 0,
                }}
                onPress={() => {
                  (setUmoorC(!UmoorC),
                    setDepartment(false),
                    setAamil(false),
                    setJamiat(false),
                    setUmoor(false));
                  setcheckAll(false);
                  setId([]);
                }}
              />
              <Text>UMOOR COORDINATOR</Text>
            </View>

            {UmoorC && (
              <View style={style.messageView}>
                {id.length <= 0 ? (
                  <Text style={style.messageTxt}>{string.UmoorC}</Text>
                ) : null}
                <View style={style.chckBoxView}>
                  <CheckBox
                    checked={checkAll}
                    checkedColor={Color.headtextColor}
                    containerStyle={{
                      padding: 0,
                      margin: 0,
                    }}
                    onPress={() => {
                      setcheckAll(!checkAll);
                      selectAllId(!checkAll);
                    }}
                  />
                  <Text>Select All</Text>
                  <View style={style.inputView}>
                    <Input
                      style={style.inputStyle}
                      inputContainerStyle={{
                        borderBottomWidth: 0,
                      }}
                      placeholder="Search..."
                      onChangeText={value => searchItems(value)}
                    />
                  </View>
                </View>

                <View style={style.listView}>
                  <FlatList
                    data={data}
                    numColumns={2}
                    columnWrapperStyle={{
                      marginTop: '4%',
                      flex: 1,
                    }}
                    horizontal={false}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                      <View style={style.listchckBoxView}>
                        <CheckBox
                          checked={id.includes(item.id)}
                          checkedColor={Color.headtextColor}
                          containerStyle={{
                            padding: 0,
                            margin: 0,
                          }}
                          onPress={() => {
                            const newIds = [...id];
                            const index = newIds.indexOf(item.id);
                            if (index > -1) {
                              newIds.splice(index, 1);
                              setcheckAll(false);
                            } else {
                              newIds.push(item.id);
                              if (newIds.length === sub_role_list.length) {
                                setcheckAll(true);
                              }
                            }
                            setId(newIds);

                            MyConsole.log('id', item.id);
                          }}
                        />
                        <Text style={style.item_name_txt}>{item.name}</Text>
                      </View>
                    )}
                  />
                </View>
                {data.length < sub_role_list.length ? (
                  <View>
                    <TouchableOpacity
                      onPress={showMore}
                      style={style.show_more_touch}
                    >
                      <View style={style.show_more_view}>
                        <Text style={style.show_more_txt}>Show More</Text>
                        <AntDesign
                          name="arrowdown"
                          size={16}
                          color={COLOR.headtextColor}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : null}
              </View>
            )}
          </View>

          <View style={style.sub_input_view}>
            <Input
              placeholderTextColor="#000"
              style={style.input_sub_style}
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              ref={refSubject}
              onChangeText={value => setSubject(value)}
              placeholder="Subject *"
            />

            <Input
              inputContainerStyle={{
                borderBottomWidth: 0,
              }}
              multiline={true}
              numberOfLines={7}
              style={style.input_msg_style}
              placeholder="Message *"
              ref={refMessage}
              onChangeText={value => setMessage(value)}
              placeholderTextColor="#000"
            />
          </View>

          <View style={style.liner_gredient_view}>
            <LinearGradient
              colors={['#F9EAB0', '#F9EAB0']}
              style={style.liner_gredient_style}
            >
              <TouchableOpacity
                onPress={() => {
                  MyConsole.log('cancle');
                  navigation.goBack(null);
                }}
              >
                <Text style={style.send_cancel_txt}>CANCEL</Text>
              </TouchableOpacity>
            </LinearGradient>

            <LinearGradient
              colors={send ? ['#F9EAB0', '#F9EAB0'] : ['#FFFBEE', '#E5B43B']}
              style={style.liner_gredient_style}
            >
              <TouchableOpacity
                onPress={() => {
                  if (!send) {
                    onSubmit();
                  }
                }}
              >
                <Text style={style.send_cancel_txt}>SEND</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <Loader />
    </SafeAreaView>
  );
};
export default SendMessage;

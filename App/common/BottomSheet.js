import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRef, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { TextInput } from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';
import { Color } from '../constants';
import muminDashboard from '../services/muminDashboard';
import { formatRoleName } from '../utils/CommonFunction';
import { MyAsyncStorage } from '../utils/MyAsyncStorage';
import { MyConsole } from '../utils/MyConsole';
import { dpWidth } from '../utils/SizeInDp';
import { showAlert } from './CustomAlert';

const BottomSheet = ({ reff, role, niyatid, name, showError }) => {
  var refRBSheet = useRef();
  refRBSheet = reff;
  const [message, setMessage] = useState('');
  const [subject, setsubject] = useState('');
  const sendmessage = async () => {
    MyConsole.log('sending....');
    const token = await MyAsyncStorage.getItem('userToken');
    const itsid = await MyAsyncStorage.getItem('itsid');
    MyConsole.log('token', token);
    try {
      const values = {
        messageText: message,
        roleName: role,
        subject: subject,
        itsId: itsid,
      };
      MyConsole.log('values', values);
      MyConsole.log('niyatid', niyatid);
      const { data } = await muminDashboard.sendMessage(values, token, niyatid);
      showAlert({
        header: '',
        title: data.message,
      });
      refRBSheet.current.close();
      cancel();
      MyConsole.log('data1', data);
    } catch ({ response }) {
      refRBSheet.current.close();
      cancel();
      MyConsole.log('errorNoti', response.data);
      showAlert({
        header: '',
        title: response.data.errorMessage,
      });
    }
  };
  const sendmessagetoMumin = async () => {
    MyConsole.log('sending....');
    const token = await AsyncStorage.getItem('userToken');
    const itsid = await AsyncStorage.getItem('itsid');
    MyConsole.log('token', token);
    try {
      const values = {
        messageText: message,
        roleName: role,
        subject: subject,
        itsId: itsid,
      };
      const { data } = await muminDashboard.sendMessageMummin(
        values,
        token,
        niyatid,
      );
      refRBSheet.current.close();
      setTimeout(() => showError(data.message), 500);
    } catch ({ response }) {
      MyConsole.log('errorNoti', response);
    }
  };
  const handleClick = async () => {
    if (subject == '') {
      if (Platform.OS === 'ios') {
        refRBSheet.current.close();
      }
      setTimeout(() => showError('Please enter subject'), 500);
    } else if (message == '') {
      MyConsole.log('before showAlert ');
      if (Platform.OS === 'ios') {
        refRBSheet.current.close();
      }
      setTimeout(() => showError('Please enter message'), 500);
    } else {
      const ismumin = await MyAsyncStorage.getItem('isMumin');
      if (ismumin === 'true') {
        sendmessage();
      } else {
        sendmessagetoMumin();
      }
    }
  };

  const cancel = () => {
    refRBSheet.current.close();
    setMessage('');
    setsubject('');
  };

  return (
    <View
      style={{
        backgroundColor: '#000',
      }}
    >
      <RBSheet
        ref={reff}
        closeOnDragDown={true}
        closeOnPressMask={true}
        onClose={() => {
          setMessage('');
          setsubject('');
        }}
        height={300}
        shouldMeasureContentHeight={true}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },

          draggableIcon: {
            backgroundColor: '#000',
          },
        }}
      >
        <View style={styles.card_view}>
          <LinearGradient
            colors={Color.gradientColor2}
            start={{ x: 0.2, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={styles.linear_card}
          >
            <View style={styles.card}>
              {/* <Card style={styles.card}>
              <Card.Content style={{}}> */}
              <View style={styles.close_view}>
                <Text style={styles.close_txt}>
                  {formatRoleName(name)} <Icon name="close" />
                </Text>
              </View>
              <View style={styles.subject_view} />
              <TextInput
                value={subject}
                label="Enter Subject"
                onChangeText={text => setsubject(text)}
                height={30}
                style={styles.subject_txt}
                theme={{
                  colors: {
                    primary: 'grey',
                    text: 'black',
                    placeholder: 'grey',
                  },
                }}
              />
              <TextInput
                value={message}
                onChangeText={text => setMessage(text)}
                label="Enter Message"
                style={styles.subject_txt}
                theme={{
                  colors: {
                    primary: 'grey',
                    text: '#000000',
                    placeholder: 'grey',
                  },
                }}
              />
              <View style={styles.cancel_view}>
                <View style={{ width: '30%' }} />
                <LinearGradient
                  style={styles.cancel_linear_card}
                  colors={['#9af7f7', '#9af7f7']}
                >
                  <Text
                    onPress={() => {
                      refRBSheet.current.close();
                    }}
                    style={{ alignItems: 'center' }}
                  >
                    {' '}
                    Cancel{' '}
                  </Text>
                </LinearGradient>
                <LinearGradient
                  style={styles.cancel_linear_card}
                  colors={Color.gradientColor}
                >
                  <Text
                    onPress={() => {
                      handleClick();
                    }}
                    style={{ alignItems: 'center' }}
                  >
                    {' '}
                    Send{' '}
                  </Text>
                </LinearGradient>
              </View>
              {/* </Card.Content>
            </Card> */}
            </View>
          </LinearGradient>
        </View>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  card_view: {
    flex: 1,
    marginHorizontal: 15,
    margin: 5,
    justifyContent: 'center',
  },
  linear_card: {
    borderRadius: 5,
    marginHorizontal: '1%',
    marginBottom: '3%',
    padding: 2,
    marginVertical: 1,
    // borderBottomWidth: 1,
  },
  card: {
    backgroundColor: Color.white,
    borderRadius: 5,
    paddingVertical: dpWidth(13),
    paddingHorizontal: dpWidth(13),
  },
  close_view: {
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 0,
  },
  close_txt: {
    backgroundColor: Color.lightBlue,
    padding: 8,
    borderRadius: 10,
  },
  subject_view: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  subject_txt: {
    paddingHorizontal: 0,
    backgroundColor: Color.white,
  },
  cancel_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
    flex: 0,
  },
  cancel_linear_card: {
    width: '30%',
    alignItems: 'center',
    borderRadius: 6,
    padding: 10,
  },
});

export default BottomSheet;

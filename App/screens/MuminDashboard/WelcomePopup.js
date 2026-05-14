/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { Card, Title } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import authService from '../../services/authServices';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
const WelcomePopup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [difference, setDifference] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getData = async () => {
    try {
      const value = await MyAsyncStorage.getItem('itsid');
      const token = await MyAsyncStorage.getItem('userToken');
      if (value !== null) {
        handleClick(value, token);
      }
    } catch (e) {
      // error reading value
    }
  };
  const handleClick = async (value, token) => {
    try {
      const { data } = await authService.getlogindetail(value, token);
      setDate(data.data.lastLogin);
      var cdate = moment();
      var diff = moment(date).diff({ cdate }, 'day');
      setDifference(diff);
      if (difference > 0) {
        setModalVisible(true);
      } else {
        setModalVisible(false);
      }
    } catch ({ response }) {
      MyConsole.log('error11', response);
    }
  };
  useEffect(() => {
    getData();
  }, [getData]);
  return (
    <Card>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable onPress={() => setModalVisible(!modalVisible)}>
              <Icon
                name="close"
                size={28}
                color="#fff"
                style={styles.textStyle}
              />
            </Pressable>
            <Title style={styles.Txt}>WELCOME BACK</Title>
            <View style={styles.txtView}>
              <Text style={styles.Txt}>WE ARE EXCITED TO SEE</Text>
              <Text style={styles.Txt}>YOU AGIAN AFTER {difference} DAYS</Text>
            </View>
            <Text>LOST LOGIN</Text>
            <Text>DATE: {moment(date).format('DD-MMM-YYYY')} </Text>
            <Text>TIME: {moment(date).format('HH:MM A')}</Text>
          </View>
        </View>
      </Modal>
    </Card>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
  },
  modalView: {
    marginHorizontal: 35,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    position: 'absolute',
    bottom: -15,
    left: 130,
  },
  Txt: { color: 'black', fontWeight: '600' },

  txtView: {
    marginTop: 4,
    marginBottom: { color: 'black', fontWeight: '600' },
  },
});
export default WelcomePopup;

/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-sequences */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Card } from 'react-native-paper';
import { Color, font } from '../../constants';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';
import style from './style';

const RewardListItem = ({ item, props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();
  const [headerTitle, setheaderTitle] = useState(true);
  const fileUrl = item.scannedNiyatUrl;
  useEffect(() => {
    APICallling();
  }, []);

  const APICallling = async () => {
    try {
      const ismumin = await MyAsyncStorage.getItem('isMumin');
      if (ismumin === 'true') {
        setheaderTitle(true);
      } else {
        setheaderTitle(false);
      }
    } catch ({ response }) {
      MyConsole.log('error1', response);
    }
  };

  const checkIs = () => {
    setInterval(async () => {
      var che = await MyAsyncStorage.getItem('modelopen');
      if (che === 'openn1') {
        setModalVisible(true);
        MyAsyncStorage.removeItem('modelopen');
      }
    }, 1000);
  };

  return (
    <View style={style.RewardListContainer}>
      <LinearGradient
        colors={['#fff', '#cfcfbd']}
        start={{ x: 0.2, y: 1.0 }}
        end={{ x: 1.0, y: 1.0 }}
        style={style.itemBorder}
      >
        <Card style={style.card_style}>
          <Card.Content style={style.card_container_style}>
            <View style={style.itemView}>
              <View style={style.itemTitleView}>
                <Text style={style.TitleHeading}>ITS Number</Text>
                <Text style={style.TitleData}>{item.itsNumber}</Text>
              </View>

              <View style={style.itemTitleView}>
                <Text style={style.TitleHeadingR}>Name</Text>
                <Text style={style.TitleDataR}>{item.name}</Text>
              </View>
            </View>

            <View style={style.itemView}>
              <View style={style.itemTitleView}>
                <Text style={style.TitleHeading}>Niyat</Text>
                <Text style={style.TitleData}>{item.niyatQuestion}</Text>
              </View>

              <View style={style.itemTitleView}>
                <Text style={style.TitleHeadingR}>Trophy Rewarded</Text>
                <Text style={style.TitleDataR}>{item.trophyRewards}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      </LinearGradient>
    </View>
  );
};
export default RewardListItem;

const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20,
    paddingHorizontal: 10,
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
  buttonClose: {
    marginLeft: 290,
  },
  textStyle: {
    color: Color.titleColor,
    fontSize: font.fontSizes20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

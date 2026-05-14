/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RBSheet from 'react-native-raw-bottom-sheet';
import { useSelector } from 'react-redux';
import { Color, font } from '../constants';
import muminDashboard from '../services/muminDashboard';
import { MyAsyncStorage } from '../utils/MyAsyncStorage';
import { MyConsole } from '../utils/MyConsole';
import { dpWidth } from '../utils/SizeInDp';

const InfoSheet = ({ reff, role, niyatId }) => {
  //refRBSheet = ref;
  // const [number, setNumber] = useState('');
  // const [email, setEmail] = useState('');
  // const [name, setName] = useState('');
  const name = useSelector(state => state.CommonReducer.appr_name);
  const number = useSelector(state => state.CommonReducer.appr_mobile);
  const email = useSelector(state => state.CommonReducer.appr_email);

  useEffect(() => {
    //getApproverDetails();
  }, []);

  const getApproverDetails = async () => {
    if (role != null) {
      MyConsole.log('sending....' + niyatId);
      MyConsole.log('Role....' + role);
      const roleToLog = role ? role.replace('Saheb', '').trim() : role;
      MyConsole.log('Role....' + roleToLog);
      const token = await MyAsyncStorage.getItem('userToken');
      const itsid = await MyAsyncStorage.getItem('itsid');
      MyConsole.log('token', token);
      try {
        const values = {
          niyatId: niyatId,
          roleName: roleToLog,
        };

        MyConsole.log('sending2....' + niyatId);

        const { data } = await muminDashboard.approverdetail(values, token);
        // alert(data.message)
        //alert(data.message)
        setEmail(data.data.email);
        setNumber(data.data.mobileNumber);
        setName(data.data.name);
        //refRBSheet.current.close()
        MyConsole.log('data1', data);
      } catch ({ response }) {
        MyConsole.log('errorNotii1', response);
        // alert(response.data.errorMessage)
      }
    }
  };

  return (
    <View
      style={{
        backgroundColor: Color.black,
      }}
    >
      <RBSheet
        ref={reff}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={170}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },

          draggableIcon: {
            backgroundColor: Color.black,
          },
        }}
      >
        <View
          style={{
            marginHorizontal: 10,
            justifyContent: 'center',
            marginVertical: '1%',
            // backgroundColor: 'red',
          }}
        >
          <LinearGradient
            colors={Color.gradientColor2}
            start={{ x: 0.2, y: 1.0 }}
            end={{ x: 1.0, y: 1.0 }}
            style={{
              borderRadius: 5,
              marginBottom: '10%',
              padding: 2,
              marginVertical: 1,
            }}
          >
            <View
              style={{
                backgroundColor: Color.white,
                borderRadius: 5,
                paddingVertical: dpWidth(13),
                paddingHorizontal: dpWidth(13),
              }}
            >
              {/* <Card
              style={{
                backgroundColor: Color.white,
              }}>
              <Card.Content style={{width: '100%'}}> */}
              <View style={{ flexDirection: 'row', paddingVertical: '1%' }}>
                <Text
                  style={{
                    width: '30%',
                    fontSize: font.fontSizes,
                    fontWeight: 'bold',
                    color: Color.black,
                  }}
                >
                  Name
                </Text>

                <Text
                  style={{
                    width: '60%',

                    fontSize: font.fontSizes,
                    fontWeight: 'bold',
                    color: Color.black,
                  }}
                >
                  : {name}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', paddingVertical: '1%' }}>
                <Text
                  style={{
                    width: '30%',
                    fontSize: font.fontSizes,
                    fontWeight: 'bold',
                    color: Color.black,
                  }}
                >
                  Contact No.
                </Text>

                <Text
                  style={{
                    width: '60%',

                    fontSize: font.fontSizes,
                    fontWeight: 'bold',
                    color: Color.black,
                  }}
                >
                  : {number}
                </Text>
              </View>

              <View style={{ flexDirection: 'row', paddingVertical: '1%' }}>
                <Text
                  style={{
                    width: '30%',
                    fontSize: font.fontSizes,
                    fontWeight: 'bold',
                    color: Color.black,
                  }}
                >
                  Email
                </Text>

                <Text
                  style={{
                    width: '60%',

                    fontSize: font.fontSizes,
                    fontWeight: 'bold',
                    color: Color.black,
                  }}
                >
                  : {email}
                </Text>
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
export default InfoSheet;

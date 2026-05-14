import React from 'react';
import {View, TextInput} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

const UselessTextInput = props => {
  return (
    <TextInput
      {...props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
      editable
      maxLength={500}
      placeholder="Enter Remarks *"
      placeholderTextColor={'#ff4c4c'}
      style={{
        height: '95%',
        padding: '3%',
      }}
    />
  );
};

const UselessTextInputMultiline = ({onChange: origOnChange}) => {
  const [value, onChangeText] = React.useState('');

  return (
    <View
      style={{
        borderColor: 'brown',
        borderWidth: 1,
        marginTop: '2%',
        borderRadius: 6,
        backgroundColor: 'white',
      }}>
      <UselessTextInput
        multiline
        numberOfLines={4}
        onChangeText={text => {
          onChangeText(text);
          origOnChange(text);
        }}
        value={value}
        style={{
          padding: 10,
          color: 'black',
          alignSelf: 'flex-start',
        }}
      />
    </View>
  );
};

export default UselessTextInputMultiline;

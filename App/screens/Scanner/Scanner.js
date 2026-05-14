import {
   BarcodeFormat,
   scanBarcodes,
} from '@react-native-ml-kit/barcode-scanning';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
   Alert,
   AppState,
   Linking,
   Platform,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import ImageCropPicker from 'react-native-image-crop-picker';
import { PERMISSIONS, RESULTS, check } from 'react-native-permissions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
   Camera,
   useCameraDevice,
   useCodeScanner,
} from 'react-native-vision-camera';
import { showAlert } from '../../common/CustomAlert';
import { Color, font, string } from '../../constants';
import STRING from '../../constants/string';
import { MyConsole } from '../../utils/MyConsole';
import { appScreen } from '../../utils/responsive/SizeUtil';
import { dpWidth } from '../../utils/SizeInDp';

const Scanner = () => {
  const [flash, setFlash] = useState(false);
  const [hasPermission, setHasPermission] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();
  const focused = useIsFocused();

  const device = useCameraDevice('back');

  // Check camera permission
  const checkCameraPermission = async () => {
    try {
      const cameraPermission = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
      });

      const result = await check(cameraPermission);
      MyConsole.log('Camera Permission result:', result);
      if (result === RESULTS.GRANTED) {
        setHasPermission(true);
      }
    } catch (error) {
      console.error('Error requesting camera permission:', error);
    }
  };

  // App state listener to recheck permission
  const appOpenState = () => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        checkCameraPermission();
      }
    });
    return () => subscription.remove();
  };

  useEffect(() => {
    checkCameraPermission();
    if (Platform.OS === 'android') {
      appOpenState();
    }
  }, []);

  // Open app settings
  const openSetting = () => {
    try {
      Linking.openSettings();
    } catch (error) {
      Alert.alert('Unable to open settings');
    }
  };

  // Alert for permission
  const permissionDialog = (title, desc) => {
    Alert.alert(title, desc, [
      { text: 'Cancel' },
      { text: 'Go to Settings', onPress: openSetting },
    ]);
  };

  // Handle successful QR/Barcode scan
  const onSuccess = useCallback(
    code => {
      if (code) {
        const valid = /^(ftp|http|https):\/\/[^ "]+$/.test(code);
        MyConsole.log('Scanned code:', code);
        if (valid) {
          Linking.openURL(code);
          navigation.goBack();
        } else {
          showAlert({ header: '', title: 'Invalid QR code.' });
        }
      } else {
        showAlert({ header: '', title: 'Invalid QR code.' });
      }
    },
    [navigation],
  );

  // Vision Camera code scanner (built-in)
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'code-128'],
    onCodeScanned: codes => {
      if (codes.length > 0) {
        const value = codes[0]?.value;
        if (value) onSuccess(value);
      }
    },
  });

  // Pick image and scan using ML Kit
  const openPhoto = async () => {
    try {
      const response = await ImageCropPicker.openPicker({
        cropping: false,
        includeBase64: false,
      });

      const path = response.path;
      const barcodes = await scanBarcodes(path, [BarcodeFormat.ALL_FORMATS]);
      if (barcodes.length > 0) {
        onSuccess(barcodes[0].rawValue);
      } else {
        Alert.alert('Invalid QR code inside image.');
      }
    } catch (err) {
      MyConsole.log('Gallery error: ', err);
      if (err.toString().includes('permission')) {
        permissionDialog(
          string.galleryHeadingPermission,
          string.galleryDescPermission,
        );
      }
    }
  };

  // Render fallback if not authorized or device not ready
  if (!hasPermission) {
    return (
      <View style={styles.permissionView}>
        <TouchableOpacity
          onPress={openSetting}
          style={styles.authorizationContainer}
        >
          <Text style={styles.notAuthorizedText}>
            {STRING.cameraPermission}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!device) {
    return <View style={{ flex: 1, backgroundColor: 'black' }} />;
  }

  // Render main camera view
  return (
    <View style={styles.container}>
      <Camera
        key={refresh ? 'refreshed' : 'not-refreshed'}
        style={styles.qrCodeScanner}
        device={device}
        isActive={focused}
        codeScanner={codeScanner}
        torch={flash ? 'on' : 'off'}
      />

      <View style={styles.bottom_vw_style}>
        <View style={styles.flash_vw_style}>
          <TouchableOpacity onPress={() => setFlash(!flash)}>
            <MaterialIcons
              color={'white'}
              size={dpWidth(25)}
              name={flash ? 'flash-on' : 'flash-off'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={openPhoto}>
            <MaterialIcons
              color={'white'}
              size={dpWidth(25)}
              name={'photo-size-select-actual'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: Color.bgColor,
  },
  qrCodeScanner: {
    width: appScreen.width,
    height: '100%',
  },
  bottom_vw_style: {
    position: 'absolute',
    width: '100%',
    alignItems: 'center',
    bottom: '10%',
    backgroundColor: 'transparent',
  },
  flash_vw_style: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '50%',
  },
  permissionView: {
    justifyContent: 'center',
    height: '100%',
  },
  notAuthorizedText: {
    fontSize: font.fontSizes17,
    paddingVertical: '3%',
    color: Color.titleColor,
    alignContent: 'center',
    fontWeight: '500',
  },
  authorizationContainer: {
    backgroundColor: Color.bgColor,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: dpWidth(7),
    width: '80%',
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 15,
    marginBottom: 15,
    elevation: 6,
    borderWidth: 2,
    borderColor: Color.drawarActiveTextColor,
  },
});

export default Scanner;

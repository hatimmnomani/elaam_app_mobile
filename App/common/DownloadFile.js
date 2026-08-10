import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { PermissionsAndroid, Platform } from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';
import { string } from '../constants';
import { MyAsyncStorage } from '../utils/MyAsyncStorage';
import { MyConsole } from '../utils/MyConsole';
import { showAlert } from './CustomAlert';

class DownloadFile {
  static checkPermission = async fileUrl => {
    if (Platform.OS === 'ios') {
      saveImageIOS(fileUrl);
      // downloadFile(fileUrl);
    } else {
      requestStoragePermission(fileUrl);
    }
  };
}

export default DownloadFile;

const saveImageIOS = fileUrl => {
  RNFetchBlob.config({
    fileCache: true,
    appendExt: 'png',
  })
    .fetch('GET', fileUrl, {
      //some headers ..
    })
    .then(res => {
      console.log('The file saved to ', res.data);
      CameraRoll.saveAsset(res.data, { type: 'photo' })
        .then(function (result) {
          MyConsole.log('save succeeded ', result);
          showAlert({
            header: '',
            title: string.DownloadMsg,
          });
          MyAsyncStorage.setItem('modelopen', 'openn1');
        })
        .catch(function (error) {
          MyConsole.log('save failed ' + error);
        });
      // the temp file path
      console.log('The file saved to ', res);
    });
};

export const downloadFile = (fileUrl, props) => {
  MyConsole.log('runnniiigggg');
  // Get today's date to add the time suffix in filename
  let date = new Date();
  // File URL which we want to download
  let FILE_URL = fileUrl;
  // Function to get extention of the file url
  let file_ext = getFileExtention(FILE_URL);
  file_ext = '.' + file_ext[0];

  const aPath = Platform.select({ ios: FILE_URL, android: FILE_URL });
  const fPath =
    aPath + '/' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.';
  // config: To get response by passing the downloading related options
  // fs: Root directory path to download
  const { config, fs } = RNFetchBlob;
  let RootDir = fs.dirs.DownloadDir;
  let optionsIOS = {
    fileCache: true,
    path: fPath,
    mime: 'application/xlsx',
    notification: true,
  };
  let options = {
    fileCache: true,
    addAndroidDownloads: {
      path: RootDir + '/Aelaam-Doc' + '.png',
      description: 'downloading file...',
      notification: true,
      // useDownloadManager works with Android only
      useDownloadManager: true,
    },
  };
  if (Platform.OS === 'ios') {
    config(optionsIOS)
      .fetch('GET', FILE_URL)
      .then(resee => {
        CameraRoll.saveAsset(resee.data, { type: 'photo' })
          .then(function (result) {
            MyConsole.log('save succeeded ' + result);
          })
          .catch(function (error) {
            MyConsole.log('save failed ' + error);
          });
        MyConsole.log('RESPONSE IOS -> ', JSON.stringify(resee));
      });
    MyAsyncStorage.setItem('modelopen', 'openn1');
  } else {
    config(options)
      .fetch('GET', FILE_URL)
      .then(resA => {
        MyConsole.log('resA -> ', JSON.stringify(resA));
        MyConsole.log('FILE -> ', FILE_URL);
        showAlert({
          header: '',
          title: string.DownloadMsg,
        });
      });
    MyAsyncStorage.setItem('modelopen', 'openn1');
  }
};
export const getFileExtention = fileUrl => {
  return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
};

const requestStoragePermission = async fileUrl => {
  try {
    // Android 11 (API 30) and above require Scoped Storage, so we handle this differently
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      downloadFile(fileUrl);
    } else {
      // For Android versions below 11
      const writeGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission Required',
          message: 'Aelaam app needs access to your storage to download files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (writeGranted === PermissionsAndroid.RESULTS.GRANTED) {
        downloadFile(fileUrl);
      } else {
        showAlert({
          header: 'Permission Denied',
          title: 'Storage access is not granted.',
        });
      }
    }
  } catch (err) {
    console.warn(err);
  }
};

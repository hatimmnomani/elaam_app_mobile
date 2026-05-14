/* eslint-disable no-unused-vars */
import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import Config from 'react-native-config';
import { urls } from '../../constants/string';
import { loading } from '../../redux/LoaderAction';
import { store } from '../../redux/Store';
import { MyAsyncStorage } from '../../utils/MyAsyncStorage';
import { MyConsole } from '../../utils/MyConsole';

// Use a dedicated base URL for Quiz APIs. Ensure QUIZ_API_URL is defined in your env.
const axiosInstance = axios.create({
  baseURL:
    Config.QUIZ_API_URL || 'http://54.212.208.192:3001' || Config.API_URL,
  // adapter: fetchAdapter,
});

const { dispatch } = store;

axiosInstance.interceptors.request.use(
  async config => {
    dispatch(loading(true));
    const token = await MyAsyncStorage.getItem('userToken');
    if (token) {
      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    MyConsole.log('quizClient.request config', config);
    return config;
  },
  error => {
    MyConsole.log('quizClient.request error', error?.response || error);
    dispatch(loading(false));
    return Promise.reject(error);
  },
);

const refreshAuthLogic = async failedRequest => {
  const id_token = await MyAsyncStorage.getItem('IdToken');
  const refreshToken = await MyAsyncStorage.getItem('refreshToken');
  const itsid = await MyAsyncStorage.getItem('itsid');
  const data = {
    isMumin: false,
    itsId: itsid,
    refreshToken: refreshToken,
  };
  const options = {
    method: 'POST',
    data,
    // Refresh against main API base as before
    url: (Config.API_URL || '') + urls.USER_REFRESH_TOKEN,
  };

  try {
    const tokenRefreshResponse = await axios(options);
    failedRequest.response.config.headers.Authorization =
      'Bearer ' + tokenRefreshResponse.data.accessToken;
    await MyAsyncStorage.setItem('userToken', tokenRefreshResponse.data.token);
    await MyAsyncStorage.setItem(
      'refreshToken',
      tokenRefreshResponse.data.refreshToken,
    );
    MyConsole.log('quizClient token refreshed');
    return await Promise.resolve();
  } catch (e) {
    MyConsole.log('quizClient auth refresh error', e);
    MyAsyncStorage.removeItem('IdToken');
  }
};

createAuthRefreshInterceptor(axiosInstance, refreshAuthLogic, {});

let isLoggedIn = true;
axiosInstance.interceptors.response.use(
  async response => {
    MyConsole.log('quizClient.response response', response);
    dispatch(loading(false));
    return response;
  },
  error => {
    MyConsole.log('quizClient.response error', error?.response || error);
    dispatch(loading(false));
    return Promise.reject(error);
  },
);

const quizHttpClient = axiosInstance;
export default quizHttpClient;

import httpClient from '../utils/httpClients';

class Notification {
  static getNotification(id, token, status) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };

    return httpClient.get('/api/get-notification?itsId=' + id + status, config);
  }
  static getNotificationPagination(id, pageNo, pageSize) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };

    return httpClient.get(
      '/api/get-notificationWithPagination?itsId=' +
        id +
        '&pageNo=' +
        pageNo +
        '&pageSize=' +
        pageSize,
      config,
    );
  }

  static pushNotificationToken(token, values) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/pushToken', values, config);
  }
  static readNotification(id, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };

    return httpClient.post('/api/read-notification/' + id, config);
  }
  static getlogindetail(values, token) {
    let config = {
      headers: {
        accept: '*/*',
      },
    };

    return httpClient.get('/api/getMuminLoginDetails?itsId=' + values, config);
  }
}

export default Notification;

import httpClient from '../utils/httpClients';

class MuminDashboard {
  static getAllNiyatStatusin(itsid, token, dateee, startDate) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.get(
      '/api/getAllNiyatStatus?endDate=' +
        startDate +
        '&itsId=' +
        itsid +
        '&startDate=' +
        dateee,
      config,
    );
  }
  static getTotalAndRedeemedTrophies(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.get(
      '/api/getTotalAndRedeemedTrophies?itsId=' + values,
      config,
    );
  }
  static getNyitList(itsid, token, statusNum, startDate, endDate, pageNo, search = '') {
    const config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };

    let url = `/api/getAllNiyatList?endDate=${endDate}&itsId=${itsid}&startDate=${startDate}&pageNo=${pageNo}&status=${statusNum}`;
    
    if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

    return httpClient.get(url, config);
  }
  static getlogindetail(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };

    return httpClient.get('/api/getMuminLoginDetails?itsId=' + values, config);
  }
  static getNiyat(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };

    return httpClient.get('/api/getNiyat?niyatId=' + values, config);
  }
  static sendMessage(values, token, id) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return httpClient.post('/api/requestForUpdateNiyat/' + id, values, config);
  }
  static sendMessageMummin(values, token, id) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
        'Content-Type': 'application/json',
      },
    };

    return httpClient.post('/api/messageToMumin/' + id, values, config);
  }
  static completeNiyat(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };

    return httpClient.put('/api/completeNiyat', values, config);
  }
  static approvalNiyat(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };

    return httpClient.put('/api/approveNiyat', values, config);
  }
  static approverdetail(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };

    return httpClient.post('/api/getApproverDetails', values, config);
  }
  static getTotalNiyat(token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };

    return httpClient.get('/api/totalNiyat', config);
  }
}

export default MuminDashboard;

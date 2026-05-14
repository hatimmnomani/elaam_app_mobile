import httpClient from '../utils/httpClients';

class ApproveNiyat {
  static getNiyatInfoByIdin(id, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };

    return httpClient.get('/api/getNiyat?niyatId=758', config);
  }

  static getJamiatData(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.get('/api/getJamiatData', value, config);
  }
}

export default ApproveNiyat;

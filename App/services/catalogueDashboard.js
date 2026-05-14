import httpClient from '../utils/httpClients';

class catalogueDashboard {
  static gettrophies(id, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get('/api/getAllCatalogues', config);
  }

  static getAllActiveMuminCatalogues(id, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get('/api/getAllActiveMuminCatalogues/' + id, config);
  }
  // getAllActiveMuminCatalogues;
  static getNumTrophies(token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.get('/api/getTotalRedeemTrophies?itsId=12341234', config);
  }

  // static getAllActiveMuminCatalogues(id, token) {
  //   let config = {
  //     headers: {
  //       accept: '*/*',
  //       // Authorization: token,
  //     },
  //   };
  //   return httpClient.get('/api/getAllActiveMuminCatalogues', config);
  // }

  static reduceTrophies(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };

    return httpClient.post(
      '/api/redeemTrophies/{itsId}/{catalogueId}',
      values,
      config,
    );
  }

  static redeemBlueTrophies(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };

    return httpClient.post(
      '/api/redeemBlueTrophies/{itsId}/{catalogueId}',
      values,
      config,
    );
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
}

export default catalogueDashboard;

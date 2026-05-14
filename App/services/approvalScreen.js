/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import {MyConsole} from '../utils/MyConsole';
import httpClient from '../utils/httpClients';

class ApprovalScreen {
  static pendingApprovals(id, pendingPageNo, jamaatId, umoorId, search_its_id) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    // ?jId=10&pageSize=10&pgNo=0&uId=12
    return httpClient.get(
      '/api/pendingApprovals/' +
        id +
        '?pageSize=10&pgNo=' +
        pendingPageNo +
        '&jId=' +
        jamaatId +
        '&uId=' +
        umoorId +
        '&mItsId=' +
        search_its_id,
      config,
    );
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

  static getNiyatdata(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
        'Content-Type': 'application/json',
      },
    };
    MyConsole.log('valueee', value);
    // const data = {
    //   departmentId: 0,
    //   endDate: enddate,
    //   itsId: 0,
    //   jamaatId: 0,
    //   jamiatId: 0,
    //   niyatId: 0,
    //   niyatQuestId: 0,
    //   reportKey: '',
    //   search: '',
    //   startDate: startDate,
    //   status: 0,
    //   templateId: 0,
    //   umoorId: 0,
    // };
    return httpClient.post('/api/getNiyatData', value, config);
  }
  static getlogindetail(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get('/api/getMuminLoginDetails?itsId=' + values, config);
  }
  static getJamiatData(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.post('/api/getJamiatData', value, config);
  }
  static getJamaatData(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.post('/api/getJamaatData', value, config);
  }
  static getDepartmentData(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/getDepartmentData', value, config);
  }
  static getUmoorData(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.post('/api/getUmoorData', value, config);
  }

  static getAllActiveNiyatList(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.post('/api/getAllActiveNiyatList', value, config);
  }
  static getUmoorActiveNiyatList(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.post('/api/getUmoorActiveNiyatList', value, config);
  }
  static getDepartmentActiveNiyatList(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/getDepartmentActiveNiyatList', value, config);
  }
  static getJamaatActiveNiyatList(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/getJamaatActiveNiyatList', value, config);
  }
  static getJamiatActiveNiyatList(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/getJamiatActiveNiyatList', value, config);
  }
  static getNiyatStatus(value, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/getNiyatStatus', value, config);
  }

  static getAllJamaat(token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get('/api/getAllJamaat', config);
  }
  static getAllJamiat(token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get('/api/getAllJamiat', config);
  }
  static getFilterList(serviceUrl) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get(serviceUrl, config);
  }

  static getAllUmoor(token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get('/api/getAllUmoor', config);
  }
  static getNiyatDataList(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/getNiyatListData', values, config);
  }

  static getNiyatList(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/getNiyatList', values, config);
  }

  static subRole(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/sub-role', values, config);
  }

  static sendMessage(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/send-message', values, config);
  }

  static getDepartmentNiyatStatusData(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get(
      '/api/getDepartmentNiyatStatusData?startDate=' +
        values.startDate +
        '&endDate=' +
        values.endDate +
        '&departmentId=' +
        values.departmentId,
      config,
    );
  }

  static getViewRewardList(values) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get('/api/approveRewardList?itsId=' + values, config);
  }

  static getTotalAndRedeemedAndBalanceBlueTrophies(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        //Authorization: token,
      },
    };
    return httpClient.get(
      '/api/getTotalRedeemedAndBalancedBlueTrophies?itsId=' + values,
      config,
    );
  }

  static getAllActiveApproverCatalogues(id, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.get('/api/getAllActiveApproverCatalogues/' + id, config);
  }

  static getApprover(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/getApprover', values, config);
  }

  static giftReward(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.post('/api/giftReward', values, config);
  }

  static revertNiyat(values, token) {
    let config = {
      headers: {
        accept: '*/*',
        // Authorization: token,
      },
    };
    return httpClient.put('/api/revertNiyat', values, config);
  }
}

export default ApprovalScreen;

export const getAllUmoorlist = () => {
  let config = {
    headers: {
      accept: '*/*',
      // Authorization: token,
    },
  };
  return httpClient.get('/api/getAllUmoor', config);
};

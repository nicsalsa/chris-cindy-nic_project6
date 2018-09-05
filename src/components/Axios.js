import axios from 'axios';
import Qs from 'qs';

const apiKeyLCBO = 'MDpmMWMxNGM4YS1iMDdiLTExZTgtODgyYS03YjUxYzY1ZTJlY2Q6OG4xbGtNQ2RpcFBkWUp0UUJ4UFpPaFMxUE16emxSbklxdFd3';

export function getAlcohol(query) {
  console.log('about to call axios');
  return axios({
    method: 'GET',
    url: 'https://lcboapi.com/products',
    // url: 'https://proxy.hackeryou.com',
    //OR url: 'https://proxy.hackeryou.com',
    dataResponse: 'json',
    // paramsSerializer: function (params) {
    //   return Qs.stringify(params, { arrayFormat: 'brackets' })
    // },
    params: {
      q: query,
      per_page: 20,
    },
    headers: {
      Authorization: `Token token=${apiKeyLCBO}`
    }
  })
}


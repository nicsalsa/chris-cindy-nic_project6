import axios from 'axios';

const apiKeyLCBO = 'MDpmMWMxNGM4YS1iMDdiLTExZTgtODgyYS03YjUxYzY1ZTJlY2Q6OG4xbGtNQ2RpcFBkWUp0UUJ4UFpPaFMxUE16emxSbklxdFd3';

axios({
  method: 'GET',
  url: 'https://lcboapi.com/products',
  dataResponse: 'json',
  params: {
    access_key: apiKeyLCBO
  }
})
  .then(function (res) {
    console.log(res);
  });
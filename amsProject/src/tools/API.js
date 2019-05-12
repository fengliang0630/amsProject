
import AxiosTool from './AxiosTool.js';
import WebConfig from './WebConfig.js';

var API = {
   login: (params)=>  AxiosTool.post(WebConfig.url + WebConfig.api.login, params),
   queryMenuTree: (params)=>  AxiosTool.post(WebConfig.url + WebConfig.api.queryMenuTree, params)
};

export default API;
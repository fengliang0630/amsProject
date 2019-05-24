import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers } from './data/mockData.js';
import UserMockHandler from './userMockHandler.js';
import RolesMockHandler from './roleMockHandler.js';
import MenusMockHandler from './menuMockHandler.js';
import MapMockHandler from './MapMockHandler.js';

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    //登录
    mock.onPost('/ams/amsLogin').reply(config => {
      let {username, password} = JSON.parse(config.data);
      return new Promise((resolve, reject) => {
        let respData = {};
        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.userName === username && u.password === password) {
              respData = JSON.parse(JSON.stringify(u));
              return true;
            }
          });
          if (hasUser) {
            respData.header = {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: 86,
              rspReturnMsg: "【1130130350522105856】用户登录成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            };
            resolve([200, respData]);
          } else {
            respData.header = {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: 86,
              rspReturnMsg: "【1130130350522105856】用户登录失败",
              reqpageSize: 20,
              rspReturnCode: "000001"
            };
            resolve([200, respData]);
          }
        }, 1000);
      });
    });

    // 用户登出系统
    mock.onPost('/ams/amsLogout').reply(config => {
      return new Promise((resolve, reject) => {
        let respData = {};
        setTimeout(() => {
          respData.header = {
            reqpageIndex: 1,
            reqUserId: "xxw",
            rspPageCount: 86,
            rspReturnMsg: "【1131538952285716480】用户退出成功",
            reqpageSize: 20,
            rspReturnCode: "000000"
          };
          resolve([200, respData]);
        }, 1000);
      });
    });

    // 用户mock方法处理
    UserMockHandler.init(mock);

    // 角色mock方法处理
    RolesMockHandler.init(mock);

    // 菜单mock方法处理
    MenusMockHandler.init(mock);

    // 地图mock方法处理
    MapMockHandler.init(mock);
  }
};
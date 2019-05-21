import { Users } from './data/mockData.js';

let _Users = Users;

const UserMockHandler = {
    init(mock) {
        //获取用户列表（分页）
    mock.onPost('/ams/getUserByname').reply(config => {
        let {header, name} = JSON.parse(config.data);
        let {reqpageSize, reqpageIndex} = header;
        let mockUsers = _Users.filter(user => {
          if (name && user.name.indexOf(name) == -1) return false;
          return true;
        });
        let total = mockUsers.length;
        mockUsers = mockUsers.filter((u, index) => index < reqpageSize * reqpageIndex && index >= reqpageSize * (reqpageIndex - 1));
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              userList: mockUsers,
              header: {
                reqpageIndex: 1,
                reqUserId: "xxw",
                rspPageCount: 86,
                rspReturnMsg: "【1130134024585609216】交易成功",
                reqpageSize: 20,
                rspReturnCode: "000000"
              }
            }]);
          }, 1000);
        });
      });
  
      //删除用户
      mock.onPost('/ams/deleteUser').reply(config => {
        let { id } = JSON.parse(config.data);
        _Users = _Users.filter(u => u.id !== id);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              header: {
                reqpageIndex: 1,
                reqUserId: "xxw",
                rspPageCount: 86,
                rspReturnMsg: "【1130130350522105856】用户删除成功",
                reqpageSize: 20,
                rspReturnCode: "000000"
              }
            }]);
          }, 500);
        });
      });
  
      //编辑用户
      mock.onPost('/user/edit').reply(config => {
        let { id, name, addr, age, birth, sex } = JSON.parse(config.data);
        _Users.some(u => {
          if (u.id === id) {
            u.name = name;
            u.addr = addr;
            u.age = age;
            u.birth = birth;
            u.sex = sex;
            return true;
          }
        });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '编辑成功'
            }]);
          }, 500);
        });
      });
  
      //新增用户
      mock.onPost('/user/add').reply(config => {
        let { name, addr, age, birth, sex } = JSON.parse(config.data);
        _Users.push({
          name: name,
          addr: addr,
          age: age,
          birth: birth,
          sex: sex
        });
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '新增成功'
            }]);
          }, 500);
        });
      });
    }
};

export default UserMockHandler;
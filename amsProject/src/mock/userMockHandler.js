import { Users } from './data/mockData.js';

let _Users = Users;

const UserMockHandler = {
    init(mock) {
        //获取用户列表（分页）
    mock.onPost('/user/listPage').reply(config => {
        let {page, name} = JSON.parse(config.data);
        let mockUsers = _Users.filter(user => {
          if (name && user.name.indexOf(name) == -1) return false;
          return true;
        });
        let total = mockUsers.length;
        mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              total: total,
              userList: mockUsers
            }]);
          }, 1000);
        });
      });
  
      //删除用户
      mock.onPost('/user/remove').reply(config => {
        let { id } = JSON.parse(config.data);
        _Users = _Users.filter(u => u.id !== id);
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功'
            }]);
          }, 500);
        });
      });
      
      //批量删除用户
      mock.onPost('/user/batchremove').reply(config => {
        let { ids } = JSON.parse(config.data);
        ids = ids.split(',');
        _Users = _Users.filter(u => !ids.includes(u.id));
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 200,
              msg: '删除成功'
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
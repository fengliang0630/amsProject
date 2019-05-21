import { Roles, HasRoles } from './data/mockData.js';

let _Roles = Roles;
let _HasRoles = HasRoles;

const RolesMockHandler = {
    init(mock) {

    //获取角色列表（分页）
    mock.onPost('/ams/getRoleByRolename').reply(config => {
      let {header, roleName} = JSON.parse(config.data);
        let {reqpageSize, reqpageIndex} = header;
      let mockRoles = _Roles.filter(role => {
        if (roleName && role.roleName.indexOf(roleName) == -1) return false;
        return true;
      });
      let total = mockRoles.length;
      mockRoles = mockRoles.filter((u, index) => index < reqpageSize * reqpageIndex && index >= reqpageSize * (reqpageIndex - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            header: {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: 86,
              rspReturnMsg: "【1130134024585609216】交易成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            },
            roleList: mockRoles
          }]);
        }, 1000);
      });
    });
  
    //删除角色
    mock.onPost('/ams/deleteRole').reply(config => {
      let { id } = JSON.parse(config.data);
      _Roles = _Roles.filter(r => r.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            header: {
              reqpageIndex: 1,
              reqUserId: "xxw",
              rspPageCount: 86,
              rspReturnMsg: "【1130130350522105856】角色删除成功",
              reqpageSize: 20,
              rspReturnCode: "000000"
            }
          }]);
        }, 500);
      });
    });

    //编辑角色
    mock.onPost('/role/edit').reply(config => {
      let { id, roleName } = JSON.parse(config.data);
      _Roles.some(r => {
        if (r.id === id) {
          r.roleName = roleName;
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

    // 新增角色
    mock.onPost('/role/add').reply(config => {
      let { roleName } = JSON.parse(config.data);
      _Roles.push({
        roleName: roleName
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

    //获取角色列表（无分页）
    mock.onPost('/role/list').reply(() => {
      let mockRoles = _Roles;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            roleList: mockRoles
          }]);
        }, 1000);
      });
    });

    // 通过userId查询已经配置的角色id
    mock.onPost('/role/hasRolesByUserId').reply((config) => {
      let { userId } = JSON.parse(config.data);
      let mockRoles = _HasRoles;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            hasRoleIds: mockRoles
          }]);
        }, 1000);
      });
    });

    // 通过userId查询已经配置的角色id
    mock.onPost('/role/setRolesByUserId').reply((config) => {
      let { userId, roleIds } = JSON.parse(config.data);
      _HasRoles = roleIds;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '设置角色成功'
          }]);
        }, 1000);
      });
    });

  }
};

export default RolesMockHandler;
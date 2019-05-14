import { Roles, HasRoles } from './data/mockData.js';

let _Roles = Roles;
let _HasRoles = HasRoles;

const RolesMockHandler = {
    init(mock) {

    //获取角色列表（分页）
    mock.onPost('/role/listPage').reply(config => {
      let {pageNum, pageSize, roleName} = JSON.parse(config.data);
      let mockRoles = _Roles.filter(role => {
        if (roleName && role.roleName.indexOf(roleName) == -1) return false;
        return true;
      });
      let total = mockRoles.length;
      mockRoles = mockRoles.filter((u, index) => index < pageSize * pageNum && index >= pageSize * (pageNum - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            roleList: mockRoles
          }]);
        }, 1000);
      });
    });
  
    //删除角色
    mock.onPost('/role/remove').reply(config => {
      let { id } = JSON.parse(config.data);
      _Roles = _Roles.filter(r => r.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });
    
    //批量删除角色
    mock.onPost('/role/batchremove').reply(config => {
      let { ids } = JSON.parse(config.data);
      ids = ids.split(',');
      _Roles = _Roles.filter(r => !ids.includes(r.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
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
      debugger;
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
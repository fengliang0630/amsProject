import { Menus, MenuTree } from './data/mockData.js';

let _Menus = Menus;
let _MenuTree = MenuTree;

const MenusMockHandler = {
    init(mock) {
    
      //获取菜单列表（分页）
    mock.onPost('/menu/listPage').reply(config => {
      let {page, menuName} = JSON.parse(config.data);
      let mockMenus = _Menus.filter(menu => {
        if (menuName && menu.menuName.indexOf(menuName) == -1) return false;
        return true;
      });
      let total = mockMenus.length;
      mockMenus = mockMenus.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            menuList: mockMenus
          }]);
        }, 1000);
      });
    });

    //删除菜单
    mock.onPost('/menu/remove').reply(config => {
      let { id } = JSON.parse(config.data);
      _Menus = _Menus.filter(m => m.id !== id);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });
    
    //批量删除菜单
    mock.onPost('/menu/batchremove').reply(config => {
      let { ids } = JSON.parse(config.data);
      ids = ids.split(',');
      _Menus = _Menus.filter(m => !ids.includes(m.id));
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 200,
            msg: '删除成功'
          }]);
        }, 500);
      });
    });

    //编辑菜单
    mock.onPost('/menu/edit').reply(config => {
      let { id, menuName, parentMenuName, parentMenuId, menuLink } = JSON.parse(config.data);
      _Menus.some(m => {
        if (m.id === id) {
          m.menuName = menuName;
          m.parentMenuName = parentMenuName;
          m.parentMenuId = parentMenuId,
          m.menuLink = menuLink;
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

    // 新增菜单
    mock.onPost('/menu/add').reply(config => {
      let { menuName, parentMenuName, parentMenuId, menuLink } = JSON.parse(config.data);
      _Menus.push({
        menuName: menuName,
        parentMenuName: parentMenuName,
        parentMenuId: parentMenuId,
        menuLink: menuLink
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

        // 获取菜单树
    mock.onPost('/menu/tree').reply(config => {
      let {userId} = JSON.parse(config.data);
      let menuTree = _MenuTree;
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            menuTree: menuTree
          }]);
        }, 1000);
      });
    });
  }
};

export default MenusMockHandler;
import Mock from 'mockjs';

const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
];

let Users = [], Roles = [], Menus = [], HasRoles = [], MenuTree = [], SelectMenuIds = [];

for (let i = 0; i < 86; i++) {
  let userId = Mock.Random.guid();
  Users.push(Mock.mock({
    id: userId,
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }));

  if (i < 50) {
    let roleId = Mock.Random.guid();
    Roles.push(Mock.mock({
      id: roleId,
      roleName: `角色${i}`
    }));

    if (i%2 === 0) {
      HasRoles.push(Mock.mock(roleId));
    }
    
  }

  if (i < 15) {
    let menuId = Mock.Random.guid();
    Menus.push(Mock.mock({
      id: menuId,
      menuName: `菜单${i}`,
      parentMenuName: `父菜单名称${i}`,
      parentMenuId: Mock.Random.guid(),
      menuLink: Mock.Random.url()
    }));
  }
}

MenuTree = [
  {
    id: '1',
    menuName: '系统功能',
    iconCls: 'el-icon-message',
    children: [
      {id: '1_1', menuName: '菜单管理', menuLink: '/menu'},
      {id: '1_2', menuName: '用户管理', menuLink: '/user'},
      {id: '1_3', menuName: '角色管理', menuLink: '/role'}
    ]
  },
  {
    id: '2',
    menuName: '业务功能',
    iconCls: 'el-icon-message',
    children: [
      {id: '2_1', menuName: '工程地理图像查询', menuLink: '/sss'}
    ]
  }
];

SelectMenuIds = ['1_1', '1_3', '2_1'];


export { LoginUsers, Users, Roles, Menus, HasRoles, MenuTree, SelectMenuIds };

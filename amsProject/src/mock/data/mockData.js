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

let Users = [], Roles = [], Menus = [], HasRoles = [];

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

export { LoginUsers, Users, Roles, Menus, HasRoles };

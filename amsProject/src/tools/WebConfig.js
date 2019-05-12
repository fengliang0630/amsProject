
var WebConfig = {
    url: 'http://192.168.30.177:100',
    api: {
        login: '/login',    // 登录接口
        queryMenuTree: '/queryMenuTree',    // 查询菜单树
        queryUserList: '/queryUserList',    // 查询用户列表接口
        addUser: '/addUser',                // 新增用户接口
        modifyUser: '/modifyUser',          // 修改用户接口
        deleteUser: '/deleteUser',          // 删除用户接口
        queryMenuList: '/queryMenuList',    // 查询菜单列表接口
        addMenu: '/addMenu',                // 新增菜单接口
        modifyMenu: '/modifyMenu',          // 修改菜单接口
        deleteMenu: '/deleteMenu',          // 删除菜单接口
        queryRoleList: '/queryRoleList',    // 查询角色列表接口
        addRole: '/addRole',                // 新增角色接口
        modifyRole: '/modifyRole',          // 修改角色接口
        deleteRole: '/deleteRole',          // 删除角色接口
    }

}

export default WebConfig;
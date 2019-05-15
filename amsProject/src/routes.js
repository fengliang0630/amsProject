import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import User from './views/user/User.vue';
import Role from './views/role/Role.vue';
import Menu from './views/menu/Menu.vue';
import AmsMap from './views/AmsMap.vue';

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '系统功能',
        iconCls: 'el-icon-message', // 图标样式class
        children: [
            { path: '/user', component: User, name: '用户管理' },
            { path: '/role', component: Role, name: '角色管理' },
            { path: '/menu', component: Menu, name: '菜单管理' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '业务功能',
        iconCls: 'el-icon-message', // 图标样式class
        children: [
            { path: '/amsMap', component: AmsMap, name: '工程地理图像查询' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
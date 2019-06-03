import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import User from './views/user/User.vue';
import Role from './views/role/Role.vue';
import Menu from './views/menu/Menu.vue';
import Project from './views/project/Project.vue';
import ProjectDetail from './views/project/detail/ProjectDetail.vue';
import ProjectAttribute from './views/project/attribute/ProjectAttribute.vue';
import Log from './views/log/log.vue';
import View001 from './views/view/View001.vue';
import View002 from './views/view/View002.vue';
import View003 from './views/view/View003.vue';


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
            { path: '/project', component: Project, name: '项目基本信息管理' },
            { path: '/ProjectAttribute', component: ProjectAttribute, name: '项目属性信息管理' },
            { path: '/projectDetail', component: ProjectDetail, name: '项目明细信息管理' },
            { path: '/log', component: Log, name: '日志查询' },
            { path: '/view001', component: View001, name: '复合统计' },
            { path: '/view002', component: View002, name: '项目信息统计' },
            { path: '/view003', component: View003, name: '项目详情统计' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;
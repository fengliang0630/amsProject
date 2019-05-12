import Vue from 'vue'
import VueRouter from 'vue-router';
import Login from '../components/Login.vue';
import Ams from '../components/Ams.vue';
import NotFound from '../components/NotFound.vue';
import User from '../components/User/User.vue';
import Role from '../components/Role/Role.vue';
import Menu from '../components/Menu/Menu.vue';

Vue.use(VueRouter);

const amsRoutes = [
  {path: '', redirect: 'user'},
  {path: 'user', component: User},
  {path: 'role', component: Role},
  {path: 'menu', component: Menu}
];

const routes = [
  {path: '/', redirect: '/ams'},
  {path: '/login', component: Login},
  {path: '/ams', component: Ams, children: amsRoutes},
  {path: '/*', component: NotFound},
];

export default new VueRouter({routes});
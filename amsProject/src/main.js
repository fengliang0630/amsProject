// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import router from './router/router.js';
import filter from './filter/filter.js';
Vue.config.productionTip = false

import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);
filter.init();

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

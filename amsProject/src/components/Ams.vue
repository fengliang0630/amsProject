<template>
  <div id="amsDiv">
    <div class="header">
      <ams-header></ams-header>
    </div>
    <div class="containt" :style="contHeight">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>

import LoginTool from '../tools/LoginTool.js';
import AmsHeader from './AmsHeader.vue';

export default {
  name: 'AmsPage',
  data () {
    return {
      contHeight: ''
    }
  },
  methods: {

  },
  beforeRouteEnter (to, from, next) {
    if (!LoginTool.isLogin()) {
      next('/login');
    } else {
      next();
    }
    
  },
  components: {
    'ams-header': AmsHeader
  },
  beforeMount() {
    this.contHeight = 'height: 750px;'
  }

}
</script>

<style scope>
    .header {
        width: 100%;
    }

    .containt {
        width: calc(100% - 60px);
        padding: 30px;
    }
</style>

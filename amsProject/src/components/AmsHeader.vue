<template>
  <div id="amsHeaderDiv" class="ams-header-div">
    <div class="logo-div"></div>
    <div class="menu-bar-div">
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff"
        :router="menuRoute"
        active-text-color="#ffd04b">
        <el-submenu v-for="(item,key) in this.menuTreeData" :key="item.menuName" :index="key+''">
          <template slot="title">{{item.menuName}}</template>
          <el-menu-item v-if="item.children" v-for="item1 in item.children" :key="item1.menuName" :index="item1.link" >{{item1.menuName}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <div class="userinfo-div">
        <div class="userinfo">
          <i class="el-icon-s-custom"></i>
          <div class="userinfo-containt">
            <p :title="this.currentUser.userName">{{this.currentUser.userName}}</p>
            <p :title="this.currentUser.role">{{this.currentUser.role}}</p>
          </div>
        </div>
        <div class="logout-icon" @click="logout">
          <i class="el-icon-switch-button"></i>
        </div>
    </div>
  </div>
</template>

<script>
import LoginTool from '../tools/LoginTool.js';
import API from '../tools/API.js';

export default {
  name: 'AmsHeaderPage',
  data () {
    return {
      activeIndex2: '1',
      menuRoute: true,
      currentUser: {},
      menuTreeData: [
        {
          menuName: '系统功能',
          children: [
            {menuName: '菜单管理', link: '/ams/menu'},
            {menuName: '角色管理', link: '/ams/role'},
            {menuName: '用户管理', link: '/ams/user'},
            {menuName: '密码管理', link: '/ams/pwd'}
          ]
        },
        {
          menuName: '业务功能',
          children: [
            {menuName: '档案录入/导入', link: '/ams/1'},
            {menuName: '档案查询/修改', link: '/ams/2'},
            {menuName: '档案列表/删除', link: '/ams/3'},
            {menuName: '档案统计/导出', link: '/ams/4'},
            {menuName: '工程地理图像查询', link: '/ams/5'}
          ]
        }
      ]
    }
  },
  methods: {
    logout() {
      LoginTool.logout();
      this.$router.push('/login');
    }
  },
  beforeMount() {
    this.currentUser = LoginTool.getCurrentUser();

    // // 查询菜单树
    // API.queryMenuTree().then((resp) => {
    //   debugger;
    // });
  },
}
</script>

<style scope>

  .logo-div {
    width: 60px;
    height: 60px;
    background: #545c64;
    margin: 0;
    float: left;
    background-image: url('../assets/logo.jpg');
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }

  .menu-bar-div {
    width: calc(100% - 60px);
    display: inline-block;
  }

  .menu-bar-div > ul {
    padding-left: 30px;
  }

  .userinfo-div {
    position: absolute;
    right: 0;
    top: 0;
    color: #fff;
    height: 60px;
  }

  .userinfo-div > div {
    display: inline-block;
    float: left;
  }

  .userinfo-div > .userinfo {
    height: 100%;
    font-size: 30px;
    width: 61px;
    position: relative;
  }

  .userinfo > .userinfo-containt {
    position: absolute;
    right: 0;
    top: 60px;
    background-color: #434a50;
    display: none;
  }

  .userinfo > .userinfo-containt > p {
    margin: 10px;
    text-align: center;
    width: 100px;
    font-size:12px;
  }

  .userinfo > .userinfo-containt > p:last-child {
    margin-bottom: 20px;
  }

  .userinfo-div > .userinfo > i:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: block;
    width: 25px;
    height: 30px;
  }

  .userinfo-div > .logout-icon {
    height: 100%;
    font-size: 30px;
    width: 61px;
    position: relative;
  }

  .userinfo-div > .logout-icon > i:before {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    display: block;
    width: 25px;
    height: 30px;
  }

  .userinfo-div > .logout-icon:hover {
    color: red;
    background-color: #434a50;
  }

  .userinfo-div > .userinfo:hover {
    background-color: #434a50;
  }

  .userinfo-div > .userinfo:hover > .userinfo-containt{
    display: block;
  }
</style>

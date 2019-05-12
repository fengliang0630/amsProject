<template>
  <div id="loginDiv" class="login-div">
    <div class="login-containt-div">
      <el-row>
        <el-col :span="24">
          <div class="login-title">AMS 系统登录</div>
        </el-col>
        <el-col :span="24">
          <div class="login-input-div">
            <label>用户名:</label>
            <div class="login-input">
              <el-input placeholder="请输入用户名" suffix-icon="el-icon-user" v-model="username"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="login-input-div">
            <label>密码:&nbsp;&nbsp;&nbsp;</label>
            <div class="login-input">
              <el-input placeholder="请输入密码" v-model="password" show-password></el-input>
            </div>
          </div>
        </el-col>
        <el-col :span="24">
          <div class="login-btn">
            <el-button type="primary" plain @click="login">登录</el-button>
            <el-button type="danger" plain>取消</el-button>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import LoginTool from '../tools/LoginTool.js';
import API from '../tools/API.js';

export default {
  name: 'LoginPage',
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      // const userInfo = {userName: this.username, password: this.password};

      API.login().then((resp) => {
        debugger;
      });
      const userInfo = {userName: this.username, role: '管理员角色'};
      LoginTool.login(userInfo);
      this.$router.push('/');
    }
  }
}
</script>

<style scope>
  .login-div {
    width:100%;
    height:100%;
    position: relative;
  }

  .login-div > .login-containt-div {
    background-color: #7cd3f3;
    width: 600px;
    height: 300px;
    position:absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin: auto;
    margin-top: 10%;
    border: 2px solid #7cd3f3;
    box-shadow: #7cd3f3 0px 30px 100px 10px;
  }

  .login-div > .login-containt-div .login-title {
    color: #fff;
    font-size: 32px;
    text-align: center;
    padding-top: 25px;
  }
  
  .login-input-div {
    text-align: center;
    padding: 25px 0;
    padding-bottom: 0;
  }

  .login-input-div > label {
    padding-right: 10px;
    color: #fff;
    font-size: 20px;
  }

  .login-input-div > .login-input {
    display: inline-block;
  }

  .login-btn {
    text-align: center;
    padding-top: 25px;
  }
</style>

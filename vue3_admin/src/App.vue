<template>
  <div>
    <h1>hello</h1>
  </div>
  <el-button type="primary" size="default" @click="testLogin">Login</el-button>
  <el-button type="primary" size="default" @click="testUserInfo">User</el-button>
  <h2 v-show="token">token is {{ token }}</h2>
  <h2 v-show="userInfo.token">user is {{ userInfo }}</h2>
</template>

<script setup lang="ts">
  import { reactive, ref } from 'vue';
  import { requestLogin, requestUserInfo } from './api/user';
  import type { ILogin, ILoginResponseData, IUserInfo } from './api/user/type';

  let token = ref('');
  let userInfo = reactive<IUserInfo>({
    userId: 0,
    avatar: '',
    username: '',
    password: '',
    desc: '',
    roles: [],
    buttons: [],
    routes: [],
    token: ''
  });

  function testLogin() {
    let data: ILogin = { username: 'admin', password: '111111', };
    requestLogin(data, (data: ILoginResponseData) => {
      token.value = data.token;
    });
  }

  function testUserInfo() {
    requestUserInfo((data: IUserInfo) => {
      userInfo = data;
    });
  }
</script>

<style scoped lang="scss">
  div {
    h1 {
      color: $primary_color;
    }
  }
</style>
<template>
  <div>
    <h1>hello</h1>
  </div>
  <el-button type="primary" size="default" @click="testLogin">Login</el-button>
  <h2 v-show="token">token is {{ token }}</h2>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import request from './utils/request';
  import { ElMessage } from 'element-plus';

  let token = ref('');

  function testLogin() {
    request({
      url: '/user/login',
      method: 'post',
      data: {
        username: 'admin',
        password: '111111'
      }
    }).then(data => {
      let msg = '';
      ElMessage({
        type: 'success',
        message: '登录成功！'
      });
      token.value = data.data.token;
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
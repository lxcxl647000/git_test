<template>
  <div>
    <h1>hello</h1>
  </div>
  <el-button type="primary" size="default" @click="testLogin">Login</el-button>
  <h2 v-show="token">token is {{ token }}</h2>
</template>

<script setup lang="ts">
  import axios from 'axios';
  import { ref } from 'vue';

  let token = ref('');

  async function testLogin() {
    let { data: { code, data } } = await axios.post('/api/user/login', {
      username: 'admin',
      password: '111111',
    });
    if (code === 200) {
      alert('success login');
      token.value = data.token;
    }
    else {
      alert('fail login')
    }
  }
</script>

<style scoped lang="scss">
  div {
    h1 {
      color: $primary_color;
    }
  }
</style>
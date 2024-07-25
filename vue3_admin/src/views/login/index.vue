<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :offset="0" :xs="0"></el-col>
            <el-col :span="12" :offset="0" :xs="24">
                <el-form class="login_form">
                    <h1>Hello</h1>
                    <h2>欢迎来到后台管理</h2>
                    <el-form-item>
                        <el-input :prefix-icon="User" v-model="loginData.username"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input :prefix-icon="Lock" type="password" v-model="loginData.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_button" type="primary" size="default" @click="">登录</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
    import type { ILogin } from '@/api/user/type';
    import { User, Lock, View } from '@element-plus/icons-vue';
    import { reactive } from 'vue';

    let loginData = reactive<ILogin>({
        username: 'admin',
        password: '111111'
    });
</script>

<style scoped lang="scss">
    .login_container {
        width: 100%;
        height: 100vh;
        background: url('@/assets/images/background.jpg') no-repeat;
        background-size: cover;

        .login_form {
            position: relative;
            width: 80%;
            top: 30vh;
            background: url('@/assets/images/login_form.png') no-repeat;
            background-size: cover;
            padding: 40px;

            h1 {
                color: white;
                font-size: 40px;
            }

            h2 {
                color: white;
                font-size: 20;
                margin: 20px 0px;
            }

            .login_button {
                width: 100%;
            }
        }
    }
</style>
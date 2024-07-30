<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :offset="0" :xs="0"></el-col>
            <el-col :span="12" :offset="0" :xs="24">
                <el-form class="login_form" :model="loginData" :rules="rules" ref="loginForm">
                    <h1>Hello</h1>
                    <h2>欢迎来到后台管理</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginData.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input :prefix-icon="Lock" type="password" v-model="loginData.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button class="login_button" type="primary" size="default" @click="login"
                            :loading="loading">登录</el-button>
                    </el-form-item>

                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts" name="Login">
    import type { ILogin } from '@/api/user/type';
    import useUserStore from '@/store/modules/user';
    import { getCurrentTimeDes } from '@/utils/time';
    import { User, Lock } from '@element-plus/icons-vue';
    import { ElNotification } from 'element-plus';
    import { reactive, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    let userStore = useUserStore();
    let router = useRouter();
    let route = useRoute();

    let loginData = reactive<ILogin>({
        username: 'admin',
        password: '111111'
    });

    let loading = ref(false);

    // 规则对象属性//
    // required 表示该字段必须校验//
    // min 文本最小长度//
    // max 文本最大长度//
    // message 错误提示信息//
    // trigger 处罚校验时机 blur失去焦点  change文本发生改变//
    let rules = reactive({
        username: [
            // { required: true, message: '名字长度6到10位', min: 6, max: 10, trigger: 'change' }
            { validator: validateUserName, trigger: 'change' }
        ],
        password: [
            // { required: true, message: '密码长度至少6位', min: 6, trigger: 'change' }
            { validator: validatePassword, trigger: 'change' }
        ]
    });

    let loginForm = ref();

    async function login() {
        try {
            await loginForm.value.validate();

            loading.value = true;
            try {
                await userStore.userLogin(loginData);
                ElNotification({
                    type: 'success',
                    message: '欢迎回来',
                    title: `Hi,${getCurrentTimeDes()}好`,
                });
                router.push({ path: route.query ? (route.query.redirect as string) : '/' });
                loading.value = false;
            } catch (error: any) {
                ElNotification({
                    type: 'error',
                    message: error.message
                });
                loading.value = false;
            }
        } catch (error) {

        }
    }

    function validateUserName(rule: any, value: any, callback: any) {
        if (value.length < 5 || value.length > 10) {
            callback(new Error('名字长度5到10位'));
        }
        else {
            callback();
        }
    }

    function validatePassword(rule: any, value: any, callback: any) {
        if (value.length < 6) {
            callback(new Error('密码长度至少6位'));
        }
        else {
            callback();
        }
    }
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
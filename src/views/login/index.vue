<script setup>
import {ref, reactive} from 'vue';
import SvgIcon from "@/components/SvgIcon.vue";
import {useUserInfoStore} from "@/stores/userInfo";
import {ElMessage} from "element-plus";

const userInfoStore = useUserInfoStore();

const loginData = reactive({
  username: localStorage.getItem('username') || '',
  password: localStorage.getItem('password') || '',
  rememberMe: localStorage.getItem('username') != null && localStorage.getItem('password') != null
})

const checkAgreement = (rule, value, callback) => {
  // if (!value) {
  //   callback(new Error('请阅读并勾选用户协议'))
  // }
  callback()
}

const rules = reactive({
  username: [
    {required: true, message: '用户名不能为空', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 3, max: 15, message: '密码长度必须为6-15之间', trigger: 'blur'}
  ],
  rememberMe: [
    {validator: checkAgreement, trigger: 'blur'}
  ]
})

const loginFormRef = ref(null);
const doLogin = () => {
  loginFormRef.value.validate(async (valid) => {
    if (!valid) {
      // 表单校验失败，进行相应提示
      ElMessage({
        showClose: true,
        message: '表单校验失败',
        type: 'warning',
      })
      return
    }

    // 登录
    await userInfoStore.doLogin({
      username: loginData.username,
      password: loginData.password,
      rememberMe: loginData.rememberMe
    });
  })


}
</script>

<template>

  <div class="login-page">
    <el-form class="login-form"
             ref="loginFormRef"
             :model="loginData"
             :rules="rules"
             status-icon
             label-width="120px">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginData.username" clearable/>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="loginData.password" show-password clearable/>
      </el-form-item>

      <el-form-item prop="rememberMe">
        <el-checkbox label="记住我" v-model="loginData.rememberMe" @change="console.log(loginData.rememberMe)"/>
        <el-link style="margin-left: 10px" :underline="false">
          <SvgIcon icon="king-pointer"/>
        </el-link>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="doLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<style scoped>
.login-page {
  height: 100vh;
  background: url("@/assets/images/login-backgroud.png");
  background-size: 100vw 100vh;
  position: relative;
}

.login-form {
  width: 400px;
  position: absolute;
  left: 80%;
  top: 50%;
  transform: translateX(-50%);

}
</style>
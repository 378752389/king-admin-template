<script setup>
import {ref, reactive} from 'vue';
import {useRouter} from "vue-router";
import SvgIcon from "@/components/SvgIcon.vue";

const router = useRouter();

const loginData = ref({
  username: '',
  password: '',
  agreement: false,
})

const checkAgreement = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请阅读并勾选用户协议'))
  }
  callback()
}

const rules = reactive({
  username: [
    {required: true, message: '用户名不能为空', trigger: 'blur'},
  ],
  password: [
    {required: true, message: '密码不能为空', trigger: 'blur'},
    {min: 6, max: 15, message: '密码长度必须为6-15之间', trigger: 'blur'}
  ],
  agreement: [
    {validator: checkAgreement, trigger: 'blur'}
  ]
})

const loginFormRef = ref(null);
const doLogin = (loginFormRef) => {
  loginFormRef.validate((valid) => {
    if (!valid) {
      // 表单校验失败，进行相应提示  TODO
    }
  })
  // TODO 提交表单
  console.log(loginData.value)
  if (loginData.value.username === 'admin'
      && loginData.value.password === '123456'
      && loginData.value.agreement === true
  ) {
    router.push('/')
  } else {
    console.log("username or password error")
  }
}
</script>

<template>

  <div class="login">
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

      <el-form-item prop="agreement">
        <el-checkbox label="用户协议" v-model="loginData.agreement"/>
        <el-link style="margin-left: 10px" :underline="false">
          <SvgIcon icon="king-pointer"/>
        </el-link>
      </el-form-item>

      <el-form-item>
        <el-button style="width: 100%" type="primary" @click="doLogin(loginFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.login {
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
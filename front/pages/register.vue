<template>
  <div class="login-container">
    <el-form class="login-form" :rules="rules" :model="form" ref="registerForm">
      <div class="title-container">
        <img src="/logo.png" alt="" />
      </div>
      <el-form-item props="email" label="邮箱">
        <span>
          <i class="el-icon-mobile"></i>
        </span>
        <el-input v-model="form.email" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item props="email" label="邮箱">
        <span>
          <i class="el-icon-mobile"></i>
        </span>
        <el-input v-model="form.email" placeholder="用户名"></el-input>
      </el-form-item>

      <el-form-item props="passwd">
        <span>
          <i class="el-icon-lock"></i>
        </span>
        <el-input placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item props="captcha">
        <el-input placeholder="验证码"></el-input>
        <img :src="captchaUrl" alt="" @click="updateCaptcha" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  layout: "login",
  data() {
    return {
      form: {
        email: ""
      },
      rules: {
        email: [
          { required: true, message: "请输入邮箱" },
          { type: "email", message: "请输入正确的邮箱" }
        ]
      },
      captchaUrl: "/api/captcha"
    };
  },
  methods: {
    updateCaptcha() {
      this.captchaUrl = "/api/captcha?_t=" + Date.now();
    }
  }
};
</script>

<style scoped lang="stylus">
.login-form
  width: 800px
  margin: 50px auto
</style>

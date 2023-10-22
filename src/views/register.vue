<template>
  <div class="register-page">
    <van-nav-bar title="面经注册"></van-nav-bar>
    <van-form @submit="onSubmit" class="hhh">
      <van-field v-model="username" name="username" label="用户名" placeholder="请输入用户名"
      :rules="[
        { required: true, message: '请输入用户名'},
        { pattern: /^\w{6,15}$/, message: '请输入6-15位用户名'}
      ]"
      ></van-field>
      <van-field v-model="password" name="password" label="密码" placeholder="请输入密码"
      :rules="[
        { required: true, message: '请输入密码'},
        { pattern: /^\w{6,15}$/, message: '请输入6-15位密码'}
      ]"
      ></van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
    <a class="register" href="#/login">有账号，去登录</a>
  </div>
</template>
<script>
import { UserRegister } from '@/api/user'
export default {
  name: 'APP',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit(values) {
      const data = await UserRegister(values)
      console.log(values)
      this.$toast.success('注册成功')
      this.$router.push('/login')
      console.log(data)
    }
   
  },
  created() {
  },
  mounted() {
  }
}
</script>
<style lang="less" scoped>
 .register-page .register {
  color: #069;
  font-size: 0.5rem;
  padding-right: 1.25rem;
  float: right;
 }
</style>

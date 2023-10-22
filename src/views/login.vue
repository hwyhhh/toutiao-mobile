<template>
  <div class="login-page">
    <van-nav-bar
  title="面经登录"/>
  <van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="username"
    label="用户名"
    placeholder="请输入用户名"
    :rules="[{ required: true, message: '请填写用户名' },
     { pattern: /^\w{6,15}$/, message: '请输入6-15位密码'}
  ]"
  />
  <van-field
    v-model="password"
    name="password"
    label="密码"
    placeholder="请输入密码"
    :rules="[{ required: true, message: '请填写密码' },
  { pattern: /^\w{6,15}$/, message: '请输入6-15位密码'}]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
<a class="link" href="#/register">没账号，去注册</a>
  </div>
</template>
<script>
import { UserLogin } from '@/api/user'
import { setToken } from '@/utils/storage'
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
      const data = await UserLogin(values)
      setToken(data.data.token)
      this.$toast.success('登录成功')
      this.$router.push('/user')
      console.log(data)
    }
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>
 .login-page .link {
  color: #069;
  font-size: 0.5rem;
  padding-right: 1.25rem;
  float: right;
}
</style>

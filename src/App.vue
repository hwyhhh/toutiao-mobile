<template>
  <div>

    <!-- 路由的出口 -->
  <router-view></router-view>

    <van-tabbar route>
  <van-tabbar-item icon="home-o" to="/article">面经</van-tabbar-item>
  <van-tabbar-item icon="star-o" to="/collect">收藏</van-tabbar-item>
  <van-tabbar-item icon="friends-o" to="/community">广场</van-tabbar-item>
  <van-tabbar-item icon="setting-o" to="/user">我的</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style lang="less" scoped>

</style>

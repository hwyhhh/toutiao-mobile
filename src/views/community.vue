<template>
  <div class="container">
<div class="top">
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <!-- <van-icon name="search" /> -->

</div>
<div class="content">
  <h4 style="margin-left: 5px;">热门话题</h4>
  <van-cell-group style="margin-top: -30px;">
  <van-cell title="#知乎2024校招内推" value="140.6万人阅读" />
  <van-cell title="#美团前端笔试大全" value="125.5万人阅读" />
  <van-cell title="#求职攻略" value="189.8万人阅读" />
</van-cell-group>
</div>
<div class="tucao">
  <span style="font-weight: bold; margin-left: 5px;">面试交流</span>
  <van-icon name="plus" @click="toChat" style="margin-left: 220px;"/>
  <van-cell-group>
  <van-cell title="前端八股文在哪里背？" value="140.6万人阅读" />
  <van-cell title="前端面试资料" value="125.5万人阅读" />
  <van-cell title="面试攻略" value="189.8万人阅读" />
</van-cell-group>
</div>
<!-- 精选文章 -->
<div class="select">
  <span style="margin-left: 10px; ">精选动态</span>
  <br>
  <van-image
  round
  width="40px"
  height="40px"
  src="https://img01.yzcdn.cn/vant/cat.jpeg"
  style="margin-left: 20px; margin-top: 10px;"
/>
  <span style="font-size: 10px;     display: block;
    margin-top: -45px;
    margin-left: 70px;">默归</span>
  <span style="display: block; margin-left: 70px; font-size: 10px;">只有你想不到，没有我做不到</span>
  <span style="font-size: 14px; margin-left: 20px;">本人双非普通本科，希望能找个前端的工作...</span>
  <img style="width: 90%; margin-left: 18px;" src="../assets/57ee0194646e6.jpg" alt="">
</div>


  </div>
</template>
<script>
export default {
  name: 'APP',
  data () {
    return {
      value: ''
    }
  },
  methods: {
    toChat() {
      this.$router.push('/tochat')
    }
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>
.top {
  width: 100%;
  position: fixed;
  top: 0;
}
.content {
  width: 100%;
  // height: 200px;
  margin-top: 60px;
  // background: pink;

}
.tucao {
  width: 100%;
  margin-top: 10px;
}
.select {
  width: 95%;
  height: 300px;
  margin: 0 auto;
  background: #EAEAF0;
  border-radius: 20px 20px;
  margin-bottom: 70px;
  overflow-y: scroll;
}
</style>

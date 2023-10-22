<template>
  <div class="deatil-page" style=" font-size: 14px;" >
    <van-nav-bar left-text="返回" @click-left="$router.back()" fixed title="面经详细" style="width: 100%; position: fixed;" />
    <div class="container" style="height: 2000px; overflow-y: scroll; position: relative;top: 40px;left: 2px;">
    <div class="header">
      <h1>{{ article.renderToStream }}</h1>
      <p>{{ article.createdAt }} | {{ article.views }} 浏览量 | {{ article.likeCount }} 点赞数</p>
      <p>
        <img :src="article.avatar" alt="" />
        <span style="display: block;
    margin-top: -30px;
    margin-left: 100px;">{{ article.creator }}</span>
      </p>
    </div>
    <main  class="body" v-html="article.content"></main>
    <div class="opt" >
        <span>点赞</span>
        <van-icon
          @click="toggleLike"
          :class="{ active: article.likeFlag }"
          name="like-o"
          ref="dianzan"
        ></van-icon>
        <span>收藏</span>
        <van-icon
          @click="toggeCollect"
          :class="{ active: article.collectFlag }"
          name="star-o"
        ></van-icon>
         <!-- 发表评论 -->
    <div style="margin-bottom: 100px;"> 
    <van-cell-group style="display: flex;">
  <van-field v-model="value"  placeholder="请输入内容" style="width: 80%;" />
  <button type="button" @click="getComment">发表</button>
</van-cell-group>
    
    <p v-for="item in message" :key="item.id">{{ item }}</p>
  </div>
      </div>
    </div>
   
  </div>

</template>
<script>
import { getArticleInfo, updateLike, updateCollect } from '@/api/article'
export default {
  name: 'APP',
  data() {
    return {
      article: {},
      message: [],
      value: ''
    }
  },
  methods: {
    async toggleLike() {
      await updateLike(this.article.id)
      // console.log(this.article.likeFlag)
      this.article.likeFlag = !this.article.likeFlag
      // console.log(this.article.likeFlag)
      if (this.article.likeFlag) {
        this.article.likeCount++
        this.$toast.success('点赞成功')
      } else {
        this.article.likeCount--
        this.$toast.success('取消点赞')
      }
    },
    async toggeCollect() {
      await updateCollect(this.article.id)
      this.article.collectFlag = !this.article.collectFlag
      if (this.article.collectFlag) {
        this.$toast.success('收藏成功')
      } else {
        this.$toast.success('取消收藏')
      }
    },
    getComment() {
      this.message.push(this.value)
      this.value = ''
    }
  },
  async created() {
    const data = await getArticleInfo(this.$route.params.id)
    console.log(data)
    this.article = data.data
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
// .detail-page {
//   margin-top: 44px;
//   overflow: hidden;
//   padding: 0 15px;
//   .header {
//     width: 100%;
//    margin-top: 20px;
//     h1 {
//       font-size: 24px;
//     }
//     p {
//       color: #999;
//       font-size: 12px;
//       display: flex;
//       align-items: center;
//     }
//     img {
//       width: 40px;
//       height: 40px;
//       border-radius: 50%;
//       overflow: hidden;
//     }
//   }
//   .opt {
//     position: fixed;
//     bottom: 100px;
//     right: 0;
//     > .van-icon {
//       margin-right: 20px;
//       background: #fff;
//       width: 40px;
//       height: 40px;
//       line-height: 40px;
//       text-align: center;
//       border-radius: 50%;
//       box-shadow: 2px 2px 10px #ccc;
//       font-size: 18px;
//       &.active {
//         background: #fec635;
//         color: #fff;
//       }
//     }
//   }
// }

</style>

<template>
  <div>
   <van-cell>
    <template #title>
      <div class="title-box">
        <span>{{ title }}</span>
        <img :src="cover.images[0]" alt="" class="thumb" v-if="cover.type === 1">
      </div>
      <div class="thumb-box" v-if="cover.type === 3">
        <img :src="item" alt="" class="thumb" v-for="(item, i) in cover.images" :key="i">
      </div>
    </template>
<!-- label 区域的插槽 -->
<template #label>
  <div class="label-box">
<span>{{ author}} &nbsp; {{ cmtCount}}评论 &nbsp;&nbsp; 发布日期 {{ time }}</span>
<!-- 关闭按钮 -->
<van-icon name="cross"></van-icon>
</div>
</template>

   </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleInfo',
  props: {
    title: {
      type: String,
      default: ''
    },
    author: {
      type: String,
      default: ''
    },
    cmtCount: {
      type: [Number, String],
      default: 0
    },
    time: {
      type: String,
      default: ''
    },
    // 封面信息
    cover: {
      type: Object,
      default: function() {
        return { type: 0 }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.thumb {
  width: 113px;
  height: 70px;
  background-color: #f8f8f8;
  object-fit: cover;
}
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: first-starts;
}
.thumb-box {
  display: flex;
  justify-content: space-between;
}
</style>

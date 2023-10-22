<template>
  <div class="collect-page">
    <van-nav-bar fixed title="我的收藏"></van-nav-bar>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ArticleItem v-for="(item, i) in list" :key="i" :item="item"></ArticleItem>
    </van-list>
  </div>
</template>
<script>
import { getArticlesCollect } from '@/api/article'
import ArticleItem from '@/components/ArticleItem.vue'

export default {
  name: 'APP',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getArticlesCollect({page: this.page})
      this.list.push(...data.rows)
      this.loading = false
      this.page++
      if(this.page > data.pageTotal) {
        this.finished = true
      }
    }
  },
  created() {},
  mounted() {},
  components: { ArticleItem },
}
</script>
<style lang="less" scoped>
.collect-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>

<template>
  <div class="like-page">
    <van-nav-bar fixed title="我的喜欢" />
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"></van-list>

  </div>
</template>
<script>
import { getArticleLike } from '@/api/article'
export default {
  name: 'APP',
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getArticleLike({page: this.page })
      this.list.push(...data.rows)
      this.loading = false
      this.page++
      if (this.page > data.pageTotal) {
        this.finished = true
      }
    }
  },
  created () {
  },
  mounted () {
  },
}
</script>
<style lang="less" scoped>
.like-page {
  margin-bottom: 50px;
  margin-top: 44px;
}
</style>

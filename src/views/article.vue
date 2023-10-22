<template>
  <div class="article-page">
    <nav class="my-nav van-hairline--bottom">
      <a @click="changeSorter('weight_desc')" :class="{ active: sorter === 'weight_desc'}" href="javascript:;">推荐</a>
      <a @click="changeSorter('null')" :class="{ active: sorter === null }" href="javascript:;">最新</a>
      <!-- <div class="elText">面经</div> -->
      <!-- <div class="logo"><img src="../assets/logo1.png" alt=""></div> -->
      <!-- 定位功能 -->
      <!-- <span>韶关</span>
      <van-icon name="arrow-down" /> -->
    </nav>
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" success-text="刷新成功">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <ArticleItem
          v-for="item in list"
          :key="item.index"
          :item="item"
          @click.native="$router.push(`/detail/${item.id}`)"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script>
import { getArticleList } from '@/api/article'
export default {
  name: 'APP',

  data() {
    return {
      current: 1,
      pageSize: 10,
      sorter: 'weight_desc',
      list: [],
      loading: false,
      finished: false,
      // 是否正在下拉刷新
      isLoading: false,
    }
  },
  methods: {
    async onLoad() {
      const { data } = await getArticleList({
        current: this.current,
        sorter: this.sorter
      })
      this.list = [...this.list, ...data.rows]
      this.loading = false
      this.current++
      if (this.current > data.pageTotal) {
        this.finished = true
      }
    },
    changeSorter(value) {
      this.current = 1
      this.list = []
      this.finished = false
      this.loading = true
      this.onLoad()
    },
    // 需要修改刷新！！！！！
    // 拿到数据需要在头部拼接
    async onRefresh() {
      this.current++
      // const { data } = await getArticleList({
      //   current: this.current,
      //   sorter: this.sorter
      // })
      // this.list = [...data.data.rows, this.list]
      // this.isLoading = false

      // this.current++

      const { data } = await getArticleList({
        current: this.current,
        sorter: this.sorter
      })
      this.list = [...data.rows, this.list]
      this.isLoading = false
    }
  },
  async created() {
    const data = await getArticleList({
      current: this.current,
      pageSize: this.pageSize,
      sorter: this.sorter,
    })
    this.list = data.data.rows
    // console.log(data.data.rows)
  },
  mounted() {},
}
</script>
<style lang="less" scoped>
// .article-page {
//   margin-bottom: 50px;
//   margin-top: 44px;
//   .my-nav{
//     height: 44px;
//     position: fixed;
//     left: 0;
//     top: 0;
//     width: 100%;
//     z-index: 999;
//     background: #fff;
//     display: flex;
//     align-items: center;
//   }

// }
.article-page {
  // width: 100%;
  margin-top: 44px;
  margin-bottom: 50px;
  // .my-nav {
  //   height: 44px;
  //   position: fixed;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   z-index: 999;
  //   background: #fff;
  //   display: flex;
  //   align-items: center;
  //   > a {
  //     color: #999;
  //     font-size: 14px;
  //     line-height: 44px;
  //     margin-left: 20px;
  //     position: relative;
  //     // transition: all 0.3s;
  //   //   // &::after {
  //   //   //   content: '';
  //   //   //   position: absolute;
  //   //   //   left: 50%;
  //   //   //   transform: translate(-50%);
  //   //   //   bottom: 0;
  //   //   //   width: 0;
  //   //   //   height: 2px;
  //   //   //   background: #222;
  //   //   //   transition: all 0.3s;
  //   //   // }
  //   //   // &.active {
  //   //   //   color: #222;
  //   //   //   &::after {
  //   //   //     width: 14px;
  //   //   //   }
  //   //   // }
  //   }
  //   .elText {
  //     font-family: 'Nabla Regular';
  //     color: #fb801d;
  //     position: fixed;
  //     right: 20px;
  //   }
  //   .logo {
  //     flex: 1;
  //     display: flex;
  //     justify-content: flex-end;
  //     > img {
  //       width: 64px;
  //       height: 28px;
  //       display: block;
  //       margin-right: 10px;
  //     }
  //   }
  // }
  .my-nav {
    height: 44px;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    z-index: 999;
    display: flex;
    align-items: center;
    background: #fff;
    .elText {
       font-family: 'Nabla Regular';
     color: #198DFB;
      position: fixed;
      font-size: 14px;
     right: 20px;
  }

  }

}
a {
      font-size: 14px;
      line-height: 44px;
      margin-left: 20px;
      text-decoration: none;
      color: #A69999;

    }
a:focus {
  color: #198DFB;
}

// .article-page a:link{
//   text-decoration: none;
// }
// .article-page a:hover{
//    color: black;
//     text-decoration:underline;
//     }
// .article-page a {
//       color: #333;
//       margin-left: 20px;
//     }
//     .article-page  .logo{
//       width: 40px;
//       height: 40px;
//     }
//     .article-page  .logo img{
//       width: 40px;
//       height: 40px;
//       margin-left: 180px;
//       // margin-top: 20px;
//     }
</style>

<template>
  <div class="user-page">
    <div class="register" v-if="username === ''">
      <img src="../assets/头像.webp" alt="" />

      <h3 @click="getLogin">请点击登录</h3>
    </div>
    <div class="user" v-else>
      <img :src="avatar" alt="" @click="onSelectFile" ref="img" />
      <!-- 实现更换头像 -->
      <div class="input">
        <input type="file" hidden ref="file" @change="onFileChange" />
      </div>
      <h3>{{ username }}</h3>
    </div>
    <van-grid clickable :column-num="3" :border="false">
      <van-grid-item icon="clock-o" text="历史记录" to="/" />
      <van-grid-item icon="bookmark-o" text="我的收藏" to="/collect" />
      <van-grid-item icon="thumb-circle-o" text="我的点赞" to="/like" />
    </van-grid>
    <van-cell-group class="mt20">
      <van-cell title="推荐分享" is-link @click="shareToWechatFriend" style="color: black" />
      <van-cell title="意见反馈" is-link style="color: black" />
      <van-cell @click="toChat" title="联系客服" is-link style="color: black" />
      <van-cell @click="logout" title="退出登录" is-link style="color: black"
    /></van-cell-group>
    <ShareBar ref="shareBar"></ShareBar>
  </div>
</template>

<script>
import { getUserInfo } from '../api/user'
import { removeToken } from '../utils/storage.js'
import ShareBar from '../components/shareBar.vue'
import nativeShare from 'nativeshare'
export default {
  name: 'APP',
  data() {
    return {
      username: '',
      avatar: '',
    }
  },
  computed: {
    file() {
      return this.$refs.file
    },
  },
  methods: {
    logout() {
      removeToken()
      this.$router.push('/login')
    },
    getLogin() {
      this.$router.push('/login')
    },
    toChat() {
      this.$router.push('/chat')
    },
    onSelectFile() {
      // this.$refs.file.click()
      this.file.click()
    },
    onFileChange() {
      const fileObj = this.file.files[0]
      const fileData = window.URL.createObjectURL(fileObj)
      this.$refs.img.src = fileData
    },
    onSelect() {
      this.$refs.shareBar.$el.style.display = 'block'
      // console.log(this.$refs.shareBar.$el.style.display)
    },
    shareToWechatFriend() {
      const shareConfig = {
        shareUrl: '分享的链接', // 分享的链接
        shareTitle: '分享的标题', // 分享的标题
        shareDes: '分享的描述', // 分享的描述
        shareIcon: '分享的图片链接' // 分享的图片链接
      }

      const wxShare = new nativeShare({
        config: {
          wechatFriend: true // 启用分享到微信好友功能
        },
        shareData: {
          title: shareConfig.shareTitle,
          desc: shareConfig.shareDes,
          link: shareConfig.shareUrl,
          // 如果需要分享图片，需要提供 shareIcon
          icon: shareConfig.shareIcon
        }
      })

      wxShare.call()
    }
  },
  async created() {
    const { data } = await getUserInfo()
    this.username = data.username
    this.avatar = data.avatar
  },
  mounted() {},
  components: { ShareBar },
}
</script>
<style lang="less" scoped>
.user-page {
  padding: 0 10px;
  background: #f5f5f5;
  height: 100px;
  .mt20 {
    margin-top: 20px;
    align-items: center;
  }
  .register {
    display: flex;
    padding: 20px 0;
    align-items: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
      overflow: hidden;
    }
    h3 {
      margin: 0;
      padding-left: 20px;
      font-size: 18px;
    }
  }
  .user {
    display: flex;
    padding: 20px 0;
    align-items: center;
    .input {
      width: 80px;
      position: absolute;
      input {
      }
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
    }
    h3 {
      margin: 0;
      padding-left: 20px;
      font-size: 18px;
    }
  }
}
</style>

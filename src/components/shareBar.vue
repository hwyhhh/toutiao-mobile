<template>
  <div id="nativeShare" ref="nativeShare">
    <div class="label">分享到</div>
    <div class="list">
      <span class="list-item" v-for="(button, index) in shareButtons" :key="index">
        <img :src="button.src" class="i" @click="call(button)" />
        <!-- <img :src="button.src" class="i" @click="shareToWechatFriend()" alt=""> -->
        {{ button.text }}
      </span>
    </div>
  </div>
</template>

<script>

const nativeShare = () => import('nativeshare') //这种引入方式nativeshare是Promise对象

// eslint-disable-next-line camelcase
const m_share = () => import('m-share')
let NativeShare, mShare
export default {
  name: 'the-sharebar',
  data() {
    return {
      shareButtons: [
        {
          text: '微信好友',
          nativeshare: 'wechatFriend',
          m_share: 'wx',
          src: require('../assets/3.png'),
        },
        {
          text: '朋友圈',
          nativeshare: 'wechatTimeline',
          m_share: 'wxline',
          src: require('../assets/3.png'),
        },
        {
          text: '新浪微博',
          nativeshare: 'weibo',
          m_share: 'sina',
          src: require('../assets/3.png'),
        },
        { text: 'QQ好友', nativeshare: 'qqFriend', m_share: 'qq', src: require('../assets/3.png') },
        {
          text: 'QQ空间',
          nativeshare: 'qZone',
          m_share: 'qzone',
          src: require('../assets/3.png'),
        },
        { text: '更多', nativeshare: '', m_share: '', src: require('../assets/3.png') },
      ],
    }
  },
  computed: {
    config() {
      return {
        title: '分享标题',
        desc: '描述',
        img: '图片地址',
        img_title: '图片标题',
        link: '当前链接',
      }
    },
  },
  methods: {
    // shareToWechatFriend() {
    //   const shareConfig = {
    //     shareUrl: '分享的链接', // 分享的链接
    //     shareTitle: '分享的标题', // 分享的标题
    //     shareDes: '分享的描述', // 分享的描述
    //     shareIcon: '分享的图片链接' // 分享的图片链接
    //   }

    //   const wxShare = new nativeShare({
    //     config: {
    //       wechatFriend: true // 启用分享到微信好友功能
    //     },
    //     shareData: {
    //       title: shareConfig.shareTitle,
    //       desc: shareConfig.shareDes,
    //       link: shareConfig.shareUrl,
    //       // 如果需要分享图片，需要提供 shareIcon
    //       icon: shareConfig.shareIcon
    //     }
    //   })

    //   wxShare.call()
    // },
    call(command) {
      const shareData = {
        //nativeShare的参数模型
        title: this.config.title,
        desc: this.config.desc,
        // 如果是微信该link的域名必须要在微信后台配置的安全域名之内的。
        link: this.config.link,
        icon: this.config.url,
        // 不要过于依赖以下两个回调，很多浏览器是不支持的
        success: function () {
          alert('success')
        },
      }
      this.$refs.nativeShare.style.display = ''
    // console.log(this.$refs.nativeShare.style.display);
      const mShareData = {
        title: this.config.title, // 标题，默认读取document.title
        desc: this.config.desc, // 描述, 默认读取head标签：<meta name="description" content="desc" />
        link: this.config.link, // 网址，默认使用window.location.href
        imgUrl: this.config.img, // 图片, 默认取网页中第一个img标签
        fnDoShare(type) {
          console.log('success')
        },
      }
      const nativeShare = new NativeShare()
      nativeShare.setShareData(shareData)
      try {
        nativeShare.call(command.nativeshare)
      } catch (e) {
      
        mShare.to(command.m_share, mShareData)
      }
    },
  },
  mounted() {
    // ES6 标准
    nativeShare().then((res) => {
      NativeShare = res.default
    })
    // CommonJS 标准
    m_share().then((res) => {
      mShare = res
    })
  },
}
</script>

<style lang="less" scoped>
#nativeShare {
  width: 100%;
  height: 300px;
  overflow-y: hidden;
  font-size: 13px;
  background: #F5F5F5;
  border-radius: 20px;
  display: none;
}

.label {
  font-size: 12px;
  margin-left: 50px;
}
.list {
  margin-left: 35px;
}
.list-item {
  width: 30%;
  display: inline-block;
  text-align: center;
  margin: 10px 0;
}

.i {
  width: 40px;
  height: 40px;
  display: block;
  margin: 0 auto;
  margin-bottom: 5px;
  background-size: cover;
}
</style>

<template>
  <div class="user-chat">
    <!-- 头部导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      @click-left="$router.back()"
      left-arrow
      left-text="返回"
      title="客服"
    />
    <!-- 客服发送默认消息 -->
    <div class="kefu">
      <span style="font-size: 10px; margin-left: 130px;">{{ this.nowDate }}{{ this.nowTime }}</span>
      <br>
      <img src="../assets/3.png" alt=""/>

     
      <p style="font-size: 16px; margin-top: -30px; margin-left: 55px;">您好，欢迎来到面经客服中心！</p>
    </div>
    <!-- 消息列表 -->
    <div class="main">
      <div class="msg" v-for="e in arr" :key="e.id">{{ e }}
      <img src="../assets/4.webp" alt="" ></div>
    </div>

    <!-- 发消息的输入框 -->

    <van-cell-group class="send-message-wrap">
      <van-field v-model="cont" placeholder="请输入消息内容" :border="false"></van-field>
      <van-button type="info" size="small" @click="send">发送</van-button>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'APP',
  data() {
    return {
      cont: '',
      arr: [],
      nowDate: '',
      nowTime: '',
      nowWeek: '',
    }
  },
  onLoad() {
    this.getmsg()
  },
  methods: {
    // 发送消息
    send() {
      if (this.cont.length > 0) {
      // console.log(this.nowTime)
      // this.arr.push(this.nowTime)
        this.arr.push(this.cont)
        this.cont = ''
        const aa = this.cont
        this.socket.emit('message', aa)
      }
    },
    // 接收信息
    getmsg() {
      this.socket.on('gbmsg', (data) => {
        this.arr.push(data)
        console.log()
      })
    },
    currentTime() {
      setInterval(this.formatDate, 500)
    },
    formatDate() {
      const myDate = new Date()
      const wk = myDate.getDay()
      // const yy = String(myDate.getFullYear())
      const mm = myDate.getMonth() + 1
      const dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      const hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      const min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      const sec = String(myDate.getSeconds() < 10 ? '0' + myDate.getSeconds() : myDate.getSeconds())
      const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      const week = weeks[wk]
      this.nowDate = mm + ' 月 ' + dd + ' 日'
      this.nowTime = hou + ' : ' + min + ' : ' + sec
      this.nowWeek = week
    }
  },
  created() {},
  mounted() {
    this.currentTime()
  },
  // 销毁定时器
  beforeDestroy() {
    if (this.formatDate) {
      clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
    }
  }
}
</script>
<style lang="less" scoped>
.send-message-wrap {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0 14px;
  align-items: center;
  z-index: 999;
}
.message-list {
  position: fixed;
  left: 0;
  right: 0;
  top: 46px;
  bottom: 44px;
  overflow-y: auto;
}
.kefu {
  height: 100px;
  // background: pink;
  // position: relative;
  // top: 20px;
 img {
  width: 50px;
  height: 40px;
 

 }
}
.main {
  width: 100%;
 margin-top: -30px;
  .msg{
    font-size: 16px;
    float: right;
  right: 10px;
  clear: both;
  margin-top: 20px;
  // display:inline-block
    // margin-right: 0;
    img {
      width: 50px; height: 40px;
      
  }
  }
  
}
</style>

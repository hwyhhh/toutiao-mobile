<template>
  <div>
    <van-nav-bar left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 吐槽列表 -->
    <van-field
      v-model="message"
      rows="5"
      autosize
      label="吐槽"
      type="textarea"
      maxlength="100"
      placeholder="请输入内容"
      show-word-limit
    />
  <button>发送</button>
  </div>
</template>
<script>

export default {
  name: 'APP',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    }
  },
  created() {
  },
  mounted() {},
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

</style>

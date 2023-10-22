module.exports = {
  plugins: {
    // 该插件自动添加浏览器厂商声明前缀，原来兼容不同的浏览器
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },
    // 将px转换成rem
    'postcss-pxtorem': {
      // 转换的根元素基准值
      rootValue: 37.5,
      // 需要转换的css属性
      propList: ['*']
    }
  }
}

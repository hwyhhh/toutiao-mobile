import Vue from 'vue'
import App from './App.vue'
// import App from './App.vue'
import router from './router/index'
import store from './store/store'
import './styles/index.less'
import './assets/fonts/font.css'
// import './styles/font.css'
import ArticleItem from './components/ArticleItem.vue'
import Vant from 'vant'
import 'vant/lib/index.less'
// 自动设置rem基准值（html标签字体的大小）
import 'amfe-flexible'
import io from '../node_modules/weapp.socket.io/lib/weapp.socket.io'
Vue.prototype.socket = io('http://192.168.126.148:8082')
Vue.use(Vant)
Vue.config.productionTip = false
Vue.component('ArticleItem', ArticleItem)
// Vue.use(ElementUI)
// 定义全局自定义指令
Vue.directive('color', (el, binding) => {
  el.style.color = binding.value
})
// Vue.directive('color', {
//   mounted(el, binding) {
//     el.style.color = binding.value
//   }
// })

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')

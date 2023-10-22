import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '../utils/storage'

import register from '../views/register.vue'
import login from '../views/login.vue'
import detail from '../views/detail.vue'
import layout from '../views/layout.vue'
import article from '../views/article.vue'
import collect from '../views/collect.vue'
import like from '../views/like.vue'
import user from '../views/user.vue'

import community from '../views/community.vue'
import chat from '../views/user-chat.vue'
import tochat from '../components/Chat.vue'

import shareBar from '../components/shareBar.vue'
Vue.use(VueRouter)
const routes = [
  { path: '/', redirect: '/layout' },
  { path: '/register', component: register },
  { path: '/login', component: login },
  // { path: '/detail', component: detail },
  { path: '/detail/:id', component: detail },

  {
    path: '/layout',
    component: layout,
    children: [
      { path: '/', redirect: '/article' },
      { path: '/article', component: article },
      { path: '/collect', component: collect },
      { path: '/like', component: like },
      { path: '/chat', component: chat },
      { path: '/tochat', component: tochat },
      { path: '/shareBar', component: shareBar },
      { path: '/community', component: community },
      {
        path: '/user',
        component: user
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

const arr = ['/login', '/register']
router.beforeEach((to, from, next) => {
  if (getToken || arr.includes(to.path)) {
    next()
  } else {
    next('/login')
  }
})

export default router

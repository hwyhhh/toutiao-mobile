import axios from 'axios'
import { getToken } from './storage'
import { Toast } from 'vant'
import router from '../router/index'
const request = axios.create({
  baseURL: 'http://interview-api-t.itheima.net',
  timeout: 1000
  // headers: ['X-Custom-Header':'foobar']
})

request.interceptors.request.use(config => {
  if (getToken()) {
    config.headers.Authorization = `Bearer ${getToken()}`
  }
  return config
}, error => {
  return Promise.reject(error)
}
)

request.interceptors.response.use(response => {
  return response.data
}, error => {
  Toast.fail(error.response.data.message)
  if (error.response.status === 401) {
    Toast.fall('token过期，请重新登录')
    router.push('/login')
  }
  return Promise.reject(error)
}
)

export default request

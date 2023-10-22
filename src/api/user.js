import request from '../utils/request'
// 登录
export const UserLogin = ({ username, password }) => {
  return request.post('/h5/user/login', { username, password })
}
// 注册
export const UserRegister = ({ username, password }) => {
  return request.post('/h5/user/register', { username, password })
}

export const getUserInfo = () => {
  return request.get('/h5/user/currentUser')
}
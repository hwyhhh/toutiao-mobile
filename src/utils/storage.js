const KEY = 'interview-h5'

export const setToken = token => {
  localStorage.setItem(KEY, token)
}
export const getToken = token => {
  return localStorage.getItem(KEY)
}

export const removeToken = token => {
  localStorage.removeItem(KEY)
}

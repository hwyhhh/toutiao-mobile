import request from '../utils/request'

export const getArticleList = ({ current, pageSize, sorter }) => {
  return request.get('/h5/interview/query', {
    params: {
      current,
      pageSize,
      sorter,
    },
  })
}

export const getArticleInfo = (id) => {
  return request.get('/h5/interview/show', {
    params: {
      id
    }
  })
}

export const updateLike = (id) => {
  return request.post('/h5/interview/opt', {
    id,
    optType: 1
  })
}

export const updateCollect = (id) => {
  return request.post('/h5/interview/opt', {
    id,
    optType: 2
  })
}

export const getArticlesCollect = (obj) => {
  return request.get('/h5/interview/opt/list', {
    params: {
      page: obj.page,
      pageSize: 5,
      optType: 2
    }
  })
}

export const getArticleLike = (obj) => {
  return request.get('/h5/interview/opt/list', {
    params: {
      page: obj.page,
      pageSize: 5,
      optType: 1 
      //代表喜欢
    }
  })
}
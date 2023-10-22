import request from '../utils/request'

// export const getArticleListAPI = function(_page, _limit) {
//   return request.get('/v1_0/articles', {
//     params: {
//       _page: _page,
//       _limit: _limit
//     }
//   })
// }
export const getChannelById = params => {
  return request({
    method: 'GET',
    url: '/v1_0/articles',
    params
  })
}

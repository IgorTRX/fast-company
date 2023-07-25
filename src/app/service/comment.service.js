import httpService from './http.service'

const commentEndpoint = 'comment/'

const commentService = {
  createComment: async (commentData) => {
    const { data } = await httpService.put(
      commentEndpoint + commentData._id,
      commentData
    )
    return data
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: { orderBy: '"pageId"', equalTo: `"${pageId}"` }
    })
    return data
  }
}

export default commentService

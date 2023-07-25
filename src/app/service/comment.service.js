import httpService from './http.service'

const commentEndpoint = 'comment/'

const commentService = {
  createComment: async (commentData) => {
    const { data } = await httpService.put(
      commentEndpoint + commentData._id,
      commentData
    )
    return data
  }
}

export default commentService

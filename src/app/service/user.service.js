import httpService from './http.service'

// endpoint
const userEndpoint = 'user/'

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint)
    return data
  }
}

export default userService

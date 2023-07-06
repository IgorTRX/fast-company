import httpService from './http.cervice'

// endpoint
const userEndpoint = 'user/'

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint)
    return data
  }
}

export default userService

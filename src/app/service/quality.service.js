import httpService from './http.cervice'

// endpoint
const qualityEndpoint = 'quality/'

const qualityService = {
  get: async () => {
    const { data } = await httpService.get(qualityEndpoint)
    return data
  }
}

export default qualityService

import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import { httpAuth } from '../hooks/useAuth'

const http = axios.create({
  baseURL: configFile.apiEndPoint
})

// перехватчик запроса с трансформацией config
http.interceptors.request.use(
  async function (config) {
    if (configFile.isFareBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
      const expiresData = localStorageService.getTokenExpiresDate()
      const refreshToken = localStorageService.getRefreshToken()
      if (refreshToken && expiresData < Date.now()) {
        const { data } = await httpAuth.post('token', {
          grant_type: 'refresh_token',
          refresh_token: refreshToken
        })
        localStorageService.setTokens({
          refreshToken: data.refresh_token,
          idToken: data.id_token,
          expiresIn: data.expires_in,
          localId: data.user_id
        })
      }
      const accessToken = localStorageService.getAccessToken()
      if (accessToken) {
        config.params = { ...config.params, auth: accessToken }
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// трансформация ответа
function transformData(data) {
  return data && !data._id
    ? Object.keys(data).map((key) => ({ ...data[key] }))
    : data
}
// перехватчик ответа
http.interceptors.response.use(
  (res) => {
    if (configFile.apiEndPoint) {
      res.data = { content: transformData(res.data) }
    }
    return res
  },
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      console.log(error)
      // toast.info('Unexpected error. Try it later')
      // toast.error('Unexpected error. Try it later')
      toast('Unexpected error')
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
}

export default httpService

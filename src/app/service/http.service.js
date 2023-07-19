import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

const http = axios.create({
  baseURL: configFile.apiEndPoint
})

// перехватчик запроса с трансформацией config
http.interceptors.request.use(
  function (config) {
    if (configFile.isFareBase) {
      const containSlash = /\/$/gi.test(config.url)
      config.url =
        (containSlash ? config.url.slice(0, -1) : config.url) + '.json'
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// трансформация ответа
function transformData(data) {
  return data ? Object.keys(data).map((key) => ({ ...data[key] })) : []
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
  delete: http.delete
}

export default httpService

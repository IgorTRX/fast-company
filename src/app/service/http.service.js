import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'

axios.defaults.baseURL = configFile.apiEndPoint

// перехватчик запроса с трансформацией config
axios.interceptors.request.use(
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
axios.interceptors.response.use(
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
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
}

export default httpService

import axios from 'axios'
// import logger from './log.service'
import { toast } from 'react-toastify'
import config from '../config.json'

axios.defaults.baseURL = config.apiEndPoint

axios.interceptors.response.use(
  (res) => res,
  function (error) {
    const expectedErrors =
      error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      console.log(error)
      // toast.info('Unexpected error. Try it later')
      toast.error('Unexpected error. Try it later')
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

import axios from 'axios'

const axiosApi = axios.create({
  baseURL: process.env.API_BASE_URL,
})

export default axiosApi

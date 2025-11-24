import axios from 'axios'

const api = import.meta.env.VITE_API_URL
const CustomApi = axios.create({
  baseURL: `${api}/api`,
})

export default CustomApi

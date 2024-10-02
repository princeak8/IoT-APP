import axios from 'axios'
import { useAuthStore } from './stores/auth'

const apiService = axios.create({
  baseURL: 'http://localhost/iot-api/public/api',
})

apiService.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers['Authorization'] = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default apiService
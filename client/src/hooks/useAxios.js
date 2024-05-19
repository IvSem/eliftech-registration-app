import { ref } from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:4000'

export const useAxios = (url, method = 'get', options = {}) => {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)
  const loadMore = ref(false)

  const fetchData = async (body = null, fetchOptions = {}) => {
    loading.value = true
    error.value = null
    try {
      const res = await axios({
        method,
        url,
        data: body,
        ...options,
        ...fetchOptions
      })
      if (!res.status === 200) {
        error.value = 'Fetch failed'
        throw new Error('Fetch failed')
      }
      data.value = res.data
    } catch (err) {
      if (err.response) {
        error.value = err.response.data
        throw new Error('Server responded with an error: ' + JSON.stringify(err.response.data))
      } else if (err.request) {
        error.value = 'No response received from the server'
        throw new Error('No response received from the server')
      } else {
        error.value = err.message
        throw new Error('Request setup error: ' + err.message)
      }
    } finally {
      loading.value = false
    }
  }

  return { data, error, loading, loadMore, fetchData }
}

import axios from 'axios'
import { ref } from 'vue'

export function useAxios(url, method = 'get', body = {}) {
  const data = ref(null)
  const error = ref(null)

  const axiosData = async () => {
    try {
      const response = await axios[method](url, body)
      data.value = response.data
    } catch (err) {
      error.value = err
    }
  }

  return { data, error, axiosData }
}

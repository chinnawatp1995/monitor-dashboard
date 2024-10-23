import axios from 'axios'
import { ref, onUnmounted } from 'vue'

export function usePollingFetch(
  url,
  method = 'get',
  body = {},
  interval = 30000,
) {
  const data = ref(null)
  const isLoading = ref(true)
  const hasError = ref(false)
  const errorMessage = ref('')
  let polling

  const fetchData = async () => {
    isLoading.value = true
    hasError.value = false
    try {
      const response = await axios[method](url, body)
      data.value = response.data
    } catch (err) {
      hasError.value = true
      errorMessage.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  const startPolling = () => {
    fetchData()
    polling = setInterval(fetchData, interval)
  }

  const stopPolling = () => {
    if (polling) {
      clearInterval(polling)
    }
  }

  onUnmounted(stopPolling)

  return {
    data,
    isLoading,
    hasError,
    errorMessage,
    startPolling,
    stopPolling,
  }
}

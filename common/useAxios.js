import axios from 'axios'

export async function useAxious(url, method = 'get', body = {}) {
  const res = await axios[method](url, method, body)
  const data = res.data
  return data
}

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})

export const useFiltelterStore = defineStore('filter', () => {
  const service = ref('All')
  const start = ref('')
  const end = ref('')
  const resolution = ref('1 hour')

  return { service, start, end, resolution }
})

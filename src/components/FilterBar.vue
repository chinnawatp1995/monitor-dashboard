<template>
  <div class="input-wrapper">
    <div class="text">
      <p>service</p>
    </div>
    <div class="dropdown">
      <Dropdown
        v-model="selectedService"
        :options="services"
        placeholder="All"
        class="w-full md:w-14rem"
        @update:model-value="onServiceChange"
      />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, onBeforeUnmount } from 'vue'
import { ref } from 'vue'

const selectedService = ref()
const services = ref(['All'])
const emit = defineEmits(['update-service'])
const timerId = ref()

function onServiceChange(service) {
  selectedService.value = service
  emit('update-service', service)
}

function startPolling() {
  timerId.value = setInterval(async () => {
    await fetchData()
  }, 1_000 * 5)
}

function stopPolling() {
  clearInterval(timerId.value)
}

async function fetchData() {
  let res = await axios.get('http://localhost:3010/monitor-server/services')
  services.value = ['All', ...res.data]
}

onMounted(async () => {
  try {
    await fetchData()
    startPolling()
  } catch (e) {
    console.log(e)
  }
})

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<style>
.input-wrapper {
  display: flex;
  align-items: center;
  color: rgb(50, 50, 50);
  /* width: 25%; */
  margin-left: 2em;
  padding: 2.75em 1.5em;
  background-color: rgb(252, 252, 252);
  border-radius: 0.5em;
}
.dropdown {
  margin-left: 1em;
}
</style>

<template>
  <DataTable
    :value="server"
    class="p-datatable-sm"
    paginator
    :rows="3"
    :totalRecords="server.length"
    :lazy="false"
    :rowsPerPageOptions="[3, 6, 9]"
  >
    <Column field="machine_id" header="Machine ID"></Column>
    <Column header="Status">
      <template #body="slotProps">
        <i
          :class="{
            'pi pi-check-circle': slotProps.data.status,
            'pi pi-times-circle': !slotProps.data.status,
          }"
          :style="{ color: slotProps.data.status ? 'green' : 'red' }"
        ></i>
      </template>
    </Column>
    <Column field="time" header="Time"></Column>
  </DataTable>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watch, onBeforeUnmount } from 'vue'
import 'primeicons/primeicons.css'

const server = ref([])
const props = defineProps(['service'])
const pollingInterval = 5000
let pollingTimer = null

async function fetchServerData() {
  try {
    let res = undefined
    if (!props.service || props.service === 'All') {
      res = await axios.post(
        'http://localhost:3010/monitor-server/server-status',
      )
    } else {
      const machines = (
        await axios.get(
          `http://localhost:3010/monitor-server/machines?service=${props.service}`,
        )
      ).data
      res = await axios.post(
        'http://localhost:3010/monitor-server/server-status',
        { machineIds: [...machines] },
      )
    }
    const data = res.data.map(d => {
      d.time = d.time.split('T')[1]
      d.time = d.time.split('.')[0]
      return d
    })
    server.value = data
  } catch (e) {
    console.log(e)
  }
}

function startPolling() {
  pollingTimer = setInterval(fetchServerData, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
  }
}

onMounted(() => {
  fetchServerData()
  startPolling()
})

watch(
  () => props.service,
  () => {
    fetchServerData()
  },
)

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<style></style>

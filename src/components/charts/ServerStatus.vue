<template>
  <div class="summary">
    <div class="map-badge">
      <p class="space-right">Total Server :</p>
      <Badge :value="totalServer" severity="secondary"></Badge>
    </div>
    <div class="map-badge">
      <p class="space-right">Up :</p>
      <Badge :value="upServer" severity="success"></Badge>
    </div>
    <div class="map-badge">
      <p class="space-right">Down :</p>
      <Badge :value="downServer" severity="danger"></Badge>
    </div>
  </div>
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
import { urls } from '../../urls'
const server = ref([])
const totalServer = ref(0)
const upServer = ref(0)
const downServer = ref(0)
const props = defineProps(['service'])
const pollingInterval = 5000
let pollingTimer = null

async function fetchServerData() {
  let up = 0
  let down = 0
  try {
    let res = undefined
    if (!props.service || props.service === 'All') {
      res = await axios.post(urls.getServerStatus())
    } else {
      const machines = (await axios.get(urls.getMachines(props.service))).data

      res = await axios.post(urls.getServerStatus(), {
        machineIds: [...machines],
      })
    }
    const data = res.data.map(d => {
      d.time = d.time.split('T')[1]
      d.time = d.time.split('.')[0]
      if (d.status) {
        up++
      } else {
        down++
      }
      return d
    })
    server.value = data
    totalServer.value = data.length
    upServer.value = up
    downServer.value = down
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

<style>
.summary {
  margin-bottom: 2em;
}
.map-badge {
  display: flex;
  align-items: center;
}
.space-right {
  line-height: 0.1em;
  margin-right: 1em;
}
</style>

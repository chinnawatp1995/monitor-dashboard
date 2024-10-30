<template>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    class="h-[10 rem]"
  />
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue'
import { urls } from '../../urls'
import { updateLineChart } from '../../utils/util-functions'
const responseAvgData = ref()
const chartData = ref()
const chartOptions = ref()

const props = defineProps(['service', 'startTime', 'endTime', 'resolution'])

const pollingInterval = 5000
let pollingTimer = null

async function fetchResponseData() {
  try {
    let res = undefined
    if (!props.service || props.service === 'All') {
      res = await axios.post(urls.getAvgResponse(), {
        startTime: props.startTime,
        endTime: props.endTime,
        resolution: props.resolution,
      })
    } else {
      const machines = (await axios.get(urls.getMachines(props.service))).data
      res = await axios.post(urls.getAvgResponse(), {
        startTime: props.startTime,
        endTime: props.endTime,
        resolution: props.resolution,
        services: [props.service],
        machineIds: [...machines],
      })
    }
    Object.entries(res.data).forEach(([k, v]) => {
      v.forEach(c => {
        c.bucket = c.bucket.split('.')[0]
      })
    })
    responseAvgData.value = res.data
    return res.data
  } catch (e) {
    console.error('Error fetching response data:', e)
  }
}

const updateChart = () => {
  updateLineChart(
    responseAvgData,
    chartData,
    chartOptions,
    'avg',
    'time',
    'Response Time (ms)',
  )
}

function startPolling() {
  pollingTimer = setInterval(async () => {
    await fetchResponseData()
    updateChart()
  }, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
  }
}

onMounted(async () => {
  await fetchResponseData()
  updateChart()
  startPolling()
})

watch(
  () => props.service,
  async () => {
    await fetchResponseData()
    updateChart()
  },
)

watch(
  () => responseAvgData.value,
  () => {
    updateChart()
  },
)

watch(
  [() => props.startTime, () => props.endTime, () => props.resolution],
  async () => {
    await fetchResponseData()
    updateChart()
  },
)

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<style>
.filter {
  display: inline;
}

.arrow {
  margin-left: 1em;
  margin-right: 1em;
}

.resolution {
  margin-top: 1em;
}
</style>

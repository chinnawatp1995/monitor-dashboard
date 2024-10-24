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
const totalReqData = ref([])
const chartData = ref()
const chartOptions = ref()

const props = defineProps(['service', 'startTime', 'endTime', 'resolution'])

const pollingInterval = 5000
let pollingTimer = null

async function fetchCpuData() {
  try {
    let res = undefined
    if (!props.service || props.service === 'All') {
      res = await axios.post(urls.getTotalRequest(), {
        startTime: props.startTime,
        endTime: props.endTime,
        resolution: props.resolution,
      })
    } else {
      const machines = (await axios.get(urls.getMachines(props.service))).data
      res = await axios.post(urls.getTotalRequest(), {
        startTime: props.startTime,
        endTime: props.endTime,
        resolution: props.resolution,
        machineIds: [...machines],
      })
    }
    Object.entries(res.data).forEach(([k, v]) => {
      v = v.map(c => {
        // c.bucket = c.bucket.split('T')[1]
        c.bucket = c.bucket.split('.')[0]
      })
    })
    totalReqData.value = res.data
    return res.data
  } catch (e) {
    console.log(e)
  }
}

const updateChart = () => {
  updateLineChart(totalReqData, chartData, chartOptions, 'total_requests')
}

function startPolling() {
  pollingTimer = setInterval(async () => {
    await fetchCpuData()
    updateChart()
  }, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
  }
}

onMounted(async () => {
  await fetchCpuData()
  updateChart()
  startPolling()
})

watch(
  () => props.service,
  async () => {
    await fetchCpuData()
    updateChart()
  },
)

watch(
  () => totalReqData.value,
  () => {
    updateChart()
  },
)

watch(
  () => props.startTime,
  () => {
    fetchCpuData()
  },
)

watch(
  () => props.endTime,
  () => {
    fetchCpuData()
  },
)

watch(
  () => props.resolution,
  newValue => {
    fetchCpuData()
    console.log(newValue)
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

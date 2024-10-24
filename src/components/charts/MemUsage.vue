<template>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    class="h-[10rem]"
  />
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue'
import { urls } from '../../urls'
import { useAxios } from '../../composables/useAxios'
import { updateLineChart } from '../../utils/util-functions'
const memData = ref({})
const chartData = ref({
  labels: [],
  datasets: [],
})
const chartOptions = ref({})

const props = defineProps(['service', 'startTime', 'endTime', 'resolution'])

const pollingInterval = 5000
let pollingTimer = null

async function fetchMemData() {
  const { data, error, axiosData } = useAxios(urls.getMemUsage(), 'post', {
    startTime: props.startTime,
    endTime: props.endTime,
    resolution: props.resolution,
    machineIds:
      props.service !== 'All'
        ? (await axios.get(urls.getMachines(props.service))).data
        : undefined,
  })

  await axiosData()

  if (error.value) {
    console.error('Error fetching memory data:', error.value)
    return
  }

  Object.entries(data.value).forEach(([k, v]) => {
    v.forEach(c => {
      c.bucket = c.bucket.split('.')[0]
    })
  })

  memData.value = data.value
  updateChart()
}

const updateChart = () => {
  updateLineChart(memData, chartData, chartOptions)
}

function startPolling() {
  stopPolling()
  pollingTimer = setInterval(fetchMemData, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
  }
}

watch(() => props.service, fetchMemData)
watch(() => props.startTime, fetchMemData)
watch(() => props.endTime, fetchMemData)
watch(() => props.resolution, fetchMemData)
watch(memData, updateChart)

onMounted(() => {
  fetchMemData()
  startPolling()
})

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<template>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    class="chart-heigh"
  />
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue'
import { urls } from '../../urls'
import { useAxios } from '../../composables/useAxios'
import { updateLineChart } from '../../utils/util-functions'
const cpuData = ref({})
const chartData = ref({
  labels: [],
  datasets: [],
})
const chartOptions = ref({})

const props = defineProps(['service', 'startTime', 'endTime', 'resolution'])

const pollingInterval = 5000
let pollingTimer = null

const fetchCpuData = async () => {
  const { data, error, axiosData } = useAxios(urls.getCpuUsage(), 'post', {
    startTime: props.startTime,
    endTime: props.endTime,
    resolution: props.resolution,
    machines:
      props.service !== 'All'
        ? (await axios.get(urls.getMachines(props.service))).data
        : undefined,
  })

  await axiosData()

  if (error.value) {
    console.error('Error fetching CPU data:', error.value)
    return
  }

  cpuData.value = data.value
  // console.log(cpuData.value)
  // cpuData.value.forEach(item => {
  //   item.time = convertTimeZone(item.time, 'Asia/Bangkok')
  // })
  updateChart()
}

const updateChart = () => {
  updateLineChart(
    cpuData,
    chartData,
    chartOptions,
    'value',
    'time',
    'CPU Usage (%)',
  )
}

function startPolling() {
  stopPolling()
  pollingTimer = setInterval(fetchCpuData, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
  }
}

watch(() => props.service, fetchCpuData)
watch(() => props.startTime, fetchCpuData)
watch(() => props.endTime, fetchCpuData)
watch(() => props.resolution, fetchCpuData)
watch(cpuData, updateChart)
onMounted(() => {
  fetchCpuData()
  startPolling()
})

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<style scoped>
.chart-heigh {
  height: 40vh;
}
</style>

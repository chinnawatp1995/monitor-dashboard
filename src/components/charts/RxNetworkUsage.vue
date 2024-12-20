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

const networkData = ref({})
const chartData = ref({
  labels: [],
  datasets: [],
})
const chartOptions = ref({})

const props = defineProps(['service', 'startTime', 'endTime', 'resolution'])

const pollingInterval = 5000
let pollingTimer = null

const fetchNetworkData = async () => {
  console.log('fetchNetworkData')
  const { data, error, axiosData } = useAxios(
    urls.getRxNetworkUsage(),
    'post',
    {
      startTime: props.startTime,
      endTime: props.endTime,
      resolution: props.resolution,
      machines:
        props.service !== 'All'
          ? (await axios.get(urls.getMachines(props.service))).data
          : undefined,
    },
  )

  await axiosData()

  if (error.value) {
    console.error('Error fetching network data:', error.value)
    return
  }

  networkData.value = data.value
  updateChart()
}

const updateChart = () => {
  updateLineChart(
    networkData,
    chartData,
    chartOptions,
    'value',
    'time',
    'Rx Network Usage (bytes)',
  )
}

function startPolling() {
  stopPolling()
  pollingTimer = setInterval(fetchNetworkData, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
  }
}

watch(() => props.service, fetchNetworkData)
watch(() => props.startTime, fetchNetworkData)
watch(() => props.endTime, fetchNetworkData)
watch(() => props.resolution, fetchNetworkData)
watch(networkData, updateChart)
onMounted(() => {
  fetchNetworkData()
  console.log('fetchNetworkData')
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

<template>
  <Chart
    type="pie"
    :data="chartData"
    :options="chartOptions"
    class="w-32 h-32"
  />
</template>

<script setup>
import axios from 'axios'
import { defineProps, ref, onMounted, watch, onBeforeUnmount } from 'vue'
import { urls } from '../../urls'
const pathData = ref()
const props = defineProps(['service'])

const pollingInterval = 5000
let pollingTimer = null

const chartData = ref()
const chartOptions = ref()

const updateChart = () => {
  chartData.value = {
    labels: pathData.value.map(p => p.path),
    datasets: [
      {
        data: pathData.value.map(p => p.total),
        backgroundColor: '', // Define your background colors here
        hoverBackgroundColor: '', // Define hover background colors here
      },
    ],
  }
  chartOptions.value = setChartOptions()
}

const fetchPathData = async () => {
  try {
    const res = await axios.get(urls.getPaths(props.service))
    pathData.value = res.data
  } catch (e) {
    console.log(e)
  }
}

function startPolling() {
  pollingTimer = setInterval(async () => {
    await fetchPathData()
    updateChart()
  }, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval()
  }
}

const setChartOptions = () => {
  return {
    plugins: {
      legend: {
        position: 'right',
        labels: {
          usePointStyle: true,
          color: '', // Define the color for legend labels
        },
      },
    },
  }
}

onMounted(async () => {
  await fetchPathData()
  updateChart()
  startPolling()
})

// Watch for changes in the service prop and fetch data again
watch(
  () => props.service,
  newService => {
    if (newService) {
      fetchPathData()
    }
  },
)

watch(
  () => pathData.value,
  () => {
    updateChart()
  },
)

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<style></style>

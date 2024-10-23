<template></template>

<script setup>
import axios from 'axios'
import { ref, watch, defineProps, onMounted, onBeforeUnmount } from 'vue'
import { urls } from '../../urls'
const props = defineProps(['service'])
const resDistData = ref()
// const chartData = ref()
// const chartOptions = ref()
let pollingTimer = undefined
const pollingTime = 5 * 1_000
function updateChart() {}

function startPolling() {
  pollingTimer = setInterval(() => {
    fetchResponseDist()
  }, pollingTime)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
  }
}

// function setupChartOptions() {
//   debugger
// }

async function fetchResponseDist() {
  try {
    let res = undefined
    if (props.service && props.service !== 'All') {
      res = await axios.post(urls.getDistResponse(), {
        startTime: '2024-10-07 21:27:53.602+00',
        endTime: '2024-10-10 21:28:53.602+00',
        resolution: '1 second',
        //  "services": ["jobA"],
        //  "machineIds": ["machine_02", "machine_01"]
      })
    } else {
      res = await axios.post(urls.getDistResponse(), {
        startTime: '2024-10-07 21:27:53.602+00',
        endTime: '2024-10-10 21:28:53.602+00',
        resolution: '1 second',
        services: [props.service],
        //  "machineIds": ["machine_02", "machine_01"]
      })
    }
    resDistData.value = res.data
    return resDistData.value
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  fetchResponseDist()
  updateChart()
  startPolling()
})

onBeforeUnmount(() => {
  stopPolling()
})

watch(
  () => props.service,
  () => {
    fetchResponseDist()
    updateChart()
  },
)
</script>

<style></style>

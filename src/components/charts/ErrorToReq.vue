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
import { defineProps, ref, onMounted, watch } from 'vue'
import { urls } from '../../urls'
const ErrorReqRatio = ref()
const props = defineProps(['service'])

const chartData = ref()
const chartOptions = ref()

const fetchPathData = async () => {
  try {
    const res = await axios.get(urls.getErrorRate(props.service))
    ErrorReqRatio.value = res.data
    // console.log(res.data)
    chartData.value = {
      labels: ['total errors', 'total requests'],
      datasets: [
        {
          data: [
            ErrorReqRatio.value.total_errors,
            ErrorReqRatio.value.total_requests,
          ],
          backgroundColor: '', // Define your background colors here
          hoverBackgroundColor: '', // Define hover background colors here
        },
      ],
    }
    chartOptions.value = setChartOptions()
  } catch (e) {
    console.log(e)
  }
}

const setChartOptions = () => {
  return {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          color: '', // Define the color for legend labels
        },
      },
    },
  }
}

// Fetch data when component is mounted
onMounted(() => {
  fetchPathData()
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
</script>

<style></style>

<template>
  <Chart type="bar" :data="chartData" :options="chartOptions" />
</template>

<script setup>
import axios from 'axios'
import { defineProps, ref, onMounted, watch } from 'vue'
import {
  red,
  theme1,
  theme2,
  theme3,
} from '../../assets/color-palette/palette-1'
import { urls } from '../../urls'

const errorRanking = ref()
const props = defineProps(['service'])

const chartData = ref()
const chartOptions = ref()
const fetchPathData = async () => {
  try {
    const res = await axios.get(urls.getErrorRanking(props.service))
    errorRanking.value = res.data
    chartData.value = {
      labels: errorRanking.value.map(v => v.error_message),
      datasets: [
        {
          data: errorRanking.value.map(v => v.error_count),
          backgroundColor: theme1,
          hoverBackgroundColor: '',
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
        position: 'bottom',
        labels: {
          usePointStyle: true,
          color: '',
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

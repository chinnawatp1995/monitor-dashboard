<template>
  <div id="chart">
    <apexchart
      type="pie"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted, watch } from 'vue'
import { urls } from '../../urls'

const props = defineProps(['service'])

const series = ref()
const chartRef = ref(null)
const chartOptions = ref({
  chart: {
    width: '100%',
    type: 'pie',
  },
  labels: [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
})

async function fetchData() {
  const res = await axios.get(urls.getErrorRanking(props.service))
  const data = res.data

  const dataset = []
  const labels = []
  data.forEach(r => {
    dataset.push(Number(r.value))
    labels.push(r.error_title)
  })
  series.value = dataset
  chartOptions.value = {
    ...chartOptions.value,
    labels,
  }
}

watch(
  () => props.service,
  () => {
    fetchData()
  },
)

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div id="chart">
    <apexchart
      type="pie"
      width="380"
      ref="chartRef"
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
    width: 380,
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
  const res = await axios.get(urls.getPaths(props.service))
  const data = res.data

  const dataset = []
  const labels = []
  data.forEach(r => {
    dataset.push(r.path)
    labels.push(r.value)
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

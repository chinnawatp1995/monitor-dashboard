<template>
  <div class="head">
    <h2>Memory Usage</h2>
    <div class="filter">
      <Calendar id="start-24h" v-model="startTime" showTime hourFormat="24" />
      <i class="pi pi-arrow-right arrow" style="color: #708090"></i>
      <Calendar id="end-24h" v-model="endTime" showTime hourFormat="24" />
      <div class="resolution">
        <SelectButton
          v-model="resolution"
          :options="options"
          optionLabel="name"
          optionValue="value"
          aria-labelledby="multiple"
        />
      </div>
    </div>
  </div>
  <Chart
    type="line"
    :data="chartData"
    :options="chartOptions"
    class="h-[10rem]"
  />
</template>

<script setup>
import axios from 'axios'
import { subMonths } from 'date-fns'
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue'
import { theme1, theme2, theme3 } from '../../assets/color-palette/palette-1'
import { urls } from '../../urls'
import { useAxios } from '../../composables/useAxios'

const memData = ref({})
const chartData = ref({
  labels: [],
  datasets: [],
})
const chartOptions = ref({})

const startTime = ref(subMonths(new Date(), 3))
const endTime = ref(new Date())

const props = defineProps(['service'])

const pollingInterval = 5000
let pollingTimer = null

const resolution = ref('1 hour')
const options = ref([
  { name: '1M', value: '1 minute' },
  { name: '1H', value: '1 hour' },
  { name: '1D', value: '1 week' },
  { name: '1W', value: '1 month' },
])

async function fetchMemData() {
  const { data, error, axiosData } = useAxios(urls.getMemUsage(), 'post', {
    startTime: startTime.value.toISOString(),
    endTime: endTime.value.toISOString(),
    resolution: resolution.value,
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

function updateChart() {
  try {
    const keys = Object.keys(memData.value)

    if (
      keys.length === 0 ||
      !memData.value[keys[0]] ||
      memData.value[keys[0]].length === 0
    ) {
      chartData.value = {
        labels: [],
        datasets: [],
      }
      return
    }

    let ii = 0
    const labels = memData.value[keys[0]].map(d => d.bucket)
    const datasets = Object.entries(memData.value).map(([k, v]) => {
      return {
        label: k,
        fill: false,
        borderColor: theme3[ii++ % theme3.length],
        fill: true,
        yAxisID: 'y',
        tension: 0.4,
        data: v.map(avg => avg.avg),
      }
    })

    chartData.value = {
      labels,
      datasets,
    }
    setChartOptions()
  } catch (e) {
    console.error('Error updating chart:', e)
  }
}

function setChartOptions() {
  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Time (HH:MM:SS)',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Mem Usage (%)',
        },
        min: 0,
        max: 100,
      },
    },
  }
}

function startPolling() {
  stopPolling() // Ensure any existing timer is cleared
  pollingTimer = setInterval(fetchMemData, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
    pollingTimer = null
  }
}

watch(() => props.service, fetchMemData)
watch(startTime, fetchMemData)
watch(endTime, fetchMemData)
watch(resolution, fetchMemData)
watch(memData, updateChart)

onMounted(() => {
  fetchMemData()
  startPolling()
})

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<style scoped>
.filter {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.arrow {
  margin: 0 1em;
}

.resolution {
  margin-top: 1em;
}
</style>

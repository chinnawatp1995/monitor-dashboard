<template>
  <div class="head">
    <h2>CPU Usage</h2>
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
    class="h-[100 rem]"
  />
</template>

<script setup>
import axios from 'axios'
import { subMonths } from 'date-fns'
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue'
import { theme1, theme2, theme3 } from '../../assets/color-palette/palette-1'

const cpuData = ref([])
const chartData = ref()
const chartOptions = ref()

const startTime = ref(subMonths(new Date(), 3))
const endTime = ref(new Date())

const props = defineProps(['service'])

const pollingInterval = 5000
let pollingTimer = null

const resolution = ref('1 hour')
const options = ref([
  { name: '1S', value: '1 second' },
  { name: '1M', value: '1 minute' },
  { name: '1H', value: '1 hour' },
  { name: '1D', value: '1 week' },
  { name: '1W', value: '1 month' },
])

async function fetchCpuData() {
  try {
    let res = undefined
    if (!props.service || props.service === 'All') {
      res = await axios.post('http://localhost:3010/monitor-server/cpu-usage', {
        startTime: startTime.value.toISOString(),
        endTime: endTime.value.toISOString(),
        resolution: resolution.value,
      })
    } else {
      const machines = (
        await axios.get(
          `http://localhost:3010/monitor-server/machines?service=${props.service}`,
        )
      ).data
      res = await axios.post('http://localhost:3010/monitor-server/cpu-usage', {
        startTime: startTime.value.toISOString(),
        endTime: endTime.value.toISOString(),
        resolution: resolution.value,
        machineIds: [...machines],
      })
    }
    Object.entries(res.data).forEach(([k, v]) => {
      v = v.map(c => {
        // c.bucket = c.bucket.split('T')[1]
        c.bucket = c.bucket.split('.')[0]
      })
    })
    cpuData.value = res.data
    return res.data
  } catch (e) {
    console.log(e)
  }
}

function updateChart() {
  try {
    const keys = Object.keys(cpuData.value)

    if (
      keys.length === 0 ||
      !cpuData.value[keys[0]] ||
      cpuData.value[keys[0]].length === 0
    ) {
      chartData.value = {
        labels: [],
        datasets: [],
      }
      return
    }
    let ii = 0
    const labels = cpuData.value[keys[0]].map(d => d.bucket)
    const datasets = Object.entries(cpuData.value).map(([k, v]) => {
      return {
        label: k,
        fill: false,
        borderColor: theme3[ii++ % theme3.length],
        fill: true,
        // backgroundColor: theme3[ii++ % theme3.length],
        yAxisID: '%',
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
    console.log(e)
  }
}

function setChartOptions() {
  chartOptions.value = {
    responsive: true,
    maintainAspectRatio: true,
    animation: false, // Disable animation
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
          text: 'CPU Usage (%)',
        },
        min: 0,
        max: 100,
      },
    },
  }
}

function startPolling() {
  pollingTimer = setInterval(async () => {
    await fetchCpuData()
    updateChart()
  }, pollingInterval)
}

function stopPolling() {
  if (pollingTimer) {
    clearInterval(pollingTimer)
  }
}

onMounted(async () => {
  await fetchCpuData()
  updateChart()
  startPolling()
})

watch(
  () => props.service,
  async () => {
    await fetchCpuData()
    updateChart()
  },
)

watch(
  () => cpuData.value,
  () => {
    updateChart()
  },
)

watch(
  () => startTime.value,
  () => {
    fetchCpuData()
  },
)

watch(
  () => endTime.value,
  () => {
    fetchCpuData()
  },
)

watch(
  () => resolution.value,
  newValue => {
    fetchCpuData()
    console.log(newValue)
  },
)

onBeforeUnmount(() => {
  stopPolling()
})
</script>

<style>
.filter {
  display: inline;
}

.arrow {
  margin-left: 1em;
  margin-right: 1em;
}

.resolution {
  margin-top: 1em;
}
</style>

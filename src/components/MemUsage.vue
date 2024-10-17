<template>
  <div class="head">
    <h2>Mem Usage</h2>
    <div class="filter">
      <Calendar
        id="calendar-24h"
        v-model="datetime24h"
        showTime
        hourFormat="24"
      />
      <i class="pi pi-arrow-right arrow" style="color: #708090"></i>
      <Calendar
        id="calendar-24h"
        v-model="datetime24h"
        showTime
        hourFormat="24"
      />
      <div class="resolution"></div>
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
import { ref, onMounted, onBeforeUnmount, watch, defineProps } from 'vue'

const cpuData = ref([])
const chartData = ref()
const chartOptions = ref()

const props = defineProps(['service'])

const pollingInterval = 5000
let pollingTimer = null

async function fetchCpuData() {
  try {
    let res = undefined
    if (!props.service || props.service === 'All') {
      res = await axios.post('http://localhost:3010/monitor-server/mem-usage', {
        startTime: '2024-10-08 21:27:53.602+00',
        endTime: '2024-10-09 21:28:53.602+00',
        resolution: '1 hour',
      })
    } else {
      const machines = (
        await axios.get(
          `http://localhost:3010/monitor-server/machines?service=${props.service}`,
        )
      ).data
      res = await axios.post('http://localhost:3010/monitor-server/mem-usage', {
        startTime: '2024-10-08 21:27:53.602+00',
        endTime: '2024-10-09 21:28:53.602+00',
        resolution: '1 hour',
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
    const labels = cpuData.value[keys[0]].map(d => d.bucket)
    const datasets = Object.entries(cpuData.value).map(([k, v]) => {
      return {
        label: k,
        fill: false,
        borderColor: '#f22222',
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
</style>

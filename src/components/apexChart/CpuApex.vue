<template>
  <div id="chart">
    <div class="toolbar">
      <button
        id="one_month"
        @click="updateData('one_month')"
        :class="{ active: selection === 'one_month' }"
      >
        1M
      </button>

      <button
        id="six_months"
        @click="updateData('six_months')"
        :class="{ active: selection === 'six_months' }"
      >
        6M
      </button>

      <button
        id="one_year"
        @click="updateData('one_year')"
        :class="{ active: selection === 'one_year' }"
      >
        1Y
      </button>

      <button
        id="ytd"
        @click="updateData('ytd')"
        :class="{ active: selection === 'ytd' }"
      >
        YTD
      </button>
      <button
        id="all"
        @click="updateData('three_days')"
        :class="{ active: selection === 'three_days' }"
      >
        3D
      </button>
      <button
        id="all"
        @click="updateData('one_week')"
        :class="{ active: selection === 'one_week' }"
      >
        1W
      </button>
    </div>

    <apexchart
      type="area"
      height="500"
      width="100%"
      ref="chartRef"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { urls } from '../../urls'
import { useAxios } from '../../composables/useAxios'
import axios from 'axios'
import { subDays, subMonths, subWeeks, subYears } from 'date-fns'

const cpuData = ref({})
const series = ref([])
const chartRef = ref(null)
const selection = ref('one_week')
const chartOptions = ref({
  chart: {
    type: 'area',
    zoom: {
      autoScaleYaxis: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    type: 'datetime',
    tickAmount: 10,
  },
  tooltip: {
    x: {
      format: 'dd MMM yyyy hh:mm:ss',
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0.4,
      stops: [20, 100, 100, 100],
    },
  },
  stroke: {
    curve: 'smooth',
    width: 2.5,
  },
})

const props = defineProps(['service', 'startTime', 'endTime', 'resolution'])

const fetchCpuData = async (interval, totalPoint = 500, service) => {
  const { data, error, axiosData } = useAxios(urls.getCpuUsage(), 'post', {
    interval,
    totalPoint,
    machines:
      service !== 'All'
        ? (await axios.get(urls.getMachines(service))).data
        : undefined,
  })
  await axiosData()

  if (error.value) {
    console.error('Error fetching CPU data:', error.value)
    return
  }

  cpuData.value = data.value
  // console.log(cpuData.value)
  // cpuData.value.forEach(item => {
  //   item.time = convertTimeZone(item.time, 'Asia/Bangkok')
  // })
  series.value = Object.entries(cpuData.value).map(([k, v]) => {
    return {
      name: k,
      data: v.map(r => {
        return [new Date(r.bucket.split(' ')[0]).getTime(), Math.round(r.value)]
      }),
    }
  })
}
watch(
  () => props.service,
  () => {
    updateData(selection.value)
  },
)

onMounted(() => {
  updateData(selection.value)
})

const updateData = function (timeline) {
  selection.value = timeline
  const now = new Date()
  switch (timeline) {
    case 'one_month':
      fetchCpuData('1 month', 500, props.service)
      break
    case 'six_months':
      fetchCpuData('6 months', 500, props.service)
      break
    case 'one_year':
      fetchCpuData('1 year', 500, props.service)
      break
    case 'ytd':
      fetchCpuData('1 day', 500, props.service)
      break
    case 'three_days':
      fetchCpuData('3 days', 500, props.service)
      break
    case 'one_week':
      fetchCpuData('1 week', 500, props.service)
      break
    default:
  }
}
</script>

<style></style>

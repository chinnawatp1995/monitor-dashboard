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

const memData = ref({})
const series = ref([])
const chartRef = ref(null)
const selection = ref('one_year')
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
  yaxis: {
    labels: {
      style: {
        colors: '#8e8da4',
      },
      offsetX: 0,
      formatter: function (val) {
        return val.toFixed(2)
      },
    },
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

const fetchMemData = async (startTime, endTime, resolution, service) => {
  console.log(startTime, endTime)
  const { data, error, axiosData } = useAxios(urls.getMemUsage(), 'post', {
    startTime: startTime,
    endTime: endTime,
    resolution: resolution,
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

  memData.value = data.value
  // console.log(cpuData.value)
  // cpuData.value.forEach(item => {
  //   item.time = convertTimeZone(item.time, 'Asia/Bangkok')
  // })
  series.value = Object.entries(memData.value).map(([k, v]) => {
    return {
      name: k,
      data: v.map(r => {
        return [new Date(r.bucket.split(' ')[0]).getTime(), r.value]
      }),
    }
  })
  console.log(series.value)
}
watch(
  () => props.service,
  () => {
    fetchCpuData(
      props.startTime,
      props.endTime,
      props.resolution,
      props.service,
    )
  },
)

onMounted(() => {
  fetchMemData(
    subYears(new Date(), 1).toISOString(),
    new Date().toISOString(),
    '30 minutes',
    props.service,
  )
})

const updateData = function (timeline) {
  this.selection = timeline
  const now = new Date()
  switch (timeline) {
    case 'one_month':
      chartRef.value.zoomX(subMonths(now, 1).getTime(), now.getTime())
      break
    case 'six_months':
      chartRef.value.zoomX(subMonths(now, 6).getTime(), now.getTime())
      break
    case 'one_year':
      chartRef.value.zoomX(subYears(now, 1).getTime(), now.getTime())
      break
    case 'ytd':
      chartRef.value.zoomX(subDays(now, 1).getTime(), now.getTime())
      break
    case 'one_week':
      chartRef.value.zoomX(subWeeks(now, 1).getTime(), now.getTime())
      break
    default:
  }
}
</script>

<style></style>

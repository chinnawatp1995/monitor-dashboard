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

const series = ref([])
const chartRef = ref(null)
const totalPoint = ref(300)
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
  yaxis: {
    labels: {
      style: {
        colors: '#8e8da4',
      },
      offsetX: 0,
      formatter: function (val) {
        return val ? val.toFixed(2) : val
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

const props = defineProps(['url', 'service'])

const fetchData = async (interval, totalPoint = totalPoint.value, service) => {
  const { data, error, axiosData } = useAxios(props.url(), 'post', {
    interval,
    totalPoint,
    machines:
      service !== 'All'
        ? (await axios.get(urls.getMachines(props.service))).data
        : undefined,
  })
  await axiosData()

  if (error.value) {
    console.error('Error fetching data:', error.value)
    return
  }

  series.value = Object.entries(data.value).map(([k, v]) => {
    return {
      name: k,
      data: v.map(r => {
        return [new Date(r.bucket.split(' ')[0]).getTime(), r.value]
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
      fetchData('1 month', totalPoint.value, props.service)
      break
    case 'six_months':
      fetchData('6 months', totalPoint.value, props.service)
      break
    case 'one_year':
      fetchData('1 year', totalPoint.value, props.service)
      break
    case 'ytd':
      fetchData('1 day', totalPoint.value, props.service)
      break
    case 'three_days':
      fetchData('3 days', totalPoint.value, props.service)
      break
    case 'one_week':
      fetchData('1 week', totalPoint.value, props.service)
      break
    default:
  }
}
</script>

<style></style>

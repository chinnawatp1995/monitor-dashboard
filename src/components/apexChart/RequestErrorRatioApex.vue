<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      width="100%"
      ref="chartRef"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, watch, onMounted } from 'vue'
import { urls } from '../../urls'

const props = defineProps(['service'])

async function fetchData() {
  try {
    const res = await axios.post(urls.getRequestErrorRatio(), {
      interval: '1 week',
      machines:
        props.service !== 'All'
          ? (await axios.get(urls.getMachines(props.service))).data
          : undefined,
    })
    const successDataset = { name: 'Success', data: [] }
    const errorDataset = { name: 'Errors', data: [] }
    const dates = []

    res.data.forEach(r => {
      dates.push(r.bucket)
      successDataset.data.push(r.total_request - r.total_error)
      errorDataset.data.push(r.total_error)
    })

    series.value = [successDataset, errorDataset]
    chartOptions.value = {
      ...chartOptions.value,
      xaxis: { type: 'datetime', categories: dates },
    }
  } catch (e) {
    console.log(e)
  }
}

const series = ref([])
const chartRef = ref(null)
const selection = ref('one_week')
const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
    stacked: true,
    toolbar: {
      show: true,
    },
    zoom: {
      enabled: true,
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        legend: {
          position: 'bottom',
          offsetX: -10,
          offsetY: 0,
        },
      },
    },
  ],
  plotOptions: {
    bar: {
      horizontal: false,
      borderRadius: 1,
      borderRadiusApplication: 'end', // 'around', 'end'
      borderRadiusWhenStacked: 'last', // 'all', 'last'
      dataLabels: {
        total: {
          enabled: true,
          style: {
            fontSize: '13px',
            fontWeight: 900,
          },
        },
      },
    },
  },
  xaxis: {
    type: 'datetime',
    categories: [
      '01/01/2011 GMT',
      '01/02/2011 GMT',
      '01/03/2011 GMT',
      '01/04/2011 GMT',
      '01/05/2011 GMT',
      '01/06/2011 GMT',
    ],
  },
  legend: {
    position: 'right',
    offsetY: 40,
  },
  fill: {
    opacity: 1,
  },
})

watch(
  () => props.service,
  () => fetchData(),
)

onMounted(() => {
  fetchData()
})
</script>

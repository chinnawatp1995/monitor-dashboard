<template>
  <div id="chart">
    <apexchart
      type="bar"
      height="350"
      width="100%"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const props = defineProps(['url'])

async function fetchData() {
  try {
    const res = await axios.post(props.url(), {
      interval,
      totalPoint,
      machines:
        service !== 'All'
          ? (await axios.get(urls.getMachines(props.service))).data
          : undefined,
    })
    const reqDataset = { name: 'Requests', data: [] }
    const errorDataset = { name: 'Errors', data: [] }
    const dates = []

    res.data.forEach(r => {
      dates.push(r.bucket)
      reqDataset.data.push(r.total_request)
      errorDataset.data.push(r.total_error)
    })

    series.value = [reqDataset, errorDataset]
    chartOptions.xaxis = {
      type: 'datetime',
      categories: dates,
    }
  } catch (e) {
    console.log(e)
  }
}

const series = ref([])
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
      borderRadius: 10,
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
</script>

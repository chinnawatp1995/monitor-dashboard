import { theme1, theme2, theme3 } from '../assets/color-palette/palette-1'

export function updateLineChart(
  dataRef,
  chartData,
  chartOptions,
  field = 'avg',
) {
  try {
    const keys = Object.keys(dataRef.value)

    if (
      keys.length === 0 ||
      !dataRef.value[keys[0]] ||
      dataRef.value[keys[0]].length === 0
    ) {
      chartData.value = {
        labels: [],
        datasets: [],
      }
      return
    }
    let ii = 0
    const labels = dataRef.value[keys[0]].map(d => d.bucket)
    const datasets = Object.entries(dataRef.value).map(([k, v]) => {
      return {
        label: k,
        fill: false,
        borderColor: theme3[ii++ % theme3.length],
        fill: true,
        yAxisID: 'y',
        tension: 0.4,
        data: v.map(avg => avg[field]),
      }
    })

    chartData.value = {
      labels,
      datasets,
    }
    setLineChartOptions(chartOptions)
  } catch (e) {
    console.error('Error updating chart:', e)
  }
}

export function setLineChartOptions(chartOptions) {
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
          text: 'CPU Usage (%)',
        },
        min: 0,
        max: 100,
      },
    },
  }
}

import { theme1, theme2, theme3 } from '../assets/color-palette/palette-1'
import { DateTime } from 'luxon'
export function updateLineChart(
  dataRef,
  chartData,
  chartOptions,
  field = 'avg',
  xAxis = 'time',
  yAxis = 'value',
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
    setLineChartOptions(chartOptions, xAxis, yAxis)
  } catch (e) {
    console.error('Error updating chart:', e)
  }
}

export function setLineChartOptions(chartOptions, xAxis, yAxis) {
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
          text: xAxis,
        },
        font: {
          size: 1,
        },
        ticks: {
          callback: function (value, index, ticks) {
            // value is the label from the datasets which contains date strings
            // Return the date string directly instead of converting to number
            const date = new Date(this.getLabelForValue(value))
            return date.toLocaleString('en-US', {
              year: '2-digit',
              month: '2-digit',
              day: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
              hour12: false,
            })
          },
          autoSkip: true,
          maxTicksLimit: 20,
        },
      },
      y: {
        title: {
          display: true,
          text: yAxis,
          font: {
            size: 10,
          },
        },
      },
    },
  }
}

export const convertTimeZone = (date, timeZone) =>
  DateTime.fromISO(date).setZone(timeZone).toISO()

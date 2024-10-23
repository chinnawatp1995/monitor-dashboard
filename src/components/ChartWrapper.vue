<template>
  <ChartFilter
    v-if="props.withFilter"
    @update:startTime="onStartTimeChange"
    @update:endTime="onEndTimeChange"
    @update:resolution="onResolutionChange"
  />
  <slot
    :startTime="startTime"
    :endTime="endTime"
    :resolution="resolution"
    :chartData="props.chartData"
    :chartOptions="props.chartOptions"
  ></slot>
</template>

<script setup>
import ChartFilter from './ChartFilter.vue'
import { ref } from 'vue'

const startTime = ref(subMonths(new Date(), 1).toISOString())
const endTime = ref(new Date().toISOString())
const resolution = ref('1 hour')

const props = defineProps(['chartData', 'chartOptions', 'withFilter'])

function onStartTimeChange(value) {
  startTime.value = value
}
function onEndTimeChange(value) {
  endTime.value = value
}
function onResolutionChange(value) {
  resolution.value = value
}
</script>

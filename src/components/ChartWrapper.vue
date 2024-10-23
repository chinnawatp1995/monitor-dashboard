<template>
  <ChartFilter
    v-if="props.withFilter"
    :startTime="startTime"
    :endTime="endTime"
    :resolution="resolution"
    @update:startTime="onStartTimeChange"
    @update:endTime="onEndTimeChange"
    @update:resolution="onResolutionChange"
  />
  <slot
    :startTime="startTime"
    :endTime="endTime"
    :resolution="resolution"
  ></slot>
</template>

<script setup>
import { ref } from 'vue'
import { subMonths } from 'date-fns'
import { onMounted } from 'vue'
const startTime = ref(subMonths(new Date(), 1).toISOString())
const endTime = ref(new Date().toISOString())
const resolution = ref('1 hour')

const props = defineProps(['withFilter'])

function onStartTimeChange(value) {
  // console.log('onStartTimeChange', value)
  startTime.value = value
}
function onEndTimeChange(value) {
  // console.log('onEndTimeChange', value)
  endTime.value = value
}
function onResolutionChange(value) {
  // console.log('onResolutionChange', value)
  resolution.value = value
}
</script>

<template>
  <div class="filter">
    <Calendar
      id="start-24h"
      v-model="startTime"
      showTime
      hourFormat="24"
      @change="handleStartTimeChange"
    />
    <i class="pi pi-arrow-right arrow" style="color: #708090"></i>
    <Calendar
      id="end-24h"
      v-model="endTime"
      showTime
      hourFormat="24"
      @change="handleEndTimeChange"
    />
    <div class="resolution">
      <SelectButton
        v-model="resolution"
        :options="options"
        optionLabel="name"
        optionValue="value"
        aria-labelledby="multiple"
        @change="handleResolutionChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const startTime = ref()
const endTime = ref()
const resolution = ref()
const emit = defineEmits([
  'update:startTime',
  'update:endTime',
  'update:resolution',
])

const options = ref([
  { name: '1M', value: '1 minute' },
  { name: '1H', value: '1 hour' },
  { name: '1D', value: '1 day' },
  { name: '1W', value: '1 week' },
])
async function handleResolutionChange() {
  emit('update:resolution', resolution.value)
}
async function handleStartTimeChange() {
  emit('update:startTime', startTime.value)
}
async function handleEndTimeChange() {
  emit('update:endTime', endTime.value)
}
</script>

<template>
  <div class="filter">
    <div class="date-range">
      <Calendar
        id="start-24h"
        v-model="startTime"
        showTime
        hourFormat="24"
        @update:model-value="handleStartTimeChange"
      />
      <i class="pi pi-arrow-right arrow" style="color: #708090"></i>
      <Calendar
        id="end-24h"
        v-model="endTime"
        showTime
        hourFormat="24"
        @update:model-value="handleEndTimeChange"
      />
    </div>
    <div>
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
      <div class="dropdown">
        <Dropdown
          v-model="selectedController"
          :options="controller"
          placeholder="All"
          class="w-full md:w-14rem"
          @update:model-value="onServiceChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { urls } from '../urls'

const props = defineProps(['startTime', 'endTime', 'resolution', 'service'])

const startTime = ref(props.startTime)
const endTime = ref(props.endTime)
const resolution = ref(props.resolution)
const selectedController = ref(props.controller)

const emit = defineEmits([
  'update:startTime',
  'update:endTime',
  'update:resolution',
  'update:controller',
])

const options = ref([
  { name: '1H', value: '1 hour' },
  { name: '1D', value: '1 day' },
  { name: '1W', value: '1 week' },
])

const controllerOptions = ref([])

function handleResolutionChange() {
  // console.log('handleResolutionChange', resolution.value)
  emit('update:resolution', resolution.value)
}

function handleStartTimeChange() {
  // console.log('handleStartTimeChange', startTime.value)
  emit('update:startTime', startTime.value.toISOString())
}

function handleEndTimeChange() {
  // console.log('handleEndTimeChange', endTime.value)
  emit('update:endTime', endTime.value.toISOString())
}
</script>

<style scoped>
.filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.date-range {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.arrow {
  margin: 0 1em;
}

.resolution {
  margin-top: 1em;
}
</style>

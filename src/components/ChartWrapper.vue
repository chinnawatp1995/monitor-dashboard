<template>
  <div class="head">
    <div class="title">
      <h2>{{ props.title }}</h2>
      <div class="expand-button" @click="showDialog">
        <i class="pi pi-expand"></i>
      </div>
    </div>
    <ChartFilter
      v-if="props.withFilter"
      :startTime="startTime"
      :endTime="endTime"
      :resolution="resolution"
      @update:startTime="onStartTimeChange"
      @update:endTime="onEndTimeChange"
      @update:resolution="onResolutionChange"
    />
  </div>

  <slot
    :startTime="startTime"
    :endTime="endTime"
    :resolution="resolution"
  ></slot>

  <Dialog
    v-model:visible="dialogVisible"
    :modal="true"
    :maximizable="true"
    :style="{ width: '75vw', fontFamily: 'varela-round' }"
    :header="props.title"
  >
    <ChartFilter
      v-if="props.withFilter"
      :startTime="startTime"
      :endTime="endTime"
      :resolution="resolution"
      :controller="controller"
      @update:startTime="onStartTimeChange"
      @update:endTime="onEndTimeChange"
      @update:resolution="onResolutionChange"
    />
    <slot
      :startTime="startTime"
      :endTime="endTime"
      :resolution="resolution"
    ></slot>
  </Dialog>
</template>

<script setup>
import { ref } from 'vue'
import { subMonths } from 'date-fns'
const startTime = ref(subMonths(new Date(), 1).toISOString())
const endTime = ref(new Date().toISOString())
const resolution = ref('1 hour')
const controller = ref()
const dialogVisible = ref(false)

const props = defineProps(['title', 'withFilter'])

function showDialog() {
  dialogVisible.value = true
}

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

function onControllerChange(value) {
  controller.value = value
}
</script>

<style scoped>
.title {
  display: flex;
  align-items: center;
}
.expand-button {
  margin-left: auto;
  margin-right: 1rem;
  cursor: pointer;
}
.expand-button:hover {
  background-color: rgb(236, 236, 236);
  padding: 1rem;
  border-radius: 1rem;
}
</style>

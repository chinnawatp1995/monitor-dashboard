<template>
  <div>
    <div class="filter-bar-wrapper">
      <FilterBar @update-service="onUpdateSelectedService"></FilterBar>
    </div>
    <div class="page">
      <div class="chart-wrapper server-status">
        <h2 class="font-varela">Server status</h2>
        <ServerStatus :service="selectedService"> </ServerStatus>
      </div>
      <div class="chart-wrapper cpu">
        <CpuUsage :service="selectedService"></CpuUsage>
      </div>
      <div class="chart-wrapper req">
        <TotalRequest :service="selectedService"></TotalRequest>
      </div>
      <div class="chart-wrapper mem">
        <MemUsage :service="selectedService"></MemUsage>
      </div>
      <div
        v-if="selectedService && selectedService !== 'All'"
        class="chart-wrapper req-path"
      >
        <RequestPath :service="selectedService"></RequestPath>
      </div>
      <div class="chart-wrapper avg-response">
        <ResponseAvg :service="selectedService"></ResponseAvg>
      </div>
      <div
        v-if="selectedService && selectedService !== 'All'"
        class="chart-wrapper error-ranking"
      >
        <ErrorRanking :service="selectedService"></ErrorRanking>
      </div>
      <div
        v-if="selectedService && selectedService !== 'All'"
        class="chart-wrapper error-rate"
      >
        <ErrorToReq :service="selectedService"></ErrorToReq>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedService = ref('All')
const currentPage = ref('dashboard')

function onUpdateSelectedService(service) {
  selectedService.value = service
}
</script>

<style>
.filter-bar-wrapper {
  display: flex;
  padding-top: 1em;
  padding-bottom: 1em;
  grid-row: 1 / 2;
}
.page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-row: 2 / 3;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  margin-top: 1em;
  padding-right: 4em;
}
.chart-wrapper {
  background-color: rgb(255, 255, 255);
  padding: 1em;
  border-radius: 1em;
  margin-top: 2em;
  margin-left: 2em;
}
.server-status {
  grid-column: 1 / 6;
}
.cpu {
  grid-column: 6 / 13;
}
.mem {
  grid-column: 7 / 13;
}
.req {
  grid-column: 1 / 7;
}
.req-path {
  grid-column: 1 / 6;
}
.error-rate {
  grid-column: 6 / 12;
}
.error-ranking {
  grid-column: 1 / 6;
}
.avg-response {
  grid-column: 6 / 13;
}
.font-varela {
  font-family: 'varela-round';
}
</style>

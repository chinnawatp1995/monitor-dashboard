<template>
  <div>
    <div class="filter-bar-wrapper">
      <FilterBar @update-service="onUpdateSelectedService"></FilterBar>
    </div>
    <div class="page">
      <div class="chart-wrapper server-status">
        <ChartWrapper title="Server status" :withFilter="false">
          <ServerStatus :service="selectedService"></ServerStatus>
        </ChartWrapper>
      </div>
      <div class="chart-wrapper cpu">
        <!-- <ChartWrapper title="CPU Usage" :withFilter="true">
          <template v-slot="{ startTime, endTime, resolution }">
            <CpuUsage
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></CpuUsage>
          </template>
        </ChartWrapper> -->
        <ChartWrapper title="CPU Usage" :withFilter="false">
          <template v-slot="{ startTime, endTime, resolution }">
            <CpuApex
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></CpuApex
          ></template>
        </ChartWrapper>
      </div>
      <div class="chart-wrapper mem">
        <ChartWrapper title="Memory Usage" :withFilter="false">
          <template v-slot="{ startTime, endTime, resolution }">
            <!-- <MemUsage
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></MemUsage> -->
            <MemApex
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></MemApex>
          </template>
        </ChartWrapper>
      </div>
      <div class="chart-wrapper rx-network-usage">
        <ChartWrapper title="Rx Network Usage" :withFilter="true">
          <template v-slot="{ startTime, endTime, resolution }">
            <RxNetworkUsage
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></RxNetworkUsage>
          </template>
        </ChartWrapper>
      </div>
      <div class="chart-wrapper tx-network-usage">
        <ChartWrapper title="Tx Network Usage" :withFilter="true">
          <template v-slot="{ startTime, endTime, resolution }">
            <TxNetworkUsage
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></TxNetworkUsage>
          </template>
        </ChartWrapper>
      </div>
      <div class="chart-wrapper req">
        <ChartWrapper title="Total Request By Server" :withFilter="true">
          <template v-slot="{ startTime, endTime, resolution }">
            <TotalRequest
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></TotalRequest>
          </template>
        </ChartWrapper>
      </div>
      <div
        v-if="selectedService && selectedService !== 'All'"
        class="chart-wrapper req-path"
      >
        <ChartWrapper title="Request Path" :withFilter="false">
          <template v-slot="{ startTime, endTime, resolution }">
            <RequestPath
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></RequestPath>
          </template>
        </ChartWrapper>
      </div>
      <div
        v-if="selectedService && selectedService !== 'All'"
        class="chart-wrapper avg-response"
      >
        <ChartWrapper title="Average Response Time" :withFilter="true">
          <template v-slot="{ startTime, endTime, resolution }">
            <ResponseAvg
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></ResponseAvg>
          </template>
        </ChartWrapper>
      </div>
      <div
        v-if="selectedService && selectedService !== 'All'"
        class="chart-wrapper error-ranking"
      >
        <ChartWrapper title="Error Ranking" :withFilter="false">
          <template v-slot="{ startTime, endTime, resolution }">
            <ErrorRanking
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></ErrorRanking>
          </template>
        </ChartWrapper>
      </div>
      <div
        v-if="selectedService && selectedService !== 'All'"
        class="chart-wrapper error-rate"
      >
        <ChartWrapper title="Error Rate" :withFilter="false">
          <template v-slot="{ startTime, endTime, resolution }">
            <ErrorToReq
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></ErrorToReq>
          </template>
        </ChartWrapper>
      </div>
      <!-- <div class="chart-wrapper">
        <ChartWrapper title="CPU Usage" :withFilter="false">
          <template v-slot="{ startTime, endTime, resolution }">
            <CpuApex
              :service="selectedService"
              :startTime="startTime"
              :endTime="endTime"
              :resolution="resolution"
            ></CpuApex
          ></template>
        </ChartWrapper>
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MemApex from '../components/apexChart/MemApex.vue'

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
  padding-bottom: 4rem;
}
.chart-wrapper {
  background-color: rgb(255, 255, 255);
  padding: 1em;
  border-radius: 1em;
  margin-top: 2em;
  margin-left: 2em;
  box-shadow: 0 12px 12px rgba(0, 0, 0, 0.1);
}
.server-status {
  grid-column: 1 / 5;
}
.cpu {
  grid-column: 5 / 13;
}
.mem {
  grid-column: 1 / 13;
}
.rx-network-usage {
  grid-column: 1 / 7;
}
.tx-network-usage {
  grid-column: 7 / 13;
}
.req {
  grid-column: 1 / 13;
}
.req-path {
  grid-column: 1 / 6;
}
.error-rate {
  grid-column: 6 / 13;
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

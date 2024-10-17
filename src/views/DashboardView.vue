<template>
  <div class="chart-wrapper server-status">
    <h2 class="font-varela">Server status</h2>
    <ServerStatus :service="props.selectedService"> </ServerStatus>
  </div>
  <div class="chart-wrapper cpu">
    <CpuUsage :service="props.selectedService"></CpuUsage>
  </div>
  <div class="chart-wrapper mem">
    <MemUsage :service="props.selectedService"></MemUsage>
  </div>
  <div class="b">b</div>
  <div class="c">c</div>
</template>

<script setup>
const props = defineProps(['selectedService'])
</script>

<style>
.chart-wrapper {
  display: grid;
  /* grid-column: 1 / 7; */
  background-color: rgb(255, 255, 255);
  padding: 1em;
  border-radius: 1em;
  margin-top: 2em;
  margin-left: 2em;
  /* border: 1px solid black; */
}
.server-status {
  grid-column: 1 / 6;
}
.cpu {
  grid-column: 6 / 13;
}
.mem {
  grid-column: 1 /8;
}

.font-varela {
  font-family: 'varela-round';
}
.a {
  display: grid;
  grid-column: 7/ 12;
  height: 100px;
}
.b {
  display: grid;
  grid-column: 1 / 7;
  height: 100px;
}
.c {
  display: grid;
  grid-column: 7 / 12;
}
</style>

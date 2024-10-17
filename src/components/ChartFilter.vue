<template>
  <div class="filter">
    <Calendar
      id="calendar-24h"
      v-model="datetime24h"
      showTime
      hourFormat="24"
    />
    <i class="pi pi-arrow-right arrow" style="color: #708090"></i>
    <Calendar
      id="calendar-24h"
      v-model="datetime24h"
      showTime
      hourFormat="24"
    />
    <div class="resolution"></div>
  </div>
</template>

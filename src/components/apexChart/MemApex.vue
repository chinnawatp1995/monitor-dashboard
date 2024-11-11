<template>
  <BaseApexAreaChart :service="props.service" :url="urls.getMemUsage">
  </BaseApexAreaChart>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { urls } from '../../urls'

const props = defineProps(['service', 'startTime', 'endTime', 'resolution'])
</script>

<style></style>

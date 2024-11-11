<template>
  <BaseApexAreaChart
    :service="props.service"
    :url="urls.getAvgResponse"
  ></BaseApexAreaChart>
</template>

<script setup>
import { urls } from '../../urls'

const props = defineProps(['service', 'startTime', 'endTime', 'resolution'])
</script>

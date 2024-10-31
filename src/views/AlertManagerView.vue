<script setup>
import { ref, onMounted } from 'vue'
import { useAxios } from '../composables/useAxios'
import { urls } from '../urls'
import AlertRuleCard from '../components/AlertRuleCard.vue'
const alertRules = ref([])

const { data, error, axiosData } = useAxios(urls.getAlertRules(), 'get')
onMounted(async () => {
  await axiosData()
  alertRules.value = data.value
})
</script>

<template>
  <h1>Alert Manager</h1>

  <div class="alert-manager">
    <div class="left-side">
      <CreateAlertRuleForm />
    </div>
    <div class="right-side scrollable">
      <h3>Alert Rules</h3>
      <div class="card-wrapper" v-for="rule in alertRules">
        <AlertRuleCard :rule="rule" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.alert-manager {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}
.left-side {
  grid-column: 1 / 4;
  /* border: 1px solid rgb(204, 200, 200); */
  padding: 1rem;
}
.right-side {
  grid-column: 4/13;
  padding: 1rem;
  /* border: 1px solid rgb(191, 184, 184); */
}
.scrollable {
  overflow-y: scroll;
  height: 80vh;
}
.card-wrapper {
  margin-bottom: 1rem;
}
</style>

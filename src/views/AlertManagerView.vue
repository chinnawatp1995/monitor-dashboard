<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useAxios } from '../composables/useAxios'
import { urls } from '../urls'
import AlertRuleCard from '../components/AlertRuleCard.vue'
const alertRules = ref([])

const { data, error, axiosData } = useAxios(urls.getAlertRules(), 'get')
const groups = ref()

async function disableRule(ruleId) {
  const index = alertRules.value.findIndex(rule => rule.id === ruleId)
  alertRules.value[index].enabled = false
  await axios.get(urls.disableRule(ruleId))
}

async function enableRule(ruleId) {
  const index = alertRules.value.findIndex(rule => rule.id === ruleId)
  alertRules.value[index].enabled = true
  await axios.get(urls.enableRule(ruleId))
}

async function updateRule(rule) {
  console.log(rule)
  const index = alertRules.value.findIndex(r => r.id === rule.id)
  alertRules.value[index] = rule
  await axios.post(urls.updateRule(rule.id), rule)
}

async function createRule(rule) {
  alertRules.value.push(rule)
  await axios.post(urls.createRule(), rule)
}

async function deleteRule(ruleId) {
  const index = alertRules.value.findIndex(r => r.id === ruleId)
  alertRules.value.splice(index, 1)
  console.log(ruleId)
  await axios.get(urls.deleteRule(ruleId))
}

function addRule(rule) {
  alertRules.value.push(rule)
}

async function getGroups() {
  const res = await axios.get(urls.getGroups())
  groups.value = res.data
}

onMounted(async () => {
  await axiosData()
  await getGroups()
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
        <AlertRuleCard
          :rule="rule"
          :groups="groups"
          @disable:rule="disableRule"
          @enable:rule="enableRule"
          @update:rule="updateRule"
          @delete:rule="deleteRule"
          @create:rule="createRule"
        />
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

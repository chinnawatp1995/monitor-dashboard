<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { urls } from '../urls'

const rules = ref([])
const newRule = ref({ expression: '', duration: '' })
const alertHistory = ref([])

const fetchRules = async () => {
  // Mock data for existing rules
  rules.value = [
    { id: 1, expression: 'cpu_usage > 90', duration: '5m' },
    { id: 2, expression: 'memory_usage > 80', duration: '10m' },
    { id: 3, expression: 'disk_usage > 95', duration: '15m' },
  ]

  // Mock data for alert history
  alertHistory.value = [
    {
      id: 1,
      rule_id: 1,
      triggered_at: '2023-05-01T10:30:00Z',
      resolved_at: '2023-05-01T11:00:00Z',
    },
    {
      id: 2,
      rule_id: 2,
      triggered_at: '2023-05-02T14:15:00Z',
      resolved_at: '2023-05-02T14:45:00Z',
    },
    {
      id: 3,
      rule_id: 3,
      triggered_at: '2023-05-03T09:00:00Z',
      resolved_at: null,
    },
  ]

  console.log('Mocked alert rules and history loaded')
}

const fetchAlertHistory = async () => {
  try {
    const response = await axios.get(urls.getAlertHistory())
    alertHistory.value = response.data
  } catch (error) {
    console.error('Error fetching alert history:', error)
  }
}

const addRule = async () => {
  try {
    await axios.post(urls.addAlertRule(), newRule.value)
    await fetchRules()
    newRule.value = { expression: '', duration: '' }
  } catch (error) {
    console.error('Error adding alert rule:', error)
  }
}

const updateRule = async rule => {
  try {
    await axios.put(urls.updateAlertRule(rule.id), rule)
    await fetchRules()
  } catch (error) {
    console.error('Error updating alert rule:', error)
  }
}

const deleteRule = async ruleId => {
  try {
    await axios.delete(urls.deleteAlertRule(ruleId))
    await fetchRules()
  } catch (error) {
    console.error('Error deleting alert rule:', error)
  }
}

onMounted(() => {
  fetchRules()
  fetchAlertHistory()
})
</script>

<template>
  <div class="alert-manager">
    <h1>Alert Manager</h1>

    <div class="new-rule-form">
      <h2 class="text-2xl font-bold mb-4">Add New Rule</h2>
      <div class="flex flex-col gap-4 max-w-md">
        <InputText v-model="newRule.expression" placeholder="Expression" />
        <InputText v-model="newRule.duration" placeholder="Duration" />
        <Button label="Add Rule" @click="addRule" class="p-button-primary" />
      </div>
    </div>

    <div class="rules-list">
      <h2>Existing Rules</h2>
      <ul>
        <li v-for="rule in rules" :key="rule.id">
          <input v-model="rule.expression" @blur="updateRule(rule)" />
          <input v-model="rule.duration" @blur="updateRule(rule)" />
          <button @click="deleteRule(rule.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

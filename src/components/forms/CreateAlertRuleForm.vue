<template>
  <div class="form-wrapper">
    <h3>Create Alert Rule</h3>
    <div class="form-field">
      <label style="font-size: 0.75rem" for="name">Name</label>
      <InputText id="name" v-model="name" />
    </div>
    <div class="form-field">
      <label style="font-size: 0.75rem" for="expression">Expression</label>
      <InputText id="expression" v-model="expression" />
    </div>
    <div class="form-field">
      <label style="font-size: 0.75rem" for="duration">Duration</label>
      <InputText id="duration" v-model="duration" />
    </div>
    <div class="form-field">
      <label style="font-size: 0.75rem" for="silenceTime">Silence Time</label>
      <InputText id="silenceTime" v-model="silenceTime" />
    </div>
    <div class="form-field">
      <label style="font-size: 0.75rem" for="severity">Severity</label>
      <Dropdown
        id="severity"
        v-model="severity"
        :options="[0, 1, 2, 3, 4, 5]"
        placeholder="Select severity"
      />
    </div>
    <div class="form-field">
      <label style="font-size: 0.75rem" for="templateMessage">Message</label>
      <Textarea
        id="templateMessage"
        v-model="templateMessage"
        rows="4"
        autoResize
      />
    </div>
    <Button label="Create" @click="createAlertRule" />
  </div>
</template>

<script setup>
import { urls } from '../../urls'
import { ref } from 'vue'
import axios from 'axios'

const expression = ref('')
const duration = ref('')
const silenceTime = ref('')
const name = ref('')
const severity = ref('')
const templateMessage = ref('aaa')

const createAlertRule = async () => {
  try {
    const res = await axios.post(urls.createAlertRule(), {
      name: name.value,
      expression: expression.value,
      duration: duration.value,
      silence_time: silenceTime.value,
      severity: severity.value,
      message: templateMessage.value,
    })
    expression.value = ''
    duration.value = ''
    silenceTime.value = ''
    name.value = ''
    severity.value = ''
    templateMessage.value = ''
  } catch (e) {
    console.log(e)
  }
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-field {
  display: flex;
  flex-direction: column;
}
</style>

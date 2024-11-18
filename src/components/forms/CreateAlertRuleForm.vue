<template>
  <div class="form-wrapper">
    <h3>Create Alert Rule</h3>
    <div class="form-field">
      <FloatLabel variant="on">
        <InputText id="name" v-model="name" />
        <label for="name">Name</label>
      </FloatLabel>
    </div>
    <div class="form-field">
      <Dropdown
        id="alertType"
        v-model="alertType"
        :options="Object.keys(typeOptions)"
        placeholder="Select type"
      />
    </div>
    <div class="form-field">
      <FloatLabel variant="on">
        <InputText id="duration" v-model="duration" />
        <label for="duration">Duration</label>
      </FloatLabel>
    </div>
    <div class="form-field">
      <FloatLabel variant="on">
        <InputText id="silenceTime" v-model="silenceTime" />
        <label for="silenceTime">Silence Time</label>
      </FloatLabel>
    </div>
    <!-- <div class="form-field">
      <Dropdown
        id="severity"
        v-model="severity"
        :options="[0, 1, 2, 3, 4, 5]"
        placeholder="Select severity"
      />
    </div> -->
    <div class="form-field">
      <FloatLabel variant="on">
        <Textarea
          id="templateMessage"
          v-model="templateMessage"
          rows="4"
          autoResize
        />
        <label for="templateMessage">Message</label>
      </FloatLabel>
    </div>
    <Button label="Create" @click="createAlertRule" icon="pi pi-save" />
  </div>
</template>

<script setup>
import { urls } from '../../urls'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const alertType = ref('')
const duration = ref('')
const silenceTime = ref('')
const name = ref('')
const templateMessage = ref('')
const typeOptions = ref([])

const emit = defineEmits(['create:rule'])

const createAlertRule = async () => {
  try {
    const res = await axios.post(urls.createAlertRule(), {
      name: name.value,
      type: alertType.value,
      duration: duration.value,
      silence_time: silenceTime.value,
      message: templateMessage.value,
    })
    emit('create:rule', res.data)
    type.value = ''
    duration.value = ''
    silenceTime.value = ''
    name.value = ''
    templateMessage.value = ''
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  const res = await axios.get(urls.getAlertType())
  typeOptions.value = res.data
  console.log(typeOptions.value)
})
</script>

<style scoped>
.form-wrapper {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.form-field {
  display: flex;
  width: '100%';
  flex-direction: column;
}
</style>

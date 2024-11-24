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
        <InputText id="threshold" v-model="threshold" />
        <label for="threshold">Threshold</label>
      </FloatLabel>
    </div>
    <div class="form-field">
      <FloatLabel variant="on">
        <InputText id="silenceTime" v-model="silenceTime" />
        <label for="silenceTime">Silence Time</label>
      </FloatLabel>
    </div>
    <div class="form-field">
      <MultiSelect
        v-model="selectedServices"
        :options="serviceOptions"
        filter
        placeholder="Select Services"
        class="w-full md:w-80"
      ></MultiSelect>
    </div>
    <!-- <div class="form-field">
      <MultiSelect
        v-model="selectedGroups"
        :options="groupOptions"
        optionLabel="name"
        filter
        placeholder="Select Groups"
        class="w-full md:w-80"
      ></MultiSelect>
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
const threshold = ref('')
// const selectedGroups = ref([])
const selectedServices = ref([])

const serviceOptions = ref([])
const groupOptions = ref([])

const emit = defineEmits(['create:rule'])

const createAlertRule = async () => {
  try {
    const res = await axios.post(urls.createAlertRule(), {
      name: name.value,
      type: alertType.value,
      duration: duration.value,
      silence_time: silenceTime.value,
      message: templateMessage.value,
      threshold: threshold.value,
      services: selectedServices.value,
    })
    // console.log({
    //   name: name.value,
    //   type: alertType.value,
    //   duration: duration.value,
    //   silence_time: silenceTime.value,
    //   message: templateMessage.value,
    //   threshold: threshold.value,
    //   services: selectedServices.value,
    // })
    emit('create:rule', res.data)
    alertType.value = ''
    duration.value = ''
    silenceTime.value = ''
    name.value = ''
    templateMessage.value = ''
    threshold.value = ''
    selectedGroups.value = []
    selectedServices.value = []
  } catch (e) {
    console.log(e)
  }
}

const getServices = async () => {
  const res = await axios.get(urls.getServices())
  serviceOptions.value = res.data
}

const getGroup = async () => {
  const res = await axios.get(urls.getGroups())
  groupOptions.value = res.data
}

onMounted(async () => {
  const res = await axios.get(urls.getAlertType())
  typeOptions.value = res.data
  await getServices()
  await getGroup()
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

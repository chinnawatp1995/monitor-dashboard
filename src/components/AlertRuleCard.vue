<template>
  <Card>
    <template #title>
      <div class="card-title">
        {{ rule.name }}
        <Button
          icon="pi pi-times"
          severity="danger"
          raised
          rounded
          outlined
        ></Button>
      </div>
    </template>
    <template #content>
      <div class="card-content">
        <div class="card-content-item">
          <label style="font-weight: bold; font-size: 0.75rem"
            >Expression</label
          >
          <p>{{ rule.expression }}</p>
        </div>
        <div class="card-content-item">
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Duration</label
            >
            <p>{{ rule.duration }}</p>
          </div>
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Severity</label
            >
            <p>{{ rule.severity }}</p>
          </div>
        </div>
        <div class="card-content-item">
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Silence Duration</label
            >
            <p>{{ rule.silence_time }}</p>
          </div>
          <div>
            <label style="font-weight: bold; font-size: 0.75rem">Message</label>
            <p>{{ rule.message }}</p>
          </div>
        </div>
      </div>
      <div class="card-input">
        <ToggleSwitch v-model="ruleEnabled" />
        <Button
          icon="pi pi-user-plus"
          severity="warning"
          raised
          outlined
          @click="toggle"
        ></Button>
        <Popover ref="op">
          <div>
            <h4>Recievers</h4>
            <Listbox
              v-model="selectedRecipients"
              :options="props.recipients"
              multiple
              optionLabel="name"
              optionValue="id"
              class="w-full md:w-100"
            ></Listbox>
            <Button
              icon="pi pi-check"
              label="confirm"
              @click="
                addRecipientToRule(props.rule.id, selectedRecipients), toggle()
              "
            ></Button>
          </div>
        </Popover>
        <Button icon="pi pi-pencil" severity="info" raised outlined></Button>
      </div>
    </template>
  </Card>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { urls } from '../urls'
const props = defineProps(['rule', 'recipients'])
const selectedRecipients = ref()
const addRecipientError = ref()
const op = ref()
const ruleRecipient = ref()

const ruleEnabled = ref(props.rule.enabled)

const emit = defineEmits([
  'update:rule',
  'delete:rule',
  'enable:rule',
  'disable:rule',
])

const toggle = event => {
  op.value.toggle(event)
}

async function getRecipientsByRuled() {
  try {
    const res = await axios.get(urls.getRecipient(props.rule.id))
    ruleRecipient.value = res.data.map(r => r.id)
    selectedRecipients.value = ruleRecipient.value
  } catch (e) {}
}

async function addRecipientToRule(ruleId, recipientId) {
  if (!selectedRecipients.value) {
    console.error('No recipients selected')
    return
  }
  try {
    await axios.post(urls.addRecipient(), {
      ruleId,
      recipientId: selectedRecipients.value,
    })
  } catch (e) {
    addRecipientError.value = e
    console.error('Failed to add recipient:', e)
  }
}

async function deleteRule(ruleId) {
  emit('delete:rule', ruleId)
}

async function updateRule() {}

onMounted(async () => {
  await getRecipientsByRuled()
})

watch(ruleEnabled, newValue => {
  if (newValue) {
    emit('enable:rule', props.rule.id)
  } else {
    emit('disable:rule', props.rule.id)
  }
})
</script>

<style scoped>
.card-wrapper {
}
.card-content {
}
.card-title {
  display: flex;
  justify-content: space-between;
}
.card-input {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.card-content p {
  margin-left: 0.5rem;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.8rem;
}
.card-content-item {
  display: flex;
  align-items: center;
}
.card-content-item div {
  display: flex;
  align-items: center;
}
.card-content-item div p {
  margin-right: 5rem;
}
</style>

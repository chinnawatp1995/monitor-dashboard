<template>
  <Card>
    <template #title>
      <div class="card-title">
        {{ rule.name }}
        <Button
          icon="pi pi-times"
          severity="danger"
          @click="deleteRule(rule.id)"
          raised
          rounded
          outlined
        ></Button>
      </div>
    </template>
    <template #content>
      <div class="card-content">
        <div class="card-content-item">
          <label style="font-weight: bold; font-size: 0.75rem">Type</label>
          <p>{{ rule.type }}</p>
        </div>
        <div class="card-content-item">
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Duration</label
            >
            <p>{{ rule.duration }}</p>
          </div>
        </div>
        <div v-if="rule.type !== 'server_down'" class="card-content-item">
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Threshold</label
            >
            <p>{{ rule.threshold }}</p>
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
        <div class="card-content-item">
          <div>
            <label style="font-weight: bold; font-size: 0.75rem">Groups</label>
            <Chip
              v-for="group in rule.groups"
              :key="group.id"
              :value="group.name"
              :label="group.name"
              removable
              @remove="removeGroup(group)"
            />
          </div>
        </div>
        <div class="card-content-item">
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Services</label
            >
            <Chip
              v-for="service in rule.service"
              :key="service"
              :value="service"
              :label="service"
              removable
              @remove="removeService(service)"
            />
          </div>
        </div>
      </div>
      <div class="card-input">
        <ToggleSwitch v-model="ruleEnabled" />
        <Button
          icon="pi pi-plus"
          severity="warning"
          raised
          outlined
          @click="toggle2"
        ></Button>
        <Button
          icon="pi pi-user-plus"
          severity="warning"
          raised
          outlined
          @click="toggle"
        ></Button>
        <Popover ref="op2">
          <div>
            <h4>Services</h4>
            <Listbox
              v-model="selectedServices"
              :options="props.services"
              multiple
              class="w-full md:w-100"
            ></Listbox>
            <Button
              icon="pi pi-check"
              label="confirm"
              @click="updateServiceToRule(), toggle2()"
            ></Button>
          </div>
        </Popover>
        <Popover ref="op">
          <div>
            <h4>Recievers</h4>
            <Listbox
              v-model="selectedGroups"
              :options="props.groups"
              multiple
              optionLabel="name"
              optionValue="id"
              class="w-full md:w-100"
            ></Listbox>
            <Button
              icon="pi pi-check"
              label="confirm"
              @click="
                updateGroupOfRule(props.rule.id, selectedGroups), toggle()
              "
            ></Button>
          </div>
        </Popover>
        <Button
          icon="pi pi-pencil"
          severity="info"
          raised
          outlined
          @click="dialogShow = true"
        ></Button>
        <Dialog v-model:visible="dialogShow">
          <UpdateRuleForm
            :rule="rule"
            @closeDialog="dialogShow = false"
            @update:rule="updateRule"
          />
        </Dialog>
      </div>
    </template>
  </Card>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, watch } from 'vue'
import { urls } from '../urls'
const props = defineProps(['rule', 'groups', 'services'])
const selectedGroups = ref(props.rule.groups?.map(g => g.id) ?? [])
const selectedServices = ref(props.rule.service ?? [])
const addGroupError = ref()
const op = ref()
const op2 = ref()
const ruleGroups = ref()
const dialogShow = ref(false)
const ruleEnabled = ref(props.rule.enable)

const emit = defineEmits([
  'update:rule',
  'delete:rule',
  'enable:rule',
  'disable:rule',
])

const toggle = event => {
  op.value.toggle(event)
}

const toggle2 = event => {
  op2.value.toggle(event)
}

async function addGroupToRule(ruleId) {
  if (!selectedGroups.value) {
    console.error('No group selected')
    return
  }
  try {
    await axios.post(urls.addGroupToRule(), {
      ruleId,
      groupIds: selectedGroups.value,
    })
  } catch (e) {
    addGroupError.value = e
    console.error('Failed to add recipient:', e)
  }
}

async function removeGroup(group) {
  try {
    const res = await axios.post(
      urls.removeGroupFromRule(group.id, props.rule.id),
      {
        groupIds: [group.id],
        ruleId: props.rule.id,
      },
    )
  } catch (e) {
    console.error('Failed to remove recipient:', e)
  }
}

async function removeService(service) {
  try {
    const res = await axios.post(urls.removeServiceFromRule(), {
      service: service,
      ruleId: props.rule.id,
    })
  } catch (e) {
    console.error('Failed to remove service:', e)
  }
}

async function addService(service) {
  try {
    const res = await axios.post(urls.addServiceToRule(), {
      service: service,
      ruleId: props.rule.id,
    })
  } catch (e) {
    console.error('Failed to add service:', e)
  }
}

async function updateGroupOfRule(ruleId) {
  try {
    await axios.post(urls.updateGroupOfRule(), {
      ruleId,
      groupIds: selectedGroups.value,
    })
  } catch (e) {
    addGroupError.value = e
    console.error('Failed to add recipient:', e)
  }
}

async function updateServiceToRule() {
  try {
    await axios.post(urls.updateServiceToRule(), {
      ruleId: props.rule.id,
      services: selectedServices.value,
    })
  } catch (e) {
    console.log(e)
  }
}

async function deleteRule(ruleId) {
  emit('delete:rule', ruleId)
}

async function updateRule(rule) {
  emit('update:rule', rule)
}

onMounted(async () => {})

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

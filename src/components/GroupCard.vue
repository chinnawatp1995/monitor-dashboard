<template>
  <Card>
    <template #title
      ><h4>{{ props.group.name }}</h4></template
    >
    <template #content>
      <div>
        <label style="font-weight: bold; font-size: 0.75rem">Recipients</label>
        <Chip
          v-for="r in recipients"
          :key="r.id"
          :value="r.name"
          :label="r.name"
          removable
          @remove="removeRecipient(r.id)"
        />
      </div>
      <div class="card-input">
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
              @click="updateRecipients(), toggle()"
            ></Button>
          </div>
        </Popover>
      </div>
    </template>
  </Card>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { urls } from '../urls'

const props = defineProps(['group', 'recipients'])
const op = ref()
const recipients = ref([])
console.log(props.group)
recipients.value = props.group.recipients.map(r => {
  return props.recipients.find(s => s.id === r)
})
const selectedRecipients = ref(props.group.recipients)

const removeRecipient = async rId => {
  try {
    await axios.post(urls.removeRecipientFromGroup(), {
      groupId: props.group.id,
      recipients: [rId],
    })
  } catch (e) {
    console.log(e)
  }
}

const toggle = event => {
  op.value.toggle(event)
}

const updateRecipients = async () => {
  await axios.post(urls.updateRecipientToGroup(), {
    groupId: props.group.id,
    recipients: selectedRecipients.value,
  })
}
</script>

<style scoped>
.card-input {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>

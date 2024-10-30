<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const recipients = ref([
  {
    id: 1,
    token: 'mock_token_123',
    roomId: 'room_456',
    application: 'Test App',
  },
])

const newRecipient = ref({
  token: '',
  roomId: '',
  application: '',
})

const addRecipient = async () => {
  try {
    // TODO: Replace with actual API endpoint
    await axios.post('/api/recipients', newRecipient.value)
    recipients.value.push({ ...newRecipient.value })
    newRecipient.value = {
      token: '',
      roomId: '',
      application: '',
    }
  } catch (error) {
    console.error('Error adding recipient:', error)
  }
}

const deleteRecipient = async index => {
  try {
    // TODO: Replace with actual API endpoint
    await axios.delete(`/api/recipients/${recipients.value[index].id}`)
    recipients.value.splice(index, 1)
  } catch (error) {
    console.error('Error deleting recipient:', error)
  }
}
</script>

<template>
  <div class="p-4">
    <h2 class="text-2xl font-bold mb-4">Monitor Alert Recipients</h2>

    <div class="mb-8">
      <h3 class="text-xl mb-4">Add New Recipients</h3>
      <div class="flex flex-col gap-4 max-w-md">
        <div>
          <label class="block mb-1">Token</label>
          <InputText v-model="newRecipient.token" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">Room ID</label>
          <InputText v-model="newRecipient.roomId" class="w-full" />
        </div>
        <div>
          <label class="block mb-1">Application</label>
          <InputText v-model="newRecipient.application" class="w-full" />
        </div>
        <Button label="Add Recipient" @click="addRecipient" />
      </div>
    </div>

    <div>
      <h3 class="text-xl mb-4">Existing Recipients</h3>
      <DataTable :value="recipients" class="p-datatable-sm">
        <Column field="token" header="Token"></Column>
        <Column field="roomId" header="Room ID"></Column>
        <Column field="application" header="Application"></Column>
        <Column header="Actions">
          <template #body="slotProps">
            <Button
              icon="pi pi-trash"
              class="p-button-danger p-button-sm"
              @click="deleteRecipient(slotProps.index)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

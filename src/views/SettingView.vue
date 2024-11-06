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
  <div class="page-wrapper">
    <h2 class="text-2xl font-bold mb-4">Monitor Alert Recipients</h2>

    <div class="left-wrapper mb-8">
      <h3 class="text-xl mb-4">Add New Recipients</h3>
      <div class="flex flex-col gap-4 max-w-md">
        <CreateRecipientForm />
      </div>
    </div>

    <div class="right-wrapper">
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

<style scoped>
.page-wrapper {
  display: grid;
  grid-template-columns: 1fr 4fr;
}
.left-wrapper {
  grid-column: 1 /2;
}
.right-wrapper {
  grid-column: 2 /3;
}
</style>

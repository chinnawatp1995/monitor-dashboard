<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { urls } from '../urls'

const recipients = ref([])

const createRecipient = async newRecipient => {
  try {
    await axios.post(urls.createRecipient(), newRecipient)
    recipients.value.push({ ...newRecipient })
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

async function fetchData() {
  const res = await axios.get(urls.getRecipient())
  recipients.value = res.data
}

onMounted(async () => {
  await fetchData()
})
</script>

<template>
  <div class="page-wrapper">
    <h2 class="text-2xl font-bold mb-4">Monitor Alert Recipients</h2>

    <div class="left-wrapper mb-8">
      <h3 class="text-xl mb-4">Add New Recipients</h3>
      <div class="flex flex-col gap-4 max-w-md">
        <CreateRecipientForm @createRecipient="createRecipient" />
      </div>
    </div>

    <div class="right-wrapper">
      <h3 class="text-xl mb-4">Existing Recipients</h3>
      <DataTable :value="recipients" class="p-datatable-sm">
        <Column field="name" header="Name"></Column>
        <Column field="token" header="Token"></Column>
        <Column field="room" header="Room ID"></Column>
        <Column field="app" header="Application"></Column>
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

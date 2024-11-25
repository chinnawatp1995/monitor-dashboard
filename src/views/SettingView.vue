<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { urls } from '../urls'
import { CreateGroupForm } from '../components'

const recipients = ref([])
const groups = ref([])

const createRecipient = async newRecipient => {
  try {
    await axios.post(urls.createRecipient(), newRecipient)
    recipients.value.push({ ...newRecipient })
  } catch (error) {
    console.error('Error adding recipient:', error)
  }
}

const createGroup = async newGroup => {
  try {
    await axios.post(urls.createGroup(), newGroup)
  } catch (e) {
    console.log(e)
  }
}

const deleteRecipient = async id => {
  try {
    await axios.get(urls.deleteRecipient(id))
    const index = recipients.value.findIndex(r => r.id === id)
    recipients.value.splice(index, 1)
  } catch (error) {
    console.error('Error deleting recipient:', error)
  }
}

async function getRecipients() {
  try {
    const res = await axios.get(urls.getRecipient())
    recipients.value = res.data.map(r => {
      const { id, name, config } = r
      const { app, token, room } = config
      return {
        id,
        name,
        app,
        token,
        room,
      }
    })
  } catch (e) {
    console.log(e)
  }
}

async function getGroups() {
  try {
    const res = await axios.get(urls.getGroups())
    groups.value = res.data
  } catch (e) {
    console.log(e)
  }
}

onMounted(async () => {
  await getRecipients()
  await getGroups()
})
</script>

<template>
  <div class="row-wrapper">
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
              @click="deleteRecipient(slotProps.data.id)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
  </div>

  <div class="row-wrapper">
    <h2>Groups</h2>
    <div class="left-wrapper">
      <CreateGroupForm :recipients @createGroup="createGroup"></CreateGroupForm>
    </div>
    <div class="right-wrapper">
      <div v-for="g in groups">
        <GroupCard :group="g" :recipients></GroupCard>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row-wrapper {
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

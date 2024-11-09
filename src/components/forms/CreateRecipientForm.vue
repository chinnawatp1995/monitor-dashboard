<template>
  <div class="form-wrapper">
    <h3>Create Recipient</h3>
    <div class="form-field">
      <FloatLabel variant="on">
        <InputText id="name" v-model="recipient.name" />
        <label for="name">Name</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="application" v-model="recipient.app" />
        <label for="application">Application</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="token" v-model="recipient.token" />
        <label for="token">Token</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="url" v-model="recipient.url" />
        <label for="url">URL</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="room-id" v-model="recipient.room" />
        <label for="room-id">Room ID</label>
      </FloatLabel>
      <Button
        label="Create"
        @click="$emit('createRecipient', recipient), clearInput()"
        icon="pi pi-save"
      />
    </div>
  </div>
</template>

<script setup>
import { urls } from '../../urls'
import { useAxios } from '../../composables/useAxios'
import { ref } from 'vue'

const recipient = ref({
  name: '',
  app: '',
  token: '',
  url: '',
  room: '',
})

const clearInput = () => {
  recipient.value = {
    name: '',
    app: '',
    token: '',
    url: '',
    room: '',
  }
}
</script>

<style scoped></style>

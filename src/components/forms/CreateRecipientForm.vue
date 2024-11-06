<template>
  <div class="form-wrapper">
    <h3>Create Recipient</h3>
    <div class="form-field">
      <FloatLabel variant="on">
        <InputText id="name" v-model="name" />
        <label for="name">Name</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="application" v-model="application" />
        <label for="application">Application</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="token" v-model="token" />
        <label for="token">Token</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="url" v-model="url" />
        <label for="url">URL</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText id="room-id" v-model="roomId" />
        <label for="room-id">Room ID</label>
      </FloatLabel>
      <Button label="Create" @click="createRecipient" icon="pi pi-save" />
    </div>
  </div>
</template>

<script setup>
import { urls } from '../../urls'
import { useAxios } from '../../composables/useAxios'
</script>

<style scoped></style>

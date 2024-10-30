<template>
  <div class="form-wrapper">
    <h3>Create Recipient</h3>
    <div class="form-field">
      <label for="name">Name</label>
      <InputText id="name" v-model="name" />
    </div>
  </div>
</template>

<script setup>
import { urls } from '../../urls'
import { useAxios } from '../../composables/useAxios'
</script>

<style scoped></style>

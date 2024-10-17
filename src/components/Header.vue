<template>
  <div class="toggle-button">
    <Button
      icon="pi pi-sliders-h"
      severity="secondary"
      @click="visible = !visible"
    />
  </div>
  <div class="expand-side-bar">
    <Sidebar v-model:visible="visible" header="Sidebar">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
    </Sidebar>
  </div>
  <div class="search-bar-wrapper">
    <IconField iconPosition="left">
      <InputIcon class="pi pi-search"> </InputIcon>
      <InputText variant="filled" v-model="value1" placeholder="Search" />
    </IconField>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const visible = ref(false)
</script>

<style>
.toggle-button {
  display: flex;
  margin-left: 1em;
  width: 3em;
  /* background-color: rgb(185, 185, 185); */
  border-radius: 0.5em;
  border: 1px solid rgb(185, 197, 203);
  justify-content: center;
}
.search-bar-wrapper {
  margin-left: 2em;
  width: 20em;
  /* background-color: rgb(162, 162, 162); */
}
.expand-side-bar {
  background-color: rgb(206, 208, 209);
  /* border: 1px solid black; */
}
</style>

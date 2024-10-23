<template>
  <div class="side-bar-header"></div>
  <div class="side-bar-menu">
    <router-link to="/dashboard">
      <div class="icon">
        <i class="pi pi-chart-pie" style="color: #708090"></i>
      </div>
    </router-link>
    <router-link to="/analytics">
      <div class="icon">
        <i class="pi pi-chart-bar" style="color: #708090"></i>
      </div>
    </router-link>
    <router-link to="/alert-manager">
      <div class="icon">
        <i class="pi pi-exclamation-triangle" style="color: #708090"></i>
      </div>
    </router-link>
    <router-link to="/setting">
      <div class="icon">
        <i class="pi pi-cog" style="color: #708090"></i>
      </div>
    </router-link>
  </div>
</template>

<script setup>
import 'primeicons/primeicons.css'

const emit = defineEmits(['change-page'])

function changePage(p) {
  emit('change-page', p)
}
</script>

<style>
.side-bar-header {
  /* align-self: center; */
  height: 40%;
  width: 100%;
  background-color: rgb(255, 255, 255);
  border-top-left-radius: 0.5em;
  border-top-right-radius: 0.5em;
}
.side-bar-menu {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  background-color: rgb(255, 255, 255);
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  /* border: 1px solid black; */
}
.icon {
  display: flex;
  /* border: 1px solid black; */
  width: 2.25em;
  height: 2.25em;
  justify-content: center;
  align-items: center;
}

.icon:hover {
  background-color: rgb(226, 226, 226);
  border-radius: 0.5em;
  /* border: 1px solid rgb(91, 111, 129); */
}

a {
  text-decoration: none;
}
</style>

<script setup>
import { ref } from 'vue'
import DashboardView from './views/DashboardView.vue'

const selectedService = ref('All')
const currentPage = ref('dashboard')

function onUpdateSelectedService(service) {
  selectedService.value = service
}

function onChangePage(page) {
  currentPage.value = page
}
</script>

<template>
  <div class="grid-container">
    <div class="side-bar-wrapper">
      <SideBar @change-page="onChangePage"></SideBar>
    </div>
    <div class="main-content-wrapper">
      <div class="header-wrapper">
        <Header></Header>
      </div>
      <div class="content-wrapper">
        <div class="filter-bar-wrapper">
          <FilterBar @update-service="onUpdateSelectedService"></FilterBar>
        </div>
        <div v-if="currentPage === 'dashboard'" class="page dashboard">
          <!-- {{ currentPage }} -->
          <DashboardView :selectedService="selectedService"></DashboardView>
        </div>
        <div v-else-if="currentPage === 'analytics'" class="page analytics">
          {{ currentPage }}
        </div>
        <div v-else-if="currentPage === 'alert'" class="page alert">
          {{ currentPage }}
        </div>
        <div v-else-if="currentPage === 'setting'" class="page setting">
          {{ currentPage }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@font-face {
  font-family: 'varela-round';
  src: url('../src/assets/font/VarelaRound-Regular.ttf');
}

.grid-container {
  display: grid;
  grid-template-columns: 5em 1fr;
  background-color: rgb(236, 235, 235);
  font-family: 'varela-round';
  position: relative;
}

.side-bar-wrapper {
  display: flex;
  flex-direction: column;
  width: 5em;
  height: 100vh;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  padding: 1em 0.75em;
  border-radius: 2em;
  z-index: 10; /* Ensure it stays above the main content */
}

.main-content-wrapper {
  display: grid;
  grid-template-rows: 5em 1fr;
  grid-column: 2 / 3;
  padding-left: 2em; /* Add padding equal to sidebar width */
}

.header-wrapper {
  display: flex;
  padding: 1em;
  grid-row: 1 / 2;
  padding-top: 1em;
}

.content-wrapper {
  display: grid;
  padding-right: 2em;
  padding-top: 1em;
  grid-template-rows: 5em 1fr;
}

.filter-bar-wrapper {
  display: flex;
  padding-top: 1em;
  padding-bottom: 1em;
  grid-row: 1 / 2;
}

.page {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-row: 2 / 3;
  grid-auto-flow: row;
  grid-auto-rows: min-content;
  margin-top: 3em;
}
</style>

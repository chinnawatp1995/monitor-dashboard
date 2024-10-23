<script setup></script>

<template>
  <div class="grid-container">
    <div class="side-bar-wrapper">
      <SideBar></SideBar>
    </div>
    <div class="main-content-wrapper">
      <div class="header-wrapper">
        <Header></Header>
      </div>
      <router-view></router-view>
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
</style>

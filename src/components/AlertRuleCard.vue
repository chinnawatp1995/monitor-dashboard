<template>
  <Card>
    <template #title>
      <div class="card-title">
        {{ rule.name }}
        <Button
          icon="pi pi-times"
          severity="danger"
          raised
          rounded
          outlined
        ></Button>
      </div>
    </template>
    <template #content>
      <div class="card-content">
        <div class="card-content-item">
          <label style="font-weight: bold; font-size: 0.75rem"
            >Expression</label
          >
          <p>{{ rule.expression }}</p>
        </div>
        <div class="card-content-item">
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Duration</label
            >
            <p>{{ rule.duration }}</p>
          </div>
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Severity</label
            >
            <p>{{ rule.severity }}</p>
          </div>
        </div>
        <div class="card-content-item">
          <div>
            <label style="font-weight: bold; font-size: 0.75rem"
              >Silence Duration</label
            >
            <p>{{ rule.silence_time }}</p>
          </div>
          <div>
            <label style="font-weight: bold; font-size: 0.75rem">Message</label>
            <p>{{ rule.message }}</p>
          </div>
        </div>
      </div>
      <div class="card-input">
        <Button icon="pi pi-play" severity="success" raised outlined></Button>
        <Button icon="pi pi-stop" severity="danger" raised outlined></Button>
        <Button icon="pi pi-pencil" severity="info" raised outlined></Button>
        <Button
          icon="pi pi-user-plus"
          severity="warning"
          raised
          outlined
        ></Button>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { defineProps } from 'vue'

const prop = defineProps(['rule'])
</script>

<style scoped>
.card-wrapper {
}
.card-content {
}
.card-title {
  display: flex;
  justify-content: space-between;
}

.card-input {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
.card-content p {
  margin-left: 0.5rem;
  background-color: #f0f0f0;
  border-radius: 5px;
  padding: 0.5rem;
  font-size: 0.8rem;
}
.card-content-item {
  display: flex;
  align-items: center;
}
.card-content-item div {
  display: flex;
  align-items: center;
}
.card-content-item div p {
  margin-right: 5rem;
}
</style>

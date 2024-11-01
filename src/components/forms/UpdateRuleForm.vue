<template>
  <div class="">
    <h4>Edit Rule</h4>
    <div class="input-line">
      <FloatLabel variant="on">
        <InputText v-model="rule.name" />
        <label for="name">Name</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText v-model="rule.severity" />
        <label for="severity">Severity</label>
      </FloatLabel>
    </div>
    <div class="input-line">
      <FloatLabel variant="on">
        <InputText v-model="rule.duration" />
        <label for="duration">Duration</label>
      </FloatLabel>
      <FloatLabel variant="on">
        <InputText v-model="rule.silence_time" />
        <label for="silenceTime">Silence Time</label>
      </FloatLabel>
    </div>
    <div class="input-line">
      <FloatLabel variant="on">
        <Textarea v-model="rule.expression" class="full-width" rows="6" />
        <label for="expression">Expression</label>
      </FloatLabel>
    </div>
    <div class="input-line">
      <FloatLabel variant="on">
        <Textarea v-model="rule.message" class="full-width" rows="6" />
        <label for="message">Message</label>
      </FloatLabel>
    </div>
    <Button label="Update" @click="updateRule" icon="pi pi-save" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  rule: Object,
})

const rule = ref({ ...props.rule })

const emit = defineEmits(['update:rule', 'closeDialog'])

const updateRule = () => {
  emit('update:rule', rule.value)
  emit('closeDialog')
}
</script>

<style scoped>
.full-width {
  width: 100%;
}
.input-line {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-bottom: 1rem;
}
</style>

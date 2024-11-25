<template>
  <div class="form-wrapper">
    <h3>Create Group</h3>
    <div class="form-field">
      <FloatLabel variant="on">
        <InputText id="name" v-model="group.name" />
        <label for="name">Name</label>
      </FloatLabel>
      <Button
        label="Create"
        @click="$emit('createGroup', group), clearInput()"
        icon="pi pi-save"
      />
      <Button
        icon="pi pi-user-plus"
        severity="warning"
        raised
        outlined
        @click="toggle"
      ></Button>
      <Popover ref="op">
        <div>
          <h4>Recievers</h4>
          <Listbox
            v-model="group.recipients"
            :options="props.recipients"
            multiple
            optionLabel="name"
            optionValue="id"
            class="w-full md:w-100"
          ></Listbox>
          <Button icon="pi pi-check" label="confirm" @click="toggle"></Button>
        </div>
      </Popover>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps(['recipients'])
const op = ref()
const group = ref({
  name: '',
  recipients: [],
})

const toggle = event => {
  op.value.toggle(event)
}

const clearInput = () => {
  group.value.name = ''
  group.value.recipients = []
}
</script>

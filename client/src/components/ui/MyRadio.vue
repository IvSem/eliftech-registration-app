<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  label: String,
  value: String,
  name: String
})
const model = defineModel()
const uniqueId = `input-${Math.random().toString(36).substr(2, 9)}`
</script>

<template>
  <div class="flex gap-x-1 items-center">
    <input :id="uniqueId" type="radio" :name="name" :value="value" v-model="model" />
    <label :for="uniqueId" class="mb-1 text-sm">{{ label }}</label>
  </div>
</template>

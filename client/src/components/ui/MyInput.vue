<script setup>
const model = defineModel()

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  label: String,
  type: String,
  name: String,
  placeholder: String
})
const uniqueId = `input-${Math.random().toString(36).substr(2, 9)}`
</script>

<template>
  <div class="flex flex-col mt-2">
    <label :for="uniqueId" class="text-cyan-500 mb-1 text-sm">{{ label }}</label>
    <input
      class="p-2 border rounded text-black"
      :id="uniqueId"
      :type="type"
      :placeholder="placeholder"
      :name="name"
      v-model="model"
    />
  </div>
</template>

<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import axios from 'axios'

axios
  .get('http://localhost:4000')
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>

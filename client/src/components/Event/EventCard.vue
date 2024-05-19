<template>
  <li class="p-4 bg-slate-200 dark:bg-slate-400 rounded shadow flex flex-col">
    <h2 class="text-xl font-bold italic">{{ event.title }}</h2>
    <p class="pt-3 pb-5">{{ event.description }}</p>

    <div class="grid gap-y-4 mt-auto">
      <p>
        Organizer : <span class="underline">{{ event.organizer }}</span>
      </p>
      <p>Date event : {{ formatEventDate(event.eventDate) }}</p>
      <div class="flex justify-between">
        <RouterLink
          :to="`/events/${event._id}/register`"
          class="text-blue-400 dark:text-cyan-800 hover:underline"
          >Register</RouterLink
        >
        <RouterLink
          :to="`/events/${event._id}/participants`"
          class="text-blue-400 dark:text-cyan-800 hover:underline"
          >View</RouterLink
        >
      </div>
    </div>
  </li>
</template>

<script setup>
import { RouterLink } from 'vue-router'

const formatEventDate = (eventDate) => {
  const date = new Date(eventDate)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day} | ${hours}:${minutes}`
}

defineProps({
  event: Object
})
</script>

<style></style>

<script setup>
import { useAxios } from '@/hooks/useAxios'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import MyInput from '@/components/ui/MyInput.vue'
import { Line } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement
)

const route = useRoute()
const searchQuery = ref('')

const {
  data: participants,
  loading,
  fetchData
} = useAxios(`/events/${route.params.eventId}/participants`)

const {
  data: event,
  loading: loadingEvent,
  fetchData: fetchEventById
} = useAxios(`/api/events/${route.params.eventId}`)

onMounted(async () => {
  await fetchEventById()
  await fetchData()
})

const filteredParticipants = computed(() => {
  if (!participants.value) return []
  return participants.value.filter(
    (participant) =>
      participant.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const registrationData = computed(() => {
  if (!participants.value) return { labels: [], datasets: [] }

  const dates = participants.value.map(
    (p) => new Date(p.registrationDate).toISOString().split('T')[0]
  )

  const dateCounts = dates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {})

  const currentDate = new Date().toISOString().split('T')[0]
  if (!dateCounts[currentDate]) {
    dateCounts[currentDate] = 0
  }

  const sortedDates = Object.keys(dateCounts).sort((a, b) => new Date(a) - new Date(b))

  return {
    labels: sortedDates,
    datasets: [
      {
        label: 'Кількість реєстрацій на день',
        data: sortedDates.map((date) => dateCounts[date]),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  }
})

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
}
</script>

<template>
  <main>
    <div v-if="loadingEvent" class="mb-10">
      <div class="animate-pulse h-6 bg-slate-700 dark:bg-slate-400 rounded"></div>
    </div>
    <h1 v-else class="font-bold mb-10">"{{ event?.title }}" Event Participants</h1>

    <div v-if="loading" class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
      <EventSkeleton v-for="n in 3" :key="n" />
    </div>

    <div v-if="participants?.length > 0 && !loading">
      <div class="flex items-center gap-x-4 pb-4">
        <p>Пошук:</p>
        <MyInput
          class="w-full !mt-0"
          name="searchQuery"
          type="search"
          placeholder="Enter query..."
          v-model="searchQuery"
        />
      </div>

      <ul class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <li
          v-for="participant in filteredParticipants"
          :key="participant._id"
          class="p-4 bg-slate-200 dark:bg-slate-400 rounded shadow flex flex-col"
        >
          <p>{{ participant.fullName }}</p>
          <p>{{ participant.email }}</p>
        </li>
      </ul>
      <div v-if="filteredParticipants.length === 0">за {{ searchQuery }} нічого не знайдено</div>
    </div>

    <div class="my-10">
      <Line
        v-if="participants?.length > 0 && !loading"
        :data="registrationData"
        :options="chartOptions"
        class="mx-auto"
      />
    </div>

    <div v-if="participants?.length === 0 && !loading" class="flex flex-col items-start">
      <p>Participants not found...</p>

      <RouterLink :to="`/events/${event?._id}/register`" class="mt-10 bg-cyan-600 p-2 rounded"
        >Register this event</RouterLink
      >
    </div>
  </main>
</template>

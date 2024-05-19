<script setup>
import AgSelect from '@/components/ui/AgSelect.vue'
import { useAxios } from '@/hooks/useAxios'
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'

const events = ref([])
const page = ref(1)
const limit = ref(9)
const totalPage = ref(0)
const selectedSort = ref('')
const observer = ref(null)
const observerElement = ref(null)
const showScrollTopButton = ref(false)

const sortOptions = ref([
  { value: 'last', name: 'Найновіші' },
  { value: 'title', name: 'По назві' },
  { value: 'organizer', name: 'По організатору' },
  { value: 'eventDate', name: 'По даті' }
])

const { data, fetchData, loadMore, loading } = useAxios('/api/events', 'get', {
  params: {
    page: page.value,
    limit: limit.value
  }
})

const sortedEvents = computed(() => {
  if (selectedSort.value === 'last') {
    return [...events.value].reverse()
  }
  if (selectedSort.value === 'eventDate') {
    return [...events.value].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate))
  }
  if (selectedSort.value === 'organizer') {
    return [...events.value].sort((a, b) => a.organizer.localeCompare(b.organizer))
  }
  return [...events.value].sort((a, b) =>
    a[selectedSort.value]?.localeCompare(b[selectedSort.value])
  )
})

const loadMoreEvents = async () => {
  if (page.value <= totalPage.value && !loading.value) {
    loadMore.value = true
    await fetchData(null, { params: { page: page.value, limit: limit.value } })
    if (data.value) {
      events.value = [...events.value, ...data.value.events]
      page.value++
    }
    loadMore.value = false
  }
}
const handleScroll = () => {
  showScrollTopButton.value = window.scrollY > window.innerHeight
}
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  window.addEventListener('scroll', handleScroll)
  await fetchData()
  if (data.value) {
    events.value = data.value.events
    totalPage.value = data.value.pages
    page.value++
  }
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadMoreEvents()
      }
    })
  })
  if (observerElement.value) {
    observer.value.observe(observerElement.value)
  }
})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
watch(selectedSort, (newValue) => {
  if (newValue?.value) {
    selectedSort.value = newValue.value
  }
})
</script>

<template>
  <main>
    <section class="py-10">
      <div class="flex flex-col sm:flex-row gap-y-2 items-center justify-between mb-6">
        <p><strong>Сортувати по:</strong></p>
        <AgSelect
          v-model="selectedSort"
          :options="sortOptions"
          read-text="name"
          read-value="value"
          placeholder="Оберіть категорію"
          class="text-black"
        ></AgSelect>
      </div>

      <div v-if="loading && !loadMore" class="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <EventSkeleton v-for="n in 12" :key="n" />
      </div>

      <transition-group
        name="list"
        tag="ul"
        v-if="events?.length > 0"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-3"
      >
        <EventCard v-for="event in sortedEvents" :key="event.id" :event="event" />
      </transition-group>

      <div ref="observerElement" class="h-px"></div>

      <div v-if="loadMore" class="pt-4 grid md:grid-cols-2 lg:grid-cols-3 gap-3">
        <EventSkeleton v-for="n in 3" :key="n" />
      </div>

      <div v-if="!loading && events.length === 0">
        <p class="text-red-800 dark:text-red-300">Some went wrong... <br />please refresh</p>
      </div>

      <div
        v-if="showScrollTopButton"
        class="animate-bounce w-8 h-8 rounded-full bg-cyan-600 fixed bottom-5 right-5 flex items-center justify-center cursor-pointer group hover:bg-cyan-400 transition-colors"
        @click="scrollToTop"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" class="w-4 h-4 fill-white">
          <path
            d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
          />
        </svg>
      </div>
    </section>
  </main>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(15px);
}
.list-move {
  transition: transform 0.4s ease;
}
</style>

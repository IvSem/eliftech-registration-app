import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import EventCard from '@/components/Event/EventCard.vue'
import EventSkeleton from '@/components/Event/EventSkeleton.vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('EventCard', EventCard)
app.component('EventSkeleton', EventSkeleton)

app.use(createPinia())
app.use(router)

app.mount('#app')

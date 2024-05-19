import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/events/:eventId/register',
      name: 'eventRegistration',
      component: () => import('../views/EventRegistrationView.vue')
    },
    {
      path: '/events/:eventId/participants',
      name: 'eventParticipants',
      component: () => import('../views/EventParticipantsView.vue')
    }
  ]
})

export default router

<script setup>
import MyInput from '@/components/ui/MyInput.vue'
import MyRadio from '@/components/ui/MyRadio.vue'
import { useAxios } from '@/hooks/useAxios'
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const {
  loading,
  error: serverErrorMessage,
  fetchData: registerParticipant
} = useAxios(`/events/${route.params.eventId}/register`, 'post')

const {
  data: event,
  loading: evenLoading,
  fetchData: fetchEventById
} = useAxios(`/api/events/${route.params.eventId}`)

const successMessage = ref('')
const validationErrors = reactive({
  fullName: '',
  email: '',
  dateOfBirth: '',
  referralSource: ''
})

const state = reactive({
  fullName: '',
  email: '',
  dateOfBirth: '',
  referralSource: ''
})

const clearForm = () => {
  state.fullName = ''
  state.email = ''
  state.dateOfBirth = ''
  state.referralSource = ''
  clearValidationErrors()
}

const validateForm = () => {
  let isValid = true
  clearValidationErrors()

  if (!state.fullName) {
    validationErrors.fullName = 'Full name is required.'
    isValid = false
  }

  if (!state.email) {
    validationErrors.email = 'Email is required.'
    isValid = false
  } else if (!/\S+@\S+\.\S+/.test(state.email)) {
    validationErrors.email = 'Email is invalid.'
    isValid = false
  }

  if (!state.dateOfBirth) {
    validationErrors.dateOfBirth = 'Date of Birth is required.'
    isValid = false
  }

  if (!state.referralSource) {
    validationErrors.referralSource = 'Referral source is required.'
    isValid = false
  }

  return isValid
}

const clearValidationErrors = () => {
  Object.keys(validationErrors).forEach((key) => (validationErrors[key] = ''))
}

const submitForm = async () => {
  if (!validateForm()) return

  const formData = { ...state, eventId: route.params.eventId }
  await registerParticipant(formData)
  successMessage.value = 'Registration successful!'
  clearForm()
  router.push(`/events/${route.params.eventId}/participants`)
}

onMounted(async () => {
  await fetchEventById()
})
</script>

<template>
  <main>
    <section class="py-10">
      <div class="mb-4">
        <div v-if="evenLoading">
          <div class="animate-pulse flex space-x-4">
            <div class="h-4 bg-slate-700 dark:bg-slate-400 rounded w-[30%]"></div>
            <div class="h-4 bg-slate-700 dark:bg-slate-400 rounded w-full"></div>
          </div>
        </div>
        <p v-else>"{{ event?.title }} Event" registration</p>
      </div>

      <div>
        <div v-if="evenLoading">
          <div class="animate-pulse flex space-x-4">
            <div class="h-4 bg-slate-700 dark:bg-slate-400 rounded w-[30%]"></div>
            <div class="h-4 bg-slate-700 dark:bg-slate-400 rounded w-full"></div>
          </div>
        </div>
        <form v-else @submit.prevent="submitForm" class="w-full md:max-w-[50%]">
          <MyInput
            label="Full name"
            type="text"
            name="fullName"
            placeholder="Enter fullname"
            v-model="state.fullName"
          />
          <p v-if="validationErrors.fullName" class="pt-2 text-red-500 text-xs">
            {{ validationErrors.fullName }}
          </p>

          <MyInput
            label="Email"
            type="email"
            name="email"
            placeholder="Enter email"
            v-model="state.email"
          />
          <p v-if="validationErrors.email" class="pt-2 text-red-500 text-xs">
            {{ validationErrors.email }}
          </p>

          <MyInput
            label="Date of Birth"
            type="date"
            name="dateOfBirth"
            placeholder="Enter your birth date"
            v-model="state.dateOfBirth"
          />
          <p v-if="validationErrors.dateOfBirth" class="pt-2 text-red-500 text-xs">
            {{ validationErrors.dateOfBirth }}
          </p>

          <p class="text-cyan-500 mb-1 text-sm mt-4">Referral Source:</p>
          <div class="flex gap-x-3">
            <MyRadio
              value="social-media"
              label="Social Media"
              name="referralSource"
              v-model="state.referralSource"
            />

            <MyRadio
              value="friends"
              label="Friends"
              name="referralSource"
              v-model="state.referralSource"
            />
            <MyRadio
              value="found-myself"
              label="Found myself"
              name="referralSource"
              v-model="state.referralSource"
            />
          </div>
          <p v-if="validationErrors.referralSource" class="pt-2 text-red-500 text-xs">
            {{ validationErrors.referralSource }}
          </p>

          <button
            type="submit"
            class="p-2 bg-cyan-600 flex items-center rounded mt-4 min-w-[200px] text-center justify-center"
            :disabled="loading"
          >
            <svg
              v-if="loading"
              class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            {{ loading ? 'Sending...' : 'Send' }}
          </button>
        </form>
      </div>

      <div v-if="successMessage">
        <p class="bg-green-300 p-2">{{ successMessage }}</p>
      </div>

      <div v-if="serverErrorMessage">
        <p class="text-red-500 text-xs">{{ serverErrorMessage.message }}</p>
      </div>
    </section>
  </main>
</template>

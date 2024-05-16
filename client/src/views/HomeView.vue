<script setup>
//import TheWelcome from '../components/TheWelcome.vue'
import axios from 'axios'
import { ref } from 'vue'

axios
  .get('http://localhost:4000')
  .then((response) => {
    console.log(response.data)
  })
  .catch((error) => {
    console.log(error)
  })

const dateTimeValue = ref('')
const inputValue = ref('')

const submitForm = () => {
  // Создаем объект с данными для отправки в формате JSON
  const formData = {
    dateTime: dateTimeValue.value,
    input: inputValue.value
  }
  // Отправляем данные в консоль в формате JSON
  console.log(JSON.stringify(formData))
}
</script>

<template>
  <main>
    <form @submit.prevent="submitForm">
      <div>
        <label for="datetime-input">Дата и время:</label>
        <!-- Привязываем реактивную переменную к инпуту для даты и времени -->
        <input type="datetime-local" id="datetime-input" v-model="dateTimeValue" required />
      </div>
      <div>
        <label for="input-field">Ввод:</label>
        <!-- Привязываем реактивную переменную к инпуту для ввода -->
        <input type="text" id="input-field" v-model="inputValue" required />
      </div>
      <!-- Кнопка для отправки формы -->
      <button type="submit">Отправить</button>
    </form>
    <!--<TheWelcome />-->
  </main>
</template>

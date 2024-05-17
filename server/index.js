import express, { json } from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import { eventCreateValidation, eventRegisterValidation } from './validations/validations.js'
import handleValidationsErrors from './utils/handleValidationsErrors.js'
import { EventController } from './controllers/index.js'
import EventRegistration from './models/eventRegistration.model.js'

dotenv.config()

const PORT = 4000

const app = express()
app.use(cors())
app.use(express.json())

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log('DB connect')
  })
  .catch((err) => {
    console.log('DB error', err)
  })

app.get('/', (req, res) => {
  res.status(200).json('Welcome, your app is working well')
})

app.get('/events/:eventId/participants', async (req, res) => {
  try {
    const { eventId } = req.params
    const participants = await EventRegistration.find({ eventId })
    res.status(200).json(participants)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

app.get('/api/events', EventController.getAllEvenets)
app.post('/api/events', eventCreateValidation, handleValidationsErrors, EventController.createEvent)

app.post(
  '/events/:eventId/register',
  eventRegisterValidation,
  handleValidationsErrors,
  EventController.eventRegister
)

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})

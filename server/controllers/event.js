import EventModel from '../models/event.model.js'
import EventRegistration from '../models/eventRegistration.model.js'

export const getAllEvenets = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit

    const events = await EventModel.find().skip(skip).limit(limit).exec()
    const total = await EventModel.countDocuments()

    res.json({
      events,
      total,
      page,
      pages: Math.ceil(total / limit)
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({
      message: 'Failed to get events'
    })
  }
}
export const getEventById = async (req, res) => {
  try {
    const { eventId } = req.params
    const event = await EventModel.findById(eventId).exec()

    if (!event) {
      return res.status(404).json({
        message: 'Event not found'
      })
    }

    res.json(event)
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Failed to get event'
    })
  }
}

export const createEvent = async (req, res) => {
  try {
    const { title, description, eventDate, organizer } = req.body

    const existingEvent = await EventModel.findOne({ description })
    if (existingEvent) {
      return res.status(400).json({
        message: 'Event description must be unique'
      })
    }

    const doc = new EventModel({
      title,
      description,
      eventDate,
      organizer
    })

    const event = await doc.save()
    res.json(event)
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Failed to create event'
    })
  }
}

export const eventRegister = async (req, res) => {
  try {
    const { eventId } = req.params
    const { fullName, email, dateOfBirth, referralSource } = req.body

    const event = await EventModel.findById(eventId)
    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    const existingRegistration = await EventRegistration.findOne({ eventId, email })
    if (existingRegistration) {
      return res.status(400).json({ message: 'You are already registered for this event' })
    }

    const newRegistration = new EventRegistration({
      fullName,
      email,
      dateOfBirth,
      referralSource,
      eventId
    })

    await newRegistration.save()

    res.status(201).json({ message: 'Registration successful', registration: newRegistration })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

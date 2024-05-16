import mongoose from 'mongoose'
const { Schema } = mongoose

const EventSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  eventDate: {
    type: Date,
    required: true
  },
  organizer: {
    type: String,
    required: true
  }
})

const Event = mongoose.model('Event', EventSchema)
export default Event

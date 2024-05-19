import mongoose from 'mongoose'
const { Schema } = mongoose

const EventRegistrationSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  referralSource: {
    type: String,
    required: true
  },
  eventId: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  },
  registrationDate: {
    type: Date,
    default: Date.now
  }
})

const EventRegistration = mongoose.model('EventRegistration', EventRegistrationSchema)
export default EventRegistration

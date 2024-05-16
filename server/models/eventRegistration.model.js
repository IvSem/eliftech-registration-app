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
    type: Schema.Types.ObjectId, // Зв'язок з ідентифікатором події
    ref: 'Event' // Вказуємо на колекцію, з якою потрібно зв'язати
  }
})

const EventRegistration = mongoose.model('EventRegistration', EventRegistrationSchema)
export default EventRegistration

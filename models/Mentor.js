import mongoose from 'mongoose'

const { Schema } = mongoose

// Define the Mentor Schema
const mentorSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true, unique: true },
})

// Create and export the Mentor model
const Mentor = mongoose.models.Mentor || mongoose.model('Mentor', mentorSchema)

export default Mentor 
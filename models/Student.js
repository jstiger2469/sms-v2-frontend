import mongoose from 'mongoose'

const { Schema } = mongoose

// Define the Student Schema
const studentSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String },
  phone: { type: String },
})

// Create and export the Student model
const Student = mongoose.models.Student || mongoose.model('Student', studentSchema)

export default Student 
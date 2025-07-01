import mongoose from 'mongoose'

const { Schema } = mongoose

// Define the Message Schema
const messageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'senderModel', // This will point to either 'Student' or 'Mentor'
  },
  recipient: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    refPath: 'recipientModel', // This will point to either 'Student' or 'Mentor'
  },
  senderModel: {
    type: String,
    required: true,
    enum: ['Student', 'Mentor', 'Admin'], // Indicates whether the sender is a Student or a Mentor
  },
  recipientModel: {
    type: String,
    required: true,
    enum: ['Student', 'Mentor'], // Indicates whether the recipient is a Student or a Mentor
  },
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Match', // Reference to the Match collection
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
})

const Message = mongoose.models.Message || mongoose.model('Message', messageSchema)

export default Message 
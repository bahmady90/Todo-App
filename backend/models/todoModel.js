const mongoose = require('mongoose')

const Schema = mongoose.Schema

const todoSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  dateObject: {
    type: Object,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: false
  },
  text: {
    type: String,
    required: true
  },
  isImportant: {
    type: Boolean,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model('Todo', todoSchema)
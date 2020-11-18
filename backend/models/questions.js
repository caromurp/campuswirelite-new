const { Schema, model } = require('mongoose')

const questionsSchema = new Schema({
  questionText: String,
  answer: String,
  author: String,
})

module.exports = model('Questions', questionsSchema)

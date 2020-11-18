const express = require('express')
const Questions = require('../models/questions')
const isAuthenticated = require('../middlewares/isAuthenticated')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const all = await Questions.find({})
    res.send(all)
  } catch {
    res.send('failure occurs when getting all the questions')
  }
})

router.post('/add', isAuthenticated, async (req, res) => {
  const { author, questionText } = req.body
  try {
    await Questions.create({ author, questionText, answer: '' })
    res.send(`added question: ${questionText} by author: ${author}`)
  } catch {
    res.send('failure occurs when creating the question')
  }
})

router.post('/answer', isAuthenticated, async (req, res) => {
  const { _id, answer } = req.body
  try {
    await Questions.updateOne({ _id }, { $set: { answer } })
    res.send('question updated')
  } catch (e) {
    res.send('failure occurs when creating the question')
  }
})

module.exports = router

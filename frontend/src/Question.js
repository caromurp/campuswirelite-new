import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'

const Question = ({ isLoggedIn, question }) => {
  const [answer, setAnswer] = useState('')

  const handleChange = e => {
    const { target } = e
    const { value } = target
    setAnswer(value)
  }
  const handleSubmit = async () => {
    try {
      await axios.post('/api/answer', { _id: question._id, answer })
    } catch (e) {
      alert(`Error adding question: ${e}`)
    }
  }

  return (
    <div>
      <h1>{question.questionText}</h1>
      <h2>Author: {question.author}</h2>
      <h2>Answer: {question.answer}</h2>
      {isLoggedIn && (
        <div>
          <input placeholder="Answer this question" onChange={handleChange}></input>
          <Button onClick={handleSubmit}>Submit Answer</Button>
        </div>
      )}
    </div>
  )
}

export default Question

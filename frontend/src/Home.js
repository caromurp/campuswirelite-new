import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  useHistory,
} from 'react-router-dom'
import s from 'styled-components'
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Modal from 'react-bootstrap/Modal'
import ListGroup from 'react-bootstrap/ListGroup'
import Question from './Question'

const getQuestions = async (setQuestions, setCurrQuestion) => {
  const qs = await axios.get('/api', {})
  const qsList = qs.data
  setQuestions(qsList)
}

const getUser = async setUser => {
  const u = await axios.get('/account/user', {})
  setUser(u.data)
}

const getIsLoggedIn = async setIsLoggedIn => {
  try {
    const ili = await axios.get('/account/isLoggedIn', {})
    const i = ili.data
    setIsLoggedIn(i)
  } catch (e) {
    console.log('user is not logged in')
  }
}

const Home = () => {
  const [questions, setQuestions] = useState([])
  const [currQuestion, setCurrQuestion] = useState(questions[0] || {})
  const [show, setShow] = useState(false)
  const [askedQuestion, setAskedQuestion] = useState('')
  const [user, setUser] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const history = useHistory()

  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)
  const handleSubmit = async () => {
    try {
      await axios.post('/api/add', { author: user, questionText: askedQuestion })
      handleClose()
    } catch (e) {
      alert(`Error adding new question: ${e}`)
    }
  }
  const handleChange = e => {
    const { target } = e
    const { value } = target
    setAskedQuestion(value)
  }
  const handleLogout = async () => {
    try {
      await axios.post('/account/logout', {})
      history.push('/login')
    } catch (e) {
      alert(`Error adding new question: ${e}`)
    }
  }

  const handleLogin = async () => {
    try {
      history.push('/login')
    } catch (e) {
      alert('Cannot switch to login')
    }
  }

  useEffect(() => {
    const intervalID = setInterval(() => {
      getQuestions(setQuestions, setCurrQuestion)
      getUser(setUser)
      getIsLoggedIn(setIsLoggedIn)
    }, 2000)
    return () => clearInterval(intervalID)
  }, [])

  return (
    <Router>
      <div>
        <Navbar className="bg-light justify-content-between">
          <Navbar.Brand>Campuswire Lite</Navbar.Brand>
          {isLoggedIn && (
            <div>
              <Navbar.Text>Hello {user}</Navbar.Text>
              <Button variant="secondary" onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </Navbar>
        <Container>
          {isLoggedIn ? (
            <div>
              <Button variant="primary" onClick={handleShow}>
                Ask a question +
              </Button>
              <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
              >
                <Modal.Header closeButton>
                  <Modal.Title>Ask a question!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      name="newQuestion"
                      onChange={e => handleChange(e)}
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>Ask</Button>
                </Modal.Footer>
              </Modal>
            </div>
          ) : (
            <div>
              <Button variant="link" onClick={handleLogin}>Login to submit or answer a question!</Button>
            </div>
          )}
          <div>
            <ListGroup variant="flush">
              {questions.map(q => (
                <div key={q._id}>
                  <ListGroup.Item onClick={e => setCurrQuestion(q)}>{q.questionText}</ListGroup.Item>
                </div>
              ))}
            </ListGroup>
          </div>
          <div>
            <Question isLoggedIn={isLoggedIn} question={currQuestion} />
          </div>
        </Container>
      </div>
    </Router>
  )
}

const Container = s.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

export default Home

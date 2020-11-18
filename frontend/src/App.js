import React, { useEffect, useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from 'react-router-dom'
import axios from 'axios'
import Home from './Home'
import Signup from './Signup'
import Login from './Login'

const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
    </Switch>
  </Router>
)

export default App

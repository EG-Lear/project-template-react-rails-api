import React, { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Containers/Home'
import Signup from './Components/SignUp'
import Trip from './Components/Trip'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  
  const history = useHistory()
  
  const loginUser = (u) => {
    setLoggedIn(true)
    setUser(u)
    history.push('/')
  }

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(u => {
          console.log(u)
          setLoggedIn(true)
          setUser(u.username)
        })
      }
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} />
        <Switch>
          <Route exact path='/' render={() => <Home loggedIn={loggedIn} loginUser={loginUser} user={user}/>}/>
          <Route exact path='/signup' render={() => <Signup loginUser={loginUser}/>}/>
          <Route exact path='/trip' render={() => <Trip />}/>
          <Route />
        </Switch>
      </div>
    </Router>
  )
}

export default App;

import React, { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Components/Home'
import Signup from './Containers/SignUp'
import Trip from './Containers/Trip'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  
  const history = useHistory()
  
  const loginUser = (u) => {
    setLoggedIn(true)
    setUser(u)
    // history.push('/')
  }
  
  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(r => {
      setLoggedIn(false)
      setUser(null)
    })
    // history.push('/')
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
        <Navbar loggedIn={loggedIn} logout={logoutUser}/>
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

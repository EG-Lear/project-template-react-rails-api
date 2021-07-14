import React, { useState, useEffect } from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Switch, useHistory} from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Components/Home'
import Signup from './Containers/SignUp'
import Trip from './Containers/Trip'
import SingleTrip from './Containers/SingleTrip'
import Recommendations from './Containers/Recommendations'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const [admin, setAdmin] = useState(false)
  
  const history = useHistory()
  
  const loginUser = (u, a) => {
    setLoggedIn(true)
    setUser(u)
    console.log(a)
    setAdmin(a)
    history.push('/')
  }
  
  const logoutUser = () => {
    fetch('/logout', {
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setLoggedIn(false)
        setUser(null)
      }
    })
    history.push('/')
  }

  useEffect(() => {
    fetch('/me')
    .then(res => {
      if (res.ok) {
        res.json()
        .then(u => {
          if (u.errors) {
            alert(u.errors)
          } else {
            setLoggedIn(true)
            setUser(u.username)
            setAdmin(u.admin)
          }
        })
      }
    })
  }, [])

  return (
    <div className="App">
      <Navbar loggedIn={loggedIn} logout={logoutUser}/>
      <Switch>
        <Route exact path='/' render={() => <Home loggedIn={loggedIn} loginUser={loginUser} user={user}/>}/>
        <Route exact path='/signup' render={() => <Signup loginUser={loginUser}/>}/>
        <Route exact path='/trips' render={() => <Trip />}/>
        <Route exact path='/trips/:id' render={() => <SingleTrip />} />
        <Route exact path='/recommendations' render={() => <Recommendations admin={admin}/>}/>
      </Switch>
    </div>
  )
}

export default App;

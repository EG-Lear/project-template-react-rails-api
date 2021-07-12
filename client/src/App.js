import React, { useState } from 'react'
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from './Components/NavBar'
import Home from './Containers/Home'
import Signup from './Components/SignUp'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState({})
  const loginUser = (u) => {
    setLoggedIn(true)
    setUser(u)
  }

  return (
    <Router>
      <div className="App">
        <Navbar loggedIn={loggedIn} loginUser={loginUser}/>
        <Switch>
          <Route exact path='/' render={() => <Home loggedIn={loggedIn} loginUser={loginUser}/>}/>
          <Route exact path='/signup' render={() => <Signup />}/>
        </Switch>
      </div>
    </Router>
  )
}

export default App;

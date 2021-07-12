import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../Components/Login'

const Home = ({loggedIn, loginUser}) => {
 
  if (loggedIn === false) {
    return(
      <div>
        <Login loginUser={loginUser}/>
        <Link to='/signup'>
          <button>Sign Up</button>
        </Link>
      </div>
    )
  }
}

export default Home
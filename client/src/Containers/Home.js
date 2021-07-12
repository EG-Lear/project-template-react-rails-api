import React from 'react'

const Home = ({loggedIn}) => {
 
  if (loggedIn === false) {
    return(
      <div>
        <h2>Welcome to Globe Tripper</h2>
      </div>
    )
  }
}

export default Home
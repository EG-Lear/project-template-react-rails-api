import React, { useState } from 'react'

const SignUp = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = (event) => {
    if (event.target.id === 'U') {
      setUserName(event.target.value)
    } else if (event.target.id === 'P') {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = () => {
    fetch('http://localhost:3000/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: userName, 
       password: password
      })
    })
    .then(res => res.json())
    .then(data => 
      console.log(data)
    )
  }

  return(
    <div>
      <h2>Sign up time</h2>
      <form>
      <label>Username: </label>
        <input id='U' value={userName} onChange={handleChange}></input>
        <br/>
        <label>Password: </label>
        <input id='P' value={password} onChange={handleChange}></input>
      </form>
    </div>
  )
}

export default SignUp
import React, { useState } from 'react'

const Login = () => {
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const handleChange = (event) => {
    if (event.target.id === 'U') {
      setUserName(event.target.value)
    } else if (event.target.id === 'P') {
      setPassword(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/login', {
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

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Username: </label>
        <input id='U' value={userName} onChange={handleChange}></input>
        <br/>
        <label>Password: </label>
        <input id='P' value={password} onChange={handleChange}></input>
        <br/>
        <br/>
        <button>Login In</button>
      </form>
    </div>
  )
}

export default Login

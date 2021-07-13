import React, { useState, useEffect } from 'react'

const Trip = () => {
  const [trips, setTrips] = useState([])
  const [newTripName, setNewTripName] = useState('')

  useEffect(() => {
    fetch('/trips')
    .then(res => res.json())
    .then(data => setTrips(data))
  })

  const handleRender = () => {
    console.log(trips)
    const tripLis = []
    trips.map(trip => {
      tripLis.push(<li>{trip.name}</li>)
    })
    return(tripLis)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/trips', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newTripName
      })
    })
    .then(res => res.json())
    .then(data => console.log(data))
  }

  const handleNewName = (event) => {
    setNewTripName(event.target.value)
  }

  return(
    <div>
      <ul>
        {handleRender()}
      </ul>
      <form onSubmit={handleSubmit}>
        <h4>Plan a new trip</h4>
        <label>Trip Name: </label>
        <input value={newTripName} onChange={handleNewName}></input>
        <button>Create</button>
      </form>
    </div>
  )
}

export default Trip
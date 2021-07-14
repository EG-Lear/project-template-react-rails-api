import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";

const Trip = () => {
  const [trips, setTrips] = useState([])
  const [newTripName, setNewTripName] = useState('')

  useEffect(() => {
    fetch('/trips')
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setTrips(data)
      }
    })
  }, [])

  const handleRender = () => {
    // console.log(trips)
    const tripLis = []
    trips.forEach(trip => {
      tripLis.push(
        <li key={trip.id} id={trip.id} className='Centered'>{trip.name} - <Link to={`/trips/${trip.id}`}>View Trip</Link> - <button value={trip.id} onClick={handleDelete}>Delete Trip</button></li>)
    })
    return(tripLis)
  }

  const handleDelete = (event) => {
    fetch(`/trips/${event.target.value}`, {
      method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setTrips(data)
      }
    })
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
    .then(data => {
      console.log(data)
      if (data.errors) {
        alert(data.errors)
      } else {
        setTrips(data)
      }
    })
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
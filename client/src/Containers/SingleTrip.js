import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleTrip = () => {
  const [trip, setTrip] = useState([])
  const [stopName, setStopName] = useState('')
  const [description, setDescription] = useState('')
  const [extraStop, setExtraStop] = useState(false)
  const { id } = useParams()

  useEffect(() => {
    fetch(`/trips/${id}`)
    .then(res => res.json())
    .then(data => setTrip(data))
  })

  const handleChange = (event) => {
    if (event.target.id === 'S') {
      setStopName(event.target.value)
    } else if (event.target.id === 'D') {
      setDescription(event.taret.value)
    }
  }

  return(
    <div>
      <h3>{trip.name}</h3>
      <form>
        <h4>Plan a stop</h4>
        <label>Name: </label>
        <input id='S' value={stopName} onChange={handleChange}></input>
        <br/>
        <label>Description: </label>
        <input id='D' value={description} onChange={handleChange}></input>
      </form>
    </div>
  )
}

export default SingleTrip
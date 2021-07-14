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
  }, [])

  const handleChange = (event) => {
    if (event.target.id === 'S') {
      setStopName(event.target.value)
    } else if (event.target.id === 'D') {
      setDescription(event.target.value)
    } else if (event.target.id === 'SS') {
      setExtraStop(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let idInt = parseInt(id, 10)
    // console.log(idInt, '1')
    fetch('/stops', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: stopName,
        description: description,
        extra_stop: extraStop,
        trip_id: idInt
      })
    })
    .then(res => res.json())
    .then(data => setTrip(data))
  }

  const handleRender = () => {
    const lis = []
    if (trip.stops) {
      trip.stops.forEach(stop => {
        lis.push(
          <li key={stop.id} className='Centered'>
            {stop.name} <button id={stop.id} onClick={handleClick}>Delete</button>
            <br/>
            {stop.description}
            <br/>
            <br/>
          </li>
        )
      })
    }
    return(lis)
  }

  const handleClick = (event) => {
    fetch(`/stops/${event.target.id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trip_id: id
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        setTrip(data)
      }
    })
  }

  return(
    <div>
      <h3>{trip.name}</h3>
      <ul>
        {handleRender()}
      </ul>
      <form onSubmit={handleSubmit}>
        <h4>Plan a stop</h4>
        <label>Name: </label>
        <input id='S' value={stopName} onChange={handleChange}></input>
        <br/>
        <label>Description: </label>
        <input id='D' value={description} onChange={handleChange}></input>
        <br/>
        <label>Secondary Stop </label>
        <select id='SS' onChange={handleChange}>
          <option value={false}>No</option>
          <option value={true}>Yes</option>
        </select>
        <br/>
        <button>add stop</button>
      </form>
    </div>
  )
}

export default SingleTrip
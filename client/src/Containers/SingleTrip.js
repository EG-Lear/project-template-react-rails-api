import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleTrip = () => {
  const [trip, setTrip] = useState([])
  const { id } = useParams()

  useEffect(() => {
    fetch(`/trips/${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
  })

  return(
    <div>
      <h3>A trip {id} </h3>
    </div>
  )
}

export default SingleTrip
import React, { useState, useEffect } from 'react'

const Trip = () => {
  const [trips, setTrips] = useState([])

  useEffect(() => {
    fetch('/trips')
    .then(res => res.json())
    .then(data => setTrips(data))
  })

  const handleRender = () => {
    console.log(trips)
  }

  return(
    <div>
      {handleRender}
      <form>
        <h4>Plan a new trip</h4>
        <br/>
        <label>Name</label>
      </form>
    </div>
  )
}

export default Trip
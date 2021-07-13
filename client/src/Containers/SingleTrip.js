import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SingleTrip = () => {
  const { id } = useParams()

  return(
    <div>
      <h3>A trip {id} </h3>
    </div>
  )
}

export default SingleTrip
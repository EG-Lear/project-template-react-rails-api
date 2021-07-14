import React, { useState, useEffect } from 'react'

const Recommendations = ({admin}) => {
  const [recommendations, setRecommendations] = useState([])
  const [nameNew, setNameNew] = useState('')
  const [descriptionNew, setDescriptionNew] = useState('')
  const [imageUrlNew, setImageUrlNew] = useState('')

  useEffect(() => {
    fetch('/recommendations')
    .then(res => res.json())
    .then(data => console.log(data))
  }, [])

  const renderForm = () => {
    if (admin === true) {
      return(
        <form>
          <h4>Create recommendation</h4>
          <label>Name: </label>
          <input id='N' value={nameNew} onChange={handleChange}></input>
          <br/>
          <label>Description: </label>
          <input id='D' value={descriptionNew} onChange={handleChange}></input>
          <br/>
          <label>Image Url: </label>
          <input id='I' value={imageUrlNew} onChange={handleChange}></input>
          <br/>
        </form>
      )
    }
  }

  const handleChange = () => {

  }

  return (
    <div>
      <h3>Recommended stops</h3>
      {renderForm()}
    </div>
  )
}

export default Recommendations
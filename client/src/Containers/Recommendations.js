import React, { useState, useEffect } from 'react'

const Recommendations = ({admin}) => {
  const [recommendations, setRecommendations] = useState([])
  const [nameNew, setNameNew] = useState('')
  const [descriptionNew, setDescriptionNew] = useState('')
  const [imageUrlNew, setImageUrlNew] = useState('')

  useEffect(() => {
    fetch('/recommendations')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setRecommendations(data)
    })
  }, [])

  const renderForm = () => {
    if (admin === true) {
      return(
        <form onSubmit={handleSubmit}>
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
          <button>Create</button>
        </form>
      )
    }
  }

  const handleChange = (event) => {
    if (event.target.id === 'N') {
      setNameNew(event.target.value)
    } else if (event.target.id === 'D') {
      setDescriptionNew(event.target.value)
    } else if (event.target.id === 'I') {
      setImageUrlNew(event.target.value)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    fetch('/recommendations',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: nameNew,
        description: descriptionNew,
        image_url: imageUrlNew
      }) 
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setRecommendations(data)
    })
  }

  const renderRecommendations = () => {
    const lis = []
    recommendations.forEach(reco => {
      lis.push(
        <li key={reco.id} className='Centered'>
          <h4>{reco.name}</h4>
          <p>{reco.description}</p>
          <img className='RecoPics' src={reco.image_url}/>
          <br/>
          <button>Add to Trip</button>
          <br/>
          <br/>
          <br/>
        </li>
      )
    })
    return(lis)
  }

  return (
    <div>
      <h3>Recommended stops</h3>
      <ul className='RecoList'>
        {renderRecommendations()}
      </ul>
      {renderForm()}
    </div>
  )
}

export default Recommendations
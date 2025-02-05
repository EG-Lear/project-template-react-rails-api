import React, { useState, useEffect } from 'react'

const Recommendations = ({admin}) => {
  const [recommendations, setRecommendations] = useState([])
  const [nameNew, setNameNew] = useState('')
  const [descriptionNew, setDescriptionNew] = useState('')
  const [imageUrlNew, setImageUrlNew] = useState('')
  const [trips, setTrips] = useState([])
  const [selected, setSelected] = useState('')
  const [selectId, setSelectId] = useState('')

  useEffect(() => {
    fetch('/recommendations')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setRecommendations(data)
    })
    fetch('/trips')
    .then(res => res.json())
    .then(data => setTrips(data))
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
    let counter = 0
    recommendations.forEach(reco => {
      lis.push(
        <li key={reco.id} className='Centered'>
          <h4>{reco.name}</h4>
          <p>{reco.description}</p>
          <img className='RecoPics' src={reco.image_url}/>
          <br/>
          <button value={counter} onClick={handleClick}>Add to Trip</button>
          <select onChange={handleSelect}>
            <option key={'none'} id={"none"} value={"none"}>Select a Trip</option>
            {renderOptions()}
          </select>
          <label> Selected Trip: {selected}</label>
          <br/>
          <br/>
          <br/>
        </li>
      )
      counter ++
    })
    return(lis)
  }

  const handleClick = (event) => {
    console.log(selectId)
    console.log(event.target)
    const nameSet = recommendations[event.target.value].name
    const descripSet = recommendations[event.target.value].description  
    fetch('/stops',{
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        trip_id: selectId,
        name: nameSet,
        description: descripSet    
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.errors) {
        alert(data.errors)
      } else {
        console.log(data)
      }
    })
  }

  const handleSelect = (event) => {
    // console.log(event.target)
    if (event.target.value === "none") {
      setSelected("none")
      setSelectId("none")
    } else {
      const nameSet = trips[event.target.value].name
      const selSet = trips[event.target.value].id
      setSelected(nameSet)
      setSelectId(selSet)
    }
  }
  
  const renderOptions = () => {
    const choices = []
    let count = 0
    trips.forEach(trip => {
      choices.push(<option key={trip.id} value={count}>{trip.name}</option>)
      count ++
    })
    return(choices)
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
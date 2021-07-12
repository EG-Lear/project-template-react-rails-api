import React from 'react'
import {NavLink} from 'react-router-dom'
import '../App.css'

const NavBar = ({loggedIn}) => {

  if (loggedIn === false) {
    return (
      <div>
        <img className="Resize"src='https://cdn.shopify.com/s/files/1/0010/4225/1812/products/Enamel_Globe-Trotter_01_Top-View.png?v=1603458946'/>
      </div>
    )
  } else {
    return (
      <div>
        <img className="Resize"src='https://cdn.shopify.com/s/files/1/0010/4225/1812/products/Enamel_Globe-Trotter_01_Top-View.png?v=1603458946'/>
        <NavLink className='App-link' to='/'>Home</NavLink>
      </div>
    )
  }
}

export default NavBar
import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

function Navbar() {
  return (
    <div className='navbar'>   
      <div className="navbar-left">
        <img src={assets.logo} className='logo' alt="logo" />
        <div className="navbar-text">
          <h2>HUNGRY-HOP</h2>
          <p>Admin Panel</p>
        </div>
      </div>
      <img src={assets.profile_icon} className='profile' alt="profile" />
    </div>
  )
}

export default Navbar
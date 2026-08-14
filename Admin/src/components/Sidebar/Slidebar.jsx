import React from 'react'
import "./Slidbar.css"
import {assets} from '../../assets/assets'
import { NavLink } from 'react-router-dom'

function Slidebar() {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <NavLink to='/add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Icon</p>
        </NavLink>
        <NavLink to='/lists' className="sidebar-option">
          <img src={assets.list_icon} alt="" />
          <p>Oder List</p>
        </NavLink>
        <NavLink to="/order" className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Order</p>
        </NavLink>
              </div>
    </div>
  )
}

export default Slidebar
import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navigation.css"

export default function MainNavigtion(props) {
  return (
      <header className='main-navigation'>
          <div className='main-navigation__logo'>
              <h1>Ticketeer</h1>
          </div>
          <div className='main-navigation_items'>
              <ul>
                  <li>
                        <NavLink to='/'>Authenticate</NavLink>
                  </li>
                  <li>
                        <NavLink to='/events'>Events</NavLink>
                  </li>
                  <li>
                         <NavLink to='/bookings'>Bookings</NavLink>
                  </li>
              </ul>
          </div>
      </header>
  )
}

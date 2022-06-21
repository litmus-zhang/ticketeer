import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Navigation.css"
import AuthContext from '../../context/auth-context'

export default function MainNavigtion(props) {
  return (
    <AuthContext.Consumer>
          {
              (context) =>
              {
                  return (
                    <header className='main-navigation'>
                    <div className='main-navigation__logo'>
                        <h1>Ticketeer</h1>
                    </div>
                    <div className='main-navigation_items'>
                        <ul>
                          { !context.token &&  <li>
                                  <NavLink to='/'>Authenticate</NavLink>
                            </li>}
                            <li>
                                  <NavLink to='/events'>Events</NavLink>
                                  </li>
                                  
                          {context.token && <>
                            <li>
                                   <NavLink to='/bookings'>Bookings</NavLink>
                          </li>
                          <li >
                                  <button onClick={context.logout}>Logout</button>
                            </li>
                          </>}
                        </ul>
                    </div>
                    </header>
                  )
              }
          }
    
      
          </AuthContext.Consumer>
  )
}

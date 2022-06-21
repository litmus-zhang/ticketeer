import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import MainNavigation from './components/Navigation/Navigation'

export default class App extends Component {
  render() {
    return (
      <Router>
        <MainNavigation />

<Routes>
              <Route path="/" >
               <Route index element={<AuthPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="bookings" element={<BookingsPage />} />
          </Route> 
          </Routes>
        
      </Router>
    )
  }
}


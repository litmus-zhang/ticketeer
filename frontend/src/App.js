import React, { Component } from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import AuthPage from './pages/Auth'
import BookingsPage from './pages/Bookings'
import EventsPage from './pages/Events'
import MainNavigation from './components/Navigation/Navigation'
import AuthContext from './context/auth-context'

export default class App extends Component
{
  state = {
    token: null,
    userId: null,
  }

  login = (token, userId, tokenExpiration) =>
  {
    this.setState({
      token: token,
      userId: userId
    })
  }
  logout = () =>
  {
    this.setState({
      token: null,
      userId: null
    })
  }

  
  render() {
    return (
      <Router>
        <AuthContext.Provider value={{
          token: this.state.token,
          userId: this.state.userId,
          login: this.login,
          logout: this.logout
        }}>
         
        <MainNavigation />

    <Routes>
              <Route path="/" >
              {!this.state.token && <Route index element={<AuthPage />} />}
              
                <Route path="/events" element={<EventsPage />} />
              { this.state.token &&  <Route path="bookings" element={<BookingsPage />} />}
          </Route> 
          </Routes>
          </AuthContext.Provider>
        
      </Router>
    )
  }
}


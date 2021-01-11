import './styles/App.css';
import React, { useState, useEffect } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './pages/Home'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
import CreateGame from './pages/CreateGame'
import GamePage from './pages/GamePage'
import UpdateGame from './pages/UpdateGame'
import Play from './pages/Play'
import { __CheckSession } from './services/UserServices'
import { ThemeProvider } from '@material-ui/core/styles'
import theme from './styles/Theme'

function App(props) {
  const [pageLoading, updatePageLoading] = useState(true)
  const [authenticated, updateAuthenticated] = useState(false)
  const [currentUser, updateUser] = useState(null)

  useEffect(() => {
    updatePageLoading(false)
    verifyTokenValid()
  }, [])

  const toggleAuthenticated = (value, user) => {
    updateAuthenticated(value)
    updateUser(user)
  }

  const verifyTokenValid = async () => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const session = await __CheckSession()
        updateUser(session.user)
        updateAuthenticated(true)
        props.history.push(window.location.pathname)
      } catch (error) {
        updateUser(null)
        updateAuthenticated(false)
        localStorage.clear()
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        {pageLoading ? (
          <h3>Loading...</h3>
        ) : (
            <Switch>
              <Route
                exact path="/"
                component={() => (
                  <Home
                    currentUser={currentUser}
                    authenticated={authenticated}
                    toggleAuthenticated={toggleAuthenticated}
                  />
                )}
              />
              <Route
                path="/register"
                component={(props) => (
                  <SignUp
                    {...props}
                    toggleAuthenticated={toggleAuthenticated}
                    currentUser={currentUser}
                    authenticated={authenticated} />
                )}
              />
              <Route
                path="/login"
                component={() => (
                  <SignIn

                    toggleAuthenticated={toggleAuthenticated}
                    currentUser={currentUser}
                    authenticated={authenticated} />
                )}
              />
              <ProtectedRoute
                authenticated={authenticated}
                path="/profile"
                component={() => (
                  <Profile
                    {...props}
                    toggleAuthenticated={toggleAuthenticated}
                    currentUser={currentUser}
                    authenticated={authenticated} />
                )}
              />
              <ProtectedRoute
                authenticated={authenticated}
                path="/create"
                component={() => (
                  <CreateGame
                    {...props}
                    toggleAuthenticated={toggleAuthenticated}
                    currentUser={currentUser}
                    authenticated={authenticated} />
                )}
              />
              <ProtectedRoute
                authenticated={authenticated}
                path="/update/:game_id"
                component={() => (
                  <UpdateGame
                    {...props}
                    toggleAuthenticated={toggleAuthenticated}
                    currentUser={currentUser}
                    authenticated={authenticated} />
                )}
              />
              <Route
                authenticated={authenticated}
                path="/play/:game_id"
                component={() => (
                  <GamePage
                    {...props}
                    toggleAuthenticated={toggleAuthenticated}
                    currentUser={currentUser}
                    authenticated={authenticated} />
                )}
              />
              <Route
                authenticated={authenticated}
                path="/play"
                component={() => (
                  <Play
                    {...props}
                    toggleAuthenticated={toggleAuthenticated}
                    currentUser={currentUser}
                    authenticated={authenticated} />
                )}
              />
            </Switch>
          )}
      </div>
    </ThemeProvider>
  )
}

export default withRouter(App)

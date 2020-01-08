import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import NewThreadForm from './components/NewThreadForm'
import LoginForm from './components/Login'
import NewUserFrom from './components/NewUserForm'
import Notification from './components/Notification'
import AllThreads from './components/AllThreads'
import Search from './components/Search'
import Thread from './components/Thread'
import User from './components/User'
import Settings from './components/Settings'
import { initializeThreads } from './reducers/threadReducer'
import { initializeComments } from './reducers/commentsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, logout } from './reducers/loginReducer'
import { setNotification } from './reducers/notificationReducer'
import { Dropdown, DropdownItem, DropdownMenu } from 'styled-dropdown-component'
import { Page, Navigation, Title, DropdownMenuItem, DropdownMenuButton, LogoutButton } from './components/Style'
import './index.css'

const App = (props) => {

  useEffect(() => {
    props.initializeThreads()
    props.initializeComments()
    props.initializeUsers()

    const loggedUserJSON = window.localStorage.getItem('Campus24User')

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setUser(user)
    }
  }, [])



  const findUserIdByUsername = (username) => {
    const user = props.users.find(u => u.username === username)
    return user
  }

  const findUserNameById = (id) => {

    const us = props.users.find(u => u.id === id)
    if (us === null || us === undefined) {
      return 'unknown user'
    }
    return us.username
  }

  const findUserById = (id) => {

    const us = props.users.find(u => u.id === id)
    if (us === null || us === undefined) {
      return 'unknown user'
    }
    return us
  }

  const findThreadById = (id) => {
    const thread = props.threads.find(t => t.id === id)
    return thread

  }

  const handleLogout = () => {

    try {
      props.logout()
      props.setNotification('See you soon!')
    } catch (e) {
      props.setNotification('Logout failed!')
    }
  }


  const padding = { padding: 5 }
  const [hidden, setHidden] = useState(true)


  return (
    <div>
      <Page>
        <Router>
          <div>
            <div>
              <Title>
                <h1>Campus24</h1>
                <Navigation>
                  <Link style={padding} to="/">Threads</Link>

                  <Link style={padding} to="/search">Search</Link>

                  {props.user !== null && <Link style={padding} to="/addNewThread">Add new thread</Link>}

                  <DropdownMenuItem>
                    <Dropdown>
                      <DropdownMenuButton dropdownToggle onClick={() => setHidden(!hidden)} id = 'dropdown' name= 'dropdown'>
                        Menu
                      </DropdownMenuButton>
                      <DropdownMenu hidden={hidden} toggle={() => setHidden(!hidden)}>
                        {props.user !== null && <LogoutButton onClick = {() => handleLogout()}> <DropdownItem id='logoutItem' name='logoutItem'>Logout</DropdownItem> </LogoutButton>}
                        {props.user !== null && <Link to="/settings" ><DropdownItem id='settingsItem' name='settingItem'>Settings</DropdownItem></Link>}
                        {props.user === null && <Link to="/login"><DropdownItem id='loginItem' name='loginItem'>Login</DropdownItem></Link>}
                        {props.user === null && <Link to="/create" ><DropdownItem id='createUserItem' name='createUserItem'>Create User</DropdownItem></Link>}
                      </DropdownMenu>
                    </Dropdown>
                  </DropdownMenuItem>

                </Navigation>
              </Title>
              {props.notification !== null && <Notification />}
            </div>
            <Route exact path="/" render={() => <AllThreads findUserNameById={findUserNameById} />} />
            <Route exact path="/login" render={() => <LoginForm />} />
            <Route exact path="/search" render={() => <Search findUserNameById={findUserNameById} findThreadById={findThreadById} />} />
            <Route exact path="/create" render={() => <NewUserFrom />} />
            <Route exact path="/settings" render={() => <Settings />} />
            <Route exact path="/addNewThread" render={() => <NewThreadForm findUserIdByUsername={findUserIdByUsername} />} />
            <Route exact path="/thread/:id" render={({ match }) =>
              <Thread thread={findThreadById(match.params.id)}
                findUserIdByUsername={findUserIdByUsername} findUserNameById={findUserNameById} />}
            />
            <Route exact path="/user/:id" render={({ match }) =>
              <User us={findUserById(match.params.id)} />}
            />
          </div>
        </Router>
      </Page>
    </div>
  )
}

const mapDispatchToProps = {
  initializeThreads,
  initializeComments,
  initializeUsers,
  setUser,
  logout,
  setNotification
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    threads: state.threads,
    comments: state.comments,
    users: state.users,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
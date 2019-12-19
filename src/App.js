import React, { useEffect, useState } from 'react'
import NewThreadForm from './components/NewThreadForm'
import LoginForm from './components/Login'
import NewUserFrom from './components/NewUserForm'
import Notification from './components/Notification'
import AllThreads from './components/AllThreads'
import Search from './components/Search'
import Logout from './components/Logout'
import Thread from './components/Thread'
import Settings from './components/Settings'
import { Page, Navigation, Title, DropdownMenuItem, DropdownMenuButton } from './components/Style'

import './index.css'
import { connect } from 'react-redux'
import { initializeThreads } from './reducers/threadReducer'
import { initializeComments } from './reducers/commentsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from 'styled-dropdown-component'

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

    const user = props.users.find(u => u.id === id)
    if (user === null || user === undefined) {
      return 'unknown user'
    }
    return user.username
  }

  const findThreadById = (id) => {
    const thread = props.threads.find(t => t.id === id)
    return thread

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

                  {props.user !== null && <Link style={padding} to="/addNewThread">Add a new thread</Link>}

                  <DropdownMenuItem>
                    <Dropdown>
                      <DropdownMenuButton dropdownToggle onClick={() => setHidden(!hidden)}>
                        Menu
                      </DropdownMenuButton>
                      <DropdownMenu hidden={hidden} toggle={() => setHidden(!hidden)}>
                        {props.user !== null && <Link to="/logout"><DropdownItem>Logout</DropdownItem></Link>}
                        {props.user !== null && <Link to="/settings"><DropdownItem>Settings</DropdownItem></Link>}
                        {props.user === null && <Link to="/login"><DropdownItem>Login</DropdownItem></Link>}
                        {props.user === null && <Link to="/create"><DropdownItem>Create</DropdownItem></Link>}
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
            <Route exact path="/logout" render={() => <Logout />} />
            <Route exact path="/settings" render={() => <Settings />} />
            <Route exact path="/addNewThread" render={() => <NewThreadForm findUserIdByUsername={findUserIdByUsername} />} />
            <Route exact path="/thread/:id" render={({ match }) =>
              <Thread thread={findThreadById(match.params.id)}
                findUserIdByUsername={findUserIdByUsername} findUserNameById={findUserNameById} />}
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
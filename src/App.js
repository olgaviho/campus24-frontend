import React, { useEffect } from 'react'
import NewThreadForm from './components/NewThreadForm'
import LoginForm from './components/Login'
import NewUserFrom from './components/NewUserForm'
import Notification from './components/Notification'
import AllThreads from './components/AllThreads'
import Logout from './components/Logout'
import Thread from './components/Thread'

import './index.css'
import { connect } from 'react-redux'
import { initializeThreads } from './reducers/threadReducer'
import { initializeComments } from './reducers/commentsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

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

  const findThreadIdById = (id) => {
    const thread = props.threads.find(t => t.id === id)
    return thread

  }


  const padding = { padding: 5 }


  return (
    <div>
      <Router>
        <div>
          <div>
            <Link style={padding} to="/">Threads</Link>
            {props.user === null &&
              <Link style={padding} to="/login">Login</Link>}
            {props.user === null &&
              <Link style={padding} to="/create">Create new user</Link>}
            {props.user !== null && <Link style={padding} to="/logout">Logout</Link>}
            {props.user !== null && <Link style={padding} to="/addNewThread">Add a new thread</Link>}
            {props.notification !== null && <Notification />}
          </div>
          <Route exact path="/" render={() => <AllThreads  />} />
          <Route exact path="/login" render={() => <LoginForm  />} />
          <Route exact path="/create" render={() => <NewUserFrom />} />
          <Route exact path="/logout" render={() => <Logout />} />
          <Route exact path="/addNewThread" render={() => <NewThreadForm findUserIdByUsername={findUserIdByUsername} />} />
          <Route exact path="/threads/:id" render={({ match }) =>
            <Thread thread={findThreadIdById(match.params.id)} findUserIdByUsername={findUserIdByUsername} />}
          />
        </div>
      </Router>
    </div>
  )
}

const mapDispatchToProps = {
  initializeThreads,
  initializeComments,
  initializeUsers,
  setUser
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
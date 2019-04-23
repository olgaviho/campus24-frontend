import React, { useState, useEffect } from 'react'
import NewThreadForm from './components/NewThreadForm'
import LoginForm from './components/Login'
import NewUserFrom from './components/NewUserForm'
import Notification from './components/Notification'
import AllThreads from './components/AllThreads'
import Logout from './components/Logout'

import './index.css'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeThreads, addThread, deleteThread, editThread } from './reducers/threadReducer'
import { initializeComments, addComment, } from './reducers/commentsReducer'
import { initializeUsers, addUser } from './reducers/usersReducer'
import { setUser, login, logout } from './reducers/loginReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const App = (props) => {
  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')


  useEffect(() => {
    props.initializeThreads()
    props.initializeComments()
    props.initializeUsers()
  }, [])


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('Campus24User')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)

      props.setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password
    }

    await props.login(user)
    // alla oleva ei toimi....
    props.setNotification('Welcome!')

  }

  const deleteThread = async (id) => {
    // ei päivitä saman tien
    props.deleteThread(id)
    props.setNotification('Thread deleted')

  }

  const addNewThread = async (event) => {
    event.preventDefault()
    const threadObject = {
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString(),
      userId: findUserIdByUsername(props.user.username).id
    }

    setNewTitle('')
    setNewMessage('')
    // ominaisuudet eivät ole heti näkyvissä
    props.addThread(threadObject)
    props.setNotification('New thread added')

  }

  const addNewComment = async (commentMessage, threadId) => {
    const commentObject = {
      message: commentMessage,
      date: new Date().toISOString(),
      userId: findUserIdByUsername(props.user.username).id,
      threadId: threadId
    }
    props.addComment(commentObject)
    // ei toimi notificaatio!
    props.setNotification('New comment added')

  }

  const editThread = async (id, editedMessage) => {

    const newThreadObject = props.threads.find(t => t.id === id)
    const changedThread = { ...newThreadObject, message: editedMessage }
    props.editThread(changedThread)
    props.setNotification('Thread edited')

  }

  const handleLogout = () => {
    props.logout()
    props.setNotification('See you soon!')
  }

  const findUserIdByUsername = (username) => {
    const user = props.users.find(u => u.username === username)
    return user

  }

  const createNewUser = async (event) => {
    event.preventDefault()

    const newUserObject = {
      name: newName,
      username: newUsername,
      password: newPassword
    }

    props.addUser(newUserObject)
    props.setNotification('New user added!')
    setNewName('')
    setNewPassword('')
    setNewUsername('')
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
          <Route exact path="/" render={() => <AllThreads deleteThread={deleteThread} addNewComment={addNewComment} editThread={editThread} />} />
          <Route exact path="/login" render={() => <LoginForm setPassword={setPassword} setUsername={setUsername} handleLogin={handleLogin} />} />
          <Route exact path="/create" render={() => <NewUserFrom createNewUser={createNewUser} />} />
          <Route exact path="/logout" render={() => <Logout handleLogout={handleLogout} />} />
          <Route exact path="/addNewThread" render={() => <NewThreadForm addNewThread={addNewThread} setNewMessage={setNewMessage} setNewTitle={setNewTitle} set />} />
        </div>
      </Router>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  deleteThread,
  editThread,
  addThread,
  initializeThreads,
  initializeComments,
  addComment,
  initializeUsers,
  addUser,
  login,
  logout,
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
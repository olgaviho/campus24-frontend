import React, { useState, useEffect } from 'react'
import Thread from './components/Thread'
import NewThreadForm from './components/NewThreadFrom'
import threadService from './services/threads'
import loginService from './services/login'
import commentService from './services/comments'
import userService from './services/users'
import LoginForm from './components/Login'
import NewUserFrom from './components/NewUserForm'
import Notification from './components/Notification'
import './index.css'
import { connect } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeThreads, addThread, deleteThread, editThread } from './reducers/threadReducer'
import { initializeComments, addComment, } from './reducers/commentsReducer'
import { initializeUsers, addUser } from './reducers/usersReducer'

const App = (props) => {
  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState(null)
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
      threadService.setToken(user.token)
      commentService.setToken(user.token)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'Campus24User', JSON.stringify(user)
      )
      threadService.setToken(user.token)
      commentService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      props.setNotification('Welcome!')
    } catch (e) {
      props.setNotification('Login failed')
    }
  }

  const deleteThread = async (id) => {
    // ei päivitä saman tien
    props.deleteThread(id)
    props.setNotification('Thread deleted')

  }

  const rows = () => {
    return (
      props.threads.map(t =>
        <Thread
          key={t.id}
          thread={t}
          deleteThread={deleteThread}
          editThread={editThread}
          user={user}
          comments={props.comments}
          addNewComment={addNewComment}
        />
      )
    )
  }

  const addNewThread = async (event) => {
    event.preventDefault()
    const threadObject = {
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString(),
      userId: findUserIdByUsername(user.username).id
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
      userId: findUserIdByUsername(user.username).id,
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

  const loginFunction = () => (
    <div>
      <h3>Log in</h3>
      <LoginForm handleLogin={handleLogin} username={username}
        password={password} setUsername={setUsername} setPassword={setPassword} />
    </div>
  )

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
    threadService.removeToken()
    commentService.removeToken()
    props.setNotification('See you soon!')
  }

  const newUserFunction = () => (
    <div>
      <NewUserFrom createNewUser={createNewUser} setNewName={setNewName}
        setNewUsername={setNewUsername} setNewPassword={setNewPassword}
        newUsername={newUsername} newName={newName} newPassword={newPassword} />
    </div>
  )

  const threadFunction = () => (
    <div>
      <p>Hi {user.name}!
        <button onClick={handleLogout}>logout</button> </p>

      <NewThreadForm addNewThread={addNewThread} editThread={editThread}
        setNewTitle={setNewTitle} setNewMessage={setNewMessage}
        newTitle={newTitle} newMessage={newMessage} />
    </div>
  )


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


  return (
    <div>
      <h1>Campus24</h1>
      {props.notification !== null && <Notification />}

      {user === null ?
        loginFunction() :
        threadFunction()}
      <h2>Threads</h2>
      <ul>
        {rows()}
      </ul>
      {user === null && newUserFunction()}
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
  addUser
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    threads: state.threads,
    comments: state.comments,
    users: state.users
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
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


const App = () => {
  const [threads, setThreads] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [comments, setComments] = useState([])
  const [notMessage, setNotMessage] = useState(null)


  useEffect(() => {
    userService
      .getAll().then(initialUsers => {
        setUsers(initialUsers)
      }).catch(error => {
        console.log('error', error)
      })
  }, [])

  useEffect(() => {
    threadService
      .getAll().then(initialThreads => {
        setThreads(initialThreads)
      }).catch(error => {
        console.log('error', error)
      })
  }, [])

  useEffect(() => {
    commentService
      .getAll().then(initialComments => {
        setComments(initialComments)
      }).catch(error => {
        console.log('error', error)
      })
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
    } catch (e) {
      console.log('error', e)
      setNotMessage('Login failed')
      setTimeout(() => {
        setNotMessage(null)
      }, 5000)

    }
  }

  const deleteThread = async (id) => {
    const tr = await threadService.removeThread(id)

    if (tr !== null) {
      setThreads(threads.filter(thread => thread.id !== id))

      setNotMessage('Thread deleted')
      setTimeout(() => {
        setNotMessage(null)
      }, 5000)
    }
  }

  const rows = () => {
    return (
      threads.map(t =>
        <Thread
          key={t.id}
          thread={t}
          deleteThread={deleteThread}
          editThread={editThread}
          user={user}
          comments={comments}
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
    const tr = await threadService.create(threadObject)

    if (tr !== null) {
      setThreads(threads.concat(tr))
    }
  }

  const addNewComment = async (commentMessage, threadId) => {
    const commentObject = {
      message: commentMessage,
      date: new Date().toISOString(),
      userId: findUserIdByUsername(user.username).id,
      threadId: threadId
    }

    const newComment = await commentService.create(commentObject)

    if (newComment !== null) {
      setComments(comments.concat(newComment))
      // miksei allaoleva toimi?
      setNotMessage('New comment added')
      console.log('notMessage', notMessage)
      setTimeout(() => {
        setNotMessage(null)
      }, 5000)
    } else {
      setNotMessage('Could not add new comment')
      setTimeout(() => {
        setNotMessage(null)
      }, 5000)
    }

  }

  const editThread = async (id, editedMessage) => {

    const newThreadObject = threads.find(t => t.id === id)
    const changedThread = { ...newThreadObject, message: editedMessage }

    const returnedThread = await threadService.update(changedThread)

    if (returnedThread !== null) {
      setThreads(threads.map(t => t.id !== changedThread.id ? t : returnedThread))

    }
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
    const user = users.find(u => u.username === username)
    return user

  }

  const createNewUser = async (event) => {
    event.preventDefault()

    const newUserObject = {
      name: newName,
      username: newUsername,
      password: newPassword
    }

    const newUser = await userService.create(newUserObject)

    if (user !== null) {
      users.concat(newUser)
      setNewPassword('')
      setNewName('')
      setNewUsername('')

      setNotMessage('New user added')
      setTimeout(() => {
        setNotMessage(null)
      }, 5000)
    }
    console.log('error')
    setNotMessage('Could not create new user')
    setTimeout(() => {
      setNotMessage(null)
    }, 5000)

  }


  return (
    <div>
      <h1>Campus24</h1>
      {notMessage !== null && <Notification message={notMessage} />}

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

export default App
import React, { useState, useEffect } from 'react'
import Thread from './components/Thread'
import NewThreadForm from './components/NewThreadFrom'
import threadService from './services/threads'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/Login'
import NewUserFrom from './components/NewUserForm';


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
    const loggedUserJSON = window.localStorage.getItem('loggedCampus24User')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      threadService.setToken(user.token)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedCampus24User', JSON.stringify(user)
      )
      threadService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (e) {
      console.log('error', e)
    }
  }

  const deleteThread = async (id) => {
    const tr = await threadService.removeThread(id)

    if (tr !== null) {
      setThreads(threads.filter(thread => thread.id !== id))
    }
  }

  const rows = () => {
    return (
      threads.map(t =>
        <Thread
          key={t.id}
          id={t.id}
          title={t.title}
          message={t.message}
          deleteThread={deleteThread}
          editThread={editThread}
          user={user}
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
      userId: findUserIdByUsername(user.name).id
    }


    setNewTitle('')
    setNewMessage('')
    const tr = await threadService.create(threadObject)

    if (tr !== null) {
      setThreads(threads.concat(tr))
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
  }

  const newUserFunction = () => (
    <div>
      <NewUserFrom createNewUser={createNewUser} setNewName={setNewName}
        setNewUsername={setNewUsername} setNewPassword={setNewPassword}
        newUsername={newUsername} newName={newName} newPassword={newPassword}/>
    </div>
  )

  const threadFunction = () => (
    <div>
      <p>Hi {user.name}!</p>
      <button onClick={handleLogout}>logout</button>

      <NewThreadForm addNewThread={addNewThread} editThread={editThread}
        setNewTitle={setNewTitle} setNewMessage={setNewMessage}
        newTitle={newTitle} newMessage={newMessage} />
    </div>
  )

  //const findThreadIdByTitle = (title) => {
  //  return threads.find(t => t.title = title)
  //}

  const findUserIdByUsername = (username) => {
    return users.find(u => u.username = username)
  }

  const createNewUser = async (event) => {
    event.preventDefault()

    const newUserObject = {
      name: newName,
      username: newUsername,
      password: newPassword
    }

    const newUser = await userService.create(newUserObject)
    users.concat(newUser)

    setNewPassword('')
    setNewName('')
    setNewUsername('')  
  }

  return (

    <div>
      <h2>Campus24</h2>
      {user === null ?
        loginFunction() :
        threadFunction()}
      <h3>Threads</h3>
      <ul>
        {rows()}
      </ul>
      {user === null && newUserFunction()}
    </div>
  )
}

export default App
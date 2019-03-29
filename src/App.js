import React, { useState, useEffect } from 'react'
import Thread from './components/Thread'
import NewThreadForm from './components/NewThreadFrom'
import threadService from './services/threads'
import loginService from './services/login'
import userService from './services/users'
import LoginForm from './components/Login'


const App = () => {
  const [threads, setThreads] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  useEffect(()=> {
    userService
      .getAll().then(initialUsers => {
        setUsers(initialUsers)
      }).catch(error => {
        console.log('error', error)
      })
  },[])

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

  const deleteThread = (id) => {
    threadService
      .removeThread(id).then(() => {
        setThreads(threads.filter(thread => thread.id !== id))
      })
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
        />
      )
    )
  }

  const addNewThread = (event) => {
    event.preventDefault()
    const threadObject = {
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString(),
      userId: findUserIdByUsername(user.name).id
    }


    setNewTitle('')
    setNewMessage('')
    threadService
      .create(threadObject)
      .then(returnedThread => {
        setThreads(threads.concat(returnedThread))
      })
  }

  const editThread = (id, editedMessage) => {

    const newThreadObject = threads.find(t => t.id === id)
    const changedThread = { ...newThreadObject, message: editedMessage }

    threadService
      .update(changedThread)
      .then(returnedThread => {
        setThreads(threads.map(t => t.id !== changedThread.id ? t : returnedThread))
      })
  }

  const loginFunction = () => (
    <div>
      <LoginForm handleLogin={handleLogin} username={username}
        password={password} setUsername={setUsername} setPassword={setPassword} />
    </div>
  )

  const handleLogout = () => {
    setUser(null)
    window.localStorage.clear()
  }

  const threadFunction = () => (
    <div>
      <p>Hi {user.name}!</p>
      <button onClick = {handleLogout}>logout</button>

      <NewThreadForm addNewThread={addNewThread} editThread={editThread}
        setNewTitle={setNewTitle} setNewMessage={setNewMessage}
        newTitle={newTitle} newMessage={newMessage} />
    </div>
  )

  const findThreadIdByTitle = (title) => {
    return threads.find(t => t.title = title)
  }

  const findUserIdByUsername = (username) => {
    return users.find(u => u.username = username)
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
    </div>
  )
}

export default App
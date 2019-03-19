import React, { useState, useEffect } from 'react'
import Thread from './components/Thread'
import NewThreadForm from './components/NewThreadFrom'
import threadService from './services/threads'


const App = () => {
  const [threads, setThreads] = useState([])
  const [newTitle, setNewTitle] = useState("")
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    threadService
      .getAll().then(initialThreads => {
        setThreads(initialThreads)
      }).catch(error => {
        console.log('error', error)
      })
  }, [])

  const rows = () => threads.map(t =>
    <Thread
      key={t.id}
      title={t.title}
      message={t.message}
    />
  )

  const addNewThread = (event) => {
    event.preventDefault()

    const threadObject = {
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString(),
      id: Math.floor((Math.random() * 10000))
    }


    setNewTitle('')
    setNewMessage('')

    threadService
      .create(threadObject)
      .then(returnedThread => {
        setThreads(threads.concat(returnedThread))
      })
  }


  return (
    <div>
      <h2>Campus24</h2>

      <h3>Threads</h3>

      <ul>
        {rows()}
      </ul>


      <NewThreadForm addNewThread={addNewThread} setNewTitle={setNewTitle}
        setNewMessage={setNewMessage} newTitle={newTitle} newMessage={newMessage} />

    </div>
  )

}

export default App
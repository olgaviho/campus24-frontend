import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import { addThread } from './../reducers/threadReducer'

const newThreadForm = (props) => {


  const [newTitle, setNewTitle] = useState('')
  const [newMessage, setNewMessage] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleMessageChange = (event) => {
    setNewMessage(event.target.value)
  }

  const addNewThread = async (event) => {
    event.preventDefault()
    const threadObject = {
      title: newTitle,
      message: newMessage,
      date: new Date().toISOString(),
      userId: props.findUserIdByUsername(props.user.username).id
    }


    setNewTitle('')
    setNewMessage('')


    try {
      await props.addThread(threadObject)
      props.setNotification('New thread added')
    } catch (e) {
      console.log(e)
      props.setNotification('Failed to create new comment')
    }
  }

  return (
    <div>
      <h3>Add new thread</h3>
      <form onSubmit={addNewThread}>
        <div>
          title:
          <input value={newTitle}
            onChange={handleTitleChange} />
        </div>
        <div>
          message:
          <input value={newMessage}
            onChange={handleMessageChange} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  addThread
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(newThreadForm)


import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import { addThread } from './../reducers/threadReducer'
import { Input, TextArea, Button } from './Style'

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

    if (threadObject.title.length < 3) {
      props.setNotification('Title must be at least three letters long')
    } else if (threadObject.title.length > 100) {
      props.setNotification('Title must be shorter than 100 letters')
    } else if (threadObject.message.length < 3) {
      props.setNotification('Message must be at least three letters long')
    } else if (threadObject.message.length > 2000) {
      props.setNotification('Message must be shorter than 2000 letters')
    } else {
      try {
        await props.addThread(threadObject)
        props.setNotification('New thread added')
        setNewTitle('')
        setNewMessage('')
      } catch (e) {
        props.setNotification('Failed to create new comment')
      }
    }
  }

  return (
    <div>
      <h3>Add new thread</h3>
      <form onSubmit={addNewThread}>
        <div>
          title:
          <Input value={newTitle} id='NewTitle'
            onChange={handleTitleChange} />
        </div>
        <div>
          message:
          <div>
            <TextArea cols='50' rows='3' value={newMessage} id='NewMessage'
              onChange={handleMessageChange} />
          </div>
        </div>
        <Button type='submit'>add</Button>
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


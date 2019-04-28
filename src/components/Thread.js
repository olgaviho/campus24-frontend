import React, { useState } from 'react'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'
import { connect } from 'react-redux'
import { deleteThread, editThread } from './../reducers/threadReducer'
import { setNotification } from './../reducers/notificationReducer'
import { Redirect } from 'react-router-dom'

const Thread = (props) => {

  const [changeDone, setChangeDone] = useState(false)
  const [editedMessage, setEditedMessage] = useState('')
  
  const handleEditedChange = (event) => {
    setEditedMessage(event.target.value)
  }

  if (changeDone) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  if (props.thread === undefined) {
    return (
      null
    )
  }

  const deleteThread = async (id) => {

    try {
      await props.deleteThread(id)
      props.setNotification('Thread deleted')
      setChangeDone(true)
    } catch (e) {
      console.log(e)
      props.setNotification('Failed to delete thread')
    }
  }

  const editThread = async (id) => {

    const newThreadObject = props.threads.find(t => t.id === id)
    const changedThread = { ...newThreadObject, message: editedMessage }

    try {
      await props.editThread(changedThread)
      props.setNotification('Thread edited')

    } catch (e) {
      console.log(e)
      props.setNotification('Failed to edit thread')
    }
  }



  if (props.user === null) {
    return (
      <div>
        <h3>{props.thread.title}</h3>
        <h4>Comments:</h4>
        {props.thread.comments.map(id =>
          <Comment
            key={id}
            id={id}
            allComments={props.comments} />
        )}
      </div>
    )
  }

  const buttonFunction = () => (
    <div>
      <form>
        <div>
          new message
          <input value={editedMessage}
            onChange={handleEditedChange} />
        </div>
        <button onClick={() => editThread(props.thread.id, editedMessage)}> edit </button>
      </form>
      <button onClick={() => deleteThread(props.thread.id)}> delete </button>
    </div>
  )



  let showButtons = false


  // älä muokkaa, menee kuitenkin pieleen !!
  if (props.thread.user.username !== undefined) {
    if (props.thread.user.username === props.user.username) {
      showButtons = true
    }
  } else {
    const createdUser = props.users.find(u => u.id === props.thread.user)
    if (createdUser.username === props.user.username) {
      showButtons = true
    }
  }


  return (
    <div>
      <h3>{props.thread.title}</h3>
      <h4>Message: {props.thread.message}</h4>
      Author: {props.thread.user.username}

      {showButtons && buttonFunction()}

      <h4>Comments:</h4>
      {props.thread.comments.map(id =>
        <Comment
          key={id}
          id={id}
          allComments={props.comments} />)}

      <NewCommentForm
        findUserIdByUsername={props.findUserIdByUsername}
        threadId={props.thread.id} />
    </div>
  )
}

const mapDispatchToProps = {
  deleteThread,
  editThread,
  setNotification
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

export default connect(mapStateToProps, mapDispatchToProps)(Thread)
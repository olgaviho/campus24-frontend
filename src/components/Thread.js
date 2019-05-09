import React, { useState } from 'react'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'
import { connect } from 'react-redux'
import { deleteThread, editThread } from './../reducers/threadReducer'
import { setNotification } from './../reducers/notificationReducer'
import { Redirect } from 'react-router-dom'
import { SmallButton, Input, CommentInformation, CommentText } from './Style'

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



  const findComments = () => {
    const threadComments = props.comments.filter(c => c.thread === props.thread.id)
    return threadComments
  }

  if (props.user === null) {

    return (
      <div>
        <CommentInformation>
          <h3>{props.thread.title}</h3>
          Author: {props.findUserNameById(props.thread.user)}
          <CommentText>{props.thread.message}</CommentText>
        </CommentInformation>
        Comments
        {findComments().map(c => <Comment key={c.id} comment={c} findUserNameById={props.findUserNameById}/>)}
      </div>
    )
  }

  const buttonFunction = () => (
    <div>
      <div>
        new message
        <Input value={editedMessage}
          onChange={handleEditedChange} />
        <SmallButton onClick={() => editThread(props.thread.id, editedMessage)}> edit </SmallButton>
      </div>

      <SmallButton onClick={() => deleteThread(props.thread.id)}> delete </SmallButton>
    </div>
  )

  let showButtons = false

  const findUserIdByUsername = (username) => {
    const user = props.users.find(u => u.username === username)
    return user

  }

  if (findUserIdByUsername(props.user.username) !== undefined && props.thread.user === findUserIdByUsername(props.user.username).id) {
    showButtons = true
  }


  return (
    <div>
      <CommentInformation>
        <h3>{props.thread.title}</h3>
        Author: {props.findUserNameById(props.thread.user)}
        <CommentText>{props.thread.message}</CommentText>
        {showButtons && buttonFunction()}
      </CommentInformation>
      Comments
      {findComments().map(c => <Comment comment={c} key={c.id} findUserNameById={props.findUserNameById}/>)}
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
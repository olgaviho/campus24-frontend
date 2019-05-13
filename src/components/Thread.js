import React, { useState } from 'react'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'
import { connect } from 'react-redux'
import { deleteThread, editThread } from './../reducers/threadReducer'
import { setNotification } from './../reducers/notificationReducer'
import { Redirect } from 'react-router-dom'
import { SmallButton, Input, CommentInformation, CommentText } from './Style'
import Pagination from 'react-bootstrap/Pagination'

const Thread = (props) => {

  const [changeDone, setChangeDone] = useState(false)
  const [editedMessage, setEditedMessage] = useState('')
  const [clickState, setClickState] = useState(1)

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
      setEditedMessage('')

    } catch (e) {
      console.log(e)
      props.setNotification('Failed to edit thread')
      setEditedMessage('')
    }
  }



  const findComments = () => {
    const threadComments = props.comments.filter(c => c.thread === props.thread.id)
    return threadComments
  }

  const threadComments = findComments()
  let active = clickState
  let items = []
  const numberOfItems = threadComments.length
  const itemsPerPage = 5
  const numberOfPages = Math.ceil(numberOfItems / itemsPerPage)

  for (let number = 1; number <= numberOfPages; number++) {
    items.push(
      <Pagination.Item onClick={() => {
        setClickState(number)
      }} key={number} active={number === active}>
        {number}
      </Pagination.Item>
    )
  }

  const paginationBasic = (
    <div>
      <Pagination size='sm'> {items} </Pagination>
    </div>
  )

  if (props.user === null) {


    return (
      <div className='thread'>
        <CommentInformation>
          <h3>{props.thread.title}</h3>
          Author: {props.findUserNameById(props.thread.user)}
          <CommentText>{props.thread.message}</CommentText>
        </CommentInformation>
        Comments

        {threadComments.slice(active*itemsPerPage - itemsPerPage, active*itemsPerPage).map(c =>
          <Comment key={c.id} comment={c} findUserNameById={props.findUserNameById} />)}

        {paginationBasic}
      </div>
    )
  }

  const buttonFunction = () => (
    <div>
      <div>
        new message
        <Input value={editedMessage} id='editMessage'
          onChange={handleEditedChange} />
        <SmallButton onClick={() => editThread(props.thread.id, editedMessage)}> edit </SmallButton>
      </div>

      <SmallButton id='deleteThread' onClick={() => deleteThread(props.thread.id)}> delete </SmallButton>
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
    <div className='thread'>
      <CommentInformation>
        <h3>{props.thread.title}</h3>
        Author: {props.findUserNameById(props.thread.user)}
        <CommentText>{props.thread.message}</CommentText>
        {showButtons && buttonFunction()}
      </CommentInformation>
      Comments
      {threadComments.slice(active*itemsPerPage-itemsPerPage, active*itemsPerPage).map(c =>
        <Comment comment={c} key={c.id} findUserNameById={props.findUserNameById} />)}

      {paginationBasic}
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
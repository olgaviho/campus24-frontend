import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteComment, editComment } from './../reducers/commentsReducer'
import { setNotification } from './../reducers/notificationReducer'
import { SmallButton, Input, CommentInformation, CommentText } from './Style'

const Comment = (props) => {
  const [editedMessage, setEditedMessage] = useState('')

  let showButtons = false


  if (props.comment === undefined || props.comment === null) {
    return ('')
  }

  // näkymä käyttäjälle, joka ei ole kirjautunut
  if (props.user === null) {

    return (
      <div>
        <CommentInformation> Author: {props.findUserNameById(props.comment.user)} Date: {props.comment.date}
          <CommentText> {props.comment.message} </CommentText>
        </CommentInformation>
      </div>
    )
  }

  const handleEditedChange = (event) => {
    setEditedMessage(event.target.value)
  }

  const deleteComment = async (id) => {

    try {
      await props.deleteComment(id)
      props.setNotification('Comment deleted')
    } catch (e) {
      console.log(e)
      props.setNotification('Failed to delete comment')
    }
  }


  const editComment = async (id) => {
    const newCommentObject = props.comments.find(c => c.id === id)
    const changedComment = { ...newCommentObject, message: editedMessage }

    try {
      await props.editComment(changedComment)
      props.setNotification('Comment edited')
      setEditedMessage('')

    } catch (e) {
      console.log(e)
      props.setNotification('Failed to edit comment')
    }
  }

  const editFunction = () => (
    <div>
      <div>
        new message
        <Input value={editedMessage}
          onChange={handleEditedChange} />
        <SmallButton onClick={() => editComment(props.comment.id, editedMessage)}> edit </SmallButton>
      </div>
      <SmallButton onClick={() => deleteComment(props.comment.id)}> delete comment </SmallButton>
    </div>
  )

  const findUserIdByUsername = (username) => {
    const user = props.users.find(u => u.username === username)
    return user

  }


  if (findUserIdByUsername(props.user.username) !== undefined && props.comment.user === findUserIdByUsername(props.user.username).id) {
    showButtons = true
  }


  return (
    <div>
      <CommentInformation> Author:  {props.findUserNameById(props.comment.user)} Date: {props.comment.date}
        <CommentText> {props.comment.message}

        </CommentText>
        {showButtons && editFunction()}
      </CommentInformation>

    </div>
  )
}

const mapDispatchToProps = {
  deleteComment,
  editComment,
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

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
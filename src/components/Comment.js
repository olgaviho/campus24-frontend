import React, { useState } from 'react'
import { connect } from 'react-redux'
import { deleteComment, editComment } from './../reducers/commentsReducer'
import { setNotification } from './../reducers/notificationReducer'

const Comment = (props) => {
  const [editedMessage, setEditedMessage] = useState('')

  let showButtons = false

  const findCommentById = (id) => {
    const comment = props.allComments.find(c => c.id === id)
    return comment
  }

  const comment = findCommentById(props.id)
  if (comment === undefined || comment === null) {
    return ('')
  }

  // näkymä käyttäjälle, joka ei ole kirjautunut
  if (props.user === null) {
    // asetetaan käyttäjä, mikäli luoja on poistanut tilinsä
    if (comment.user === null) {
      comment.user = {
        username: 'deleted account'
      }
    }

    return (
      <div>
        <p>Message: {comment.message}</p>
        <p>Author:  {comment.user.username} Date: {comment.date}</p>
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

    } catch (e) {
      console.log(e)
      props.setNotification('Failed to edit comment')
    }
  }

  const editFunction = () => (
    <div>
      <form>
        <div>
          new message
          <input value={editedMessage}
            onChange={handleEditedChange} />
        </div>
        <button onClick={() => editComment(comment.id, editedMessage)}> edit </button>
      </form>
      <button onClick={() => deleteComment(comment.id)}> delete </button>
    </div>
  )

  // estetään tapaukset että kommentti on vasta hetki sitten luotu
  // tai sen luoja on poistanut tilin
  if (comment.user !== null && comment.user.username !== undefined && comment.user.username !== null) {
    if (comment.user.username === props.user.username) {
      showButtons = true
    }
  } else {
  // käydään läpi ylläolevien tapauksien negaatiot
    const createdUser = props.users.find(u => u.id === comment.user)
    if (createdUser !== null && createdUser !== undefined) {
      if (createdUser.username === props.user.username) {
        showButtons = true
      }
    }
  }

  // asetetaan olio siinä tapauksessa, että kommentin käyttäjä on poistanut tilinsä
  if (comment.user === null) {
    comment.user = {
      username: 'deleted account'
    }
  }

  return (
    <div>
      <p>Message: {comment.message}</p>
      <p>Author:  {comment.user.username} Date: {comment.date}</p>

      {showButtons && editFunction()}

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
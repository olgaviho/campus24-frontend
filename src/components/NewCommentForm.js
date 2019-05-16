import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import { addComment } from './../reducers/commentsReducer'
import { Button, TextArea } from './Style'

const newCommentForm = props => {
  const [commentMessage, setCommentMessage] = useState('')

  const handleMessageChange = event => {
    setCommentMessage(event.target.value)
  }

  const addNewComment = async () => {
    const commentObject = {
      message: commentMessage,
      date: new Date().toISOString(),
      userId: props.findUserIdByUsername(props.user.username).id,
      threadId: props.threadId
    }

    if (commentObject.message.length < 3) {
      props.setNotification('Message must be at least three letters long')
    } else if (commentObject.message.length > 2000) {
      props.setNotification('Message must be shoter than 2000 letters')
    } else {
      try {
        await props.addComment(commentObject)
        props.setNotification('New comment added')
        setCommentMessage('')
      } catch (e) {
        props.setNotification('Failed to create new comment')
      }
    }
  }

  return (
    <div>
      <h4>Add new comment</h4>
      <div>
        <TextArea
          rows="3"
          cols="50"
          value={commentMessage}
          id="newComment"
          onChange={handleMessageChange}
        />
      </div>
      <Button onClick={() => addNewComment()}>add</Button>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  addComment
}

const mapStateToProps = state => {
  return {
    notification: state.notification,
    threads: state.threads,
    comments: state.comments,
    users: state.users,
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(newCommentForm)

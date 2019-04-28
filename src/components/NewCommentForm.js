import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setNotification } from './../reducers/notificationReducer'
import { addComment } from './../reducers/commentsReducer'

const newCommentForm = (props) => {

  const [commentMessage, setCommentMessage] = useState('')

  const handleMessageChange = (event) => {
    setCommentMessage(event.target.value)
  }

  const addNewComment = async () => {
    const commentObject = {
      message: commentMessage,
      date: new Date().toISOString(),
      userId: props.findUserIdByUsername(props.user.username).id,
      threadId: props.threadId
    }
    try {
      await props.addComment(commentObject)
      props.setNotification('New comment added')
    } catch (e) {
      console.log(e)
      props.setNotification('Failed to create new comment')
    }
  }

  return (
    <div>
      <h4>Add new comment</h4>
      <form>
        <div>
          message:
          <input value={commentMessage}
            onChange={handleMessageChange} />
        </div>
        <button onClick={() => addNewComment()}>add</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification,
  addComment
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

export default connect(mapStateToProps, mapDispatchToProps)(newCommentForm)
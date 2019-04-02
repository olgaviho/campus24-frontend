import React, { useState } from 'react'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm';

const Thread = (props) => {

  const [editedMessage, setEditedMessage] = useState("")
  const handleEditedChange = (event) => {
    setEditedMessage(event.target.value)
  }


  if (props.user === null) {
    return (
      <div>
        <h4>{props.thread.title}</h4>
        <p>Author: {props.thread.user.username}</p>
        <p>Message: {props.thread.message}</p>
        <h5>Comments:</h5>
        {props.thread.comments.map(id =>
          <Comment
          id={id}
          allComments={props.comments} />)}

      </div>
    )
  }

  return (
    <div>
      <h4>{props.thread.title}</h4>
      <p>Author: {props.thread.user.username}</p>
      <p>Message: {props.thread.message}</p>
      <form>
        <div>
          new message
          <input value={editedMessage}
            onChange={handleEditedChange} />
        </div>
        <button onClick={() => props.editThread(props.thread.id, editedMessage)}> edit </button>
      </form>
      <button onClick={() => props.deleteThread(props.thread.id)}> delete </button>
      
      <h5>Comments:</h5>
      {props.thread.comments.map(id =>
          <Comment
          id={id}
          allComments={props.comments} />)}

      <NewCommentForm
      addNewComment = {props.addNewComment}
      threadId = {props.thread.id}/> 
    </div>
  )
}

export default Thread
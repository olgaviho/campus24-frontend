import React, { useState } from 'react'
import Comment from './Comment'
import NewCommentForm from './NewCommentForm'

const Thread = (props) => {

  const [editedMessage, setEditedMessage] = useState('')
  const handleEditedChange = (event) => {
    setEditedMessage(event.target.value)
  }

  //tämä kertoo ongelman?
  //console.log('props.thread.user.username', props.thread.user.username)


  if (props.user === null) {
    return (
      <div>
        <h3>{props.thread.title}</h3>
        <p>Author: {props.thread.user.username}</p>
        <p>Message: {props.thread.message}</p>
        <h4>Comments:</h4>
        {props.thread.comments.map(id =>
          <Comment
            key={id}
            id={id}
            allComments={props.comments} />)}

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
        <button onClick={() => props.editThread(props.thread.id, editedMessage)}> edit </button>
      </form>
      <button onClick={() => props.deleteThread(props.thread.id)}> delete </button>
    </div>

  )


  //console.log('props.user.username', props.user.username)
  //console.log('props.thread.user.username', props.thread.user.username)
  //const juttu = props.user.username === props.thread.user.username
  //console.log(juttu)

  return (
    <div>
      <h3>{props.thread.title}</h3>
      <p>Author: {props.thread.user.username}</p>
      <p>Message: {props.thread.message}</p>

      {props.user.username === props.thread.user.username && buttonFunction()}

      <h4>Comments:</h4>
      {props.thread.comments.map(id =>
        <Comment
          key={id}
          id={id}
          allComments={props.comments} />)}

      <NewCommentForm
        addNewComment={props.addNewComment}
        threadId={props.thread.id} />
    </div>
  )
}

export default Thread
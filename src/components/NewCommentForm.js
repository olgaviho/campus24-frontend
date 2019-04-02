import React, { useState } from 'react'

const newCommentForm = (props) => {
  const [commentMessage, setCommentMessage] = useState("")

  const handleMessageChange = (event) => {
    setCommentMessage(event.target.value)
  }


  return (
    <div>
      <h3>Add new comment</h3>
      <form>
        <div>
          message:
              <input value={commentMessage}
            onChange={handleMessageChange} />
        </div>
        <button onClick={() => props.addNewComment(commentMessage, props.threadId)}>add</button>
      </form>
    </div>
  )
}

export default newCommentForm
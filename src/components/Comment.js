import React from 'react'

const Comment = (props) => {

  const findCommentById = (id) => {
    const comment = props.allComments.find(c => c.id === id)
    return comment
  }
  const comment = findCommentById(props.id)

  if (comment !== undefined) {

    return (
      <div>
        <p>Message: {comment.message}</p>
        <p>Author: {comment.user.username} Date: {comment.date}</p>

      </div>
    )
  } else {
    return ('')
  }
}

export default Comment
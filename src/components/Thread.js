import React from 'react'

const Thread = (props) => {

  return (
    <div>
      <h4>Thread:</h4>
      <p>Title: {props.title}</p>
      <p>Message: {props.message}</p>
    </div>
  )
}

export default Thread
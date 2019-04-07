import React from 'react'

const newThreadForm = (props) => {

  const handleTitleChange = (event) => {
    props.setNewTitle(event.target.value)
  }

  const handleMessageChange = (event) => {
    props.setNewMessage(event.target.value)
  }

  return (
    <div>
      <h3>Add new thread</h3>
      <form onSubmit={props.addNewThread}>
        <div>
          title:
          <input value={props.newTitle}
            onChange={handleTitleChange} />
        </div>
        <div>
          message:
          <input value={props.newMessage}
            onChange={handleMessageChange} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  )
}

export default newThreadForm


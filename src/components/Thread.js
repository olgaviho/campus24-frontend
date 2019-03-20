import React, {useState} from 'react'
  
const Thread = (props) => {

  const [editedMessage, setEditedMessage] = useState("")
  const handleEditedChange = (event) => {
    setEditedMessage(event.target.value)
  }

  return (
    <div>
      <h4>Thread:</h4>
      <button onClick={() => props.deleteThread(props.id)}> delete </button>
      <p>Title: {props.title}</p>
      <p>Message: {props.message}</p>

      <form >
        <div>
          new message
          <input value={editedMessage}
            onChange={handleEditedChange}/>
        </div>
        <button onClick={() => props.editThread(props.id, editedMessage)}> edit </button>
      </form>
    </div>
  )
}

export default Thread
import React, {useState} from 'react'
  
const Thread = (props) => {

  const [editedMessage, setEditedMessage] = useState("")
  const handleEditedChange = (event) => {
    setEditedMessage(event.target.value)
  }

  if (props.user === null) {
    return (
      <div>
      <h4>{props.title}</h4>
      <p>Message: {props.message}</p>
    </div>
    )
  }

  return (
    <div>
     
      <h4>{props.title}</h4>
      <p>Message: {props.message}</p>

      <form >
        <div>
          new message
          <input value={editedMessage}
            onChange={handleEditedChange}/>
        </div>
        <button onClick={() => props.editThread(props.id, editedMessage)}> edit </button>
      </form>
      <button onClick={() => props.deleteThread(props.id)}> delete </button>
    </div>
  )
}

export default Thread
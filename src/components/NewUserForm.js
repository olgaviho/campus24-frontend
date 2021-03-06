import React, { useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { addUser } from './../reducers/usersReducer'
import { setNotification } from './../reducers/notificationReducer'
import { Input, Button } from './Style'

const NewUserForm = (props) => {


  if (props.user !== null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  let history = useHistory()
  const [newUsername, setNewUsername] = useState('')
  const [newName, setNewName] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewUsernameChange = (event) => {
    setNewUsername(event.target.value)
  }

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const createNewUser = async (event) => {
    event.preventDefault()


    const newUserObject = {
      name: newName,
      username: newUsername,
      password: newPassword
    }

    if (newUserObject.username.length < 3) {
      props.setNotification('Username must be at least three letters long')
    } else if (newUserObject.name.length < 3) {
      props.setNotification('Name must be at least three letters long')
    } else if (newUserObject.password.length < 5) {
      props.setNotification('Password must be at least five letters long')
    } else if (newUserObject.username.length > 15) {
      props.setNotification('Username must be shorter than 16 letters')
    } else if (newUserObject.name.length > 15) {
      props.setNotification('Name must be shorter than 16 letters')
    } else if (newUserObject.password.length > 30) {
      props.setNotification('Password must be shorter than 31 letters')

    } else {
      try {
        await props.addUser(newUserObject)
        props.setNotification('New user added!')
        setNewName('')
        setNewPassword('')
        setNewUsername('')
        history.push("/login")
      } catch (e) {
        props.setNotification('Username must be unique')
      }
    }
  }

  return (
    <div>
      <h3>Create new user</h3>
      <form onSubmit={createNewUser}>
        <div>
          username
          <Input type='text' value={newUsername} name='newUsername' id='newUsername'
            onChange={handleNewUsernameChange} />
        </div>
        <div>
          name
          <Input type='text' value={newName} name='newName' id='newName'
            onChange={handleNewNameChange} />
        </div>
        <div>
          password
          <Input type='password' value={newPassword} name='newPassword' id='newPassword'
            onChange={handleNewPasswordChange} />
        </div>
        <Button type='submit'>Add a new user</Button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addUser,
  setNotification
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewUserForm)

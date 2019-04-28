import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { addUser } from './../reducers/usersReducer'
import { setNotification } from './../reducers/notificationReducer'

const NewUserForm = (props) => {


  if (props.user !== null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

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

    setNewName('')
    setNewPassword('')
    setNewUsername('')

    try {
      await props.addUser(newUserObject)
      props.setNotification('New user added!')
    } catch (e) {
      props.setNotification('Username must be unique')
    }
  }

  return (
    <div>
      <h3>Create new user</h3>
      <form onSubmit={createNewUser}>
        <div>
          username
          <input type='text' value={newUsername} name='newUsername'
            onChange={handleNewUsernameChange} />
        </div>
        <div>
          name
          <input type='text' value={newName} name='newName'
            onChange={handleNewNameChange} />
        </div>
        <div>
          password
          <input type='password' value={newPassword} name='newPassword'
            onChange={handleNewPasswordChange} />
        </div>
        <button type='submit'>Add a new user</button>
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

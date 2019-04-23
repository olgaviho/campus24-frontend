import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const NewUserForm = (props) => {


  if (props.user !== null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  const handleNewNameChange = (event) => {
    props.setNewName(event.target.value)
  }

  const handleNewUsernameChange = (event) => {
    props.setNewUsername(event.target.value)

  }

  const handleNewPasswordChange = (event) => {
    props.setNewPassword(event.target.value)
  }

  return (
    <div>
      <h3>Create new user</h3>
      <form onSubmit={props.createNewUser}>
        <div>
          username
          <input type='text' value={props.newUsername} name='newUsername'
            onChange={handleNewUsernameChange} />
        </div>
        <div>
          name
          <input type='text' value={props.newName} name='newName'
            onChange={handleNewNameChange} />
        </div>
        <div>
          password
          <input type='password' value={props.newPassword} name='newPassword'
            onChange={handleNewPasswordChange} />
        </div>
        <button type='submit'>Add a new user</button>
      </form>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(NewUserForm)

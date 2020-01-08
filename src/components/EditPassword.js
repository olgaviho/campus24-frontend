import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Button, Input } from './Style'
import { setNotification } from './../reducers/notificationReducer'
import userService from './../services/users'

const EditPassword = (props) => {

  if (props.user === null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  const [newPassword, setNewPassword] = useState('')

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value)
  }

  const EditPasswordFunction = async () => {

    const loggedUser = props.users.find(u => u.username === props.user.username)

    const newUser = {
      password: newPassword,
      username: loggedUser.username,
      name: loggedUser.name,
      id: loggedUser.id
    }


    if (newUser.password.length < 3) {
      props.setNotification('Password must be at least three letters long')
    } else if (newUser.password.length > 20) {
      props.setNotification('Password must be shorter than 20 letters')
    } else {
      try {
        await userService.update(newUser)
        props.setNotification('Password edited')
        setNewPassword('')

      } catch (e) {
        console.log(e)
        props.setNotification('Failed to edit password')
      }
    }
  }

  return (
    <div>
      new password
      <Input value={newPassword} id='changePassword' name='changePassword'
        onChange={handleNewPasswordChange} />
      <Button onClick={() => EditPasswordFunction()}>Edit</Button>
    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
    threads: state.threads,
    users: state.users,
    comments: state.comments
  }
}

const mapDispatchToProps = {
  setNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword)
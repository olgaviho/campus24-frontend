import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from './../reducers/loginReducer'
import { setNotification } from './../reducers/notificationReducer'

const LoginForm = (props) => {

  if (props.user !== null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    const user = {
      username: username,
      password: password
    }
    try {
      await props.login(user)
      props.setNotification('Welcome!')
    } catch (e) {
      console.log(e)
      props.setNotification('Wrong username or password!')
    }
  }


  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>

        <div>
          username
          <input type="text" value={username} name='Username'
            onChange={handleUsernameChange} />
        </div>

        <div>
          password
          <input type="password" value={password} name='Password'
            onChange={handlePasswordChange} />
        </div>

        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )


}

const mapDispatchToProps = {
  setNotification,
  login
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)
import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

const LoginForm = (props) => {

  if (props.user !== null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }


  const handleUsernameChange = (event) => {
    props.setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    props.setPassword(event.target.value)
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={props.handleLogin}>

        <div>
          username
          <input type="text" value={props.username} name='Username'
            onChange={handleUsernameChange} />
        </div>

        <div>
          password
          <input type="password" value={props.password} name='Password'
            onChange={handlePasswordChange} />
        </div>

        <div>
          <button type='submit'>login</button>
        </div>
      </form>
    </div>
  )


}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(LoginForm)
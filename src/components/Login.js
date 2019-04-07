import React from 'react'

const LoginForm = (props) => {


  const handleUsernameChange = (event) => {
    props.setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    props.setPassword(event.target.value)
  }

  return (
    <div>
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

export default LoginForm
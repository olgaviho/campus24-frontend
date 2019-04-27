import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setNotification } from './../reducers/notificationReducer'
import { logout } from './../reducers/loginReducer'



const Logout = (props) => {

  if (props.user === null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  const handleLogout = () => {
    props.logout()
    props.setNotification('See you soon!')
  }

  return (
    <div>
      <h3>Logout</h3>
      <button onClick = {() => handleLogout()}>logout</button>
    </div>
  )

}

const mapDispatchToProps = {
  logout,
  setNotification
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
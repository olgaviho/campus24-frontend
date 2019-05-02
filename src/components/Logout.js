import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setNotification } from './../reducers/notificationReducer'
import { logout } from './../reducers/loginReducer'
import { Button } from './Style'



const Logout = (props) => {

  if (props.user === null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  const handleLogout = () => {

    try {
      props.logout()
      props.setNotification('See you soon!')

    } catch (e) {
      console.log(e)
      props.setNotification('Logout failed!')
    }
  }

  return (
    <div>
      <h3>Logout</h3>
      <Button onClick = {() => handleLogout()}>logout</Button>
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
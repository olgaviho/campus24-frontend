import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'



const Logout = (props) => {

  if (props.user === null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  return (
    <div>
      <h3>Logout</h3>
      <button onClick = {() => props.handleLogout()}>logout</button>
    </div>
  )

}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, null)(Logout)
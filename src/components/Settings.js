import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setNotification } from './../reducers/notificationReducer'
import DeleteAccount from './DeleteAccount'
import EditPassword from './EditPassword'


const Settings = (props) => {

  if (props.user === null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }


  return (
    <div>
      <h3>Settings</h3>

      <h5>Change password</h5>
      <EditPassword/>
      <h5>Delete Account</h5>
      <DeleteAccount/>
    </div>
  )
}

const mapDispatchToProps = {
  setNotification
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings)
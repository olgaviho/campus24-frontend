import React from 'react'
import { connect } from 'react-redux'
import { HappyNotification } from './Style'

const Notification = (props) => {
  if (props.notification === null || props.notification === '') {
    return null
  }
  return (
    <div>
      <HappyNotification>
        {props.notification}
      </HappyNotification>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)

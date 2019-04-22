import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  if (props.notification === null || props.notification === '') {
    return null
  }
  return (
    <div className='notification'>
      {props.notification}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  }
}

export default connect(mapStateToProps, null)(Notification)

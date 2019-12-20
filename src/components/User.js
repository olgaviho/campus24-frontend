import React from 'react'
import { connect } from 'react-redux'


const User = (props) => {


  if (props.us === undefined || props.us === null) {
    return (
      null
    )
  } else if (props.us === 'unknown user') {
    return (
      <div>This user has been deleted :( </div>
    )
  }

  return (
    <div>
      <h3> User: {props.us.username}</h3>
      <p>Number of threads started: {props.threads.filter(t => t.user === props.us.id).length}</p>
      <p>Number of comments written: {props.comments.filter(c => c.user === props.us.id).length}</p>

    </div>
  )
}


const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    threads: state.threads,
    comments: state.comments,
    users: state.users,
    user: state.user
  }
}

export default connect(mapStateToProps, null)(User)
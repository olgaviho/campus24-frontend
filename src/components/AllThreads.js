import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { OneThread } from './Style'

const allThreads = (props) => {

  const countComments = (thread) => {

    const commentsOfThread = props.comments.filter(c => c.thread === thread.id)
    return commentsOfThread.length
  }


  return (
    <div>
      {props.threads.map(t =>
        <OneThread key={t.id}>
          <Link key={t.id} to={`/thread/${t.id}`}> {t.title} </Link>
          &nbsp;&nbsp; comments {countComments(t)}

          &nbsp;&nbsp; started by: {props.findUserNameById(t.user)}

        </OneThread>
      )}

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    threads: state.threads,
    comments: state.comments,
    users: state.users,
    user: state.user
  }
}

export default connect(mapStateToProps, null)(allThreads)
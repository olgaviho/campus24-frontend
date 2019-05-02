import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { OneThread } from './Style'

const allThreads = (props) => {

  return (
    <div>
      {props.threads.map(t =>
        <OneThread key={t.id}>
          <Link key={t.id} to={`/thread/${t.id}`}> {t.title} </Link>
          &nbsp;&nbsp; {t.comments.length} comments
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
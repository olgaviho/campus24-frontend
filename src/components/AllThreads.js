import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const allThreads = (props) => {

  return (
    <div>
      <h2>Threads</h2>
      {props.threads.map(t =>
        <li key={t.id}>
          <Link key={t.id} to={`/threads/${t.id}`}> {t.title} </Link>
        </li>
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
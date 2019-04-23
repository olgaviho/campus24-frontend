import React from 'react'
import Thread from './Thread'
import { connect } from 'react-redux'

const allThreads = (props) => {

  return (
    props.threads.map(t =>
      <Thread
        key={t.id}
        thread={t}
        deleteThread={props.deleteThread}
        editThread={props.editThread}
        user={props.user}
        comments={props.comments}
        addNewComment={props.addNewComment}
      />
    )
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
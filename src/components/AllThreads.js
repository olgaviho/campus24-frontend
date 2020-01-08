import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { OneThread, ThreadInformation, CommentText } from './Style'
import Pagination from 'react-bootstrap/Pagination'

const allThreads = (props) => {
  const [clickState, setClickState] = useState(1)

  const countComments = (thread) => {

    const commentsOfThread = props.comments.filter(c => c.thread === thread.id)
    return commentsOfThread.length
  }


  let active = clickState
  let items = []
  const numberOfItems = props.threads.length
  const itemsPerPage = 5
  const numberOfpages = Math.ceil(numberOfItems / itemsPerPage)

  for (let number = 1; number <= numberOfpages; number++) {
    items.push(
      <Pagination.Item onClick={() => {
        setClickState(number)
      }}
      key={number} active={number === active}>
        {number}
      </Pagination.Item>
    )
  }

  const paginationBasic = (
    <div>
      <Pagination size="sm">{items}</Pagination>
    </div>
  )


  return (
    <div>
      {props.threads.slice(active * itemsPerPage - itemsPerPage, active * itemsPerPage).map(t =>
        <OneThread key={t.id}>
          <CommentText>
            <Link key={t.id} to={`/thread/${t.id}`}> {t.title} </Link>
          </CommentText>
          <ThreadInformation>
            &nbsp;&nbsp; comments {countComments(t)}
            &nbsp;&nbsp; started by: <Link key={t.user} to={`/user/${t.user}`}> {props.findUserNameById(t.user)} </Link>
          </ThreadInformation>
        </OneThread>
      )}
      {paginationBasic}
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
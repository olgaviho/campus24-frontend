import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Input, CommentInformation, CommentText } from './Style'
import { Link } from 'react-router-dom'


const Search = (props) => {

  const [searchWord, setSearchWord] = useState('')

  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value)
  }

  const commentsWithRealThread = () => {
    const threadIds = props.threads.map(t => t.id)
    if (threadIds.length === 0) {
      return []
    } else {
      return props.comments.filter(c => {
        return (threadIds.includes(c.thread))

      })
    }
  }

  const commentsToShow = () => {
    let commentWithThread = []
    commentWithThread = commentsWithRealThread()

    return commentWithThread.filter(c => {
      if (searchWord.length) {
        return c.message.toLowerCase().includes(searchWord.toLowerCase())
      }
      return false
    })
  }


  return (
    <div>
      Search for
      <Input value={searchWord} id='searchWord'
        onChange={handleSearchWordChange} />
      {commentsToShow().map(c =>

        <CommentInformation key={c.id} > Author: {props.findUserNameById(c.user)} Date: {c.date}
          <CommentText> {c.message} </CommentText>
          Thread: <Link key={c.thread} to={`/thread/${c.thread}`}> {props.findThreadById(c.thread).title} </Link>
        </CommentInformation>

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

export default connect(mapStateToProps, null)(Search)
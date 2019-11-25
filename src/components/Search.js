import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Input, OneThread } from './Style'


const Search = (props) => {

  const [searchWord, setSearchWord] = useState('')

  const handleSearchWordChange = (event) => {
    setSearchWord(event.target.value)
  }

  const commentsToShow = () => {
    return props.comments.filter(c => {
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
        <OneThread key={c.id} > {c.message}</OneThread>)}

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
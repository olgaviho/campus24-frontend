import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {

    console.log('ei viestia')
    return null
  }
  console.log('viesti', message)
  return (
    <div className='notification'>
      {message}
    </div>
  )

}

export default Notification

import { connect } from 'react-redux'
import React from 'react'
import { logout } from './../reducers/loginReducer'
import { setNotification } from './../reducers/notificationReducer'
import { deleteUser } from './../reducers/usersReducer'
import { deleteThread } from './../reducers/threadReducer'
import { deleteComment } from './../reducers/commentsReducer'
import { Redirect } from 'react-router-dom'
import { Button } from './Style'

const DeleteAccount = (props) => {

  if (props.user === null) {
    return (
      <div>
        <Redirect to="/" />
      </div>
    )
  }

  const deleteAccountFunction = async () => {
    const loggedUser = props.users.find(u => u.username === props.user.username)

    try {

      await props.deleteUser(loggedUser.id)
      props.setNotification('Account deleted!')
      props.logout()

    } catch (e) {
      console.log('error:', e)
      props.setNotification('Could not delete account!')
    }
  }

  return (
    <div>
      Are you sure that you want to delete your account?
      <div>
        <Button onClick={() => deleteAccountFunction()}>Confirm</Button>
      </div>
    </div>
  )
}

const mapDispatchToProps = {
  logout,
  setNotification,
  deleteUser,
  deleteThread,
  deleteComment
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    user: state.user,
    threads: state.threads,
    users: state.users,
    comments: state.comments
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteAccount)
const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'NEW_NOTIFICATION':
    return action.content
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const setNotification = (content) => {
  return dispach => {
    dispach({
      type: 'NEW_NOTIFICATION',
      content
    })
    setTimeout(() => {
      dispach({
        type: 'CLEAR_NOTIFICATION',
      })
    }, 5000)
  }
}

export default notificationReducer
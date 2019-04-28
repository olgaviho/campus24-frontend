import commentService from './../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_COMMENT':
    return [...state, action.data]
  case 'INITIALIZE_COMMENTS':
    return action.data
  case 'EDIT_COMMENT':
    // eslint-disable-next-line no-case-declarations
    const index = state.findIndex(c => c.id === action.data.id)
    // eslint-disable-next-line no-case-declarations
    const newState = [...state]
    newState[index] = action.data
    return newState
  case 'DELETE_COMMENT':
    return state.filter(c => c.id !== action.data)
  default:
    return state
  }
}

export const initializeComments = () => {
  return async dispatch => {
    const comments = await commentService.getAll()
    dispatch({
      type: 'INITIALIZE_COMMENTS',
      data: comments
    })
  }
}

export const addComment = (data) => {
  return async dispatch => {
    const newComment = await commentService.create(data)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment
    })
  }
}


export const editComment = (data) => {
  return async dispatch => {
    const editedComment = await commentService.update(data)

    dispatch({
      type: 'EDIT_COMMENT',
      data: editedComment
    })
  }
}

export const deleteComment = (data) => {
  console.log('ööö ok', data)
  return async dispatch => {
    console.log('dispatch')
    await commentService.removeComment(data)
    console.log('commentservice remove')
    dispatch({
      type: 'DELETE_COMMENT',
      data: data
    })
  }
}


export default commentReducer
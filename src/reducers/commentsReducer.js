import commentService from './../services/comments'

const commentReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_COMMENT':
    return [...state, action.data]
  case 'INITIALIZE_COMMENTS':
    return action.data
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


export default commentReducer
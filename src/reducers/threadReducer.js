import threadService from './../services/threads'

const threadReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_THREAD':
    return [action.data,...state]
  case 'INITIALIZE_THREADS':
    const orderThreads = action.data.reverse()
    return orderThreads
  case 'EDIT_THREAD':
    const index = state.findIndex(t => t.id === action.data.id)
    const newState = [...state]
    newState[index] = action.data
    return newState
  case 'DELETE_THREAD':
    const newstate = state.filter(s => s.id !== action.data)
    return newstate
  default:
    return state
  }
}

export const initializeThreads = () => {
  return async dispatch => {
    const threads = await threadService.getAll()
    dispatch({
      type: 'INITIALIZE_THREADS',
      data: threads
    })
  }
}

export const addThread = (data) => {

  return async dispatch => {
    const newThread = await threadService.create(data)
    dispatch({
      type: 'NEW_THREAD',
      data: newThread
    })
  }
}

export const editThread = (data) => {

  return async dispatch => {
    const editedThread = await threadService.update(data)
    dispatch({
      type: 'EDIT_THREAD',
      data: editedThread
    })
  }
}

export const deleteThread = (data) => {
  return async dispatch => {
    await threadService.removeThread(data)
    dispatch({
      type: 'DELETE_THREAD',
      data: data
    })
  }
}


export default threadReducer
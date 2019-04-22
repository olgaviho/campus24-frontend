import threadService from './../services/threads'

const threadReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_THREAD':
    return [...state, action.data]
  case 'INITIALIZE_THREADS':
    return action.data
  case 'EDIT_THREAD':
    // eslint-disable-next-line no-case-declarations
    const index = state.findIndex(b => b.id === action.data.id)
    // eslint-disable-next-line no-case-declarations
    const newState = [...state]
    newState[index] = action.data
    return newState
  case 'DELETE_THREAD':
    // eslint-disable-next-line no-case-declarations
    const filterState = state.filter(s => s.id !== action.data.id)
    return filterState
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
      type: 'EDIT_THREAD',
      data: data
    })
  }
}

export default threadReducer
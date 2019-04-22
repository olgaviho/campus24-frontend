import usersService from './../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_USER':
    return [...state, action.data]
  case 'INITIALIZE_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => {
  return async dispatch => {
    const users = await usersService.getAll()
    dispatch({
      type: 'INITIALIZE_USERS',
      data: users
    })
  }
}

export const addUser = (data) => {
  return async dispatch => {
    const newUser = await usersService.create(data)
    dispatch({
      type: 'NEW_USER',
      data: newUser
    })
  }
}


export default usersReducer
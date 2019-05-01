import usersService from './../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_USER':
    return [...state, action.data]
  case 'INITIALIZE_USERS':
    return action.data
  case 'DELETE_USER':
    // eslint-disable-next-line no-case-declarations
    console.log('action.data', action.data)
    const newstate = state.filter(u => u.id !== action.data)
    return newstate
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

export const deleteUser = (id) => {

  const token1 = usersService.getToken()

  console.log('users token', token1)
  console.log('id', id)
  return async dispatch => {
    await usersService.removeUser(id)
    dispatch({
      type: 'DELETE_USER',
      data: id
    })
  }
}


export default usersReducer
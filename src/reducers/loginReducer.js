import loginService from './../services/login'
import commentService from './../services/comments'
import threadService from './../services/threads'
import usersService from './../services/users'

const loginReducer = (state = null, action) => {
  switch (action.type) {
  case 'LOGIN':
    return action.data
  case 'LOGOUT':
    return null
  default:
    return state
  }
}

export const setUser = (data) => {
  return async dispatch => {
    threadService.setToken(data.token)
    commentService.setToken(data.token)
    usersService.setToken(data.token)

    dispatch({
      type: 'LOGIN',
      data: data
    })
  }
}



export const login = (data) => {
  return async dispatch => {

    const user = await loginService.login(data)
    window.localStorage.setItem(
      'Campus24User', JSON.stringify(user)
    )

    threadService.setToken(user.token)
    commentService.setToken(user.token)
    usersService.setToken(user.token)
  
    dispatch({
      type: 'LOGIN',
      data: user
    })

  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    threadService.removeToken()
    commentService.removeToken()
    usersService.removeToken()

    dispatch({
      type: 'LOGOUT',
    })
  }
}


export default loginReducer
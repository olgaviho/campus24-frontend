import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const removeToken = () => {
  token = null
}

const getToken = () => {
  return token
}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {

  if (token !== null) {
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  return null
}


const update = async (updatedObject, loggedUserId) => {

  if (token!== null) {
    const config = {
      headers: { Authorization: token },
    }

    const data = {
      loggedUserId: loggedUserId,
      updatedObject: updatedObject
    }

    const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)

    return response.data
  }

  return null
}

const removeComment = async (commentId, loggedUserId) => {


  if (token!==null) {
    const config = {
      headers: { Authorization: token },
    }

    const data = {
      commentId: commentId,
      loggedUserId: loggedUserId
    }
    const response = await axios.delete(`${baseUrl}/${commentId}`, data, config)

    return response.data
  }
  return null
}


export default {
  getAll,
  create,
  setToken,
  removeToken,
  update,
  removeComment,
  getToken
}
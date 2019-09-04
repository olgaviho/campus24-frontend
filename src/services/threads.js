import axios from 'axios'
const baseUrl = '/api/threads'

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


const update = (newObject, loggedUserId) => {

  if (token !== null) {
    const config = {
      headers: { Authorization: token },
    }

    const data = {
      loggedUserId: loggedUserId,
      newObject: newObject
    }

    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return request.then(response => response.data)
  }

  return null
}

const removeThread = (threadId, loggedUserId) => {

  if (token !== null){

    const config = {
      headers: { Authorization: token },
    }

    const data = {
      threadId: threadId,
      loggedUserId: loggedUserId
    }

    const request = axios.delete(`${baseUrl}/${threadId}`, data, config)
    return request.then(response => response.data)
  }
  return null
}

export default {
  getAll,
  create,
  update,
  removeThread,
  setToken,
  removeToken,
  getToken
}
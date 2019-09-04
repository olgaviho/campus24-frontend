import axios from 'axios'
const baseUrl = '/api/users'

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
  const response = await axios.post(baseUrl, newObject)
  return response.data

}

const removeUser = async (userId) => {

  if (token !== null) {
    const config = {
      headers: { Authorization: token },
    }
    const request = axios.delete(`${baseUrl}/${userId}`, config)

    return request.then(response => response.data)
  }
  return null
}

export default {
  getAll,
  create,
  removeUser,
  removeToken,
  setToken,
  getToken
}
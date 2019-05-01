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

const removeUser = async (id) => {

  console.log('id', id)

  console.log('token', token)

  if (token !== null) {
    console.log('token', token)

    const config = {
      headers: { Authorization: token },
    }
    console.log('config', config)

    const request = axios.delete(`${baseUrl}/${id}`, config)
    console.log('request', request)
    return request.then(response => response.data)
  }
  console.log('failed')
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
import axios from 'axios'
const baseUrl = '/api/comments'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const removeToken = () => {
  token = null
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


export default {
  getAll,
  create,
  setToken,
  removeToken
}
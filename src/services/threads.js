import axios from 'axios'
const baseUrl = '/api/threads'

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


const update = (newObject) => {

  if (token !== null) {
    const config = {
      headers: { Authorization: token },
    }

    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject, config)
    return request.then(response => response.data)
  }

  return null
}

const removeThread = (id) => {

  if (token !== null){

    const config = {
      headers: { Authorization: token },
    }

    const request = axios.delete(`${baseUrl}/${id}`, config)
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
  removeToken
}
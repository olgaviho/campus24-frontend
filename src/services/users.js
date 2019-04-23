import axios from 'axios'
const baseUrl = '/api/users'


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  }
  catch (e) {
    return null
  }
}

export default {
  getAll,
  create
}
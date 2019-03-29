import axios from 'axios'
const baseUrl = '/api/threads'

let token=null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
    
}

const create = async (newObject) => {
    const config = {
        headers: { Authorization:token},
    }
    const response = await axios.post(baseUrl, newObject, config)

    return response.data
}


const update = (newObject) => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject)
    return request.then(response => response.data)
}

const removeThread = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default {
    getAll,
    create,
    update,
    removeThread,
    setToken
}
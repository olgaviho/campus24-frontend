import axios from 'axios'

const baseUrl = '/api/threads'

const getAll = () => {
    console.log("yriteään saada yhteys")
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
    
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
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
}
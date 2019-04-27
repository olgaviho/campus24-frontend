import axios from 'axios'
const baseUrl = '/api/login'


const login = async (credentials) => {
  

  // try catch tähän, sitten saadaan virhe ulos ehkä?
  const response = await axios.post(baseUrl, credentials)
  console.log('response', response)

  return response.data
}

export default { login }
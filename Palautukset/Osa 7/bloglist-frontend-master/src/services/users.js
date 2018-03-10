import axios from 'axios'
const baseUrl = '/api/users'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getById = async (id) => {
    const response = await axios.get(baseUrl + '/' + id)
    return response.data
}


let token = null


// const setToken = (newToken) => {
//   token = `bearer ${newToken}`
// }




export default { getAll, getById }
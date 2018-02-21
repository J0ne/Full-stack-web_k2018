import axios from 'axios'
const baseUrl = '/api/login'

const logIn = (loginData) => {
        const request = axios.post(baseUrl, loginData)
        return request.then(response => response.data)
}

export default { logIn }
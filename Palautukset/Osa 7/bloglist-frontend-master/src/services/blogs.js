import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const getById = (id) => {
  const request = axios.get(baseUrl + '/' + id)
  return request.then(response => response.data)
}

let token = null


const setToken = (newToken) => {
  token = `bearer ${newToken}`
}
const postBlog = async (blogData) =>{
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.post(baseUrl, blogData, config)
    return response.data
}

const addLike = async (blogData) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.put(baseUrl + '/'+ blogData.id, blogData, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const response = await axios.delete(baseUrl + '/' + id, config)
  return response
}
const postComment = async (id, comment) => {
  const config = {
    headers: { 'Authorization': token }
  }
  const commentData = { message: comment}
  const response = await axios.post(baseUrl + `/${id}/comments`, commentData, config)
  return response.data
}

export default { getAll, postBlog, setToken, addLike, deleteBlog, getById, postComment}
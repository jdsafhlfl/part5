import axios from 'axios'
const baseUrl = '/api/blogs'


let token = null

const setToken = newToken => {  
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {    
    headers: { Authorization: token },  
  }
  const response = await axios.post(baseUrl, newObject, config)  
  return response.data
}

const update = async newObject => {
  const requestUrl = baseUrl+'/'+newObject.blogId
  const updateObject = {
    user: newObject.user,
    likes: newObject.likes,
    author: newObject.author,
    title: newObject.title,
    url: newObject.url
  }
  const response = await axios.put(requestUrl, updateObject)
  return response.data
}

const deleteBlog = async blogId => {
  const requestUrl = baseUrl+'/'+blogId
  const config = {    
    headers: { Authorization: token },  
  }
  const response = await axios.delete(requestUrl, config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create, update, deleteBlog }
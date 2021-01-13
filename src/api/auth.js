import axios from '@/api/axios'

const register = credentials => {
  return axios.post('/users', {user: credentials})
}

const login = credentials => {
  return axios.post('/users/login', {user: credentials})
}

const getCurrentUser = () => {
  return axios.get('/user')
}

const updateCurrentUser = userInput => {
  return axios
    .put('/user', {user: userInput})
    .then(responser => responser.data.user)
}

export default {
  register,
  login,
  getCurrentUser,
  updateCurrentUser
}

import axios from 'axios'

const api = axios.create({
  baseURL: 'https://cobgen-api.herokuapp.com/api/'
})

let token = localStorage.getItem('jwt')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token.replace(
    /['"]+/g,
    ''
  )}`
}
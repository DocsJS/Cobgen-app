import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:1337/api'
})

let token = localStorage.getItem('jwt')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token.replace(
    /['"]+/g,
    ''
  )}`
}
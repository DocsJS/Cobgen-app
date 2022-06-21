import axios from 'axios'

const api = axios.create({
  baseURL: process.env.VUE_APP_URL,
})

let token = localStorage.getItem('jwt')
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token.replace(
    /['"]+/g,
    ''
  )}`
}
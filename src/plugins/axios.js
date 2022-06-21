import Vue from 'vue'
import axios from 'axios'
console.log('env url', process.env.VUE_APP_URL)
const $api = axios.create({
  baseURL: process.env.VUE_APP_URL,
});



Vue.prototype.$axios = axios

Vue.prototype.$api = $api


export default $api
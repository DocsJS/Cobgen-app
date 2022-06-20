import Vue from 'vue'
import axios from 'axios'

const $api = axios.create({
  baseURL: process.env.VUE_APP_URL,
});



Vue.prototype.$axios = axios

Vue.prototype.$api = $api


export default $api
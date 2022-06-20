import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import $api from './plugins/axios'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    console.log(store);
    const user = localStorage.user ? JSON.parse(localStorage.user) : null
    const jwt = localStorage.jwt ? localStorage.jwt : null
    if (jwt) {
      store.commit('app/setUser', user)
      store.commit('app/setJwt', jwt)

      Vue.prototype.$api.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${jwt.replace(/['"]+/g, '')}`
    }
    if (
      to.name !== 'Login' && !jwt
    )
      next({ name: 'Login' })
    else next()
})

new Vue({
  router,
  vuetify,
  store,
  $api,
  render: h => h(App)
}).$mount('#app')

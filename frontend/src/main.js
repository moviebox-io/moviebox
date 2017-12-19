import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VueProgressbar from 'vue-progressbar'
import VueResourceProgressBarInterceptor from 'vue-resource-progressbar-interceptor'
import store from './store'
import api from '@/api'

Vue.use(VueResource)
Vue.use(VueProgressbar, {
  color: 'rgb(80, 171, 86)',
  failedColor: 'red',
  height: '3px'
})
Vue.use(VueResourceProgressBarInterceptor)

Vue.config.productionTip = false

Vue.http.interceptors.push((request, next) => {
  next((response) => {
    if (response.status === 401 && request.url !== api.urls.authGoogle()) {
      return store.dispatch('login').then(result => {
        return Vue.http(request).then(data => {
          return data
        })
      }).catch(() => {
        return store.dispatch('logout')
      })
    }
  })
})

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

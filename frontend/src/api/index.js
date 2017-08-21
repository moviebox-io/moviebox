import Vue from 'vue'

export default {
  urls: {
    baseUrl: '/api',
    authGoogle () { return `${this.baseUrl}/auth/google` }
  },

  getTransactions () {
    return this.sendGet(this.urls.authGoogle())
  },

  userLogin ({token} = {}) {
    if (token) {
      return Vue.http.post(this.urls.authGoogle(), {id_token: token}).then(response => response.json())
    } else {
      return Promise.reject(new Error('Missing token'))
    }
  },

  sendGet (url) {
    if (url) {
      return Vue.http.get(url).then(response => response.json())
    } else {
      return Promise.reject(new Error('Missing parameter url'))
    }
  }
}

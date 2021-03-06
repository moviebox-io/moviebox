import Vue from 'vue'

export default {
  urls: {
    baseUrl: '/api',
    authGoogle () { return `${this.baseUrl}/auth/google` },
    searchMovie (query) { return `${this.baseUrl}/movies/search?q=${query}` },
    library () { return `${this.baseUrl}/library` }
  },

  userLogin ({token} = {}) {
    if (token) {
      return this.sendRequest({
        method: 'post',
        url: this.urls.authGoogle(),
        body: { id_token: token }
      })
    } else {
      return Promise.reject(new Error('Missing token'))
    }
  },

  searchMovie ({query} = {}) {
    if (query) {
      return this.sendRequest({
        method: 'get',
        url: this.urls.searchMovie(query)
      })
    } else {
      return Promise.reject(new Error('Missing query'))
    }
  },

  saveMovie ({id} = {}) {
    if (id) {
      return this.sendRequest({
        method: 'post',
        url: this.urls.library(),
        body: { movie_id: id }
      })
    } else {
      return Promise.reject(new Error('Missing id'))
    }
  },

  deleteMovie ({id} = {}) {
    if (id) {
      return this.sendRequest({
        method: 'delete',
        url: `${this.urls.library()}/${id}`
      })
    } else {
      return Promise.reject(new Error('Missing id'))
    }
  },

  sendRequest ({method, url, body, options}) {
    if (method && url) {
      if (body) {
        return Vue.http[method](url, body, options).then(response => response.json())
      } else {
        return Vue.http[method](url, options).then(response => response.json())
      }
    } else {
      return Promise.reject(new Error('Missing parameters'))
    }
  }
}

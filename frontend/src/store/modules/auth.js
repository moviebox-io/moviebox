import api from '@/api'
import * as types from '@/store/mutation-types'

// initial state
const state = {
  token: null,
  email: null,
  name: null,
  imageUrl: null
}

// getters
const getters = {
  loggedIn: state => !!state.token,
  getToken: state => state.token,
  getEmail: state => state.email,
  getName: state => state.name,
  getImageUrl: state => state.imageUrl
}

// actions
const actions = {
  login ({commit, state}, {googleUser = window.gapi.auth2.getAuthInstance().currentUser.get()} = {}) {
    if (state.googleUser) {
      return Promise.resolve(state)
    } else {
      return api.userLogin({token: googleUser.getAuthResponse().id_token}).then(() => {
        commit(types.LOGIN, { googleUser })
      })
    }
  },
  logout ({ commit, dispatch, state }) {
    commit(types.LOGOUT)
  }
}

// mutations
const mutations = {
  [types.LOGIN] (state, { googleUser }) {
    state.token = googleUser.getAuthResponse().id_token
    state.name = googleUser.getBasicProfile().getName()
    state.imageUrl = googleUser.getBasicProfile().getImageUrl()
    state.email = googleUser.getBasicProfile().getEmail()
  },

  [types.LOGOUT] (state) {
    state.token = null
    state.name = null
    state.imageUrl = null
    state.email = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

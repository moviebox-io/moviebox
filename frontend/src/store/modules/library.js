import api from '@/api'
import * as types from '@/store/mutation-types'

// initial state
const state = {
  library: []
}

// getters
const getters = {
  getLibrary: state => state.library
}

// actions
const actions = {
  saveMovie ({commit, state}, { id } = {}) {
    return api.saveMovie({id}).then((library = []) => {
      commit(types.LIBRARY_UPDATE, { library })
    })
  },
  deleteMovie ({commit, state}, { id } = {}) {
    return api.deleteMovie({id}).then((library = []) => {
      commit(types.LIBRARY_UPDATE, { library })
    })
  }
}

// mutations
const mutations = {
  [types.LIBRARY_UPDATE] (state, { library }) {
    state.library = library
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

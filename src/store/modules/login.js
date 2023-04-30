import storage from '../../utils/storage'
import { api } from '../../api'

const state = {
  loginStatus: 0,
  userInfo: null
}

const actions = {
  loginIn ({ commit }, params) {
    api.postLogin(params).promise.then(res => {
      if (res.data.access_token && res.data.refresh_token) {
        commit('setToken', res.data)
        commit('setLoginStatus', 1)
        actions.getUserInfo({ commit })
        const time = res.data.expires
        setTimeout(() => {
          actions.refreshToken({ commit })
        }, time);
      }
    })
  },
  getUserInfo ({ commit }) {
    api.getUserInfo().promise.then(res => {
      commit('setUserInfo', res.data)
    })
  },
  refreshToken ({ commit }) {
    const rt = storage.get('refresh_token')
    if (rt) {
      api.refreshToken({
        refresh_token: storage.get('refresh_token')
      }).promise.then(res => {
        if (res.data.access_token && res.data.refresh_token) {
          commit('setToken', res.data)
          commit('setLoginStatus', 1)
          actions.getUserInfo({ commit })
          const time = res.data.expires
          setTimeout(() => {
            actions.refreshToken({ commit })
          }, time);
        }
      }).catch((error) => {
        commit('setLoginStatus', 2)
      })
    } else {
      commit('setLoginStatus', 2)
    }
  }
}

const mutations = {
  setUserInfo (state, data) {
    state.userInfo = data
  },
  setToken (state, data) {
    storage.set('token', data.access_token)
    storage.set('refresh_token', data.refresh_token)
  },
  setLoginStatus (state, status) {
    state.loginStatus = status
  },
}

export default {
  state,
  actions,
  mutations
}
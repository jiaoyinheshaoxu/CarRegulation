import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    route_name: '',
    username: ''
  },
  mutations: {
    change_route(state, payload) {
      state.route_name = payload.route_name
    },
    get_username(state, payload) {
      state.username = payload.username
    }
  }
})

export default store

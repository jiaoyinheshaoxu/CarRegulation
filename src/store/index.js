import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    route_name: ''
  },
  mutations: {
    change_route(state, payload) {
      state.route_name = payload.route_name
    },
  }
})

export default store

import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
  state: {
    route_name: '',
    create_report_step: 1
  },
  mutations: {
    change_route_name(state, payload) {
      state.route_name = payload.route_name
    },
    get_create_report_step(state, payload) {
      state.create_report_step = payload.step
    }
  }
})

export default store

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
//import $ from 'jquery'
import store from './store/index.js'

import './components/app.components'
import {Message} from 'element-ui'
/*elementui组件*/
import './components/element-ui.components'
import global from './global.js'
Vue.prototype.global = global

import api from './api.js'
Vue.prototype.api = api

import router from './router'
import './filter'

/*全局样式*/
import './assets/css/global.css'
import './assets/css/question.css'

router.beforeEach((to, from, next) => {
  console.log(to)
  store.commit('change_route', {route_name: to.path})
  next()
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})

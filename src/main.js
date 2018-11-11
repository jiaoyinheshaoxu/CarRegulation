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
async function user_login() {
  let url = 'LoginService.asmx/CheckLogin'
  let params = {
    username: sessionStorage.getItem('userEmail'),
    password: sessionStorage.getItem('userPassword')
  }
  let data = await api.post(url, params);
  if (data.LoginStatus == 1) {
    // 登录成功 => 回到首页 => 将用户 id 存入 session 和 global 中
    global.userEmail = sessionStorage.getItem('userEmail');
    global.userPassword = sessionStorage.getItem('userPassword');
    global.memberId = data.memberId;
    store.commit('get_username', {username: sessionStorage.getItem('userEmail')})
    global.HYType = data.HYType;
    sessionStorage.setItem('userEmail', sessionStorage.getItem('userEmail'));
    sessionStorage.setItem('userPassword', sessionStorage.getItem('userPassword'));
    sessionStorage.setItem('memberId', data.memberId);
  } else {
    sessionStorage.setItem('userEmail', '')
    sessionStorage.setItem('userPassword', '')
    sessionStorage.setItem('memberId', '')
  }
}
if(sessionStorage.getItem('userEmail') && sessionStorage.getItem('userPassword')) {
  user_login()
}
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
  components: {App},
  template: '<App/>',
})

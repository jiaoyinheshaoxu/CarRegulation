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
import './assets/css/iconfont/iconfont.css'
import './assets/css/question.css'

router.beforeEach((to, from, next) => {
  let data, is_ryaStudentsBySchool = false
  async function ryaStudentsBySchool() {
    let url = '/das/outer/rya/sync/ryaStudentsBySchool'
    let params = {
      sid: global.sid,
      uid: global.uid,
      schoolId: global.schoolId
    }
    let data = await api.get(url, params)
  }
  async function login(url, params, next) {
    data = await api.get(url, params)
    if (data) {
      global.sid = data.sid
      global.uid = data.uid
      sessionStorage.setItem('uid', global.uid)
      sessionStorage.setItem('sid', global.sid)
      getInfo(next)
    }
  }
  async function getInfo(next) {
    let url = '/das/outer/rya/getInfoByUid'
    let params = {
      sid: global.sid,
      uid: global.uid
    }
    let data = await api.get(url, params)
    if (data) {
      for (let i = 0, len = data.roleList.length; i < len; i++) {
        if (data.roleList[i].default == 1) {
          let tempArr = ['roleId', 'nickName', 'roleName']
          for (let j = 0, len = tempArr.length; j < len; j ++) {
            global[tempArr[j]] = data.roleList[i][tempArr[j]]
            sessionStorage.setItem(tempArr[j], global[tempArr[j]])
          }
        }
      }
      let tempArr = ['username', 'schoolName', 'schoolId', 'mobile', 'name']
      for (let i = 0, len = tempArr.length; i < len; i ++) {
        global[tempArr[i]] = data.infoData[tempArr[i]]
        sessionStorage.setItem(tempArr[i], global[tempArr[i]])
      }
      console.log('成功！')
      if (is_ryaStudentsBySchool) {
        ryaStudentsBySchool()
      }
      if (next) {
        next()
      }
    }
  }
  if(to.path == '/zujuan' || to.path == '/reusePaper'){
    if(to.query.sid && to.query.uid && to.query.roleId && to.query.name){
      sessionStorage.setItem('sid', to.query.sid)
      sessionStorage.setItem('uid', to.query.uid)
      sessionStorage.setItem('roleId', to.query.roleId)
      sessionStorage.setItem('name', to.query.name)
      if(to.path == '/zujuan') {
        router.push('/OnlinePaper/SelectItem')
      } else if(to.path == '/reusePaper' && to.query.paperId) {
        router.push(`/OnlinePaper/SetPaper/${to.query.paperId}`)
      }
    } else {
      Message({
        message: '此用户数据缺少!',
        type: 'warning',
        showClose: true
      })
      setTimeout(function () {
        location.href = global.return_url
      }, 2000)
    }
  } else if ( to.query.ut && to.query.errcode) {
    if (to.query.ut && to.query.errcode) {
      if (to.query.errcode != '000000') {
        console.log(to.query.errcode)
        console.log('故障')
        Message({
          message: '此用户没有使用该部分功能的权限!',
          type: 'warning',
          showClose: true
        })
        setTimeout(function () {
          location.href = global.return_url
        }, 2000)
      } else {
        is_ryaStudentsBySchool = true
        let url = '/das/outer/rya/login'
        let params = {
          errcode: to.query.errcode,
          ut: to.query.ut
        }
        store.commit('change_route_name', {route_name: to.path})
        login(url, params, next)
      }
    }
  } else if(sessionStorage.getItem('sid') && sessionStorage.getItem('uid') && sessionStorage.getItem('roleId')){
    let arr = ['sid', 'uid', 'roleId', 'nickName', 'roleName', 'username', 'schoolName', 'schoolId', 'mobile', 'name']
    for (let i = 0, len = arr.length; i <len; i++) {
      global[arr[i]] = sessionStorage.getItem(arr[i])
    }
    if (from.name == 'SerialDataMatchup') {
      store.commit('get_create_report_step', {step: 2})
    } else {
      store.commit('get_create_report_step', {step: 1})
    }
    store.commit('change_route_name', {route_name: to.path})
    next()
  }else {
    let ruiya_url = `${global.ut_url}/sso/setUt`
    let returnUrl = `${global.LOCAL_URL}/#${to.path}`
    window.location.href = `${ruiya_url}?appId=3&lt=3&returnUrl=${encodeURIComponent(returnUrl)}`;
  }
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

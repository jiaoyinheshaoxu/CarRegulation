import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home.vue'
import SignIn from '../pages/PersonalCenter/SignIn.vue'
import SignUp from '../pages/PersonalCenter/SignUp.vue'
import SignUpSuccess from '../pages/PersonalCenter/SignUpSuccess.vue'
import UserCenter from '../pages/HomeNavigation/UserCenter.vue'
import FindPassword from '../pages/PersonalCenter/FindPassword.vue'
import AboutUs from '../pages/HomeNavigation/AboutUs.vue'
import ContactUs from '../pages/HomeNavigation/ContactUs.vue'
import Help from '../pages/HomeNavigation/Help.vue'
import Index from '../pages/HomeNavigation/Index.vue'
import LawSearch from '../pages/HomeNavigation/LawSearch.vue'
import Link from '../pages/HomeNavigation/Link.vue'
import LatestTranslation from '../pages/HomeNavigation/LatestTranslation.vue'
import StandardLawState from '../pages/HomeNavigation/StandardLawState.vue'
import StandardSearch from '../pages/HomeNavigation/StandardSearch.vue'
import StandardDetail from '../pages/HomeNavigation/StandardDetail.vue'
import NewsDetail from '../pages/HomeNavigation/NewsDetail.vue'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/Index',
      children: [
        {
          path: '/Index',
          name: 'Index',
          component: Index
        },
        {
          path: '/AboutUs',
          name: 'AboutUs',
          component: AboutUs
        },
        {
          path: '/ContactUs',
          name: 'ContactUs',
          component: ContactUs
        },
        {
          path: '/Help',
          name: 'Help',
          component: Help
        },
        {
          path: '/LatestTranslation',
          name: 'LatestTranslation',
          component: LatestTranslation
        },
        {
          path: '/LawSearch',
          name: 'LawSearch',
          component: LawSearch
        },
        {
          path: '/Link',
          name: 'Link',
          component: Link
        },
        {
          path: 'StandardLawState',
          name: 'StandardLawState',
          component: StandardLawState
        },
        {
          path: '/StandardSearch',
          name: 'StandardSearch',
          component: StandardSearch
        },
        {
          path: '/StandardLawState/NewsDetail/:id?',
          name: '/StandardLawState/NewsDetail',
          component: NewsDetail
        },
        {
          path: '/Index/StandardDetail/:id?',
          name: '/Index/StandardDetail',
          component: StandardDetail
        },
        {
          path: '/Index/NewsDetail/:id?',
          name: '/Index/NewsDetail',
          component: NewsDetail
        },
        {
          path: '/LawSearch/StandardDetail/:id?',
          name: '/LawSearch/StandardDetail',
          component: StandardDetail
        },
        {
          path: '/LatestTranslation/StandardDetail/:id?',
          name: '/LatestTranslation/StandardDetail',
          component: StandardDetail
        },
        {
          path: '/StandardSearch/StandardDetail/:id?',
          name: '/StandardSearch/StandardDetail',
          component: StandardDetail
        },
		    {
		      path: '/UserCenter',
		      name: 'UserCenter',
		      component: UserCenter
		    }
      ]
    },
    {
      path: '/FindPassword',
      name: 'FindPassword',
      component: FindPassword
    },
    {
      path: '/SignIn',
      name: 'SignIn',
      component: SignIn
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp
    },
    {
      path: '/SignUpSuccess',
      name: 'SignUpSuccess',
      component: SignUpSuccess
    }
  ]
})
export default router

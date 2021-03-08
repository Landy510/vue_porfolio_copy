import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'bootstrap'
import './bus.js'
import './all.js'
import currencyFilter from './filters/currency'

import { extend, localize, configure } from 'vee-validate'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import * as rules from 'vee-validate/dist/rules'

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import VueAwesomeSwiper from 'vue-awesome-swiper'
library.add(fab, far, fas)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(VueAwesomeSwiper /* { default options with global component } */)
Vue.use(VueAxios, axios)
Vue.component('Loading', Loading)
Vue.config.productionTip = false
axios.defaults.withCredentials = true
Vue.filter('currency', currencyFilter)

Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule])
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const api = `${process.env.VUE_APP_APIPATH}/api/user/check`
    axios.post(api).then((response) => {
      if (response.data.success) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
    )
  } else {
    next()
  }
})
localize('zh_TW', TW)
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

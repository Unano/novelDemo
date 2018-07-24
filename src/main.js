// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueLazyLoad from 'vue-lazyload'
import axios from 'axios'
import '@/assets/css/common.less'
import '@/util/mock'

const Bus = new Vue()

Vue.prototype.axios = axios

Vue.use(vueLazyLoad, {
  preLoad: 1.3,
  error: 'static/imgs/broken-image.png',
  loading: 'static/imgs/loading.gif',
  attempt: 1
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  data: {
    Bus
  },
  components: { App },
  template: '<App/>'
})

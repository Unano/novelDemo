import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/views/Main'
import Home from '@/views/Home'
import Person from '@/views/Person'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      redirect: '/index',
      children: [{
        path: 'index',
        name: 'Home',
        component: Home
      }, {
        path: 'person',
        name: 'Person',
        component: Person,
        meta: {
          auth: true // 设置当前路由需要校验
        }
      }]
    }
  ]
})

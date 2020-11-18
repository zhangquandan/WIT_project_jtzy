import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../page/home'),
      children: [{
      	path: '/',
      	name: 'waterMeter',
      	component: () => import('../page/content'),
      }]
    },{
      path: '/bigMap',
      name: 'bigMap',
      component: () => import('../page/bigMap'),
    }
  ]
})

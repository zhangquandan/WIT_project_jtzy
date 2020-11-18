// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import echarts from 'echarts'
import echartsGL from 'echarts-gl' // 引入echarts
import store from './store'
import 'default-passive-events'

Vue.prototype.$echartsGL = echartsGL // 引入组件（将echarts注册为全局）

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

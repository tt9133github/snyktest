import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import App from './App'
import Login from './page/login'
import routes from './router/routes'
import store from './store/index'
import echarts from 'echarts'
import VueI18n from 'vue-i18n'

import hljs from 'highlight.js'
import 'highlight.js/styles/vs.css' //样式文件
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  setTimeout(() =>{
    blocks.forEach((block)=>{
      hljs.highlightBlock(block)
    })
  }, 10)
})


Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

import Vuex from 'vuex'
//引入elment-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI)
Vue.use(VueI18n)
Vue.use(hljs)

//按需引入elment ui
//import {
//    Alert,
//    MessageBox,
//    Message,
//    Table
//} from 'element-ui';

Vue.use(Vuex);
Vue.use(VueResource)
Vue.use(VueRouter)

//Vue.use(MessageBox)
//Vue.use(Alert)
//Vue.use(Message)
//Vue.use(Table)

const router = new VueRouter({
  routes
})

const i18n = new VueI18n({
  locale: 'zh',
  messages: {
    'zh': require('../i18n/zh.js'),
    'en': require('../i18n/en.js')
  }
})
// 全局导航钩子
//router.beforeEach((to, from, next) => {
//
//    if (to.meta.requireAuth) {
//        // console.log(isEmptyObject(store.state.user))
//        if (store.state.user.status == 0) {
//            next();
//        } else {
//            next({
//                path: '/login',
//                query: {
//                    redirect: to.fullPath
//                } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//            })
//        }
//    } else {
//        next();
//    }
//})
var vm = new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

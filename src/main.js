// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from "jquery"
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import VueRouter from 'vue-router'

//富文本编辑器
import './assets/kindeditor-4.1.10/kindeditor.js'
import './assets/kindeditor-4.1.10/themes/default/default.css'
import './assets/kindeditor-4.1.10/themes/simple/simple.css'
import './assets/kindeditor-4.1.10/lang/zh_CN.js'
import './assets/kindeditor-4.1.10/lang/zh_TW.js'

Vue.use(VueRouter)
Vue.use(ElementUI)
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

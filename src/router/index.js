import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import commonClient from '../components/crm/CommonSea.vue'
import crmRecycle from '../components/crm/Recycle.vue'
import allClient from '../components/crm/AllClient/allClient.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/client',
      name: 'commonClient',
      component: commonClient
    },
    {
      path: '/recycle',
      name: 'crmRecycle',
      component: crmRecycle
    },
    {
      path: '/allClient',
      name: 'allClient',
      component: allClient
    }
  ]
})

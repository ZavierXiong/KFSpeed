import Vue from 'vue'
import Router from 'vue-router'
import commonClient from '../components/crm/CommonSea.vue'
import crmRecycle from '../components/crm/Recycle.vue'
import allClient from '../components/crm/AllClient/myAllClient.vue'
import crmIndex from '../components/crm/index.vue'
Vue.use(Router)

/********************************************全部客户子路由路径***************************************/
import allClient_Follow from '../components/crm/AllClient/allClient_importantClient.vue'
import allClient_Classify from '../components/crm/AllClient/allClient_defaultClassify.vue'
import allClient_PurposeClient from '../components/crm/AllClient/allClient_importantPurposeClient.vue'
import allClient_NormalClient from '../components/crm/AllClient/allClient_normalPotentialClient.vue'
import allClient_Alibaba from '../components/crm/AllClient/allClient_alibaba.vue'
import allClient_AmericaClient from '../components/crm/AllClient/allClient_AmericaClient.vue'
import allClient_JP from '../components/crm/AllClient/allClient_JP.vue'
import allClient_KP from '../components/crm/AllClient/allClient_KP.vue'
import allClientStatus_collect from '../components/crm/AllClient/allClient_status/allClientStatus_collectStatus.vue'
import allClientStatus_develop from '../components/crm/AllClient/allClient_status/allClientStatus_devetopStatus.vue'
import allClientStatus_follow from '../components/crm/AllClient/allClient_status/allClientStatus_followStatus.vue'
import allClientStatus_potenziell from '../components/crm/AllClient/allClient_status/allClientStatus_potenziellClient.vue'
import allClientStatus_purpose from '../components/crm/AllClient/allClient_status/allClientStatus_purposeClient.vue'
import allClientStatus_compelete from '../components/crm/AllClient/allClient_status/allClientStatus_completeClient.vue'
import allClientOrigin_myShare from '../components/crm/AllClient/allClient_origin/allClientOrigin_myShareClient.vue'
import allClientOrigin_colleagueShare from '../components/crm/AllClient/allClient_origin/allClientOrigin_colleagueShareClient.vue'
import allClientOrigin_inWarehouse from '../components/crm/AllClient/allClient_origin/allClientOrigin_InWarehouse.vue'
import allClientOrigin_unInWarehouse from '../components/crm/AllClient/allClient_origin/allClientOrigin_unInWarehouse.vue'
import allClientOrigin_locationLinkMan from '../components/crm/AllClient/allClient_origin/common_locationLinkMan.vue'

export default new Router({
  routes: [
    {
      path: '/crm',
      name: 'crm',
      component: crmIndex,
      children:[
        {path:'commonClient',name:'commonClient',component:commonClient},
        {path:'recycle',name:'crmRecycle',component:crmRecycle},
        {path:'allClient',name:'allClient',component:allClient},
        {path:'allClient_Follow',name:'allClient_Follow',component:allClient_Follow},
        {path:'allClient_Classify',name:'allClient_Classify',component:allClient_Classify},
        {path:'allClient_PurposeClient',name:'allClient_PurposeClient',component:allClient_PurposeClient},
        {path:'allClient_NormalClient',name:'allClient_NormalClient',component:allClient_NormalClient},
        {path:'allClient_Alibaba',name:'allClient_Alibaba',component:allClient_Alibaba},
        {path:'allClient_AmericaClient',name:'allClient_AmericaClient',component:allClient_AmericaClient},
        {path:'allClient_JP',name:'allClient_JP',component:allClient_JP},
        {path:'allClient_KP',name:'allClient_KP',component:allClient_KP},
        {path:'allClientStatus_collect',name:'allClientStatus_collect',component:allClientStatus_collect},
        {path:'allClientStatus_develop',name:'allClientStatus_develop',component:allClientStatus_develop},
        {path:'allClientStatus_follow',name:'allClientStatus_follow',component:allClientStatus_follow},
        {path:'allClientStatus_potenziell',name:'allClientStatus_potenziell',component:allClientStatus_potenziell},
        {path:'allClientStatus_purpose',name:'allClientStatus_purpose',component:allClientStatus_purpose},
        {path:'allClientStatus_compelete',name:'allClientStatus_compelete',component:allClientStatus_compelete},
        {path:'allClientOrigin_myShare',name:'allClientOrigin_myShare',component:allClientOrigin_myShare},
        {path:'allClientOrigin_colleagueShare',name:'allClientOrigin_colleagueShare',component:allClientOrigin_colleagueShare},
        {path:'allClientOrigin_inWarehouse',name:'allClientOrigin_inWarehouse',component:allClientOrigin_inWarehouse},
        {path:'allClientOrigin_unInWarehouse',name:'allClientOrigin_unInWarehouse',component:allClientOrigin_unInWarehouse},
        {path:'allClientOrigin_locationLinkMan',name:'allClientOrigin_locationLinkMan',component:allClientOrigin_locationLinkMan},
      ]
    }
  ]
})

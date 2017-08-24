<template>
  <div id="app">
    <div class="left-tab">
      <div class="product-name"><i class="crm-name-icon"></i><span>客户管理系统(CRM)</span></div>
      <ul class="user-list">
        <li @click="openCrC()" class="crm-user-list-li"><i></i><span>新建客户</span></li>
        <router-link to="/crm/commonClient"><li class="crm-user-list-li">公海客户<span class="red-num">(240)</span></li></router-link>
        <router-link to="/crm/recycle"><li class="crm-user-list-li">客户回收站<span class="red-num">(6)</span></li></router-link>
      </ul>
      <div class="tab-list">
        <router-link to="allClient">
          <div class="tab-title" @click="showList()" :class="$route.path==='/crm/allClient'?'selected':''">
            <i :class="[show?'icn1':'icn2']" ></i>全部客户
            <span class="red-num title-num">(15)</span>
          </div>
        </router-link>
        <div class="all-client-list" v-show="show">
          <ul class="select-box">
            <router-link to="allClient_Follow">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClient_Follow'?'selected':''">
                <span>重点跟进客户</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClient_Classify">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClient_Classify'?'selected':''">
                <span>默认分类</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClient_PurposeClient">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClient_PurposeClient'?'selected':''">
                <span>重点意向客户</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClient_NormalClient">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClient_NormalClient'?'selected':''">
                <span>一般潜在客户</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClient_Alibaba">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClient_Alibaba'?'selected':''">
                <span>阿里</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClient_AmericaClient">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClient_AmericaClient'?'selected':''">
                <span>美国客户</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClient_JP">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClient_JP'?'selected':''">
                <span>JP</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClient_KP">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClient_KP'?'selected':''">
                <span>KP</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
          </ul>
        </div>

      </div>
      <div class="tab-list">
        <div class="tab-title" @click="showListStatus()"><i :class="[show2?'icn1':'icn2']"></i>客户状态</div>
        <div class="client-status-list" v-show="show2">
          <ul class="select-box">
            <router-link to="allClientStatus_collect">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClientStatus_collect'?'selected':''">
                <span>收集状态</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClientStatus_develop">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClientStatus_develop'?'selected':''">
                <span>开发状态</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClientStatus_follow">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClientStatus_follow'?'selected':''">
                <span>跟进状态</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClientStatus_potenziell">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClientStatus_potenziell'?'selected':''">
                <span>潜在客户</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClientStatus_purpose">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClientStatus_purpose'?'selected':''">
                <span>意向客户</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
            <router-link to="allClientStatus_compelete">
              <li class="crm-tab-list-li" :class="$route.path==='/crm/allClientStatus_compelete'?'selected':''">
                <span>成交客户</span>
                <span class="red-num">(15)</span>
              </li>
            </router-link>
          </ul>
        </div>
      </div>
      <ul class="client-origin select-box">
        <router-link to="allClientOrigin_myShare">
          <li class="crm-client-origin-li crm-tab-list-li" :class="$route.path==='/crm/allClientOrigin_myShare'?'selected':''">
            <span>我的共享客户</span>
            <span class="red-num">(7)</span>
          </li>
        </router-link>
        <router-link to="allClientOrigin_colleagueShare">
          <li class="crm-client-origin-li crm-tab-list-li" :class="$route.path==='/crm/allClientOrigin_colleagueShare'?'selected':''">
            <span>同事共享给我的</span>
            <span class="red-num">(7)</span>
          </li>
        </router-link>
        <router-link to="allClientOrigin_inWarehouse">
          <li class="crm-client-origin-li crm-tab-list-li" :class="$route.path==='/crm/allClientOrigin_inWarehouse'?'selected':''">
            <span>已入客户库联系人</span>
            <span class="red-num">(7)</span>
          </li>
        </router-link>
        <router-link to="allClientOrigin_unInWarehouse">
          <li class="crm-client-origin-li crm-tab-list-li" :class="$route.path==='/crm/allClientOrigin_unInWarehouse'?'selected':''">
            <span>未入客户库联系人</span>
            <span class="red-num">(7)</span>
          </li>
        </router-link>
      </ul>
    </div>
    <router-view ></router-view>
    <!--<crmcontent></crmcontent>-->
    <!--新建客户组件-->
    <transition name="fade">
      <create-client v-if="crC" @close="close"></create-client>
    </transition>
  </div>
</template>

<script>
  import Vue from "vue"
  import ElementUI from 'element-ui'
  import 'element-ui/lib/theme-default/index.css'
  Vue.use(ElementUI)
  import createClient from './createClient/createClient.vue'
  import crmcontent from './CommonSea.vue'
  import layer from './layer.vue'


  export default {
    name: 'app',
    data(){
    return{
      show:true,
      show2:false,
      crC:false,
      isSelected:false,
      clientClassify:[
        {name:'重点跟进客户',num:12},
        {name:'默认分类',num:12},
        {name:'重点意向客户',num:12},
        {name:'一般潜在客户',num:12},
        {name:'阿里',num:12},
        {name:'美国客户',num:12},
        {name:'JP',num:12},
        {name:'KP',num:12}
      ],
      clientStatus:[
        {name:'收集状态',num:12},
        {name:'开发状态',num:12},
        {name:'跟进状态',num:12},
        {name:'潜在客户',num:12},
        {name:'意向客户',num:12},
        {name:'成交客户',num:12}
      ],
      clientOrigin:[
        {name:'我的共享客户',num:12},
        {name:'同事共享给我的',num:12},
        {name:'已入客户库联系人',num:12},
        {name:'未入客户库联系人',num:12}
      ],
      infoLists:[
        {
          course:"无",
          infoTitle:"Quanzhou Dear Lover Fashion Apparel Co., Ltd.",
          infoEmail:"Service@wholesale-lingerie.cn",
          date:"2017-01-24",
          lastDate:"2017-07-24",
          stars :[
          ]
        },{
          course:"无",
          infoTitle:"Quanzhou Dear Lover Fashion Apparel Co., Ltd.",
          infoEmail:"Service@wholesale-lingerie.cn",
          date:"2017-04-24",
          lastDate:"2017-05-25",
          stars :[
            {a:true},
            {a:true}
          ]
        }
      ]
    }
  },
  components:{
    createClient,
      crmcontent,
      layer
  },
  methods:{
    showList:function(){
      this.show=!this.show
    },
    showListStatus:function(){
      this.show2=!this.show2
    },
    openCrC:function(){
      this.crC = true
    },
    close(statu){
      this.crC=statu;
    }
  }
  };
</script>

<style lang="less">
  .fade-enter-active,.fade-leave-active{
    transition:opacity 0.5s;
  }
  .fade-enter,.fade-leave-to{
    opacity:0;
  }
  .v-modal{
    display: none;
  }
  *{
    outline: none;
    /*user-select: none;*/
    box-sizing:border-box;
  }
  a{
    color:#444;
  }
  body{
    margin:0;
  }
  ul{
    padding:0;
    margin:0;
    list-style:none;
  }
  a{
    text-decoration: none;
    color:#444;
  }
  #app {
    font-family: PingFangSC-Light, "Microsoft YaHei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif !important;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    max-width:1920px;
    min-width:100%;
  }
  .left-tab{
    overflow: auto;
    color:black;
    user-select: none;
    position:fixed;
    top:55px;
    bottom:0;
    left:0;
    width:200px;
    border-left:1px solid #ddd;
    border-right:1px solid #ddd;
    background-color:#FCFCFC;
  }
  .product-name{
    height:40px;
    line-height:40px;
    font-size:14px;
    color:#1562b4;
    background-color:#e6e6e6;
    padding:0 20px;
  }
  .product-name .crm-name-icon{
    float: left;
    width: 22px;
    margin-top: 8px;
    height: 25px;
    background: url(/static/img/crm_images/icon.png) no-repeat 0px 2px;
  }
  .user-list{
  a{
    color:#fff;
    text-decoration: none;
  }
  }
  .user-list .crm-user-list-li{
    background-color:#0480be;
    color:#fff;
    margin-top:10px;
    height:30px;
    line-height: 30px;
    text-align:center;
    font-size:14px;
    cursor:pointer;
  }
  .user-list .crm-user-list-li:hover{
    background-color:#005f9b;
  }
  .red-num{
    color:red;
  }
  .tab-list{
    font-size:12px;
    margin-top:10px;
    border-right:0;
    border-left:0;
    text-align: left;
    background-color:#FCFCFC;
  }
  .tab-list .tab-title{
    padding-left:35px;
    font-weight:bold;
    height:28px;
    line-height: 28px;
  }
  .tab-list .icn1,.tab-list .icn2{
    display: inline-block;
    vertical-align: middle;
    width: 9px;
    height: 9px;
    margin-right:5px;
    background:url("/static/img/crm_images/icon/minus.png") no-repeat;
  }
  .tab-list .icn2{
    background:url("/static/img/crm_images/icon/plus.png") no-repeat;
  }
  .title-num{
    font-weight:normal;
  }
  .tab-list .crm-tab-list-li{
    height:28px;
    line-height: 28px;
    text-align:left;
    padding-left:60px;
  }
  .left-tab .selected{
    background-color:#0480be;
    color:#fff;
  }
  .tab-list .crm-tab-list-li:hover,.tab-list .tab-title:hover,.active{
    cursor:pointer;
    background-color:#0480be;
    color:#fff;
  }
  .left-tab .client-origin{
    box-sizing:border-box;
    border-bottom:1px solid #ddd;
  }
  .left-tab .client-origin .crm-client-origin-li{
    font-size:12px;
    height:30px;
    line-height: 30px;
    text-align:left;
    padding-left:30px;
    cursor:pointer;
  }
  .left-tab .client-origin .crm-client-origin-li:hover{
    background-color:#0480be;
    color:#fff;
  }
</style>
<style lang="less" src="../../less/crm_less/common_animation.less"></style>

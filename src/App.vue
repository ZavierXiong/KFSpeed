<template>
  <div id="app">
    <header class="crm-header">
      <ul class="crm-header-ul">
        <li class="logo l-menu-li"></li>
        <li class="l-menu-li"><i></i>工作台</li>
        <li class="l-menu-li"><i></i>搜客户</li>
        <li class="l-menu-li"><i></i>邮件</li>
        <li class="l-menu-li"><i></i>营销</li>
        <li class="l-menu-li"><i></i>客户</li>
        <li class="l-menu-li"><i></i>数据</li>
        <li class="l-menu-li"><i></i>团队</li>
      </ul>
      <ul class="user-operater">
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
      </ul>
    </header>
    <div class="left-tab">
      <div class="product-name"><i class="crm-name-icon"></i><span>客户管理系统(CRM)</span></div>
      <ul class="user-list">
        <li @click="openCrC()" class="crm-user-list-li"><i></i><span>新建客户</span></li>
        <router-link to="client"><li class="crm-user-list-li">公海客户<span class="red-num">(240)</span></li></router-link>
        <router-link to="recycle"><li class="crm-user-list-li">客户回收站<span class="red-num">(6)</span></li></router-link>
      </ul>
      <div class="tab-list">
        <router-link to="allClient"><div class="tab-title" @click="showList()"><i :class="[show?'icn1':'icn2']"></i>全部客户<span class="red-num title-num">(15)</span></div></router-link>
        <div class="all-client-list" v-show="show">
          <ul>
            <li class="crm-tab-list-li">重点跟进客户<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">默认分类<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">重点意向客户<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">一般潜在客户<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">阿里<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">美国客户<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">JP<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">KP<span class="red-num">(15)</span></li>
          </ul>
        </div>
      </div>
      <div class="tab-list">
        <div class="tab-title" @click="showListStatus()"><i :class="[show2?'icn1':'icn2']"></i>客户状态</div>
        <div class="client-status-list" v-show="show2">
          <ul>
            <li class="crm-tab-list-li">收集状态<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">开发状态<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">跟进状态<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">潜在客户<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">意向客户<span class="red-num">(15)</span></li>
            <li class="crm-tab-list-li">成交客户<span class="red-num">(15)</span></li>
          </ul>
        </div>
      </div>
      <ul class="client-origin">
        <li class="crm-client-origin-li">我的客户状态<span class="red-num">(7)</span></li>
        <li class="crm-client-origin-li">同事共享给我的<span class="red-num">(0)</span></li>
        <li class="crm-client-origin-li">已入客户库联系人<span class="red-num">(17)</span></li>
        <li class="crm-client-origin-li">未入客户库联系人<span class="red-num">(3)</span></li>
      </ul>
    </div>
    <router-view></router-view>
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
import createClient from './components/crm/createClient/createClient.vue'
import crmcontent from './components/crm/CommonSea.vue'
import layer from './components/crm/layer.vue'


export default {
  name: 'app',
  data(){
    return{
      show:true,
      show2:false,
      crC:false
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
  user-select: none;
  box-sizing:border-box;
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
  text-align: center;
  color: #2c3e50;
  max-width:1920px;
  min-width:100%;
}
.logo{
  width:159px;
  height:55px;
  background: url(./assets/logo.png) 50% 50% no-repeat;
  border-left:0;
}
.logo:hover{
  cursor:default;
  background-color:#1965b6;
}
.crm-header{

  height:55px;
  line-height:55px;
  background-color:#1965b6;
  font-size:16px;
}
  .crm-header .crm-header-ul{
    overflow:auto;
    padding:0;
    float:left;
  }
  .l-menu-li{
    cursor:pointer;
    float:left;
    padding:0 20px;
    color:#fff;
    border-left:1px solid #3075bd;
  }
  .l-menu-li:hover{
    background-color:#0b559f;
  }
  .user-operater{
    float:right;
    li{
      position: relative;
      float: left;
      height: 55px;
      line-height: 55px;
      -moz-user-select: none;
      cursor: pointer;
      color: #FFF;
      padding: 0 20px;
      font-size: 16px;
    }
  }
  .left-tab{
    user-select: none;
    position:absolute;
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
    background: url(./assets/icon.png) no-repeat 0px 2px;
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
    border:1px solid #ccc;
    margin-right:5px;
    background:url("./assets/icon/minus.png") no-repeat;
  }
  .tab-list .icn2{
    background:url("./assets/icon/plus.png") no-repeat;
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

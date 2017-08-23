<template>
  <header class="crm-header">
    <ul class="crm-header-ul">
      <li class="l-menu-li logo-box">
        <span class="logo"></span>
      </li>
      <router-link to="home">
        <li class="l-menu-li"><i></i>工作台</li>
      </router-link>
      <router-link to="mail">
        <li class="l-menu-li"><i></i>搜客户邮件</li>
      </router-link>
      <router-link to="mail">
        <li class="l-menu-li"><i></i>邮件</li>
      </router-link>
      <router-link to="marketing">
        <li class="l-menu-li"><i></i>营销</li>
      </router-link>
      <router-link to="crm">
        <li class="l-menu-li"><i></i>客户</li>
      </router-link>
      <router-link to="data">
        <li class="l-menu-li"><i></i>数据</li>
      </router-link>
      <router-link to="team">
        <li class="l-menu-li"><i></i>团队</li>
      </router-link>
    </ul>
    <ul class="user-operater">
      <li>1</li>
      <li>2</li>
      <li>3</li>
      <li>4</li>
    </ul>
  </header>
</template>
<script>

</script>
<style>
  .l-menu-li.logo-box:hover{
    background-color:#1965b6;
    cursor:default;
  }
  .logo{
    display: inline-block;
    width:159px;
    height:30px;
    vertical-align: middle;
    margin-top: -4px;
    background: url(/static/img/crm_images/logo.png) 50% 50% no-repeat;
    border-left:0;
  }
  .logo:hover{
    cursor:default;
    background-color:#1965b6;
  }
  .crm-header{
    position:fixed;
    width:100%;
    z-index:200;
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
  }
  .user-operater li{
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
</style>

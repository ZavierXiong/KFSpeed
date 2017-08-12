<template>
  <div class="crm-content-title">
    <!--<span class="crm-content-site" v-for="title in myTitle">您的位置：{{title.name}}</span>-->
    <span class="crm-content-site" v-for="title in myTitle">您的位置：{{title.name}} <i class="refresh"></i></span>
    <div class="crm-content-search">
      <input class="crm-search-input" type="text"   placeholder="请输入客户或者联系人相关信息..."/>
      <i class="search-icon"></i>
    </div>
  </div>
</template>
<script>
export default ({
  props:["myTitle"]
})
</script>
<style lang="less">
  .crm-content-title{
    width: 100%;
    padding:10px 0 10px 20px;
    line-height: 21px;
    background-color:#FCFCFC;
    display: inline-block;
    border-bottom:1px solid #F2F2F2;
  .crm-content-site{
    float:left;
    font-size:14px;
    padding-left:18px;
    background:url("../../../assets/icon/crm_location.png") no-repeat;
  }
  .crm-content-search{
    float:right;
    margin-right:60px;
    margin-top:-4px;
    height:27px;
    border:1px solid #B5CDE6;
  .crm-search-input{
    box-sizing:border-box;
    width: 185px;
    font-size: 12px;
    color: #666;
    BORDER: 0;
    padding: 0 0px 0px 15px;
    outline: none;
    vertical-align: middle;
  }
  .search-icon{
    cursor:pointer;
    vertical-align: middle;
    display: inline-block;
    width:45px;
    height:27px;
    background:url("../../../assets/icon/ssj.png") -31px -6px no-repeat;
  }
  }
  }
</style>

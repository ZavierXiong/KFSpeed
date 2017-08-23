<template>
  <div id="crm-connectInfo" >
    <div class="dialog-masks"></div>
    <div class="connectInfo">
      <div class="cnt-head">
        <span class="cnt-title">{{cntTitle}}</span>
        <span class="el-icon-close" @click="cntClose"></span>
      </div>
      <div>
        <ul class="tips-li">
          <li>
            <span>1.根据您选择的第4列的信息进行匹配客户分类或客户状态,否则取默认值;</span>
          </li>
          <li>
            <span>2.客户等级一般对应客户星级3颗星,客户等级重要对应客户星级5颗星;</span>
          </li>
          <li>
            <span>3.其它业务信息将取默认值;</span>
          </li>
          <li>
            <span>4.重复客户判断只受限于后台管理-参数控制;</span>
          </li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="cntClose" style="margin-bottom:10px;">取 消</el-button>
      </span>
    </div>
  </div>
</template>

<script>
  export default{
    name:"cm-more-info",
    data(){
    return{
      value1:null
    }
  },
  props:[
    'cntTitle',
    'hasButton'
  ],
    methods:{
    cntClose:function(){
      this.$emit('cntClose',false)
    },
    cntConfirm:function(){
      this.$emit('cntConfirm')
    }
  }
  }
</script>

<style lang="less">
  .dialog-masks{
    z-index: 2002;
    background:url('/static/img/crm_images/icon/dialog_bg.png');
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    overflow: auto;
    margin: 0;
  }
  .connectInfo {
    position:fixed;
    top:50%;
    left:50%;
    z-index:2003;
    background-color:#fff;
    transform:translate(-50%,-50%);
    box-shadow: 0 1px 3px rgba(0,0,0,.3);
    input{
      margin:0;
    }
    .cnt-head{
      overflow: hidden;
      line-height: 14px;
      font-size:14px;
      background-color: #20A0FF;
      padding: 10px 10px;
      text-align: left;
      color:#fff;
      .el-icon-close{
        float:right;
        cursor:pointer;
        font-size:14px;
      }
    }
    .tips-li{
      padding: 10px 20px;
      text-align: left;
      height: 150px;
      li{
        line-height:24px;
        color:red;
        font-size:14px;
      }
    }
    .dialog-footer{
      margin-bottom:0;
    }
  }

</style>

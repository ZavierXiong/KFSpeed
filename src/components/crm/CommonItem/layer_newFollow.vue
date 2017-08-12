<!--客户详细信息新建联系人-->
<template>
  <div id="crm-connectInfo" >
    <div class="dialog-mask"></div>
    <div class="connectInfo">
      <div class="cnt-head">
        <span class="cnt-title">{{cntTitle}}</span>
        <span class="el-icon-close" @click="cntClose"></span>
      </div>
      <div class="cnt-tab">
        <newFollow></newFollow>
      </div>
      <span slot="footer" class="dialog-footer" v-if="hasButton">
        <el-button type="primary"  @click="cntConfirm">确 定</el-button>
        <el-button  @click="cntClose">取 消</el-button>
      </span>
    </div>
  </div>
</template>

<script>
  import newFollow from "./newFollow.vue"
  export default{
    name:"cm-more-info",
    components:{
      newFollow
    },
    data(){
    return{
      value1:null,
      hasVertify:false,
      hasVertify2:false,
      correct:false,
      correct2:false,
      showT:false,
      value:"",
      value2:"",
      correctTitle:"恭喜，输入正确！！",
      correctTitle2:"恭喜，该邮件地址可用！",
      errorTitle:"2~50个字符之间!",
      errorTitle2:"Email地址格式错误!"
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
    },
    //    2-50个字符之间
    vertify:function(){
      this.hasVertify = true;
      let val = this.value;
      if(val.length<2||val.length>50){
        this.correct = false;
      } else{
        this.correct = true;
      }
    },
//    邮箱验证
    vertify2:function(){
      this.hasVertify2 = true;
      let val = this.value2;
      let re = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
      if(re.test(val)){
        this.correct2 = true;
      } else{
        this.correct2 = false;
      }
    }
  }
  }
</script>

<style lang="less">
  .dialog-mask{
    z-index: 2002;
    background:url('../../../assets/icon/dialog_bg.png');
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
  .cnt-tab{
    padding:10px 20px;
    font-size:12px;
    height:300px;
    overflow: auto;
  td{
    padding-left: 5px;
    line-height: 35px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
  .fold{
    user-select: none;
    cursor:pointer;
    display: inline-block;
    width:12px;
    height:12px;
    background:url("../../../assets/icon/right.png");
  }
  .unfold{
  .fold;
    background:url("../../../assets/icon/wrong.png");
  }
  }
  .td-title{
    background-color: #f2f2f2;
    height: 30px;
    padding-right: 10px;
    text-align: right;
    width:50px;
  }
  .td-title.lm{
    /*text-align: left;*/
  }
  .td-info{
    text-align: left;
  .selectDouble{
    display: inline-block;
    vertical-align: middle;
  }
  .importBox{
    border: 1px solid #ddd;
    height: 22px;
    line-height: 22px;
    width: 180px;
  }
  }
  }
  .clientLi{
    height:200px;
    overflow: auto;
    padding: 10px 20px;
    text-align:left;
    font-size:12px;
    font-weight:normal;
  li{
    line-height: 26px;
  input{
    vertical-align:middle;
  }
  }
  }
  .el-button{
    height:24px;
    margin:10px 5px 10px 0;
    float:right;
    padding:5px;
    font-size:12px;
  }
  }

</style>

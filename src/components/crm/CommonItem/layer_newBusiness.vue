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
        <newBusiness :is-layer="false"></newBusiness>
      </div>
      <span slot="footer" class="dialog-footer" v-if="hasButton">
        <div class="btn-box">
          <el-button type="primary"  @click="cntConfirm">确 定</el-button>
          <el-button  @click="cntClose">取 消</el-button>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
  import newBusiness from "./newBusiness.vue"
  export default{
    name:"cm-more-info",
    components:{
      newBusiness
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
<style lang="less" src="../../../less/common_layer.less"></style>

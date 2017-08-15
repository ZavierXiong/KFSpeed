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
    props:[
      'hasButton'
    ],
    data(){
    return{

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
<style lang="less" src="../../../less/common_layer.less"></style>

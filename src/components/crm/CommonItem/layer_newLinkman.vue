<!--客户详细信息新建联系人-->
<template>
  <div id="crm-connectInfo" >
    <div class="dialog-mask"></div>
    <div class="connectInfo">
      <div class="cnt-head">
        <span class="cnt-title">{{cntTitle}}</span>
        <span class="el-icon-close" @click="cntClose"></span>
      </div>
      <div class="cnt-tab" v-if="newConnect">
        <table width="100%" cellpadding="0" cellspacing="0" >
          <tr v-if="isNewEdite">
            <td class="td-title lm">主联系人</td>
            <td class="td-info">
              <input type="radio" name="one" class="selectDouble"/>是
              <input type="radio" name="one" class="selectDouble"/>否
            </td>
          </tr>
          <tr>
            <td class="td-title st"><span>姓名</span></td>
            <td class="td-info">
              <input type="text" class="importBox"  @blur="vertify()" v-model="connectionTab.name"/>
              <i class="red">*</i>
              <span
                v-show="hasVertify"
                :title="correct?correctTitle:errorTitle"
                :class="correct?'correct_icon':'error_icon'"></span>
            </td>
          </tr>
          <tr>
            <td class="td-title st"><span>邮箱</span></td>
            <td class="td-info">
              <input type="text" class="importBox"  @blur="vertify2()" v-model="connectionTab.email"/>
              <i class="red">*</i>
              <span
                v-show="hasVertify2"
                :title="correct2?correctTitle2:errorTitle2"
                :class="correct2?'correct_icon':'error_icon'"></span>
            </td>
          </tr>
          <tr>
            <td class="td-title st"><span>电话</span></td>
            <td class="td-info">
              <input type="text" class="importBox" v-model="connectionTab.tel"/>
              <i @click="showT = !showT" :class="[showT?'unfold':'fold']"></i>
            </td>
          </tr>
          <tr v-if="showT">
            <td class="td-title st">
              <span>电话1</span>
            </td>
            <td class="td-info">
              <input type="text" class="importBox" v-model="connectionTab.tel"/>
            </td>
          </tr>
          <tr v-if="showT">
            <td class="td-title st">
              <span>电话2</span>
            </td>
            <td class="td-info">
              <input type="text" class="importBox" v-model="connectionTab.tel"/>
            </td>
          </tr>
          <tr>
            <td class="td-title st"><span>手机</span></td>
            <td class="td-info"><input type="text" class="importBox" v-model="connectionTab.phone"/></td>
          </tr>
          <tr>
            <td class="td-title st"><span>职位</span></td>
            <td class="td-info"><input type="text" class="importBox" v-model="connectionTab.job"/></td>
          </tr>
          <tr>
            <td class="td-title st"><span>性别</span></td>
            <td class="td-info">
              <input type="radio" name="sex" class="selectDouble" :checked="connectionTab.sex=='男'"/>男
              <input type="radio" name="sex" class="selectDouble":checked="connectionTab.sex=='女'"/>女
            </td>
          </tr>
          <tr>
            <td class="td-title st"><span>地址</span></td>
            <td class="td-info"><input type="text" class="importBox" v-model="connectionTab.address"/></td>
          </tr>
          <tr>
            <td class="td-title st"><span>网址</span></td>
            <td class="td-info"><input type="text" class="importBox" v-model="connectionTab.url"/></td>
          </tr>
        </table>
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
  export default{
    name:"cm-more-info",
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
    'connectTab',
    'clientList',
    'hasButton',
    'littleTip',
    'tabLists',
    'newConnect',
    'isNewEdite',
    'connectionTab'
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
      let val = this.connectionTab.name;
      if(val.length<2||val.length>50){
        this.correct = false;
      } else{
        this.correct = true;
      }
    },
//    邮箱验证
    vertify2:function(){
      this.hasVertify2 = true;
      let val = this.connectionTab.email;
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

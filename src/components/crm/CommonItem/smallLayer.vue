<template>
  <div id="crm-connectInfo" >
    <div class="dialog-mask"></div>
    <div class="connectInfo">
      <div class="cnt-head">
        <span class="cnt-title">{{cntTitle}}</span>
        <span class="el-icon-close" @click="cntClose"></span>
      </div>
      <div class="cnt-tab" v-if="newConnect">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="td-title lm">主联系人</td>
            <td  class="td-info">
              <input type="radio" name="one" class="selectDouble"/>是
              <input type="radio" name="one" class="selectDouble"/>否
            </td>
          </tr>
          <tr v-for="tab in newConnect">
            <td class="td-title st">{{tab.title}}</td>
            <td class="td-info"><input type="text" v-model="tab.info" class="importBox"/></td>
          </tr>
        </table>
      </div>
      <div class="cnt-tab" v-if="connectTab">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr v-for="info in connectTab" >
            <td class="td-title">{{info.title}}</td>
            <td class="td-info">{{info.info}}</td>
          </tr>
        </table>
      </div>
      <div v-if="clientList" class="clientLi" >
        <ul>
          <li v-for="li in clientList" id="clientLi">
            <input type="radio" name="clientName"  :checked="li.checked"/>{{li.name}}
          </li>
        </ul>
      </div>
      <div v-for="tip in littleTip" class="littleTip">
        {{tip.text1}}
        <span>{{tip.num1}}</span>
        {{tip.text2}}
        <span>{{tip.num2}}</span>
        {{tip.text3}}
        <span class="blue">{{tip.num3}}</span>
        {{tip.text4}}
      </div>
      <div v-if="tabLists" class="tab-content">
        <table>
          <tr>
            <td>客户星级</td>
            <td>
              <div class="block">
                <el-rate v-model="value1"></el-rate>
              </div>
            </td>
          </tr>
          <tr v-for="tab in tabLists">
            <td class="tabTitle">{{tab.title}}</td>
            <td class="tabSelect">
              <select name="" id="">
                <option v-for="option in tab.optionLists" value="">{{option.text}}</option>
              </select>
            </td>
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
        value1:null
      }
    },
    props:[
      'cntTitle',
      'connectTab',
      'clientList',
      'hasButton',
      'littleTip',
      'tabLists',
      'newConnect'
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
      }
      .td-title{
        background-color: #f2f2f2;
        height: 30px;
        padding-right: 10px;
        text-align: right;
        width:50px;
      }
      .td-title.lm{
        text-align: left;
      }
      .td-title.st{
        letter-spacing: 13px;
        padding-left: 14px;
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
    .dialog-footer{
      .btn-box {
        float:right;
        .el-button{
          height:24px;
          margin:10px 5px 10px 0;
          /*float:right;*/
          padding:5px;
          font-size:12px;
        }
      }
    }
  }

</style>

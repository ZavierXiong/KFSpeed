<template>
  <div id="crm-connectInfo" class="crm-connectInfo">
    <div class="dialog-masks"></div>
    <div class="connectInfo">
      <div class="cnt-head">
        <span class="cnt-title">{{cntTitle}}</span>
        <span class="el-icon-close" @click="cntClose"></span>
      </div>
      <div class="cnt-tab" v-if="newConnect">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="td-title lm">主联系人</td>
            <td class="td-info">
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
          <tr v-for="info in connectTab">
            <td class="td-title">{{info.title}}</td>
            <td class="td-info">{{info.info}}</td>
          </tr>
        </table>
      </div>
      <div class="cnt-tab" v-if="linkList">
        <table width="100%" cellpadding="0" cellspacing="0" v-for="td in linkList">
          <tr>
            <td class="td-title">姓名</td>
            <td class="td-info">{{td.name}}</td>
          </tr>
          <tr>
            <td class="td-title">职位</td>
            <td class="td-info">{{td.job}}</td>
          </tr>
          <tr>
            <td class="td-title">邮箱</td>
            <td class="td-info">{{td.email}}</td>
          </tr>
          <tr>
            <td class="td-title">电话</td>
            <td class="td-info">{{td.phone}}</td>
          </tr>
          <tr>
            <td class="td-title">手机</td>
            <td class="td-info">{{td.tel}}</td>
          </tr>
          <tr>
            <td class="td-title">性别</td>
            <td class="td-info">{{td.sex}}</td>
          </tr>
          <tr>
            <td class="td-title">地址</td>
            <td class="td-info">{{td.address}}</td>
          </tr>
          <tr>
            <td class="td-title">网址</td>
            <td class="td-info">{{td.url}}</td>
          </tr>
        </table>
      </div>
      <div v-if="clientList" class="clientLi">
        <ul>
          <li v-for="li in clientList" id="clientLi">
            <input type="checkbox" v-model="li.checked" v-if="!isCourse" class="select-btn"/>
            <input type="radio" name="course" v-if="isCourse"/>
            <label for="" class="lebel">{{li.name}}</label>
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
          <tr v-if="hasRating">
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
              <select name="" class="selected" v-model="tab.selected">
                <option v-for="option in tab.optionLists" :value="option.value">{{option.text}}</option>
              </select>
            </td>
          </tr>
        </table>
      </div>
      <div class="share-layer-box" v-if="shareInfo">
        <table class="share-layer" width="100%" cellpadding="0" cellspacing="0" border="0">
          <thead>
          <tr>
            <th>序号</th>
            <th>共享人姓名</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="td in shareInfo">
            <td>
              <!--<span>{{td.num}}</span>-->
              <span>1</span>
            </td>
            <td>
              <span>{{td.name}}</span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <span slot="footer" class="dialog-footer" v-if="hasButton">
        <div class="btn-box">
          <el-button type="primary" @click="cntConfirm">确 定</el-button>
          <el-button @click="cntClose">取 消</el-button>
        </div>
      </span>
    </div>
  </div>
</template>

<script>
  export default{
    name: "cm-more-info",
    data(){
      return {
        value1: null
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
      'hasRating',
      'selected',
      'isCourse',
      'hasShared',
      'shareInfo',
      'linkList'
    ],
    methods:{
      cntClose:function () {
          this.$emit('cntClose', false)
      },
      cntConfirm:function () {
        this.$emit('cntConfirm')
      }
    }
  }
</script>
<style lang="less">
  .dialog-masks {
    z-index: 2002;
    background: url('/static/img/crm_images/icon/dialog_bg.png');
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    position: fixed;
    overflow: auto;
    margin: 0;
  }

  .crm-connectInfo {

    .connectInfo {
      position: fixed;
      top: 50%;
      left: 50%;
      z-index: 2003;
      background-color: #fff;
      transform: translate(-50%, -50%);
      box-shadow: 0 1px 3px rgba(0, 0, 0, .3);

      input {
        margin: 0;
      }

      .cnt-head {
        overflow: hidden;
        line-height: 14px;
        font-size: 14px;
        background-color: #20A0FF;
        padding: 10px 10px;
        text-align: left;
        color: #fff;

        .el-icon-close {
          float: right;
          cursor: pointer;
          font-size: 14px;
        }

      }
    .cnt-tab {
      padding: 10px 20px;
      font-size: 12px;
      height: 300px;
      overflow: auto;

      td {
        padding-left: 5px;
        line-height: 35px;
        border-right: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
      }

      .td-title {
        background-color: #f2f2f2;
        height: 30px;
        padding-right: 10px;
        text-align: right;
        width: 50px;
      }

      .td-title.lm {
        text-align: left;
      }

      .td-info {
        max-width:185px;
        word-wrap: break-word;
        text-align: left;

        .selectDouble {
          display: inline-block;
          vertical-align: middle;
        }

        .importBox {
          border: 1px solid #ddd;
          height: 22px;
          line-height: 22px;
          width: 180px;
        }

      }
    }
      .clientLi {
        height: 200px;
        overflow: auto;
        padding: 10px 20px;
        text-align: left;
        font-size: 12px;
        font-weight: normal;

        li {
          line-height: 26px;

          input {
            vertical-align: middle;
          }

        }
      }
      .tabSelect{
        .selected{
          padding:2px 0;
          width:180px;
        }
      }
      .dialog-footer {

        .btn-box {
          float: right;

          .el-button {
            height: 24px;
            margin: 10px 5px 10px 0;
            padding: 5px;
            font-size: 12px;
          }

        }
      }
    }
    .share-layer-box{
      padding:10px;
      overflow:auto;
      height:250px;
      .share-layer{
        td,th{
          font-weight: normal;
          width:60px;
          height:30px;
          border-bottom:1px solid #ddd;
          text-align: center;
        }
      }
    }
  }

</style>

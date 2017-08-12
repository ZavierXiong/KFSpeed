<template>
  <div id="systemImport" class="systemImport">
    <div>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
        <tr>
          <td colspan="4" class="crm-oItab-title">
            <b>
              <span>其他系统导入</span>
            </b>
            <span class="red">(普通导入不受日限制)</span>
          </td>
        </tr>
        <tr>
          <td width="100" class="crm-oItab-left">
            <span>选择导入文件</span>
          </td>
          <td colspan="3" class="crm-oItab-right">
            <el-upload
              class="upload-demo"
              action="https://jsonplaceholder.typicode.com/posts/">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td width="100" class="crm-oItab-left">
            <span>选择系统来源</span>
          </td>
          <td colspan="3" class="crm-oItab-right">
            <input type="radio" class="crm-input-radio" @click="clickShow"/>富通
          </td>
        </tr>
        <tr v-show="showInfos">
          <td width="100" class="crm-oItab-left">
            <span>选择第4列的信息</span>
          </td>
          <td colspan="3" class="crm-oItab-right">
            <select name="" id="">
              <option value="1">客户分类</option>
              <option value="2">客户状态</option>
            </select>
          </td>
        </tr>
        <tr>
          <td width="100" class="crm-oItab-left">支持xls|xlsx|csv</td>
          <td colspan="3" class="crm-oItab-right">
            <a href="#" class="crm-system-example"><span>富通系统样例</span></a>
          </td>
        </tr>
        </tbody>
      </table>
      <div class="crm-cu-import">
        <h4>
          <span>请查看系统对应的导入注意事项，以免导致导入失败!</span>
        </h4>
        <ul class="crm-cu-p">
          <li>
            <!--<el-button type="text" @click="open4">1、富通系统</el-button>-->
            <a title="点击查看注意事项" class="tip-btn" @click="showNormal = true">1、富通系统</a>
          </li>
        </ul>
      </div>
    </div>
    <layerNormal
      class="normal-tips"
      :cnt-title="title"
      @cntClose="showNormal = false"
      v-if="showNormal"></layerNormal>
  </div>
</template>
<script>
import layerNormal from "./createClient_systemImp_layer_normalTip.vue"
export default ({
  name:'systemImport',
  components:{
    layerNormal
  },
  data(){
    return{
      showInfos:false,
      showNormal: false,
      title:"富通系统导入说明事项"
    }
  },
  methods:{
    clickShow:function(){
      this.showInfos = true;
    }
  }
})
</script>
<style lang="less">
  /*弹框组件样式*/
    /**/
    #systemImport{
      /*display: none;*/
      padding-top: 10px;
      padding-left: 20px;
    }
    .crm-oItab-title{
      padding-left:10px;
    }
    .crm-input-radio{
      outline: none;
      margin: 0;
      font-size: 12px;
      vertical-align: middle;
    }
    .crm-cu-import{
      text-align: left;
      border-top: 1px solid #ddd;
      padding-top: 10px;
      padding-left: 20px;
      margin-top: 30px;
    }
    .createTab .crm-cu-import h4 span{
      font-size:18px;
    }
    .createTab .crm-cu-p li a{
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      color:blue;
      cursor:pointer;
    }
    .crm-system-example{
      color:#005EAC;
      text-decoration: none;
    }
    #ordinaryImport{
      /*display: none;*/
      padding-top: 10px;
      padding-left: 20px;
    }
    .crm-oItab-title{
      border-bottom:1px solid #ddd;
      text-align: left;
      height:35px;
      line-height: 35px;;
    }
    .crm-oItab-left{
      text-align: right;
      padding:0 10px 0 5px;
      height:35px;
      line-height: 35px;
    }
    .crm-oItab-right{
    .crm-oItab-left;
      text-align:left;
    a{
      color: #005EAC;
      text-decoration: none;
    }
    }
    .crm-select{
      border: 1px solid #ddd;
      height: 22px;
      line-height: 22px;
      width: 180px;
    }
    /*富通系统弹框样式*/
    .normal-tips{
      .connectInfo{
        width:500px;
      }
    }
  /*}*/
</style>

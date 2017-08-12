<template>
  <div id="newFollow" class="newFollow">
    <div class="dialog-mask" v-if="test"></div>
    <div class="alertContent">
      <el-dialog title="添加新业务" :visible.sync="test" size="tiny" class='yourName'>
        <!--此处添加你的弹框内容-->
        <div class="crm-create-box">
          <div class="ct-con-box">
            <div class="createTab-title">
              <ul>
                <li v-for="(item,$index) in lists" @click="selectTitle(item,$index)" :class="[titleNum == $index?'select-active':'unselect-active']">
                  {{item.text}}
                </li>
              </ul>
            </div>
          </div>
          <div class="crm-alert-tab">
            <component :is="currentTab" keep-alive></component>
          </div>
        </div>
        <!--底部确认取消按钮-->
			<span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="closed">确 定</el-button>
        <el-button @click="closed">取 消</el-button>
      </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import newBusiness from './../CommonItem/newBusiness.vue'
import newOrders from './../CommonItem/newOrders.vue'
import importRecords from './../createClient/createClient_importRecords.vue'
import newFollow from './../CommonItem/newFollow.vue'
export default ({
  name:"newFollow",
  data(){
    return{
      test:true,
      currentTab:'tab1',
      titleNum:0,
      lists:[
        {
          text:"新建跟进"
        },{
          text:"新建商机"
        }, {
          text:"新建订单"
        }
      ]
    }
  },
  components:{
    tab1:newFollow,
    tab2:newBusiness,
    tab3:newOrders
  },
  methods:{
    selectTitle:function(i,v){
      this.titleNum = v;
      this.currentTab = 'tab'+(v+1)
    },
    closed:function(){
      this.$emit('close')
    }
  }
})
</script>
<style lang="less">
  .v-modal{
    display: none;
  }
  .newFollow{
    .connectInfo{
      width:250px;
    }
    .dialog-mask{
      z-index: 2001;
      background:url('../../../assets/icon/dialog_bg.png');
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      position: fixed;
      overflow: auto;
      margin: 0;
    }
    .el-dialog{
      position:fixed;
    }
    .el-dialog__wrapper.yourName{
      position:static!important;
    }
    .el-dialog.el-dialog--tiny{
      z-index:2002;
      width:700px;
    }
    .yourName .el-dialog__header {
      line-height: 0;
      background-color: #20A0FF;
      padding: 20px 20px;
      text-align: left;
    }
    /*头部样式*/
    .yourName .el-dialog__header {
      line-height: 0;
      background-color: #20A0FF;
      padding: 20px 20px;
      text-align: left;
    }

    /*字体颜色*/
    .yourName .el-dialog__title,
    .yourName .el-dialog__headerbtn .el-dialog__close,
    .yourName .el-dialog__headerbtn .el-dialog__close:hover {
      color: #fff;
    }
    .el-dialog__headerbtn{
      display: none;
    }

    .createTab-title{
      overflow:hidden;
      margin-bottom:10px;
    li{
      line-height:20px;
      cursor:pointer;
      float:left;
      padding:3px 10px;
      margin-right:3px;
    &:hover{
     .select-active
     }
    }
    .select-active{
      background-color:#0480be;
      color:#fff;
    }
    .unselect-active{
      background-color:#ddd;
      color:#fff;
    }
    }
    .crm-create-box{
      padding:10px 20px;
      overflow-y:auto;
      /*height:460px;*/
    }
    .el-dialog__body{
      height:300px;
      padding:0;
      font-size:12px;
    }
  }

</style>

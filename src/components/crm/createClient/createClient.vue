<template>
  <div id="createClient">
    <div class="dialog-masks"></div>
    <div class="createTab">
      <div class="cnt-head">
        <span class="cnt-title">添加新客户</span>
        <span class="el-icon-close" @click="close"></span>
      </div>
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
      <div slot="footer" class="dialog-footer" >
        <el-button type="primary"  @click="close">确 定</el-button>
        <el-button  @click="close">取 消</el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import ordinaryImport from './createClient_ordinaryImport.vue'
  import systemImport from './createClient_systemImport.vue'
  import importRecords from './createClient_importRecords.vue'
  import newClientByhand from './createClient_newClientByhand.vue'
  export default ({
    name:'createClient',
    data(){
    return {
      currentTab:'tab1',
      titleNum:0,
      lists:[
        {
          text:"手工创建"
        },{
          text:"普通导入"
        }, {
          text:"系统导入"
        }, {
          text:"导入记录"
        }
      ]
    }
  },
  components:{
    tab1:newClientByhand,
    tab2:ordinaryImport,
    tab3:systemImport,
    tab4:importRecords
  },
  methods:{
    selectTitle:function(i,v){
      this.titleNum = v;
      this.currentTab = 'tab'+(v+1)
    },
    close:function(){
      this.$emit('close',false);
    }
  }
})
</script>
<style  rel="stylesheet/scss" lang="less">
  *{
    margin:0;
    padding:0;
  }
  .red{
    color:red;
  }
  #createClient{
    color:#444;
  }
  .dialog-masks{
    /*/!*display: none;*!/*/
    width: 100%;
    height: 100%;
    z-index: 619;
    background:url('/static/img/crm_images/icon/dialog_bg.png');
    margin: 0px;
    padding: 0px;
    position:fixed;
    top:0;
    left:0;
  }
  .cnt-head{
    margin-bottom:10px;
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
    .ct-con-box{
      padding:5px 5px 5px 0px;
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
        background-color:#20a0ff;
        color:#fff;
      }
      .unselect-active{
        background-color:#ddd;
        color:#fff;
      }
    }
    .crm-create-box{
      padding:0px 20px 10px;
      overflow-y:auto;
      height:460px;
    }
    .createTab{
      background-color:#fff;
      border:1px solid #20A0FF;
      border-radius:3px;
      font-size:12px;
      width:870px;
      position:absolute;
      left:0;
      right:0;
      top:50%;
      transform:translateY(-50%);
      margin:0 auto;
      z-index:2002;
      .createTab-content{
        /*display: none;*/
      .cu_tbcs{
        td{
          height:36px;
          line-height: 36px;
          text-align:left;
          padding-left:10px;
          .open-w{
            user-select: none;
            color:rgb(50, 174, 229);
            cursor:pointer;
          }
          input{
            .custx
          }
          .custx{
            border: 1px solid #ddd;
            height: 22px;
            line-height: 22px;
            width: 180px;
          }
        }
        .cu-empty{
          height:5px;
          line-height: 35px;
          border-top:1px solid #ddd;
        }
        .cu_tbg{
          text-align:right;
          padding-right:10px;
        }
      }
    }
    .dialog-footer{
      float:right;
      margin-right:20px;
      margin-bottom:10px;
    }
  }
  .dialog-button{
    text-align: right;
    margin-top: 10px;
    padding-bottom: 10px;
    font-size: 12px;
    padding-right: 6px;
    .dialog-ok{
      border: 1px solid #33621D;
      background: url("/static/img/crm_images/images/success.gif") top #88B674;
      height: 24px;
      line-height: 22px;
      color: #fff;
      cursor: pointer;
      padding: 0 5px;
      margin-right: 3px;
      outline: none;
    }
    .dialog-cancel{
      border: 1px solid #999;
      height: 24px;
      line-height: 22px;
      color: #666;
      cursor: pointer;
      padding: 0 5px;
      margin: 0px;
      outline: none;
    }
  }
</style>

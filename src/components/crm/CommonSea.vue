<template>
  <div id="crm-content">
    <commonHeader :my-title="myTitle"></commonHeader>
    <div class="crm-content-opr">
      <div class="crm-content-opr-tip">
        <span>操作：</span>
        <span class="opr-btn" @click="checkDelete" >删除</span>
        <span class="opr-btn" @click="checkTransfer" >转移</span>
        <span class="opr-btn" @click="getClient" >领取</span>
        <select name="" id="">
          <option value="" v-for="option in commonClients">{{option.text}}</option>
        </select>
      </div>
    </div>
    <div>
      <table width="100%" cellpadding="0" cellspacing="0" border="0" class="crm-client-infoli">
        <thead>
        <tr>
          <th height="30" class="th" width="16"></th>
          <th height="30" class="th">
            <input class="check" type="checkbox" @click="selectAll"/>
          </th>
          <th height="30" class="th">
            <div class="firm-info">企业信息</div>
          </th>
          <th height="30" class="th">
            <div class="lastTime">最后联系时间</div>
          </th>
          <th width="15%" height="30" class="th">
            <div>客户分类</div>
          </th>
          <th width="15%" height="30" class="th">
            <div>客户状态</div>
          </th>
          <th width="13%" height="30" class="th">
            <select name="" id="" class="scr">
              <option value="">所有</option>
            </select>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(th,index) in infoLists">
          <td class="td" height="50"></td>
          <td class="td" height="50">
            <input class="check" type="checkbox" :value="index" v-model="selectArr"/>
          </td>
          <td class="td" height="50" >
            <div  class="firm-info" >
              <i class="name-bg"></i>
              <div class="info-p">
                <p class="infoName" @click="opens">{{th.name}}</p>
                <br>
                <p class="email">{{th.email}}</p>
              </div>
            </div>
          </td>
          <td class="td" height="50">{{th.date}}</td>
          <td class="td" height="50" width="15%">{{th.type}}</td>
          <td class="td" height="50" width="15%">{{th.state}}</td>
          <td class="td" height="50" width="13%">{{th.client}}</td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--<commonTable :info-lists="infoLists" @opens="opens" @selectAll="selectAll" :select-arr="selectArr"></commonTable>-->
    <!--点击企业信息名出现弹框-->
    <moreInfo v-if="test" @closeInfo="close"></moreInfo>
    <!--点击转移出现弹框-->
    <small-layer
      class="smallLayer"
      v-if="showC"
      @cntClose="showC = false"
      @cntConfirm="cntConfirm"
      :client-list="clientList"
      :my-index="clientList.value"
      :connect-tab="false"
      cnt-title="转移公海客户"
      :has-button="true"></small-layer>
    <small-layer
      class="getLayer"
      v-if="showG"
      @cntClose="showG = false"
      @cntConfirm="showG = false"
      :client-list="false"
      :connect-tab="false"
      cnt-title="提示"
      :has-button="true"
      :little-tip="tipData"></small-layer>
  </div>
</template>
<script>
import moreInfo from "./CommonItem/crmMoreInfo.vue"
import smallLayer from "./CommonItem/smallLayer.vue"
import commonHeader from "./CommonItem/searchBar.vue"
export default ({
  name:"crm-content",
  data(){
    return{
      test:false,
      showC:false,
      showG:false,
      selectArr:[],
      myTitle:[
        {name:"公海客户"}
      ],
      commonClients:[
        {
          text:"全部公海用户"
        },
        {
          text:"已成交公海用户"
        },
        {
          text:"未成交公海用户"
        }
      ],
      infoLists:[
        {
          name:"1231231",
          email:"sales@metalprices.com",
          date:"2016-11-25",
          type:"默认分类",
          state:"收集状态",
          client:"Sutech Power"
        },
        {
          name:"Nhari,Rumbi",
          email:"sales@metalprices.com",
          date:"2016-11-25",
          type:"默认分类",
          state:"收集状态",
          client:"Sutech Power"
        },
        {
          name:"Nhari,Rumbi",
          email:"sales@metalprices.com",
          date:"2016-11-25",
          type:"默认分类",
          state:"收集状态",
          client:"Sutech Power"
        }
      ],
      clientList:[
        {
          name:"权威",
          checked:true
        }, {
          name:"权威1",
          checked:false
        }, {
          name:"权威2",
          checked:false
        }, {
          name:"权威3",
          checked:false
        }, {
          name:"权威4",
          checked:false
        }, {
          name:"权威",
          checked:false
        }, {
          name:"权威",
          checked:false
        }, {
          name:"权威",
          checked:false
        }, {
          name:"权威",
          checked:false
        }, {
          name:"权威",
          checked:false
        }, {
          name:"权威",
          checked:false
        }, {
          name:"权威",
          checked:false
        }, {
          name:"权威",
          checked:false
        }
      ],
      tipData:[{
        text1:"月剩余领取公海客户数量",
        text2:" , 日剩余领取公海客户数量",
        text3:" , 确定要领取这",
        text4:"个客户吗？",
        num1:" 1000 ",
        num2:" 100 ",
        num3:" 1 "
      }]
    }
  },
  components:{
    moreInfo,
    'small-layer':smallLayer,
    commonHeader
//    commonTable
  },
  methods:{

//    点击企业的名称弹出框
    opens:function(){
      this.test = true;
      console.log(this.test)
    },
//    关闭弹窗
    close:function(msg){
      this.test = msg;
    },
    //删除列表信息操作
    checkDelete:function(){
      let arr = [];
      var len = this.infoLists.length;
      for (var i = 0; i < len; i++) {
        if (this.selectArr.indexOf(i)>=0) {
        }else{
          arr.push(this.infoLists[i])
        }
      }
      if($('.check').is(':checked')){
        this.$confirm('此操作将删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
          }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });

            this.infoLists = arr;
            this.selectArr = []
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      }else{
        alert('请选择客户列表！')
      }
    },

//全选
    selectAll:function(){
      var _this = this;
      if (!event.currentTarget.checked) {
        //反选
        this.selectArr = [];
      } else { //实现全选
        _this.selectArr = [];
        _this.infoLists.forEach(function(item, i) {
          _this.selectArr.push(i);
        });
      }
    },

//转移功能
    checkTransfer:function(){
      var len = this.infoLists.length;
      for (var i = 0; i < len; i++) {
        if (this.selectArr.indexOf(i)>=0) {
          this.showC = true;
        }else{
        }
      }
    },

//确定按钮
    cntConfirm:function(){
      let client = this.clientList;
      let info = this.infoLists;
      let that = this;
      for(var i=0;i<client.length;i++){
        let index = client[i];
            if(index.checked){
              this.showC = false;
            }
      }
    },

//领取客户
    getClient:function(){
      var len = this.infoLists.length;
      for (var i = 0; i < len; i++) {
        if (this.selectArr.indexOf(i)>=0) {
          this.showG = true;
        }else{
        }
      }
    },
    restore:function(){
      this.$emit('restore')
    }
  }
})
</script>
<style lang="less" src="../../less/crm_less/crm_content.less"></style>

<template>
  <div id="importRecords">
    <div>
      <div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tbody>
            <tr>
              <td class="crm-records-title">
                <b><span>导入记录</span></b>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" class="crm-records-tab">
          <thead>
            <tr>
              <th width="5%" height="35"></th>
              <th width="5%" height="35">上传类型</th>
              <th width="5%" height="35">导入类型</th>
              <th width="5%" height="35">状态</th>
              <th width="5%" height="35">查看结果</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="tab in tablists">
              <td width="5%" height="35"></td>
              <td width="30%" height="35">{{tab.date}}</td>
              <td width="20%" height="35">{{tab.type}}</td>
              <td width="20%" height="35">{{tab.status}}</td>
              <td width="20%" height="35" @click="openAlert()"><a href="javascript:void(0)">{{tab.result}}</a></td>
            </tr>
          </tbody>
        </table>
        <div>
          <div class="crm-records-tj_z">合计:<span>3</span>条</div>
          <div class="crm-records-tj_z">列表显示条数:
            <span>
              <select name="" id="">
                <option value="">10</option>
              </select>
            </span>
          </div>
          <div class="crm-records-tj_y">
            <ul>
              <li>首页</li>
              <li>上一页</li>
              <li>下一页</li>
              <li>末页</li>
              <li>
                第
                <span>1</span>
                /
                <span>1</span>
              </li>
              <li>
                <select name="" id="">
                  <option value="">1</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!--<transition name="bounce">-->
      <common-alert
        v-show="alertShow"
        @closeAlert = 'closeAlert'></common-alert>
    <!--</transition>-->
  </div>
</template>
<script>
  import commonAlert from "./createClient_imptRecord_look.vue"
export default({
  name:'importRecords',
  data(){
    return{
      alertShow:false,
      tablists:[
        {
          date:"2017-07-20 18:04:44",
          type:"普通导入",
          status:"已处理",
          result:"查看"
        },
        {
          date:"2017-07-20 18:04:44",
          type:"普通导入",
          status:"已处理",
          result:"查看"
        },
        {
          date:"2017-07-20 18:04:44",
          type:"普通导入",
          status:"已处理",
          result:"查看"
        }
      ]
    }
  },
  components:{
    commonAlert
  },
  methods:{
    openAlert:function(){
      this.alertShow = true
    },
    closeAlert:function(m){
      this.alertShow = m
    }
  }
})
</script>
<style rel="stylesheet/scss" lang="less">
  /*.bounce-enter-active{*/
    /*animation:bounce-in .5s;*/
  /*}*/
  /*.bounce-leave-active{*/
    /*transition:bounce-in .5s reverse;*/
  /*}*/
  /*@keyframes bounce-in {*/
    /*0%{*/
      /*left:0;*/
      /*height:0;*/
    /*}*/
    /*100%{*/
      /*top:50%;*/
      /*transform:translateY(-50%);*/
      /*height:100%;*/
    /*}*/
  /*}*/
  select,input{
    outline:none;
  }
  #importRecords{
    padding-top: 10px;
    padding-left: 20px;
  }
  .crm-records-title{
    text-align: left;
    padding-left: 10px;
    height:35px;
    line-height: 35px;
  }
  .crm-records-tab{
    margin-bottom:10px;
    th,td{
      text-align: left;
      font-weight: normal;
    }
    th{
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      background: #f5f5f5;
      color: #999;
    }
    td{
      padding:5px 0;
      border-bottom: 1px solid #ddd;
      a{
        color: #005EAC;
        text-decoration: none;
      }
    }
  }
  .crm-records-tj_z{
    float: left;
    margin-left: 20px;
  }
  .crm-records-tj_y{
    float: right;
    margin-right: 20px;
    ul{
      li{
        float: left;
        margin-left: 10px;
        color: #1965b6;
        cursor: pointer;
      }
    }
  }
</style>

<template>
  <div>
    <table class="crm-tab3" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td colspan="4" class="cu-t">新建订单</td>
      </tr>
      <tr>
        <td class="cu_tbg ">
          <span>订单类型</span>
        </td>
        <td>
          <select name="" id="">
            <option value="">正式订单</option>
            <option value="">样品订单</option>
          </select>
        </td>
        <td class="cu_tbg "><span>成交产品</span></td>
        <td><span class="pSelect" @click="showC = true">请选择</span></td>
      </tr>
      <tr>
        <td class="cu_tbg ">
          <span>成交时间</span>
        </td>
        <td>
          <el-date-picker
            v-model="value1"
            type="date"
            >
          </el-date-picker>
        </td>
        <td class="cu_tbg ">
          <span>成交金额</span>
        </td>
        <td>
          <input type="text" @blur="vertify()" v-model="value"/>
          <span
            v-show="hasVertify"
            :title="correct?correctTitle:errorTitle"
            :class="correct?'correct_icon':'error_icon'"></span>
        </td>
      </tr>
      <tr>
        <td class="cu_tbg ">
          <span>成交币种</span>
        </td>
        <td>
          <select name="" id="">
            <option value="">
              美元
            </option>
          </select>
        </td>
        <td class="cu_tbg "><span>购买数量</span></td>
        <td>
          <input type="text" @blur="vertify2()" v-model="value2"/>
          <span
            v-show="hasVertify2"
            :title="correct2?correctTitle2:errorTitle2"
            :class="correct2?'correct_icon':'error_icon'"></span>
        </td>
      </tr>
      <tr>
        <td class="cu_tbg ">
          <span>备注信息</span>
        </td>
        <td colspan="3">
          <textarea name="" id="" cols="30" rows="10" class="f-content"></textarea>
        </td>
      </tr>
    </table>
    <small-layer
      class="smallLayer"
      v-if="showC"
      @cntClose="showC = false"
      @cntConfirm="cntConfirm"
      :client-list="clientList"
      :connect-tab="false"
      cnt-title="转移公海客户"
      :has-button="true"></small-layer>
  </div>
</template>
<script>
  import smallLayer from "./smallLayer.vue"
  export default({
    name:"newFollow",
    data(){
    return{
      showC:false,
      errorTitle:"恭喜，该客户名称可用！",
      correctTitle:"恭喜，输入正确！！",
      hasVertify:false,
      correct:false,
      errorTitle2:"恭喜，该客户名称可用！",
      correctTitle2:"恭喜，输入正确！！",
      hasVertify2:false,
      correct2:false,
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
          picker.$emit('pick', new Date());
        }
        }]
      },
      value1: '',
      value2: '',
      clientList:[
        {
          name:"权威",
          checked:true
        }, {
          name:"权威1",
          checked:false
        }
      ]
    }
  },
  components:{
    'small-layer':smallLayer
  },
  methods:{
    vertify:function(){
      this.hasVertify = true;
      let val = this.value;
      if(isNaN(val)||isNaN(parseInt(val))){
        this.correct = false;
      } else{
        this.correct = true;
      }
    },
    vertify2:function(){
      this.hasVertify2 = true;
      let val = this.value2;
      if(isNaN(val)||isNaN(parseInt(val))){
        this.correct2 = false;
      } else{
        this.correct2 = true;
      }
    },
    cntConfirm:function(){
      this.showC = false;
    }
  }
  })
</script>
<style lang="less">
  .crm-tab3{
    .error_icon{
      vertical-align: middle;
      display: inline-block;
      width:22px;
      height:22px;
      background:url("../../../assets/icon/onError.gif") no-repeat;
    }
    .correct_icon{
    .error_icon;
      background:url("../../../assets/icon/onCorrect.gif") no-repeat;
    }
  td{
    font-size:12px;
    text-align: left;
    line-height:35px;
  input{
    vertical-align: middle;
    margin:0;
  }
  select{
    width:140px;
  }
  input{
    height:22px;
    font-size: 12px;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border:1px solid #ddd;
  }
  }
  .cu-t{
    border-bottom: 1px solid #ddd;
  }
  .usz{
    text-align: right;
    width: 60px;
    height: 28px;
    padding-right: 10px;
  }
  .rsp{
    margin-left:5px;
  }
  .remind{
    margin:0 10px;
  }
  .f-content{
    width: 360px;
    max-width: 360px;
    max-height: 200px;
    font-size: 12px;
    font-family: "Microsoft yahei";
    padding: 5px 5px;
    overflow: auto;
    border: 1px solid #e0e0e0;
    cursor: auto;
    margin: 5px 0;
    height:44px;
  }
  .cu_tbg{
    height: 30px;
    padding-right: 10px;
    text-align: right;
  }
  .pSelect{
    cursor:pointer;
    color:blue;
  }
  }
</style>

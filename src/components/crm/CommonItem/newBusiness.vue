<template>
  <div>
    <table class="crm-tab2" width="100%" cellpadding="0" cellspacing="0">
      <tr v-if="isLayer">
        <td colspan="4" class="cu-t">新建商机</td>
      </tr>
      <tr>
        <td class="cu_tbg ">
          <span>机会来源</span>
        </td>
        <td>
          <select name="" id="">
            <option value="">易外销搜索客户</option>
            <option value="">公司网站</option>
            <option value="">B2B平台</option>
            <option value="">展会获取</option>
          </select>
        </td>
        <td class="cu_tbg ">
          <span>机会可能性</span>
        </td>
        <td>
          <select name="" id="">
            <option value="">一星</option>
            <option value="">二星</option>
            <option value="">三星</option>
            <option value="">四星</option>
            <option value="">五星</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="cu_tbg ">
          <span>与成交时间</span>
        </td>
        <td>
          <el-date-picker
            v-model="dateValue"
            type="date"
            >
          </el-date-picker>
        </td>
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
      </tr>
      <tr>
        <td class="cu_tbg ">
          <span>预成交金额</span>
        </td>
        <td>
          <input type="text" @blur="vertify()" v-model="value1"/>
          <span
            v-show="hasVertify"
            :title="correct?correctTitle:errorTitle"
            :class="correct?'correct_icon':'error_icon'"></span>
        </td>
        <td class="cu_tbg ">
          <span>当前状态</span>
        </td>
        <td>
          <select name="" id="">
            <option value="">进行中</option>
            <option value="">完成</option>
            <option value="">挂起</option>
            <option value="">放弃</option>
          </select>
        </td>
      </tr>
      <tr>
        <td class="cu_tbg "><span>意向产品</span></td>
        <td><span @click="selectProduct" class="pSelect">{{productNum==0?'请选择':'选择了'+productNum+'个产品'}}</span></td>
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
    props:[
      'isLayer'
    ],
    data(){
    return{
      arr:[],
      productNum:0,
      showC:false,
      errorTitle:"恭喜，该客户名称可用！",
      correctTitle:"恭喜，输入正确！！",
      hasVertify:false,
      correct:false,
      value1: '',
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
          picker.$emit('pick', new Date());
         }
        }]
      },
      dateValue:'',
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
      let val = this.value1;
      if(isNaN(val)||isNaN(parseInt(val))){
        this.correct = false;
      } else{
        this.correct = true;
      }
    },
    cntConfirm(){
      let cL=this.clientList;
      let arr = this.arr;
      for(var i=0;i<cL.length;i++){
        if(cL[i].checked == true&& arr.indexOf(i)==-1){
          arr.push(i);
        }else if(cL[i].checked == false){
          arr.splice(i)
        }
      }
      this.productNum = arr.length;
      this.showC = false;
    },
    selectProduct(){
      let cL=this.clientList;
      let arr = this.arr;
      for(var i=0;i<cL.length;i++){
        cL[i].checked = false;
        for(var j=0;j<arr.length;j++){
          cL[arr[j]].checked=true;
        }
      }
      this.showC = true;
    }
  }
  })
</script>
<style lang="less">
  .crm-tab2{
    .error_icon{
      vertical-align: middle;
      display: inline-block;
      width:18px;
      height:18px;
      background:url("/static/img/crm_images/icon/onError.gif") no-repeat;
    }
    .correct_icon{
    .error_icon;
      background:url("/static/img/crm_images/icon/onCorrect.gif") no-repeat;
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
    .el-date-editor.el-input{
      width:148px;
    }
  }
</style>

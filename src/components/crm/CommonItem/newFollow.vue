<template>
  <div id="newFollow">
    <table width="100%" cellspacing="0" cellpadding="0" class="newTab1">
      <tr>
        <td class="newF-usz">跟进类型</td>
        <td colspan="3">
          <input type="radio" name="type" :checked="!picked" @click="picked = false"/>计划
          <input type="radio" name="type" :checked="picked" @click="picked = true"/>记录
        </td>
      </tr>
      <tr>
        <td class="newF-usz">
          跟进类型
        </td>
        <td colspan="3">
          <select name="" id="">
            <option value="">邮件</option>
            <option value="">电话</option>
            <option value="">上门</option>
            <option value="">网络联系</option>
          </select>
          <span  class="rsp" v-show="!picked">
            <input type="checkbox" v-model="isAuto"/>是否自动执行
          </span>
        </td>
      </tr>
      <tr>
        <td class="newF-usz">跟进时间</td>
        <td colspan="3">
          <el-date-picker
            v-model="dateValue"
            type="date"
           >
          </el-date-picker>
          <el-time-picker
            v-model="timeValue"
            :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }"
            placeholder="任意时间点">
          </el-time-picker>
          <span class="rsp" v-show="!picked">
            <span class="remind">提醒</span>
            <select name="" id="">
              <option value="">10分钟前</option>
              <option value="">30分钟前</option>
              <option value="">1小时前</option>
              <option value="">2小时前</option>
              <option value="">6小时前</option>
              <option value="">1天前</option>
            </select>
          </span>
        </td>
      </tr>
      <tr>
        <td class="newF-usz">销售进程</td>
        <td colspan="3">
          <select name="" id="">
            <option value="">报价</option>
            <option value="">样品</option>
            <option value="">咨询</option>
            <option value="">订单</option>
            <option value="">账款</option>
          </select>
        </td>
      </tr>
      <tr v-if="!isAuto">
        <td class="cu_tbg">跟进内容</td>
        <td colspan="3">
          <textarea name="" id="" cols="30" rows="10" class="f-content">

          </textarea>
        </td>
      </tr>
      <tr v-if="isAuto">
        <td>邮件主题</td>
        <td>
          <input type="text"/>
          <select name="" id="">
            <option value="">
              （不使用模板）
            </option>
          </select>
        </td>
      </tr>
      <tr v-if="isAuto">
        <td>
          邮件内容
        </td>
        <td>
          <textarea name="" id="mailP_ReplyContext" ></textarea>
        </td>
      </tr>
      <tr>
        <td class="newF-usz">关联产品</td>
        <td colspan="3">
          <span @click="selectProduct" class="pSelect">{{productNum==0?'请选择':'选择了'+productNum+'个产品'}}</span>
        </td>
      </tr>
    </table>
    <transition name="fade">
      <small-layer
        class="smallLayer"
        v-if="showC"
        @cntClose="showC = false"
        @cntConfirm="cntConfirm"
        :client-list="clientList"
        :connect-tab="false"
        cnt-title="转移公海客户"
        :has-button="true"></small-layer>
    </transition>

  </div>
</template>
<script>
  //初始化编辑器

</script>
<script>
import smallLayer from "./smallLayer.vue"
export default({
  name:"newFollow",
  data(){
    return{
      showC:false,
      picked:false,
      productNum:0,
      isAuto:false,
      arr:[],
        clientList:[
        {
          name:"权威",
          checked:false,
          values:'jack'
        }, {
          name:"权威1",
          checked:false,
            values:'jack1'
        }, {
          name:"权威1",
          checked:false,
            values:'jack2'
        }, {
          name:"权威1",
          checked:false,
            values:'jack3'
        }, {
          name:"权威1",
          checked:false,
            values:'jack4'
        }
      ],
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
          picker.$emit('pick', new Date());
          }
        }]
      },
      dateValue: '',
      timeValue: new Date(2016, 9, 10, 18, 40)
    }
  },
  components:{
    'small-layer':smallLayer
  },
  methods:{
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
  .newTab1{
    td{
      font-size:12px;
      text-align: left;
      input{
        vertical-align: middle;
        margin:0;
      }
    }
    .newF-usz{
      text-align: right;
      min-width: 60px;
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
      width:140px;

    }
    .el-input__icon+.el-input__inner{
      height:22px;
      line-height: 22px;
    }
  }
</style>

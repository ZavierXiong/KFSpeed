<template>
  <div id="newClientByhand" class="createTab-content">
    <table width="100%" cellpadding="0" cellspacing="0" class="cu_tbcs">
      <tbody>
      <tr>
        <td class="ft2 cu-t"><b>
          <span>基本信息</span>
        </b></td>
        <td class="cu-t" colspan="3">
          <span class="red">*</span>
          是必填项</td>
      </tr>
      <tr>
        <td class="cu-empty" colspan="4"></td>
      </tr>
      <tr>
        <td class="cu_tbg" width="80">
          <span>企业全称</span>
        </td>
        <td width="220">
          <input type="text" class="custx" @blur="vertify()" v-model="value">
          <span class="red">*</span>
          <span
            v-show="hasVertify"
            :title="correct?correctTitle:errorTitle"
            :class="correct?'correct_icon':'error_icon'"></span>
        </td>
        <td class="cu_tbg" width="80">
          <span>联系人姓名</span>
        </td>
        <td width="220">
          <input type="text" class="custx"  @blur="vertify2()" v-model="value01">
          <span class="red">*</span>
          <span
            v-show="hasVertify2"
            :title="correct2?correctTitle2:errorTitle2"
            :class="correct2?'correct_icon':'error_icon'"></span>
        </td>
      </tr>
      <tr>
        <td class="cu_tbg">
          <span>所在国家</span>
        </td>
        <td>
          <input type="text" class="custx ac_input" autocomplete="off">
          <span class="red"></span>
          <span></span>
        </td>
        <td class="cu_tbg">
          <span>联系人邮箱</span>
        </td>
        <td>
          <input type="text" class="custx"  @blur="vertify3()" v-model="value02">
          <i @click="showE = !showE" :class="[showE?'unfold':'fold']" v-if="showE"></i>
          <span class="red">*</span>
          <span
            v-show="hasVertify3"
            :title="correct3?correctTitle3:errorTitle3"
            :class="correct3?'correct_icon':'error_icon'"></span>
        </td>
      </tr>
      <tr v-if="showE">
        <td class="cu_tbg">
          <span>联系人邮箱1</span>
        </td>
        <td>
          <input type="text" class="custx">
        </td>
        <td class="cu_tbg">
          <span>联系人邮箱2</span>
        </td>
        <td>
          <input type="text" class="custx">
        </td>
      </tr>
      <tr>
        <td class="cu_tbg">
          <span>首次联系</span>
        </td>
        <td>
          <div class="block custx hasDatepicker">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期时间">
            </el-date-picker>
          </div>
          <span class="red"></span>
        </td>
        <td class="cu_tbg">
          <span>联系人电话</span>
        </td>
        <td>
          <input type="text" class="custx">
          <i @click="showT = !showT" :class="[showT?'unfold':'fold']" v-if="showE"></i>
        </td>
      </tr>
      <tr v-if="showT">
        <td class="cu_tbg">
          <span>联系人电话1</span>
        </td>
        <td>
          <input type="text" class="custx">
        </td>
        <td class="cu_tbg">
          <span>联系人电话2</span>
        </td>
        <td>
          <input type="text" class="custx">
        </td>
      </tr>
      </tbody>
      <tbody class="re-info">
      <tr>
        <td class="ft2 cu-t cu-info">
          <span > <b>选填信息</b> </span>
          <span class="open-w" @click="showW = !showW" v-if="!showW">{{showW?'收缩':'展开'}}</span>
        </td>
        <td class="cu-t" colspan="3"></td>
      </tr>
      <tr>
        <td class="cu-empty" colspan="4"></td>
      </tr>
      <tr v-if="showW">
        <td class="cu_tbg">
          <span >省份/州/区</span>
        </td>
        <td>
          <input type="text" class="custx" id="cusM_province" name="crmcustomer2.province">
          <span class="red"></span>
          <span></span>
        </td>
        <td class="cu_tbg">
          <span >城市</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.city">
          <span class="red"></span>
          <span></span>
        </td>
      </tr>
      <tr  v-if="showW">
        <td class="cu_tbg">
          <span >企业简称</span>
        </td>
        <td>
          <input type="text" class="custx" id="cusM_tomersimp" name="crmcustomer2.simp_name">
          <span id="simplenameid" class="red"></span>
          <span id="cusM_tomersimpTip"></span>
        </td>
        <td class="cu_tbg">
          <span >员工规模</span>
        </td>
        <td><select class="custx" id="cusM_persons_scale" name="crmcustomer2.persons_scale">
          <option value="1-50">1-50</option>
          <option value="50-500">50-500</option>
          <option value="500-1000">500-1000</option>
          <option value="1000以上">1000以上</option>
        </select></td>
      </tr>
      <tr  v-if="showW">
        <td class="cu_tbg">
          <span >手机</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.mobile" id="cusM_mobilephone">
          <span id="mobileid" class="red"></span>
          <span id="cusM_mobilephoneTip"></span>
        </td>
        <td class="cu_tbg">
          <span >职位</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmlinkman.post" id="cusM_post">
          <span id="postid" class="red"></span>
          <span id="cusM_postTip"></span>
        </td>
      </tr>
      <tr  v-if="showW">
        <td class="cu_tbg">
          <span >传真</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.fax" id="cusM_fax">
          <span id="faxid" class="red"></span>
          <span id="cusM_faxTip"></span>
        </td>
        <td class="cu_tbg">
          <span >网址</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.website" id="cusM_website">
          <span id="websiteid" class="red"></span>
          <span id="cusM_websiteTip"></span>
        </td>
      </tr>
      <tr  v-if="showW">
        <td class="cu_tbg">
          <span >地址</span>
        </td>
        <td colspan="3">
          <input type="text" class="custx" style="width:610px;" name="crmcustomer2.address" id="cusM_address">
          <span id="addressid" class="red"></span>
          <span id="cusM_addressTip"></span>
        </td>
      </tr>
      </tbody>
      <tbody>
      <tr>
        <td class="ft2 cu-t" colspan="2">
          <div>
            <b>
              <span>社交信息</span>
            </b>&nbsp;
            <span id="cus_span_id2" class="open-w" @click="showS = !showS">{{showS?'收缩':'展开'}}</span>
          </div>
        </td>
        <td class="cu-t" colspan="3"></td>
      </tr>
      <tr>
        <td class="cu-empty" colspan="4"></td>
      </tr>
      <tr id="shejiao_id1" v-if="showS">
        <td class="cu_tbg">
          <span>Facebook</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.facebook">
        </td>
        <td class="cu_tbg">
          <span>Twitter</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.twitter">
        </td>
      </tr>
      <tr id="shejiao_id2" v-if="showS">
        <td class="cu_tbg">
          <span>LinkedIn</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.linkedin"></td>
        <td class="cu_tbg">
          <span>Pinterest</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.pinterest"></td>
      </tr>
      <tr id="shejiao_id3" v-if="showS">
        <td class="cu_tbg">
          <span>Google+</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.google"></td>
        <td class="cu_tbg">
          <span>Tumblr</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.tumblr"></td>
      </tr>
      <tr id="shejiao_id4" v-if="showS">
        <td class="cu_tbg">
          <span>Instagram</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.instagram"></td>
        <td class="cu_tbg">
          <span>VK</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.vk"></td>
      </tr>
      <tr id="shejiao_id5" v-if="showS">
        <td class="cu_tbg">
          <span>Made In China</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.make_in_china"></td>
        <td class="cu_tbg">
          <span>Alibaba</span>
        </td>
        <td>
          <input type="text" class="custx" name="crmcustomer2.alibaba"></td>
      </tr>
      <tr id="shejiao_id6" v-if="showS">
        <td class="cu_tbg">
          <span>Skype</span>
        </td>
        <td>
          <input type="text" class="custx"></td>
        <td class="cu_tbg">
          <span>Youtube</span>
        </td>
        <td>
          <input type="text" class="custx"></td>
      </tr>

      <tr v-if="hasBusinessInfo">
        <td class="ft2 cu-t">
          <span > <b>业务信息</b> </span>
        </td>
        <td class="cu-t" colspan="3"></td>
      </tr>
      <tr>
        <td class="cu-empty" colspan="4"></td>
      </tr>
      <tr v-if="hasBusinessInfo">
        <td class="cu_tbg">
          <span >所属行业</span>
        </td>
        <td>
          <div>
            <select class="custx">
              <option value="100000509">手机、通讯</option>
              <option value="100000044">消费电子</option>
              <option value="100000007">电脑及配件</option>
              <option value="100000034">汽车、摩托车及零部件</option>
              <option value="100000003">服装服饰</option>
              <option value="100000322">鞋、袜、帽及配件</option>
              <option value="100001524">箱包</option>
              <option value="100000036">钟表、珠宝首饰、眼镜</option>
              <option value="100000018">运动及娱乐</option>
              <option value="100000026">玩具</option>
              <option value="100000017">礼品、工艺品</option>
              <option value="100000066">健康美容、个人护理</option>
              <option value="100000039">照明、灯具</option>
              <option value="100000015">家居园艺</option>
              <option value="100001503">家具及室内装饰品</option>
              <option value="100000021">办公用品及文具</option>
              <option value="100000023">包装和纸</option>
              <option value="100000035">印刷和出版</option>
              <option value="100000030">安全产品</option>
              <option value="100000034">汽车配件</option>
              <option value="100001420">五金工具</option>
              <option value="100000004">纺织</option>
              <option value="100000006">家用电器</option>
              <option value="100000002">食品及饮料</option>
              <option value="100000028">其他</option>
              <option value="100000029">新能源</option>
              <option value="100000332">电子电气</option></select>
          </div>
        </td>
        <td class="cu_tbg">
          <span >意向产品</span>
        </td>
        <td>
          <div>
            <select class="custx" >
              <option value="136">默认产品</option>
              <option value="387">电子原配件</option>
              <option value="388">mini pc</option></select>
          </div>
        </td>
      </tr>
      <tr v-if="hasBusinessInfo">
        <td class="cu_tbg">
          <span >客户分类</span>
        </td>
        <td>
          <div>
            <select class="custx" >
              <option value="912">重点跟进客户</option>
              <option value="301">默认分类</option>
              <option value="411">重点意向客户</option>
              <option value="412">一般潜在客户</option>
              <option value="410">阿里</option>
              <option value="413">美国客户</option>
              <option value="414">JP</option>
              <option value="415">KP</option></select>
          </div>
        </td>
        <td class="cu_tbg">
          <span>客户状态</span>
        </td>
        <td>
          <div>
            <select class="custx" >
              <option value="720">收集状态</option>
              <option value="721">开发状态</option>
              <option value="722">跟进状态</option>
              <option value="723">潜在客户</option>
              <option value="724">意向客户</option>
              <option value="725">成交客户</option></select>
          </div>
        </td>
      </tr>
      <tr v-if="hasBusinessInfo">
        <td class="cu_tbg">
          <span >客户关系</span>
        </td>
        <td>
          <div>
            <select class="custx" >
              <option value="585">代理商</option>
              <option value="586">供货商</option>
              <option value="587">新客户</option>
              <option value="588">老客户</option>
              <option value="589">广告商</option></select>
          </div>
        </td>
        <td class="cu_tbg">
          <span >客户来源</span>
        </td>
        <td>
          <div>
            <select class="custx" >
              <option value="533">易外销搜索客户</option>
              <option value="534">公司网站</option>
              <option value="535">B2B平台</option>
              <option value="536">展会获取</option></select>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-if="hasEditbtn">
      <span class="confirm-btn">确认编辑</span>
    </div>
  </div>

</template>
<script>
  export default({
    name:'newClientByhand',
    props:['hasBusinessInfo','showW','showE','hasEditbtn'],
    data(){
    return{
      hasVertify:false,
      hasVertify2:false,
      hasVertify3:false,
      correct:false,
      correct2:false,
      correct3:false,
      showT:false,
//      showE:false,
//      showW:false,
      showS:false,
      correct:false,
      correctTitle:"恭喜，该客户名称可用！",
      correctTitle2:"恭喜，输入正确！！",
      correctTitle3:"恭喜，输入正确！！",
      errorTitle:"4~200个字符之间!",
      errorTitle2:"2~50个字符之间!",
      errorTitle3:"2~50个字符之间!",
      value:"",
      value01:"",
      value02:"",
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
          picker.$emit('pick', new Date());
  }
  }]
  },
  value1: '',
    value2: ''
  }
  },
  methods:{
    vertify:function(){
      this.hasVertify = true;
      let val = this.value;
      if(val.length<4||val.length>200){
        this.correct = false;
      } else{
        this.correct = true;
      }
    },
    vertify2:function(){
      this.hasVertify2 = true;
      let val = this.value01;
      if(val.length<2||val.length>50){
        this.correct2 = false;
      } else{
        this.correct2 = true;
      }
    },
    vertify3:function(){
      this.hasVertify3 = true;
      let val = this.value02;
      let re = /^[0-9A-Za-z][\.-_0-9A-Za-z]*@[0-9A-Za-z]+(\.[0-9A-Za-z]+)+$/;
      if(re.test(val)){
        this.correct3 = true;
      } else{
        this.correct3 = false;
      }
    }
  }
  })
</script>
<style lang="less">
  .el-input__icon{
    right:6px;
  }
  .error_icon{
    vertical-align: middle;
    margin-top: -6px;
    display: inline-block;
    width:22px;
    height:22px;
    background:url("../../../assets/icon/onError.gif") no-repeat;
  }
  .correct_icon{
  .error_icon;
    background:url("../../../assets/icon/onCorrect.gif") no-repeat;
  }
  .confirm-btn{
    cursor:pointer;
    padding: 3px 15px;
    display: inline-block;
    margin: 10px 5px 10px 5px;
    background: #5bb75b;
    border-radius: 3px;
    color: #fff;
    float:right;
    &:hover{
       background: #009933;
    }
  }
</style>

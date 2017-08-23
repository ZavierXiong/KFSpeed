<template>
  <!--公海客户点击企业名称出现的弹框页面-->
  <div id="moreInfo">
    <!--点击显示-->
    <!--<button type="text" @click="opens">点击打开 </button>-->
    <!--弹框...修改外部div类名-->
    <div class="dialog-masks"></div>
    <div class="crm-moreInfo">
      <el-dialog title="客户详细信息" :visible.sync="test" size="tiny" class='yourName'>
        <!--此处添加你的弹框内容-->
        <div>
          <i class="user-bg"></i>
          <div class="more-userInfo">
            <h4 class="user-name">Exchange), COMEX, NYMEX, Copper, Aluminum, Nickel, Tin, Lead</h4>
            <span class="user-type"> sales</span>
            <span class="user-follow">跟进人: Sutech Power</span>
          </div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick" class="tab-content">
          <el-tab-pane label="动态" name="first">
            <div>
              <ul>
                <li v-for="(tab,$index) in tabLists" class="tab-title">
                  <input class="tabBtn" type="radio" :checked="tabCheck==$index" @click="tabChange($index)" name="h"/>{{tab.text}}
                </li>
              </ul>
              <div class="create-list">
                <ul v-if="tabCheck == 0">
                  <li class="clst-li">
                    <div v-if="dtTab.length > 0">
                      <div v-for="(dt,$index) in dtTab">
                        <i class="client-bg"></i>
                        <div class="more-createInfo">
                          <p class="create-info">我 于 <span class="create-date">{{dt.date}}</span></p>
                          <span class="create-follow">更新了动态</span>
                          <span class="create-life">{{dt.life}}</span>
                        </div>
                      </div>
                    </div>
                    <div v-else>暂无数据</div>
                  </li>
                </ul>
                <ul v-if="tabCheck == 1">
                  <li>
                    <div v-if="recTab.length > 0">
                      <div v-for="(re,$index) in recTab">
                        <i class="client-bg"></i>
                        <div class="more-createInfo">
                          <p class="create-info">我 于 <span class="create-date">{{re.date}}</span></p>
                          <span class="create-follow">新建了该客户</span>
                        </div>
                      </div>
                    </div>
                    <div v-else>暂无数据</div>
                  </li>
                </ul>
                <ul v-if="tabCheck == 2">
                  <li>
                    <div v-if="createClTab.length > 0">
                      <div v-for="(cr,$index) in createClTab">
                        <i class="client-bg"></i>
                        <div class="more-createInfo">
                          <p class="create-info">我 于 <span class="create-date">{{dt.date}}</span></p>
                          <span class="create-follow">新建了客户</span>
                        </div>
                      </div>
                    </div>
                    <div v-else>暂无数据</div>
                  </li>
                </ul>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="企业信息" name="second">
            <table width="100%" cellpadding="0" cellspacing="0" class="company-tb-info">
              <tbody>
              <tr v-for="tab in tableInfo" :data="tableInfo">
                <td v-if="tab.text" class="tr-title">{{tab.text}}</td>
                <td class="crm-cu_tbg" v-if="tab.text1" width="100">{{tab.text1}}<span v-if="tab.red" class="red">{{tab.red}}</span></td>
                <td v-if="tab.text2" width="300">{{tab.text2}}</td>
                <td class="crm-cu_tbg" v-if="tab.text3" width="100">{{tab.text3}}</td>
                <td colspan="3" v-if="tab.empty">{{tab.empty}}</td>
                <td v-if="tab.text4">{{tab.text4}}</td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="联系人" name="third">
            <table class="crm-connectionTab" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
              <tr>
                <td colspan="4" class="connect-title"><span class="email-title">联系人信息</span></td>
              </tr>
              <tr>
                <th class="th" width="5%"></th>
                <th class="th" width="25%">姓名</th>
                <th class="th" width="25%">联系邮箱</th>
                <th class="th" width="15%">建立时间</th>
                <th class="th" width="15%">电话</th>
                <th class="th" width="15%">手机</th>
              </tr>
              <tr v-for="tab in connectionTab" v-if="connectionTab.length > 0">
                <td width="5%" class="td spot-box"><span class="spot"></span></td>
                <td class="td cnt-name" width="25%" ><a href="javascript:void(0);" @click="showC = true">{{tab.name}}</a></td>
                <td class="td" width="25%">{{tab.email}}</td>
                <td class="td" width="15%">{{tab.date}}</td>
                <td class="td" width="15%">{{tab.tel}}</td>
                <td class="td" width="15%">{{tab.phone}}</td>
              </tr>
              <tr v-if="connectionTab.length == 0">
                <td colspan="100%" class="noData-box">
                  <div class="noData-bg">
                  </div>
                  <span class="noData">暂无数据</span>
                </td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="邮件" name="sixth">
            <table class="crm-connectionTab" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
              <tr>
                <td colspan="100%" class="connect-title">
                  <span class="email-title">往来邮件</span>
                  <div class="tab-button">
                    <span><input type="radio" name="email" :checked="emailShow" @click="emailShow=true"/>收件箱</span>
                    <span><input type="radio" name="email"  :checked="!emailShow" @click="emailShow=false"/>发件箱</span>
                  </div>
                </td>
              </tr>
              <tr v-if="emailShow">
                <th class="th" width="5%"></th>
                <th class="th" width="20%">发件人</th>
                <th class="th" width="30%">主题</th>
                <th class="th" width="12%">大小</th>
                <th class="th" width="13%">时间</th>
                <th class="th" width="20%">发件人邮箱</th>
              </tr>
              <tr v-for="tab in getEmailTab" v-if="emailShow && getEmailTab.length > 0">
                <td width="5%" class="td spot-box"></span></td>
                <td class="td cnt-name" width="20%" ><a href="javascript:void(0);" @click="showC = true">{{tab.name}}</a></td>
                <td class="td" width="30%">{{tab.email}}</td>
                <td class="td" width="12%">{{tab.date}}</td>
                <td class="td" width="13%">{{tab.tel}}</td>
                <td class="td" width="20%">{{tab.phone}}</td>
              </tr>
              <tr v-if="emailShow && getEmailTab.length == 0">
                <td colspan="100%" class="noData-box">
                  <div class="noData-bg">
                  </div>
                  <span class="noData">暂无数据</span>
                </td>
              </tr>
              <tr v-if="!emailShow">
                <th class="th" width="5%"></th>
                <th class="th" width="20%">收件人</th>
                <th class="th" width="30%">主题</th>
                <th class="th" width="12%">大小</th>
                <th class="th" width="13%">时间</th>
                <th class="th" width="20%">收件人邮箱</th>
              </tr>
              <tr v-for="tab in sendEmailTab"  v-if="!emailShow && sendEmailTab.length > 0">
                <td width="5%" class="td spot-box"></span></td>
                <td class="td cnt-name" width="20%" ><a href="javascript:void(0);" @click="showC = true">{{tab.name}}</a></td>
                <td class="td" width="30%">{{tab.email}}</td>
                <td class="td" width="12%">{{tab.date}}</td>
                <td class="td" width="13%">{{tab.tel}}</td>
                <td class="td" width="20%">{{tab.phone}}</td>
              </tr>
              <tr v-if="!emailShow && sendEmailTab.length == 0">
                <td colspan="100%" class="noData-box">
                  <div class="noData-bg">
                  </div>
                  <span class="noData">暂无数据</span>
                </td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="跟进" name="fiveth">
            <table class="crm-connectionTab" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
              <tr>
                <td colspan="4" class="connect-title">
                  <span class="email-title">查询计划</span>
                  <div class="tab-button plan">
                    <span><input type="radio" name="plan" :checked="planShow" @click="planShow=true"/>计划</span>
                    <span><input type="radio" name="plan" :checked="!planShow" @click="planShow=false"/>记录</span>
                  </div>
                </td>
              </tr>
              <tr v-if="planShow">
                <th class="th"><div style="width:10px;"></div></th>
                <th class="th">
                  <div style="width:80px;">
                    <select name="" >
                      <option value="" v-for="sel in planOption">{{sel.text}}</option>
                    </select>
                  </div>
                </th>
                <th class="th"><div style="width:200px;">内容</div></th>
                <th class="th"><div style="width:150px;">跟进时间</div></th>
                <th class="th">
                  <div style="width:100px;">
                    <select name="" id="">
                      <option value="" v-for="sta in statuOption">{{sta.statu}}</option>
                    </select>
                  </div>
                </th>
              </tr>
              <tr v-for="tab in planTab" v-if="planShow && planTab.length > 0">
                <td class="td spot-box"></span></td>
                <td class="td cnt-name"><a href="javascript:void(0);" @click="showC = true">{{tab.name}}</a></td>
                <td class="td">{{tab.email}}</td>
                <td class="td">{{tab.date}}</td>
                <td class="td">{{tab.tel}}</td>
              </tr>
              <tr v-if="!planShow && planTab.length == 0">
                <td colspan="100%" class="noData-box">
                  <div class="noData-bg">
                  </div>
                  <span class="noData">暂无数据</span>
                </td>
              </tr>
              <tr v-if="!planShow">
                <th class="th"><div style="width:10px;"></div></th>
                <th class="th">
                  <div style="width:80px;">
                    <select name="" >
                      <option value="" v-for="sel in planOption">{{sel.text}}</option>
                    </select>
                  </div>
                </th>
                <th class="th"><div style="width:200px;">内容</div></th>
                <th class="th"><div style="width:150px;">跟进时间</div></th>
                <th class="th">
                  <div style="width:100px;">
                    <select name="" id="">
                      <option value="" v-for="rec in recordOption">{{rec.record}}</option>
                    </select>
                  </div>
                </th>
              </tr>
              <tr v-for="tab in recordTab" v-if="!planShow && recordTab.length > 0">
                <td class="td spot-box"></span></td>
                <td class="td cnt-name"><a href="javascript:void(0);" @click="showC = true">{{tab.name}}</a></td>
                <td class="td">{{tab.email}}</td>
                <td class="td">{{tab.date}}</td>
                <td class="td">{{tab.tel}}</td>
              </tr>
              <tr v-if="!planShow && recordTab.length == 0">
                <td colspan="100%" class="noData-box">
                  <div class="noData-bg">
                  </div>
                  <span class="noData">暂无数据</span>
                </td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="商机" name="seventh">
            <table class="crm-connectionTab" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
              <tr>
                <td colspan="4" class="connect-title"><span class="email-title">销售商机</span></td>
              </tr>
              <tr>
                <th class="th" width="4%"></th>
                <th class="th" width="12%">来源</th>
                <th class="th" width="15%">预成交信息</th>
                <th class="th" width="18%">商机信息</th>
                <th class="th" width="18%">状态</th>
                <th class="th" width="10%">操作</th>
              </tr>
              <tr v-for="tab in businessTab" v-if="businessTab.length > 0">
                <td width="4%" class="td spot-box"></span></td>
                <td class="td cnt-name" width="12%" ><a href="javascript:void(0);" @click="showC = true">{{tab.name}}</a></td>
                <td class="td" width="15%">{{tab.email}}</td>
                <td class="td" width="18%">{{tab.date}}</td>
                <td class="td" width="18%">{{tab.tel}}</td>
                <td class="td" width="10%">{{tab.phone}}</td>
              </tr>
              <tr v-if="businessTab.length == 0">
                <td colspan="100%" class="noData-box">
                  <div class="noData-bg">
                  </div>
                  <span class="noData">暂无数据</span>
                </td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
          <el-tab-pane label="成交记录" name="eighth">
            <table class="crm-connectionTab" cellspacing="0" cellpadding="0" width="100%">
              <tbody>
              <tr>
                <td colspan="4" class="connect-title"><span class="email-title">成交记录</span></td>
              </tr>
              <tr>
                <th class="th" width="4%"></th>
                <th class="th" width="10%">订单类型</th>
                <th class="th" width="15%">成交产品</th>
                <th class="th" width="10%">成交时间</th>
                <th class="th" width="10%">成交金额</th>
                <th class="th" width="15%">备注</th>
                <th class="th" width="10%">操作</th>
              </tr>
              <tr v-for="tab in successTab" v-if="successTab.length > 0">
                <td width="4%" class="td spot-box"></span></td>
                <td class="td cnt-name" width="10%" ><a href="javascript:void(0);" @click="showC = true">{{tab.name}}</a></td>
                <td class="td" width="15%">{{tab.email}}</td>
                <td class="td" width="10%">{{tab.date}}</td>
                <td class="td" width="10%">{{tab.tel}}</td>
                <td class="td" width="15%">{{tab.phone}}</td>
                <td class="td" width="10%">{{tab.phone}}</td>
              </tr>
              <tr v-if="successTab.length == 0">
                <td colspan="100%" class="noData-box">
                  <div class="noData-bg">
                  </div>
                  <span class="noData">暂无数据</span>
                </td>
              </tr>
              </tbody>
            </table>
          </el-tab-pane>
        </el-tabs>
        <!--底部确认取消按钮-->
			<span slot="footer" class="dialog-footer">
    				<el-button type="primary" @click="close">确 定</el-button>
    				<el-button @click="close">取 消</el-button>
  				</span>
      </el-dialog>
      <connectInfo v-if="showC" @cntClose="showC = false" :connect-tab="connectTab" :client-list="false" cnt-title="联系人详情" :has-button="false"></connectInfo>
    </div>

  </div>
</template>
<script>
  import connectInfo from "./smallLayer.vue"
  export default {
    data() {
      return {
        activeName: 'second',
        test:true,
        showC:false,
        emailShow:true,
        planShow:true,
        tabCheck:'0',
        connectTab:[
          {
            title:"姓名",
            info:"sales"
          },
          {
            title:"职位",
            info:" "
          },
          {
            title:"邮箱",
            info:"sales@metalprices.com"
          },
          {
            title:"电话",
            info:" "
          },
          {
            title:"手机",
            info:"713 968 0023"
          },
          {
            title:"性别",
            info:"男"
          },
          {
            title:"地址",
            info:" "
          },
          {
            title:"网址",
            info:"http://www.metalprices.com"
          }
        ],
        createClTab:[
        ],
        recTab:[
          {date:"2016-04-23 18:27:12"}
        ],
        dtTab:[
          {
            date:"2016-04-23 18:27:12",
            life:"helloWorld"
          }
        ],
        tabLists:[
          {
            text:"动态",

          },
          {
            text:"跟进记录"
          },
          {
            text:"生命线"
          }
        ],
        tableInfo:[
          {
            text:"基本信息",
            empty:" "
          },
          {
            text1:"企业全称",
            text2:"Exchange), COMEX, NYMEX, Copper, Aluminum, Nickel, Tin, Lead",
            text3:"联系人姓名",
            text4:"sales",
            red:"*"
          },
          {
            text1:"联系人邮箱",
            text2:"sales@metalprices.com",
            text3:"联系人电话",
            text4:" "
          },
          {
            text1:"企业简称",
            text2:" ",
            text3:"所在国家",
            text4:"无"
          },
          {
            text1:"首次联系",
            text2:" ",
            text3:"员工规模",
            text4:"1-50"
          },
          {
            text:"其它信息",
            empty:" "
          },
          {
            text1:"省份/州/区",
            text2:" ",
            text3:"城市",
            text4:" "
          },
          {
            text1:"手机",
            text2:"713 968 0023",
            text3:"职位",
            text4:" "
          },
          {
            text1:"传真",
            text2:" ",
            text3:"网址",
            text4:"http://www.metalprices.com"
          },
          {
            text1:"地址",
            empty:" "
          },
          {
            text:"业务信息",
            empty:" "
          },
          {
            text1:"所属行业",
            text2:"手机、通讯",
            text3:"意向产品",
            text4:"默认产品"
          },
          {
            text1:"客户分类",
            text2:"默认分类",
            text3:"客户状态",
            text4:"收集状态"
          },
          {
            text1:"客户关系",
            text2:"代理商",
            text3:"客户来源",
            text4:"易外销搜索客户"
          }
        ],
        connectionTab:[
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
        ],
        getEmailTab:[
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          }
        ],
        sendEmailTab:[

        ],
        planTab:[
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          }
        ],
        recordTab:[

        ],
        planOption:[
          {
            text:"联系工具"
          },
          {
            text:"邮件"
          },
          {
            text:"电话"
          },
          {
            text:"上门"
          },
          {
            text:"网络联系"
          }
        ],
        statuOption:[
          {
            statu:"所有计划"
          },
          {
            statu:"已执行"
          },
          {
            statu:"超时未处理"
          },
          {
            statu:"未执行"
          }
        ],
        recordOption:[
          {
            record:"所有记录"
          },
          {
            record:"手工建立记录"
          },
          {
            record:"收件箱标记邮件"
          },
          {
            record:"发件箱标记邮件"
          },
          {
            record:"营销邮发邮件"
          }
        ],
        businessTab:[
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          },
          {
            name:"sales",
            email:"sales@metalprices.com",
            date:"2016-04-23",
            tel:"无",
            phone:"713 968 0023"
          }
        ],
        successTab:[

        ]
      };
  },
  components:{
    connectInfo
  },
  methods: {
    handleClick(tab, event) {
//      console.log(tab, event);
    },
    close:function(){
      this.$emit('closeInfo',false)
    },
    tabChange:function(v){
      this.tabCheck = v;
    }
  }
  };
</script>
<style lang="less" src="../../../less/crm_less/crmMoreInfo.less"></style>

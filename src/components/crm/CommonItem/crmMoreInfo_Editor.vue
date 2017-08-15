<!--点击企业名称信息出现的弹框-->
<template>
  <!--公海客户点击企业名称出现的弹框页面-->
  <div id="moreInfo">
    <!--点击显示-->
    <!--<button type="text" @click="opens">点击打开 </button>-->
    <!--弹框...修改外部div类名-->
    <div class="crm-mif-content">
      <div class="dialog-mask"></div>
      <div class="crm-moreInfo crm-mif-ct">
        <el-dialog title="客户详细信息" :visible.sync="test" size="tiny" class='yourName'>
          <!--此处添加你的弹框内容-->
          <span class="el-icon-close cnt_close" @click="close"></span>
          <div class="client-info">
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
                  <div class="tab-c-box">
                    <textarea name="" id="" cols="30" rows="10" v-model="textarea" class="tab-c-input" placeholder="请输入动态，不超过200个字..."></textarea>
                    <button class="tab-c-submit" @click="submitDt">提交动态</button>
                  </div>
                  <ul>
                    <li v-for="(tab,$index) in tabLists" class="tab-title">
                      <input class="tabBtn" type="radio" :checked="tabCheck==$index" @click="tabChange($index)" name="h"/>{{tab.text}}
                    </li>
                  </ul>
                  <div class="create-list">
                    <ul v-if="tabCheck == 0">
                      <li v-for="(dt,$index) in dtTab" class="dt-li">
                        <div v-if="dtTab.length > 0">
                            <i class="client-bg"></i>
                            <div class="more-createInfo">
                              <p class="create-info">我 于
                                <span class="create-date">{{dt.date | time}}</span>
                                <span class="create-follow">更新了动态</span>
                                <span class="cancelStick">取消置顶</span>
                              </p>
                              <span class="create-life">{{dt.life}}</span>
                            </div>
                        </div>
                        <div v-else>暂无数据</div>
                      </li>
                    </ul>
                    <ul v-if="tabCheck == 1">
                      <li class="dt-li">
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
                      <li class="dt-li">
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
                <companyInfo
                  class="crm-companyInfo"
                  :hasBusinessInfo="false"
                  :showW="true"
                  :has-editbtn="true"></companyInfo>
              </el-tab-pane>
              <el-tab-pane label="联系人" name="third">
                <table class="crm-connectionTab" cellspacing="0" cellpadding="0" width="100%">
                  <tbody>
                  <tr>
                    <td colspan="6" class="connect-title"><span class="email-title">联系人信息</span></td>
                    <td><span class="mif-edt-newLinkman" @click="showN = true">新建联系人</span></td>
                  </tr>
                  <tr>
                    <th class="th" width="5%"></th>
                    <th class="th" width="10%">姓名</th>
                    <th class="th" width="15%">联系邮箱</th>
                    <th class="th" width="10%">建立时间</th>
                    <th class="th" width="10%">电话</th>
                    <th class="th" width="14%">手机</th>
                    <th class="th" width="10%">操作</th>
                  </tr>
                  <tr v-for="(tab,index) in connectionTab" v-if="connectionTab.length > 0">
                    <td width="5%" class="td spot-box"><span class="spot"></span></td>
                    <td class="td cnt-name" width="10%" ><a href="javascript:void(0);" @click="showC = true">{{tab.name}}</a></td>
                    <td class="td" width="15%">{{tab.email}}</td>
                    <td class="td" width="10%">{{tab.date}}</td>
                    <td class="td" width="10%">{{tab.tel}}</td>
                    <td class="td" width="14%">{{tab.phone}}</td>
                    <!--<td class="td" width="10%" @click="showEdite = true"><i class="update"></i></td>-->
                    <td class="td" width="10%" @click="linkEdit(index)"><i class="update"></i></td>
                  </tr>
                  <tr v-if="connectionTab.length == 0">
                    <td colspan="100%">
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
                    <td colspan="100%">
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
                    <td colspan="100%">
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
                    <td>
                      <span class="mif-edt-newLinkman" @click="showNFL = true">新建跟进</span>
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
                    <td colspan="100%">
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
                    <td colspan="100%">
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
                    <td colspan="5" class="connect-title"><span class="email-title">销售商机</span></td>
                    <td>
                      <span class="mif-edt-newLinkman" @click="showNBL = true">新建商机</span>
                    </td>
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
                    <td colspan="100%">
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
                    <td colspan="6" class="connect-title"><span class="email-title">成交记录</span></td>
                    <td>
                      <span class="mif-edt-newLinkman" @click="showNIL = true">新建成交</span>
                    </td>
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
                    <td colspan="100%">
                      <div class="noData-bg">
                      </div>
                      <span class="noData">暂无数据</span>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </el-tab-pane>
            </el-tabs>
            <connectInfo
              v-if="showC"
              @cntClose="showC = false"
              :connect-tab="connectTab"
              :client-list="false"
              cnt-title="联系人详情"
              :has-button="false"></connectInfo>
            <newLinkman
              class="module-linkman"
              v-if="showN"
              @cntClose="showN = false"
              @cntConfirm="cntConfirmNew"
              :new-connect="connectTab2"
              :client-list="false"
              cnt-title="新建联系人"
              :has-button="true"
              :isNewEdite="true"
              :connection-tab="newConnectionTab"></newLinkman>
            <newLinkman
              class="module-linkman"
              v-if="showEdit"
              @cntClose="showEdit = false"
              @cntConfirm="cntConfirm3"
              :new-connect="connectTab2"
              :client-list="false"
              cnt-title="编辑联系人"
              :has-button="true"
              :isNewEdite="false"
              :connection-tab="connectionTab1"></newLinkman>
            <new-follow-layer
              class="layer-newFollow"
              v-if="showNFL"
              @cntClose="showNFL = false"
              @cntConfirm="cntConfirmNew"
              cnt-title="新建跟进"
              :has-button="true"></new-follow-layer>
            <new-business-layer
              class="layer-newFollow"
              v-if="showNBL"
              @cntClose="showNBL = false"
              @cntConfirm="cntConfirm"
              cnt-title="添加销售商机"
              :has-button="true"></new-business-layer>
            <new-indent-layer
              class="layer-newFollow"
              v-if="showNIL"
              @cntClose="showNIL = false"
              @cntConfirm="cntConfirm"
              cnt-title="添加成交记录"
              :has-button="true"></new-indent-layer>
            <connectInfo
              class="modifyLayer"
              v-if="showM"
              @cntClose="showM = false"
              @cntConfirm="cntConfirm2"
              :client-list="false"
              :connect-tab="false"
              :tab-lists="tipLists"
              cnt-title="标签管理"
              :has-button="true"
              :has-rating="false"></connectInfo>
          </div>
          <div class="client-tips">
              <div class="box-right-k">
                <h3 class="title star-title">客户星级 <span class="rating-level">{{ratingLevel}}星</span></h3>
                <div class="box-right-star-box">
                  <div class="block">
                    <el-rate v-model="ratingLevel"></el-rate>
                  </div>
                </div>
              </div>
            <div class="box-right-k tip-manage">
              <div>
                <h3 class="title">客户标签</h3>
                <span class="tip-manage-btn" @click="showM = true">
                  <i class="manage-icon"></i>
                  标签管理
                </span>
              </div>
            </div>
            <div class="box-right-k tip-list">
              <span class="tip-span" v-for="item in selectVal">{{item.text}}</span>
            </div>
            <div class="box-right-k">
              <h3 class="title">快捷选项</h3>
              <div class="create-btn">
                <span class="tip-span" @click="showNFL = true">新建跟进</span>
                <span class="tip-span clearfix">新建商机</span>
              </div>
            </div>
          </div>
        </el-dialog>
      </div>
    </div>
  </div>
</template>
<script>
  import newLinkman from "./layer_newLinkman.vue"
  import connectInfo from "./smallLayer.vue"
  import companyInfo from "./CompanyInfo_editor.vue"
  import newFollowLayer from "./layer_newFollow.vue"
  import newBusinessLayer from "./layer_newBusiness.vue"
  import newIndentLayer from "./layer_newIndent.vue"
  export default {
    components: {
      connectInfo,
      companyInfo,
      newLinkman,
      'new-follow-layer': newFollowLayer,
      'new-business-layer': newBusinessLayer,
      'new-indent-layer': newIndentLayer
    },
    data()
  {
    return {
      myIndex : 0,
      ratingLevel: 0,
      activeName: 'second',
      selectVal: [
        {text: '手机、通讯录'},
        {text: '默认产品'},
        {text: '易外销搜索客户'},
        {text: '收集状态'},
        {text: '代理商'},
        {text: '重点跟进客户'},
      ],
      myDate: Date.now(),
      textarea: '',
      myipt: true,
      test: true,
      showC: false,
      showN: false,
      showM: false,
      showEdit: false,
      showNFL: false,
      showNBL: false,
      showNIL: false,
      emailShow: true,
      planShow: true,
      tabCheck: '0',
      connectTab: [
        {
          title: "姓名",
          info: "sales"
        },
        {
          title: "职位",
          info: " "
        },
        {
          title: "邮箱",
          info: "sales@metalprices.com"
        },
        {
          title: "电话",
          info: " "
        },
        {
          title: "手机",
          info: "713 968 0023"
        },
        {
          title: "性别",
          info: "男"
        },
        {
          title: "地址",
          info: " "
        },
        {
          title: "网址",
          info: "http://www.metalprices.com"
        }
      ],
      connectTab2: [
        {
          title: "姓名",
          info: "sales"
        },
        {
          title: "职位",
          info: " "
        },
        {
          title: "邮箱",
          info: "sales@metalprices.com"
        },
        {
          title: "电话",
          info: " "
        },
        {
          title: "手机",
          info: "713 968 0023"
        },
        {
          title: "性别",
          info: "男"
        },
        {
          title: "地址",
          info: " "
        },
        {
          title: "网址",
          info: "http://www.metalprices.com"
        }
      ],
      createClTab: [],
      recTab: [
        {date: "2016-04-23 18:27:12"}
      ],
      dtTab: [
        {
          date: "2016-04-23 18:27:12",
          life: "helloWorld"
        }
      ],
      tabLists: [
        {
          text: "动态",

        },
        {
          text: "跟进记录"
        },
        {
          text: "生命线"
        }
      ],
      tableInfo: [
        {
          text: "基本信息",
          empty: " "
        },
        {
          text1: "企业全称",
          text2: "Exchange), COMEX, NYMEX, Copper, Aluminum, Nickel, Tin, Lead",
          text3: "联系人姓名",
          text4: "sales",
          red: "*"
        },
        {
          text1: "所在国家",
          text2: " ",
          text3: "联系人邮箱",
          text4: "123@163.com"
        },
        {
          text1: "首次联系",
          text2: "2017-07-15",
          text3: "联系人电话",
          text4: " "
        },
        {
          text: "其它信息",
          empty: " "
        },
        {
          text1: "省份/州/区",
          text2: " ",
          text3: "城市",
          text4: " "
        },
        {
          text1: "企业简称",
          text2: "123公司",
          text3: "员工规模",
          text4: "1-50"
        },
        {
          text1: "手机",
          text2: "713 968 0023",
          text3: "职位",
          text4: " "
        },
        {
          text1: "传真",
          text2: " ",
          text3: "网址",
          text4: "http://www.metalprices.com"
        },
        {
          text1: "地址",
          empty: " "
        },
        {
          text: "业务信息",
          empty: " "
        },
        {
          text1: "所属行业",
          text2: "手机、通讯",
          text3: "意向产品",
          text4: "默认产品"
        },
        {
          text1: "客户分类",
          text2: "默认分类",
          text3: "客户状态",
          text4: "收集状态"
        },
        {
          text1: "客户关系",
          text2: "代理商",
          text3: "客户来源",
          text4: "易外销搜索客户"
        }
      ],
      connectionTab: [
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023",
          job:'业务员',
          sex:'男',
          address:'深圳市龙岗区科飞时速',
          url:'www.yiwaixiao.com'
        },{
          name: "hello",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023",
          job:'业务员',
          sex:'男',
          address:'深圳市龙岗区科飞时速',
          url:'www.yiwaixiao.com'
        },{
          name: "joker",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023",
          job:'业务员',
          sex:'女',
          address:'深圳市龙岗区科飞时速',
          url:'www.yiwaixiao.com'
        },
      ],
      connectionTab1:'',
      newConnectionTab:[
        {
          name: " ",
          email: " ",
          date: " ",
          tel: " ",
          phone: " ",
          job:" ",
          sex:" ",
          address:" ",
          url:" "
        }
      ],
      getEmailTab: [
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        },
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        },
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        }
      ],
      sendEmailTab: [],
      planTab: [
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        },
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        },
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        }
      ],
      recordTab: [],
      planOption: [
        {
          text: "联系工具"
        },
        {
          text: "邮件"
        },
        {
          text: "电话"
        },
        {
          text: "上门"
        },
        {
          text: "网络联系"
        }
      ],
      statuOption: [
        {
          statu: "所有计划"
        },
        {
          statu: "已执行"
        },
        {
          statu: "超时未处理"
        },
        {
          statu: "未执行"
        }
      ],
      recordOption: [
        {
          record: "所有记录"
        },
        {
          record: "手工建立记录"
        },
        {
          record: "收件箱标记邮件"
        },
        {
          record: "发件箱标记邮件"
        },
        {
          record: "营销邮发邮件"
        }
      ],
      businessTab: [
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        },
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        },
        {
          name: "sales",
          email: "sales@metalprices.com",
          date: "2016-04-23",
          tel: "无",
          phone: "713 968 0023"
        }
      ],
      successTab: [],
      tipLists: [
        {
          selected: '1',
          title: "所属行业：",
          optionLists: [
            {
              text: "手机、通讯",
              value: '1'
            },
            {
              text: "消费电子/首饰",
              value: '2'
            },
            {
              text: "电脑及配件",
              value: '3'
            },
            {
              text: "汽车、摩托车及零部件",
              value: '4'
            },
            {
              text: "服装服饰",
              value: '5'
            },
            {
              text: "鞋、袜、帽及配件",
              value: '6'
            },
            {
              text: "箱包",
              value: '7'
            },
            {
              text: "钟表、珠宝首饰、眼镜",
              value: '8'
            },
            {
              text: "运动及娱乐",
              value: '9'
            },
            {
              text: "玩具",
              value: '10'
            },
            {
              text: "礼品、工艺品",
              value: '11'
            },
            {
              text: "健康美容、个人护理",
              value: '12'
            },
            {
              text: "照明、灯具",
              value: '13'
            },
            {
              text: "家居园艺",
              value: '14'
            },
            {
              text: "家具及室内装饰品",
              value: '15'
            },
            {
              text: "办公用品及文具",
              value: '16'
            },
            {
              text: "包装和纸",
              value: '17'
            },
            {
              text: "印刷和出版",
              value: '18'
            },
            {
              text: "安全产品",
              value: '19'
            },
            {
              text: "汽车配件",
              value: '20'
            },
            {
              text: "五金工具",
              value: '21'
            },
            {
              text: "纺织",
              value: '22'
            },
            {
              text: "家用电器",
              value: '23'
            },
            {
              text: "食品及饮料",
              value: '24'
            },
            {
              text: "其他",
              value: '25'
            },
            {
              text: "新能源",
              value: '26'
            },
            {
              text: "电子电气",
              value: '27'
            }
          ]
        }, {
          selected: '1',
          title: "意向产品：",
          optionLists: [
            {
              text: "默认产品",
              value: '1'
            },
            {
              text: "电子原配件",
              value: '2'
            },
            {
              text: "mini pc",
              value: '3   '
            }
          ]
        }, {
          selected: '1',
          title: "客户来源：",
          optionLists: [
            {
              text: "易外销搜索客户",
              value: '1'
            },
            {
              text: "公司网站",
              value: '2'
            },
            {
              text: "B2B平台",
              value: '3'
            },
            {
              text: "展会获取",
              value: '4'
            }
          ]
        }, {
          selected: '1',
          title: "客户状态：",
          optionLists: [
            {
              text: "收集状态",
              value: '1'
            },
            {
              text: "开发状态",
              value: '2'
            },
            {
              text: "跟进状态",
              value: '3'
            },
            {
              text: "潜在客户",
              value: '4'
            },
            {
              text: "意向客户",
              value: '5'
            },
            {
              text: "成交客户",
              value: '6'
            }
          ]
        }, {
          selected: '1',
          title: "客户关系：",
          optionLists: [
            {
              text: "代理商",
              value: '1'
            },
            {
              text: "供货商",
              value: '2'
            },
            {
              text: "新客户",
              value: '3'
            },
            {
              text: "老客户",
              value: '4'
            },
            {
              text: "广告商",
              value: '5'
            }
          ]
        }, {
          selected: '1',
          title: "客户分类：",
          optionLists: [
            {
              text: "重点跟进客户",
              value: '1'
            },
            {
              text: "默认分类",
              value: '20'
            },
            {
              text: "重点意向客户",
              value: '30'
            },
            {
              text: "一般潜在客户",
              value: '4'
            },
            {
              text: "阿里",
              value: '5'
            },
            {
              text: "美国客户",
              value: '6'
            },
            {
              text: "JP",
              value: '7'
            },
            {
              text: "KP",
              value: '8'
            }
          ]
        }
      ]
    };
  }
  ,
  methods: {
    handleClick(tab, event)
    {
//      console.log(tab, event);
    },
    close(){
      this.$emit('closeInfo', false)
    },
    cntConfirm(){
      this.showN = false;
      this.showNFL = false;
      this.showNBL = false;
      this.showNIL = false;
    },
    cntConfirm2(){
      this.selectVal = [];
      let len = this.tipLists.length;
      for (var i = 0; i < len; i++) {
        this.selectVal.push({text: $('.selected option:selected')[i].text});
        this.showM = false;
      }
    },
    cntConfirm3(){
      let i = this.myIndex;
      let cTb = this.connectionTab;
      let result= $.extend(true,cTb[i],this.connectionTab1);
      cTb[i] = result;
      this.showEdit = false;
    },
    cntConfirmNew(){
      console.log(this.newConnectionTab[0])
    },
    submitDt(){
      this.dtTab.push({date: this.myDate, life: this.textarea})
      this.textarea = ''
    },
    tabChange(v){
      this.tabCheck = v;
    },
    linkEdit(index){
      this.myIndex = index;
      let cTb = this.connectionTab;
      this.showEdit = true;
      for(var i=0;i<cTb.length;i++){
          if(i==index){
            //深度拷贝
            let result= $.extend(true,this.connectionTab1,cTb[i]);
            this.connectionTab1 = result;
          }
      }
    }
  },
  filters: {
    time (input) {
      var d = new Date(input);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
    }
  }
}
</script>
<style lang="less" src="../../../less/crm_moreInfo_editor.less"></style>
<style lang="less" src="../../../less/crmMoreInfo.less"></style>

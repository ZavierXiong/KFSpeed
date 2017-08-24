<template>
  <div id="crm-content" class="crm-content">
    <!--<searchBar :my-title="myTitle"></searchBar>-->
    <div class="crm-content-title">
      <span class="crm-content-site" v-for="title in myTitle">您的位置：{{title.name}} <i class="refresh"></i></span>
      <!--搜索框-->
      <!--<common-search></common-search>-->
    </div>
    <div class="crm-origin-operator">
      <div class="operator-box">
        <div class="operator-btn operate-title"><span>操作:</span></div>
        <div class="operator-btn" @click="cancelShare" v-if="hasCancelShare"><span>取消共享</span></div>
        <div class="operator-btn"><span>导出</span></div>
      </div>
    </div>
    <div class="crm-table">
      <table width="100%" cellpadding="0" cellspacing="0">
        <thead>
        <tr>
          <th height="30" class="th">
            <div style="width:10px;"></div>
          </th>
          <th height="30" class="th">
            <div style="width:20px;">
              <input type="checkbox" @click="selectAll" class="selectButton"/>
            </div>
          </th>
          <th height="30" class="th">
            <div style="width:350px;">
              <span>企业信息</span>
            </div>
          </th>
          <th height="30" class="th">
            <div style="width:100px;">
              <span>联系电话</span>
            </div>
          </th>
          <th  height="30" class="th">
            <div style="width:80px;">
              <span>客户录入时间</span>
            </div>
          </th>
          <th width="15%" height="30" class="th">
            <div>
              <span>共享时间</span>
            </div>
          </th>
          <th width="15%" height="30" class="th">
            <div>
              <span>最后联系时间</span>
            </div>
          </th>
          <th width="15%" height="30" class="th" v-if="!colleagueOption">
            <div>
              <span>共享给</span>
            </div>
          </th>
          <th width="15%" height="30" class="th" v-if="colleagueOption">
            <select name="" id="" class="colleague-filter">
              <option value="" v-for="option in colleagueOption">{{option.name}}</option>
            </select>
          </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(td,index) in tdLists" class="_tr">
          <td height="50" class="td">
            <div ></div>
          </td>
          <td height="50" class="td">
            <div>
              <input type="checkbox" class="selectButton" :value="index" v-model="selectArr"/>
            </div>
          </td>
          <td height="50" class="td">
            <div>
              <span class="user-info">
                <p class="crm-infoTitle" @click="showN = true">{{td.info}}</p>
                <p class="crm-infoEmail">{{td.infoEmail}}</p>
              </span>
            </div>
          </td>
          <td height="50" class="td">
            <div>
              <span>{{td.tel}}</span>
            </div>
          </td>
          <td height="50" class="td">
            <div>
              <span>{{td.inDate}}</span>
            </div>
          </td>
          <td height="50" class="td">
            <div>
              <span>{{td.shareDate}}</span>
            </div>
          </td>
          <td height="50" class="td">
            <div>
              <span>{{td.lastDate}}</span>
            </div>
          </td>
          <td height="50" class="td" v-if="!colleagueOption">
            <div>
              <span v-if="td.shareTo.length>1?false:true" v-for="item in td.shareTo">{{item.name}}</span>
              <span v-if="td.shareTo.length>1?true:false" class="share-colleague" @click="moreColleague(index)">{{td.shareTo.length}}个同事</span>
            </div>
          </td>
          <td height="50" class="td" v-if="colleagueOption">
            <div>
              <span>{{td.whoShare}}</span>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
    <!--<el-pagination :page-size="10" layout="size,prev,pgaer,next,jumper" :total="100"></el-pagination>-->
    <el-pagination
      class="paging"
      :current-page.sync="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="sizes, prev, pager, next"
      :total="100">
    </el-pagination>
    <!--新建跟进中的请选择按钮弹框-->
    <transition name="fade">
      <small-layer
        class="smallLayer"
        v-if="showC"
        @cntClose="showC = false"
        @cntConfirm="cntConfirm"
        :client-list="clientList"
        :my-index="clientList.value"
        :connect-tab="false"
        cnt-title="转移给"
        :has-button="true"></small-layer>
    </transition>
    <!--点击修改分类出现弹框-->
    <transition name="fade">
      <small-layer
        class="modifyLayer"
        v-if="showM"
        @cntClose="showM = false"
        @cntConfirm="cntConfirm2"
        :client-list="false"
        :connect-tab="false"
        :tab-lists="tabLists"
        cnt-title="客户移动"
        :has-button="true"
        :has-rating="true"></small-layer>
    </transition>
    <!--共享客户弹框-->
    <transition name="fade">
      <small-layer
        class="shareLayer"
        v-if="hasShared"
        @cntClose="hasShared = false"
        cnt-title="共享给"
        :share-info="shareInfo"
        ></small-layer>
    </transition>
    <!--新建跟进弹框-->
    <transition name="fade">
      <createFollow
        v-if="showF"
        @close="showF=false"></createFollow>
      <moreInfoEdit
        v-if="showN"
        @closeInfo="showN = false"
        :share-tab="shareTab"
        @cancelS="cancelS"
        @cancelAlls="cancelAlls"
        :has-share="true"></moreInfoEdit>
    </transition>

  </div>
</template>
<script>
  //  import searchBar from "../CommonItem/searchBar.vue"
  import commonSearch from '../../CommonItem/commonSearch.vue'
  import smallLayer from "../../CommonItem/smallLayer.vue"
  import createFollow from ".././allClient-createFollow.vue"
  import moreInfoEdit from "../../CommonItem/crmMoreInfo_Editor.vue"
  export default ({
    name:"crmContent",
    data(){
    return{
      hasShared:false,
      currentPage:2,
      itemNum:-1,
      showF : false,
      showM : false,
      showN : false,
      hasShared:false,
      selectArr:[],
      showC:false,
      shareTab:[
        {
          name:'馥芮白'
        },
        {
          name:'馥芮白1'
        },
        {
          name:'馥芮白2'
        },
        {
          name:'馥芮白3'
        },
        {
          name:'馥芮白4'
        }
      ],
      shareInfo:[
      ],
      clientList:[
        {
          name:"权威",
          checked:true
        },
        {
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
      proLists:[
        {
          name:"所有",
          checked:true
        }, {
          name:"报价",
          checked:false
        }, {
          name:"样品",
          checked:false
        }, {
          name:"咨询",
          checked:false
        }, {
          name:"订单",
          checked:false
        }, {
          name:"账款",
          checked:false
        }, {
          name:"无",
          checked:false
        }
      ],
      selectTabs:[
        {
          name:"录入时间",
          text1:"昨天",
          text2:"最近7天",
          text3:"最近30天",
          text4:"自定义",
          search:true
        },{
          name:"联系时间",
          text1:"今天",
          text2:"本周",
          text3:"本月",
          text4:"上月",
          text5:"最近三个月",
          text6:"指定联系时间",
          search:true
        },{
          name:"客户关系",
          text1:"无",
          text2:"代理商",
          text3:"供货商",
          text4:"新客户",
          text5:"老客户",
          text6:"广告商"
        },{
          name:"客户来源",
          text1:"无",
          text2:"易外销搜索客户",
          text3:"公司网站",
          text4:"B2B平台",
          text5:"展会获取"
        },{
          name:"客户星级",
          text1:"无星级",
          text2:"一星",
          text3:"二星",
          text4:"三星",
          text5:"四星",
          text6:"五星"
        },{
          name:"我的公海",
          text1:"7天内未联系客户入公海库",
          text2:"7天内未成交客户入公海库",
          text3:"7天内成交未联系客户入公海库",
        },{
          name:"成交记录数",
          text1:"未成交",
          text2:"5单内",
          text3:"10单内",
          text4:"指定成交记录数",
          scope:true
        },{
          name:"指定成交金额数",
          scope:true
        },{
          name:"入库方式",
          text1:"手工创建",
          text2:"普通导入",
          text3:"系统导入",
          text4:"联系人转为",
          text5:"别人转移",
          text6:"回收站转移",
          text7:"回收站恢复",
          text8:"公海库领取",
          text9:"发邮件保存",
        },{
          name:"关注产品",
          text1:"无",
          text2:"默认产品",
          text3:"电子原配件",
          text4:"mini pc"
        }
      ],
      tabLists:[
        {
          title:"所属行业：",
          optionLists:[
            {
              text:"手机、通讯"
            },
            {
              text:"消费电子/首饰"
            },
            {
              text:"电脑及配件"
            },
            {
              text:"汽车、摩托车及零部件"
            },
            {
              text:"服装服饰"
            },
            {
              text:"鞋、袜、帽及配件"
            },
            {
              text:"箱包"
            },
            {
              text:"钟表、珠宝首饰、眼镜"
            },
            {
              text:"运动及娱乐"
            },
            {
              text:"玩具"
            },
            {
              text:"礼品、工艺品"
            },
            {
              text:"健康美容、个人护理"
            },
            {
              text:"照明、灯具"
            },
            {
              text:"家居园艺"
            },
            {
              text:"家具及室内装饰品"
            },
            {
              text:"办公用品及文具"
            },
            {
              text:"包装和纸"
            },
            {
              text:"印刷和出版"
            },
            {
              text:"安全产品"
            },
            {
              text:"汽车配件"
            },
            {
              text:"五金工具"
            },
            {
              text:"纺织"
            },
            {
              text:"家用电器"
            },
            {
              text:"食品及饮料"
            },
            {
              text:"其他"
            },
            {
              text:"新能源"
            },
            {
              text:"电子电气"
            }
          ]
        },{
          title:"客户分类：",
          optionLists:[
            {
              text:"重点跟进客户"
            },
            {
              text:"默认分类"
            },
            {
              text:"重点意向客户"
            },
            {
              text:"一般潜在客户"
            },
            {
              text:"阿里"
            },
            {
              text:"美国客户"
            },
            {
              text:"JP"
            },
            {
              text:"KP"
            }
          ]
        },{
          title:"客户来源：",
          optionLists:[
            {
              text:"易外销搜索客户"
            },
            {
              text:"公司网站"
            },
            {
              text:"B2B平台"
            },
            {
              text:"展会获取"
            }
          ]
        },{
          title:"客户状态：",
          optionLists:[
            {
              text:"收集状态"
            },
            {
              text:"开发状态"
            },
            {
              text:"跟进状态"
            },
            {
              text:"潜在客户"
            },
            {
              text:"意向客户"
            },
            {
              text:"成交客户"
            }
          ]
        },{
          title:"客户关系：",
          optionLists:[
            {
              text:"代理商"
            },
            {
              text:"供货商"
            },
            {
              text:"新客户"
            },
            {
              text:"老客户"
            },
            {
              text:"广告商"
            }
          ]
        },{
          title:"意向产品：",
          optionLists:[
            {
              text:"默认产品"
            },
            {
              text:"电子原配件"
            },
            {
              text:"mini pc"
            }
          ]
        }
      ],
      titleList:[
        {
          text:"录入时间"
        },{
          text:"联系时间"
        },{
          text:"客户关系"
        },{
          text:"客户来源"
        },{
          text:"客户星级"
        },{
          text:"我的公海"
        },{
          text:"成交记录"
        },{
          text:"成交金额"
        },{
          text:"入库方式"
        },{
          text:"关注产品"
        }
      ],
      selectTab:[{}],
      pickerOptions1: {
        shortcuts: [{
          text: '今天',
          onClick(picker) {
          picker.$emit('pick', new Date());
  }
  }]
  },
  dateValue: '',
    dateValue2:''
  }
  },
  props:[
    'myTitle',
    'hasCancelShare',
    'tdLists',
    'colleagueOption',
    'whoShare'
  ],
    components:{
//      searchBar,
    smallLayer,
      createFollow,
      moreInfoEdit,
      commonSearch
  },
  methods:{
    cancelShare(){
      let arr = [];
      var len = this.tdLists.length;
      for (var i = 0; i < len; i++) {
        if (this.selectArr.indexOf(i)>=0) {
        }else{
          arr.push(this.tdLists[i])
        }
      }
      if($('.selectButton').is(':checked')){
        this.$confirm('此操作将取消共享该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '成功!'
          });

        this.tdLists = arr;
        this.selectArr = []
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
    });
  }else{
    alert("请选择客户列表！")
  }
  },
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
  cntConfirm2:function(){
    this.showM = false;
  },
  cntConfirm3:function(){
    this.showP = false;
  },
  newFollow:function(){
    if($('.selectButton').is(':checked')){
      this.showF = true;
    }else{
      alert('请选择客户列表！')
    }
  },
  modifyClient:function(){
    if($('.selectButton').is(':checked')){
      this.showM = true;
    }else{
      alert('请选择客户列表！')
    }
  },
  selectAll:function(){
    var _this = this;
    if (!event.currentTarget.checked) {
      //反选
      this.selectArr = [];
    } else { //实现全选
      _this.selectArr = [];
      _this.tdLists.forEach(function(item, i) {
        _this.selectArr.push(i);
      });
    }
  },
  showMenu:function(index){
    this.itemNum = index;
  },
  dateSort(){
    this.$emit('dateSort')
  },
  IndateSort(){
    this.$emit('IndateSort')
  },
  starSort(){
    this.$emit('starSort')
  },
  cancelS(index){
    this.$confirm('此操作将取消共享该文件, 是否继续?', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      this.$message({
        type: 'success',
        message: '成功!'
      });
    this.shareTab.splice(index,1);
    this.shareTab = this.shareTab;
  }).catch(() => {
    this.$message({
      type: 'info',
      message: '已取消'
    });
  });
  },
  cancelAlls(){
    if(this.shareTab.length>0){
      this.$confirm('此操作将取消共享全部信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '成功!'
        });
      this.shareTab = [];
    }).catch(() => {
      this.$message({
        type: 'info',
        message: '已取消'
      });
  });
  }else{
    alert('无共享信息')
  }
  },
  moreColleague(v){
    this.hasShared = true;
    this.shareInfo = this.tdLists[v].shareTo;
  }
  }
  })
</script>
<style lang="less" src="../../../../less/crm_less/allClient.less"></style>

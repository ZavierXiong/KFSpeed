<template>
  <div id="crm-content">
    <searchBar :my-title="myTitle"></searchBar>
    <div class="crm-content-opr">
      <div class="crm-content-opr-tip">
        <span>操作：</span>
        <span class="opr-btn" @click="newFollow">新建跟进</span>
        <span class="opr-btn">单发邮件</span>
        <span class="opr-btn">邮件群发</span>
        <span  class="opr-btn" @click="modifyClient">修改分类</span>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
           更多操作<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="a"><span>删除客户</span></el-dropdown-item>
            <el-dropdown-item command="b"><span>转移给</span></el-dropdown-item>
            <el-dropdown-item command="c"><span>共享给</span></el-dropdown-item>
            <el-dropdown-item command="d"><span>加入公海</span></el-dropdown-item>
            <el-dropdown-item command="e"><span>导出客户</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <br>
      <div class="crm-content-opr-tip">
        <span>查看：</span>
        <span class="opr-btn">本周录入</span>
        <span>|</span>
        <span class="opr-btn">本周联系</span>
        <span>|</span>
        <span class="opr-btn">本月联系</span>
        <span>|</span>
        <span class="opr-btn">30天未联系</span>
        <el-dropdown  trigger="click">
          <span class="el-dropdown-link">
           高级查看<i class="el-icon-caret-bottom el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item,index) in titleList" ><span @click="showMenu(index)">{{item.text}}</span></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <br>
      <div v-for="(tab,index) in selectTabs" :class="itemNum == index?'m-active':'m-unactive'">
        <div class="crm-content-opr-tip">
          <span v-if="tab.name">{{tab.name}}：</span>
          <span v-if="tab.text1" class="opr-btn">{{tab.text1}}</span>
          <span v-if="tab.text2"><span>|</span><span class="opr-btn">{{tab.text2}}</span></span>
          <span v-if="tab.text3"><span>|</span><span class="opr-btn">{{tab.text3}}</span></span>
          <span v-if="tab.text4"><span>|</span><span class="opr-btn">{{tab.text4}}</span></span>
          <span v-if="tab.text5"><span>|</span><span class="opr-btn">{{tab.text5}}</span></span>
          <span v-if="tab.text6"><span>|</span><span class="opr-btn">{{tab.text6}}</span></span>
          <span v-if="tab.text7"><span>|</span><span class="opr-btn">{{tab.text7}}</span></span>
          <span v-if="tab.text8"><span>|</span><span class="opr-btn">{{tab.text8}}</span></span>
          <span v-if="tab.text9"><span>|</span><span class="opr-btn">{{tab.text9}}</span></span>
        </div>
        <div v-if="tab.search" class="search-bar">
          <input type="text"/>
          <span>-</span>
          <input type="text"/>
          <span class="search-btn">查询</span>
        </div>
        <div v-if="tab.scope"   class="search-bar">
          最少：
          <input type="text"/>
          最多：
          <input type="text"/>
          <span class="search-btn">查询</span>
        </div>
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
              <div style="width:20px;margin-right:10px;">
                <input type="checkbox" @click="selectAll"/>
              </div>
            </th>
            <th height="30" class="th">
              <div style="width:55px;cursor:pointer;" @click="showP = true">
                <span>进程</span>
                <i class="el-icon-caret-bottom" style="transform:scale(0.7);" title="按日期排序"></i>
              </div>
            </th>
            <th height="30" class="th">
              <div style="width:360px;">
                <span>企业信息</span>
                <i class="sortIcon" title="按日期排序"></i>
              </div>
            </th>
            <th height="30" class="th">
              <div style="width:120px;">
                <span>客户星级</span>
                <i class="sortIcon" title="按客户星级排序"></i>
              </div>
            </th>
            <th width="10%" height="30" class="th">
              <div>
                <span>入库时间</span>
                <i class="sortIcon" title="按日期排序"></i>
              </div>
            </th>
            <th width="10%" height="30" class="th">
              <div>
                <span>最后联系</span>
                <i class="sortIcon" title="按日期排序"></i>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(td,index) in infoLists" class="_tr">
            <td height="50" class="td">
              <div style="width:10px;"></div>
            </td>
            <td height="50" class="td">
              <div style="width:20px;">
                <input type="checkbox" :value="index" v-model="selectArr" class="selectButton"/>
              </div>
            </td>
            <td height="50" class="td">
              <div style="width:55px;">
                <span class="course">{{td.course}}</span>
              </div>
            </td>
            <td height="50" class="td">
              <div style="width:360px;">
                <i class="user-bg"></i>
                <span class="user-info">
                  <p class="crm-infoTitle" @click="showN = true">{{td.infoTitle}}<span v-if="hasShared">(已共享)</span></p>
                  <p class="crm-infoEmail">{{td.infoEmail}}</p>
                </span>
              </div>
            </td>
            <td height="50" class="td">
              <div style="width:120px;">
                <b class="star"></b>
              </div>
            </td>
            <td width="10%" height="50" class="td">
              <div>
                <span>{{td.date}}</span>
              </div>
            </td>
            <td width="10%" height="50" class="td">
              <div>
                <span>{{td.lastDate}}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!--新建跟进中的请选择按钮弹框-->
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
    <!--点击修改分类出现弹框-->
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
    <!--点击进程出现弹框-->
    <small-layer
      class="smallLayer"
      v-if="showP"
      @cntClose="showP = false"
      @cntConfirm="cntConfirm3"
      :client-list="proLists"
      :connect-tab="false"
      cnt-title="请选择销售进程"
      :has-button="true"></small-layer>
    <!--新建跟进弹框-->
    <createFollow v-if="showF" @close="showF=false"></createFollow>
    <moreInfoEdit v-if="showN" @closeInfo="showN = false"></moreInfoEdit>
  </div>
</template>
<script>
  import searchBar from "../CommonItem/searchBar.vue"
  import smallLayer from "../CommonItem/smallLayer.vue"
  import createFollow from "./allClient-createFollow.vue"
  import moreInfoEdit from "../CommonItem/crmMoreInfo_Editor.vue"
  export default ({
    name:"crmContent",
    data(){
      return{
        itemNum:0,
        showF : false,
        showM : false,
        showP : false,
        showN : false,
        hasShared:false,
        selectArr:[],
        showC:false,
        myTitle:[{
          name:" 全部客户 > 录入时间-降序 "
        }],
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
        infoLists:[
          {
            course:"无",
            infoTitle:"Quanzhou Dear Lover Fashion Apparel Co., Ltd.",
            infoEmail:"Service@wholesale-lingerie.cn",
            date:"2017-07-24",
            lastDate:"2017-07-24"
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
        selectTab:[
          {

          }
        ]
      }
    },
    components:{
      searchBar,
      smallLayer,
      createFollow,
      moreInfoEdit
    },
    methods:{

      handleCommand:function(command){
        switch (command){
          case 'a':
            let arr = [];
            var len = this.infoLists.length;
            for (var i = 0; i < len; i++) {
              if (this.selectArr.indexOf(i)>=0) {
              }else{
                arr.push(this.infoLists[i])
              }
            }
            if($('.selectButton').is(':checked')){
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
              alert("请选择客户列表！")
            }
                break;
          case 'b':
                let len = this.infoLists.length;
                for (var i = 0; i < len; i++) {
                  if (this.selectArr.indexOf(i)>=0) {
                    this.showC = true;
                  }else{
                  }
                }
                break;
          case 'c':
                let lens = this.infoLists.length;
                for (var i = 0; i < lens; i++) {
                  if (this.selectArr.indexOf(i)>=0) {
                    this.showC = true;
                  }else{
                  }
                }
                break;
          case 'd':
                let arr1 = [];
                var len = this.infoLists.length;
                for (var i = 0; i < len; i++) {
                  if (this.selectArr.indexOf(i)>=0) {
                  }else{
                    arr1.push(this.infoLists[i])
                  }
                }
                this.infoLists = arr1;
                this.selectArr = [];
                break;
          default:
                console.log('hahahha')
                break;
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
          _this.infoLists.forEach(function(item, i) {
            _this.selectArr.push(i);
          });
        }
      },
      showMenu:function(index){
        this.itemNum = index;
      }
    }
  })
</script>
<style lang="less" src="../../../less/allClient.less"></style>


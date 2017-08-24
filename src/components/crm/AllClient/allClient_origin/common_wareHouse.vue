<!--公共入客户库联系人组件-->
<template>
  <div>
    <div class="crm-content link-content" v-if="!islinkLocation">
      <div class="crm-content-title">
        <span class="crm-content-site" v-for="title in myTitle">您的位置：{{title.name}} <i class="refresh"></i></span>
      </div>
      <div class="crm-table">
        <table width="100%" cellpadding="0" cellspacing="0">
          <thead>
          <tr>
            <th height="30" class="th">
              <div style="width:25px;"></div>
            </th>
            <th height="30" class="th">
              <div style="width:350px;">
                <span>联系人信息</span>
              </div>
            </th>
            <th height="30" class="th">
              <div style="width:100px;">
                <span>创建时间</span>
              </div>
            </th>
            <th  height="30" class="th">
              <div style="width:80px;">
                <span>最后联系时间</span>
              </div>
            </th>
            <th width="15%" height="30" class="th">
              <div>
                <span>发信量</span>
              </div>
            </th>
            <th width="15%" height="30" class="th">
              <div>
                <span>收信量</span>
              </div>
            </th>
            <th width="15%" height="30" class="th">
              <div>
                <span>操作</span>
              </div>
            </th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(td,index) in storageList">
              <td class="td" height="50"></td>
              <td class="td" height="50">
                <div>
                  <i class="cus_bg"></i>
                  <span class="cus_info">
                    <p class="cus_name" @click="moreLmInfo">{{td.name}}</p>
                    <p class="cus_email">{{td.email}}</p>
                  </span>
                </div>
              </td>
              <td class="td" height="50">
                <div>
                  <span>{{td.createDate}}</span>
                </div>
              </td>
              <td class="td" height="50">
                <div>
                  <span v-if="td.lastDate">{{td.lastDate}}</span>
                  <span v-if="!td.lastDate">暂未联系</span>
                </div>
              </td>
              <td class="td" height="50">
                <div>
                  <span>{{td.sendMessage}}</span>
                </div>
              </td>
              <td class="td" height="50">
                <div>
                  <span>{{td.getMessage}}</span>
                </div>
              </td>
              <td class="td" height="50">
                <i class="editIcon" @click="showEdit=true" v-if="hasInWarehouse"></i>
                <i class="deleteIcon" @click="deleteLi(index)"></i>
                <!--<i class="locationIcon" @click="linkLocation" v-if="!hasInWarehouse"></i>-->
                <router-link to="allClientOrigin_locationLinkMan">
                  <i class="locationIcon"  v-if="!hasInWarehouse"></i>
                </router-link>
                <i class="addIcon" @click="crC = true" v-if="hasInWarehouse"></i>
              </td>
            </tr>
          </tbody>
        </table>
        <router-view></router-view>
        <el-pagination
          class="paging"
          :current-page.sync="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          layout="sizes, prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    </div>
    <small-layer
      v-if="showC"
      @cntClose="showC = false"
      :link-list="linkList"
      cnt-title="联系人详情"></small-layer>
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
    <create-client
      v-if="crC"
      @close="close"></create-client>
  </div>

</template>
<script>
  //点击未入客户库联系人操作编辑按钮
  import newLinkman from "../../CommonItem/layer_newLinkman.vue"
  import createClient from './common_createLink.vue'
  import smallLayer from '../../CommonItem/smallLayer.vue'
  export default({
    data(){
      return{
        currentPage:2,
        crC:false,
        showC:false,
        showEdit: false,
        islinkLocation:false,
        linkList:[
          {
            name:'lan123ina',
            job:'',
            email:'	ina@yiwaixiao.com',
            phone:'',
            tel:'',
            sex:'男',
            address:'',
            url:''
          }
        ],
        locationTitle:[{
          name:" 全部客户 > 已入库联系人定位 "
        }],
        infoLists:[
          {
            course:"无",
            infoTitle:"xiaolaosdoasd.",
            infoEmail:"Service@wholesale-lingerie.cn",
            date:"2014-01-24",
            lastDate:"2017-07-24",
            stars :[
            ]
          },{
            course:"无",
            infoTitle:"123用户",
            infoEmail:"Service@wholesale-lingerie.cn",
            date:"2017-04-24",
            lastDate:"2012-05-25",
            stars :[
              {a:true},
              {a:true}
            ]
          },{
            course:"无",
            infoTitle:"123用户",
            infoEmail:"Service@wholesale-lingerie.cn",
            date:"2017-03-24",
            lastDate:"2017-05-25",
            stars :[
              {a:true},
              {a:true}
            ]
          },{
            course:"无",
            infoTitle:"123用户",
            infoEmail:"Service@wholesale-lingerie.cn",
            date:"2011-04-24",
            lastDate:"2017-05-25",
            stars :[
              {a:true},
              {a:true}
            ]
          },{
            course:"无",
            infoTitle:"123用户",
            infoEmail:"Service@wholesale-lingerie.cn",
            date:"2017-04-24",
            lastDate:"2017-05-25",
            stars :[
              {a:true},
              {a:true}
            ]
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
        connectionTab1:''
      }
    },
    components:{
      smallLayer,
      newLinkman,
      createClient
    },
    props:[
      'myTitle',
      'storageList',
      'hasInWarehouse'
    ],
    methods:{
      deleteLi(v){
      this.$confirm('此操作将删除该联系人, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });

        this.storageList.splice(v,1)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      moreLmInfo(){
        this.showC = true;
      },
      linkLocation(){
        this.islinkLocation=true
      },
      cntConfirm3(){
        let i = this.myIndex;
        let cTb = this.connectionTab;
        let result= $.extend(true,cTb[i],this.connectionTab1);
        cTb[i] = result;
        this.showEdit = false;
      },
      close(){
        this.crC = false;
      }
    }
  })
</script>
<style lang="less" src="../../../../less/crm_less/allClient.less"></style>
<style lang="less" src="../../../../less/crm_less/crm_moreInfo_editor.less"></style>
<style lang="less">
  .crm-content.link-content{
    .crm-content-title{
      border-bottom:0;
    }
    .crm-table{
      .cus_bg{
        display: inline-block;
        width:30px;
        height:30px;
        background:url('/static/img/crm_images/icon/linkMan.png') no-repeat;
        vertical-align: middle;
      }
      .cus_info{
        display: inline-block;
        vertical-align: middle;
        margin-left:10px;
        .cus_name{
          color:#20a0ff;
          cursor:pointer;
        }
        .cus_email{
          cursor: pointer;
        }
      }
      .td{
        .deleteIcon{
          display: inline-block;
          width:16px;
          height:16px;
          background-image:url('/static/img/crm_images/icon/addcus.png');
          background-position:-40px 0;
          background-repeat: no-repeat;
          cursor: pointer;
          vertical-align: middle;
        }
        .locationIcon{
          cursor: pointer;
          display: inline-block;
          width:12px;
          height:15px;
          background:url('/static/img/crm_images/icon/location.png') no-repeat;
          margin-left:5px;
          vertical-align: middle;
        }
        .editIcon{
          .deleteIcon;
          background-position:-20px 0;
        }
        .addIcon{
          .deleteIcon;
          background-position:0 0;
        }
      }
    }
  }
</style>

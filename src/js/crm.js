/**
 * Created by 陈立珍 on 2017/7/31.
 */

var acus_customerid = 0;//客户ID
var um_rcurrpage = 1;
var acus_findconditionvalue = 0;//客户页面加载的条件值

var acus_mailcurrpage = 1;//客户邮件列表当前页
var acus_mailtolpage = 1;//客户邮件列表总页数

var userids = "";//多用户id
var acus_currentjsp = 0;//当前所在页面
var acus_findcondition = 0;//客户页面加载的条件
var acus_findconditionvalue = 0;//客户页面加载的条件值
var acurrent_select_type = 0;//默认是全部客户，0是全部客户，2是客户分类，3是客户状态
var acurrent_select_value = 0;//若acurrent_select_type是2，则是客户分类的具体值，若acurrent_select_type是3，则是客户状态的具体值
var bigname = "全部客户";
var acus_check = "";

var acus_checkid="";//选择的客户ID
var acus_checkuserid="";//选择的用户ID

export default {
  props: [],
  data(){
    return {
      allCustomerLists: [],//全部客户集合
      cusStateLists: [],//客户状态集合
      paginations: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
      },
      crmTableLists: [],//表格数据
      processLists: [],//销售进程
      cusLinkLists: [],//客户关系
      cusFormLists: [],//客户来源
      staffLists:[],//员工集合
      focusProductLists: [],//关注产品
      salesProcess: false,//销售进程弹窗
      cus_detailInfo: false,//客户详细信息弹窗
      addFollow: false,//新建跟进
      acusChooseSales:false,//销售进程弹窗
      transformCus:false, //转移给客户
    }
  },
  methods: {

//全选全不选
    acus_checkeAll() {
      if ($("#acus_checkeAll").val() == "yes") {
        $("#acus_checkeAll").attr("value", "no");
        //全选
        $("input[name='acus_checkbox']").each(function () {
          $(this).attr("checked", "checked");
        });
      } else if ($("#acus_checkeAll").val() == "no") {
        $("#acus_checkeAll").attr("value", "yes");
        //全不选
        $("input[name='acus_checkbox']").each(function () {
          $(this).attr("checked", false);
        });
      }
    },
  //选择checkbox
    acus_chooseCheckbox(userId,companyId){
      if($("input[type='checkbox']").is(':checked')){
        acus_checkid += companyId + ',';
        acus_checkuserid += userId + ',';
      }else {
        acus_checkid="";
        acus_checkuserid="";
      }
    },

//已入客户库联系人
    cus_loadpage(value, condition, conditionvalue){
      var vm = this;
      alert(value + "----" + condition + "---" + conditionvalue)
      acus_findcondition = condition;//客户页面加载的条件
      acus_findconditionvalue = conditionvalue;//客户页面加载的条件
      if (value == 1) {//加载客户页面
        if (condition == 0 || condition == 2 || condition == 3) {
          acurrent_select_type = condition;
          acurrent_select_value = conditionvalue;
          if (condition == 0) {
            bigname = "全部客户";
          }
          else if (condition == 2) {//客户分类
            bigname = $("#acus_whereid" + conditionvalue).html();
          }
          else if (condition == 3) {//客户状态
            bigname = $("#acus_wherestatusid" + conditionvalue).html();
          }
        }
      } else if (value == 4) {
        vm.$router.push({path: '/customerrecycle'})
      } else if (value == 5) {
        //跳转页面
        vm.$router.push({
          path: '/crmLink'
        })
      }
    },
    //表格数据
    crmTable(){
      this.axios.get('/static/json/team_crm.json', {params: {um_rcurrpage: 1}}).then(res => {
        if (res.data.code == 100) {
          this.crmTableLists = res.data.extend.data;
          this.paginations.total = res.data.extend.pageBean.totalRecord;
        } else {
          alert(res.data.msg);
        }
      });
      //查看第一个信息
      $(".cur_show_info").hover(function(event){
        var pointX=event.pageX-160;
        var pointY=event.pageY-60;
        $(".cus-popover").css({"left":pointX+"px","top":pointY+"px"});
        var tid=$(this).attr("tid");
        var dynamic = this.agetFirstDynamic(tid);
        if(dynamic==""){
          dynamic = "暂无动态";
        }
        var title="最新动态: "+dynamic;
        $(".cus-popover").find(".popover-content").html(title);
        $(".cus-popover").show();
      },function(){
        $(".cus-popover").hide();
      });


    },
    loadDynamic(){
      alert("rrtr")
    },
    //获取销售进程的数据
    giveSalesProcessData(){
      this.axios.get('/static/json/process.json').then(res => {
        if (res.data.code == 100) {
          this.processLists = res.data.extend.data;
        } else {
          alert(res.data.msg);
        }
      });
    },
    //销售进程
    ashow_process(){
      this.salesProcess = true;//弹窗
      this.giveSalesProcessData();//获取数据
    },
    //操作的点击事件(邮件群发)
    ayxy_send(){
      /** 判断是否选择了列表 */
      if (acus_checkid == "") {
        alert("请选择客户列表！")
        return false;
      }
      acus_checkid = acus_checkid.substring(0, acus_checkid.length - 1);
      this.acusChooseSales = true;
      this.giveSalesProcessData();//获取数据
    },
    //删除客户
    acrm_customer_del(){
      /** 判断是否选择了列表 */
      if (acus_checkid == "") {
        alert("请选择客户列表！")
        return false;
      }
      acus_checkid = acus_checkid.substring(0, acus_checkid.length - 1);
      var userId ="";
      if(acus_checkid.length>1){  //批量时只能针对一个用户
        //判断当前是单用户还是多用户
        acus_checkuserid = acus_checkuserid.substring(0, acus_checkuserid.length - 1);
        var userIds = acus_checkuserid.split(",");
        userId = userIds[0];
        if (userIds.length > 1) {
          for ( var i in userIds) {
            if (userId != userIds[i]) {
              alert("批量删除只能针对于某一个用户的客户！");
              return;
            }
          }
        }
      }
      var a = confirm("客户的共享信息会连同删除，确定要删除吗？");
      if(a == true){

      }

    },
    //转移客户
    acrm_customer_move(){
      if(acus_checkid==""){
        alert("请选择客户列表！");
        return;
      }
      var userId = "";
      if(acus_checkid.length>1) {  //批量时只能针对一个用户
        //判断当前是单用户还是多用户
        acus_checkuserid = acus_checkuserid.substring(0, acus_checkuserid.length - 1);
        var userIds = acus_checkuserid.split(",");
        userId = userIds[0];
        if (userIds.length > 1) {
          for ( var i in userIds) {
            if (userId != userIds[i]) {
              alert("批量转移只能针对于某一个用户的客户！");
              return;
            }
          }
        }
        //弹窗
        this.transformCus = true;
        this.axios.get('/static/json/process.json').then(res => {
          if(res.data.code == 100){
              this.staffLists = res.data.extend.moveCus;
          }
        });
      }

    },
    //加入公海
    acus_addpubliccustomer(){
      if(acus_checkid==""){
        alert("请选择客户列表！");
        return false;
      }
      acus_checkid=acus_checkid.substring(0,acus_checkid.length-1);
      var userId = "";
      if(acus_checkid.length>1) {  //批量时只能针对一个用户
        //判断当前是单用户还是多用户
        acus_checkuserid = acus_checkuserid.substring(0, acus_checkuserid.length - 1);
        var userIds = acus_checkuserid.split(",");
        userId = userIds[0];
        if (userIds.length > 1) {
          for ( var i in userIds) {
            if (userId != userIds[i]) {
              alert("批量加入公海库只能针对于某一个用户的客户！");
              return;
            }
          }
        }
      }
    },
    //导出客户
    acus_exportExcel(){
      var userId = "";
      if(acus_checkid.length>0) { //批量时只能针对一个用户
        //判断当前是单用户还是多用户
        acus_checkuserid = acus_checkuserid.substring(0, acus_checkuserid.length - 1);
        var userIds = acus_checkuserid.split(",");
        userId = userIds[0];
        if (userIds.length > 1) {
          for ( var i in userIds) {
            if (userId != userIds[i]) {
              alert("批量导出只能针对于某一个用户的客户！");
              return;
            }
          }
        }
      } else {//没有选中客户
        //判断当前是单用户还是多用户
        var user_select = $("#admin_employee").val();
        if(user_select.split(",").length > 1) {
          alert("批量导出只能针对于某一个用户的客户！");
          return;
        }
      }
    },
    //客户查询
    acus_findCustomerList(condition, conditionvalue){
      if (condition == 49) { //7天后未成交加入公海库
        if (this.$store.state.p_companyparamlist.length == 0) {
          this.$store.state.p_companyparamlist = this.fun_companyparam();
        }
        if (this.$store.state.p_companyparamlist.param183 == 0) { //不启用
          alert("企业未启用未成交客户加入公海库的功能！");
          return;
        } else {
          acus_findconditionvalue = this.$store.state.p_companyparamlist.param184;//客户页面加载的条
        }
      } else if (condition == 50) { //7天后成交客户未联系加入公海库
        if (this.$store.state.p_companyparamlist.length == 0) {
          this.$store.state.p_companyparamlist = this.fun_companyparam();
        }
        if (this.$store.state.p_companyparamlist.param185 == 0) { //不启用
          alert("企业未启用成交客户未联系加入公海库的功能！");
          return;
        } else {
          acus_findconditionvalue = this.$store.state.p_companyparamlist.param186;//客户页面加载的条
        }
      } else {
        if (condition == 48) { //7天后未联系客户加入公海库
          acus_findconditionvalue = this.$store.state.p_companyparamlist.param176;//客户页面加载的条件
        } else {
          acus_findconditionvalue = conditionvalue;//客户页面加载的条
        }
      }
    },
    //获取第一条动态内容
    agetFirstDynamic(cusid){
      var dynamic = "";
      $.ajax({
        "type": "POST",
        "async": false,
        "cache": false,
        "url": "dynamic_findFirstDynamicByCusid.action",
        data:{customer_id:cusid},
        success:function(res){
          if(res.code == 100){
            dynamic = res.extend.data;
          }else {
            alert(res.msg);
          }
        }
      });
      return dynamic;
    },
    //高级查看
    topView(i){
      if (i == 1) { //录入时间
        $("#entryTime").show();//录入时间显示
        $("#linkTime").hide();//联系时间隐藏
        $("#cusLink").hide();//客户联系隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#storageWay").hide();//入库方式隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 2) {//联系时间
        $("#linkTime").show();//联系时间显示
        $("#entryTime").hide();//录入时间隐藏
        $("#cusLink").hide();//客户联系隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#storageWay").hide();//入库方式隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 4) {//客户关系
        this.axios.get('../../../static/json/cusLink.json').then(res => {
          if (res.data.code == 100) {
            this.cusLinkLists = res.data.extend.data;
          }
        });
        $("#cusLink").show();//客户联系显示
        $("#linkTime").hide();//联系时间隐藏
        $("#entryTime").hide();//录入时间隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#storageWay").hide();//入库方式隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 5) { //客户来源
        this.axios.get('../../../static/json/cusform.json').then(res => {
          if (res.data.code == 100) {
            this.cusFormLists = res.data.extend.data;
          }
        });
        $("#cusForm").show();//客户来源显示
        $("#cusLink").hide();//客户联系隐藏
        $("#linkTime").hide();//联系时间隐藏
        $("#entryTime").hide();//录入时间隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#storageWay").hide();//入库方式隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 6) { //客户等级
        $("#cusLevel").show();//客户等级显示
        $("#entryTime").hide();//录入时间隐藏
        $("#linkTime").hide();//联系时间隐藏
        $("#cusLink").hide();//客户联系隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#storageWay").hide();//入库方式隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 7) { //我的公海
        $("#mySeas").show();//我的公海显示
        $("#entryTime").hide();//录入时间隐藏
        $("#linkTime").hide();//联系时间隐藏
        $("#cusLink").hide();//客户联系隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#storageWay").hide();//入库方式隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 8) { //成交记录数
        $("#successRecord").show();//成交记录显示
        $("#entryTime").hide();//录入时间隐藏
        $("#linkTime").hide();//联系时间隐藏
        $("#cusLink").hide();//客户联系隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#storageWay").hide();//入库方式隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 9) { //成交金额
        $("#successMoney").show();//成交金额显示
        $("#entryTime").hide();//录入时间隐藏
        $("#linkTime").hide();//联系时间隐藏
        $("#cusLink").hide();//客户联系隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#storageWay").hide();//入库方式隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 10) { //入库方式
        $("#storageWay").show();//入库方式显示
        $("#entryTime").hide();//录入时间隐藏
        $("#linkTime").hide();//联系时间隐藏
        $("#cusLink").hide();//客户联系隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#focusProduct").hide();//关注产品隐藏
      } else if (i == 11) { //关注产品
        this.axios.get('../../../static/json/focusProduct.json').then(res => {
          if (res.data.code == 100) {
            this.focusProductLists = res.data.extend.data;
          }
        });
        $("#focusProduct").show();//关注产品显示
        $("#entryTime").hide();//录入时间隐藏
        $("#linkTime").hide();//联系时间隐藏
        $("#cusLink").hide();//客户联系隐藏
        $("#cusForm").hide();//客户来源隐藏
        $("#cusLevel").hide();//客户等级隐藏
        $("#mySeas").hide();//我的公海隐藏
        $("#successRecord").hide();//成交记录隐藏
        $("#successMoney").hide();//成交金额隐藏
        $("#storageWay").hide();//入库方式隐藏
      }
    },

    //点击企业信息弹窗
    acus_opencustomerinfodiv(){
      this.cus_detailInfo = true;
      this.acus_initcustomerinfo();

      //往来邮件收发切换
      $("input[name='acus_wlemail']").click(function () {
        var vz = $("input[name='acus_wlemail']:checked").val();
        if (vz == 0) {//收信往来
          acus_mailcurrpage = 1;
          acus_mailtolpage = 1;
          this.acus_contacts_rmail();
          $("#acus_revmail").show();
          $("#acus_sendmail").hide();
        } else {
          acus_mailcurrpage = 1;
          acus_mailtolpage = 1;
          this.acus_contacts_smail();
          $("#acus_sendmail").show();
          $("#acus_revmail").hide();
        }
      });
      this.a_getAllDynamic();
      //初始是第一个显示
      $(".box-init").hide();
      $(".box-group-0").fadeIn(100);
      $(".cus-b-nav li").on("click", function () {
        var k = $(this).index();
        $(".cus-b-nav li").removeClass("active");
        $(this).addClass("active");
        $(".box-init").hide();
        $(".box-group-" + k).fadeIn(200);
        this.move_nav_active(k);
        // acus_editdivcheck(k);
      });
    },
    move_nav_active(i){
      switch (i) {
        case 0:
          $("#cus_lineleft").animate({
            left: "0px"
          }, 200);
          break;
        case 1:
          $("#cus_lineleft").animate({
            left: "67px"
          }, 200);
          break;
        case 2:
          $("#cus_lineleft").animate({
            left: "145px"
          }, 200);
          break;
        case 3:
          $("#cus_lineleft").animate({
            left: "215px"
          }, 200);
          break;
        case 4:
          $("#cus_lineleft").animate({
            left: "275px"
          }, 200);
          break;
        case 5:
          $("#cus_lineleft").animate({
            left: "335px"
          }, 200);
          break;
        case 6:
          $("#cus_lineleft").animate({
            left: "410px"
          }, 200);
          break;
        case 7:
          $("#cus_lineleft").animate({
            left: "475px"
          }, 200);
          break;
        case 8:
          $("#cus_lineleft").animate({
            left: "545px"
          }, 200);
          break;
      }
    },

    //查询客户往来邮件(收)
    acus_contacts_rmail(){
      alert("查询客户往来邮件(收)");
    },
    //查询客户往来邮件(发)
    acus_contacts_smail(){
      alert("查询客户往来邮件(发)")
    },
    a_showDynamicByType(type){
      if (type == 1) { //跟进记录
        alert(type + "----跟进")
        this.a_showRecordToDynamic(acus_customerid);
      } else if (type == 2) { //动态
        alert(type + "----动态")
        this.a_getAllDynamic(acus_customerid);
      } else if (type == 3) { //生命线
        alert(type + "----生命线")
        this.a_getCustomerLifecycle(acus_customerid);
      }
    },
    //动态处显示跟进记录
    a_showRecordToDynamic(cusid){
      $("#a_records_list").val("");
      this.axios.get('/static/json/allDynamic.json').then(res => {
        if (res.data.code == 100) {
          var followData = res.data.extend.follow_data;
          if (followData.length == 0) {
            $("#a_records_list").html("&nbsp;&nbsp;暂无数据");
          } else {
            var result = "";
            $.each(followData, function (i, row) {
              /*  if (row.submit_user_id == p_userinfo.user_id){ //是我提交的动态
               result += "<li>" +
               "<table class='group-box-line'>" +
               "<tr><td width='50'><i class='ico-small'>" +
               "<img class='img-radius' src='/static/img/cmer.png' width='40' height='40'></i></td>" +
               "<td>我于<span class='grav mg10'>" + row.create_time + "</span>&nbsp;&nbsp;更新了动态<br>"
               + row.followInfo + "</td></tr></table></li>";
               }else {*/ //不是我提交的
              result += "<li>" +
                "<table class='group-box-line'>" +
                "<tr><td width='50'><i class='ico-small'>" +
                "<img class='img-radius' src='/static/img/cmer.png' width='40' height='40'></i></td>" +
                "<td>" + row.submit_user_name + "于<span class='grav mg10'>" + row.create_time + "</span>&nbsp;&nbsp;更新了动态<br>"
                + row.followInfo + "</td></tr></table></li>";
              /*  }*/
            });
            $("#a_records_list").html(result);
          }
        }
      });
    },
    //动态处显示动态
    a_getAllDynamic(cusid){
      $("#a_records_list").val("");
      this.axios.get('/static/json/allDynamic.json').then(res => {
        if (res.data.code == 100) {
          var dynamicData = res.data.extend.dynamic_data;
          if (dynamicData.length == 0) {
            $("#a_records_list").html("&nbsp;&nbsp;暂无数据");
          } else {
            var result = "";
            $.each(dynamicData, function (i, row) {
              /*if (row.submit_user_id == p_userinfo.user_id) { //是我提交的动态
               result += "<li>" +
               "<table class='group-box-line'>" +
               "<tr><td width='50'><i class='ico-small'>" +
               "<img class='img-radius' src='/static/img/cmer.png' width='40' height='40'></i></td>" +
               "<td>我于<span class='grav mg10'>" + row.create_time + "</span>&nbsp;&nbsp;更新了动态<br>"
               + row.dynamicInfo + "</td></tr></table></li>";
               } else { *///不是我提交的
              result += "<li>" +
                "<table class='group-box-line'>" +
                "<tr><td width='50'><i class='ico-small'>" +
                "<img class='img-radius' src='/static/img/cmer.png' width='40' height='40'></i></td>" +
                "<td>" + row.submit_user_name + "于<span class='grav mg10'>" + row.create_time + "</span>&nbsp;&nbsp;更新了动态<br>"
                + row.dynamicInfo + "</td></tr></table></li>";
              /*  }*/
            });
            $("#a_records_list").html(result);
          }
        }
      })
    },
    //动态处显示生命线
    a_getCustomerLifecycle(cusid){
      $("#a_records_list").val("");
      this.axios.get('/static/json/allDynamic.json').then(res => {
        if (res.data.code == 100) {
          var lifeData = res.data.extend.life_data;
          if (lifeData.length == 0) {
            $("#a_records_list").html("&nbsp;&nbsp;暂无数据");
          } else {
            if (userAll1 == "") {
              userAll1 = fun_usercondition(7, "");
            }
            var result = "";
            $.each(msg.cycles, function (i, row) {
              var username = "未知用户";
              var owner_id = row.owner_id;//用户id
              if (owner_id == p_userid) {
                username = "我";
              } else {
                $.each(userAll1, function (index, user) {
                  if (owner_id == user.user_id) {
                    username = user.user_name;
                    return false;
                  }
                });
              }
              if (row.owner_type == 1) { //新建客户

                result += "<li>" +
                  "<table class='group-box-line'>" +
                  "<tr><td width='50'><i class='ico-small'>" +
                  "<img class='img-radius' src='/static/img/cmer.png' width='40' height='40'></i></td>" +
                  "<td>" + username + " 于<span class='grav mg10'>" + row.update_time.replace(".0", "") + "</span><br>新建了该客户</td></tr></table></li>";
              } else if (row.owner_type == 2) { //转移客户

                result += "<li>" +
                  "<table class='group-box-line'>" +
                  "<tr><td width='50'><i class='ico-small'>" +
                  "<img class='img-radius' src='/static/img/cmer.png' width='40' height='40'></i></td>" +
                  "<td>" + username + " 于<span class='grav mg10'>" + row.update_time.replace(".0", "") + "</span><br>转移该客户给我</td></tr></table></li>";
              } else if (row.owner_type == 3) { //领取客户

                result += "<li>" +
                  "<table class='group-box-line'>" +
                  "<tr><td width='50'><i class='ico-small'>" +
                  "<img class='img-radius' src='/static/img/cmer.png' width='40' height='40'></i></td>" +
                  "<td>" + username + " 于<span class='grav mg10'>" + row.update_time.replace(".0", "") + "</span><br>从公海库领取了该客户</td></tr></table></li>";
              }
            });

            $("#a_records_list").html(result);
          }
        }

      });
    },
    //初始化加载企业信息
    acus_initcustomerinfo(cusid){
      this.axios.get('/static/json/companyMsy.json').then(res => {
        alert(res)
      })
    },
    //根据客户id查询联系人信息
    acus_linkByCustomerId(){
      $.ajax({
        type: "POST",
        url: "link_findLinkManByCustomerid.action",
        async: false,
        cache: false,
        dataType: "json",
        data: {},
        success: function (res) {
          this.acus_initlinkmain(res);
        }
      });
    },
    //加载联系人信息
    acus_initlinkmain(res){
      $("#acus_linkmanlistdiv").lgytable({
        tbsetnumshow: false, //不显示选择页数
        tbsetpageshow: false,
        tbinfo: '联系人信息',
        tbtj: false,
        tbtitle: ['', '姓名', '联系邮箱', '建立时间', '电话', '手机'],
        tbwidth: ['5%', '10%', '15%', '5%', '10%', '14%'],
        tbcon: [{
          "tbcon": w,
          "dqpage": acus_linkcurrpage,
          "tolpage": acus_linktolpage,
          "tolcount": 0
        }],
      })
    },

    //分页
    CrmhandleSizeChange(num){
    },
    //分页(当前页)
    CrmhandleCurrentChange(page){
    },
    //动态提交
    submitDynamicInfo(){
      this.submitDynamic(box, cusid);
    },
    //提交动态
    submitDynamic(box, cusid){
      if ($("#arecords").val().length == 0 || $.trim($("#arecords").val()) == "") {
        alert("请输入动态内容！");
        return;
      }
      if ($("#arecords").val() == "请输入动态，不超过200个字...") {
        alert("请输入动态内容！");
        return;
      }
      if ($("#arecords").val().length > 200) {
        alert("输入的内容超过200字！");
        return;
      }
    },

    //新建跟进
    a_addFollowup3_dialog(){
      this.addFollow = true;
    }
  },
  created(){
    this.crmTable();

  }

}

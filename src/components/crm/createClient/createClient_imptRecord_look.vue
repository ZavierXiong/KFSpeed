<template>
  <div class="crm-al-tab" id="commonAlert">
    <div class="cnt-head">
      <span class="cnt-title">导入客户结果</span>
      <span class="el-icon-close" @click="close"></span>
    </div>
    <div class="crm-al-list">
      <div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tbody>
          <tr>
            <td class="crm-records-title">
              <b><span>导入结果</span></b>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" class="crm-records-tab">
          <thead>
          <tr>
            <th width="5%" height="30"></th>
            <th width="20%" height="30">成功条数</th>
            <th width="20%" height="30">失败条数</th>
            <th width="20%" height="30">重复条数</th>
            <th width="15%" height="30">总导入条数</th>
            <th width="20%" height="30">总剩余可新建客户数</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="tab in clientLists">
            <td width="5%" height="30"></td>
            <td width="20%" height="30">{{tab.date}}</td>
            <td width="20%" height="30">{{tab.type}}</td>
            <td width="20%" height="30">{{tab.status}}</td>
            <td width="15%" height="30"><a href="#">{{tab.result}}</a></td>
            <td width="20%" height="30">{{tab.lost}}</td>
          </tr>
          </tbody>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0">
          <tbody>
          <tr>
            <td class="crm-records-title">
              <b><span>导入不合法数据提醒</span></b>
            </td>
          </tr>
          </tbody>
        </table>
        <table width="100%" cellpadding="0" cellspacing="0" border="0" class="crm-records-tab">
          <thead>
          <tr>
            <th width="5%" height="30"></th>
            <th width="20%" height="30">行数</th>
            <th width="55%" height="30">失败原因</th>
            <th width="55%" height="30">记录详情</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="tab in dataLists">
            <td width="5%" height="30"></td>
            <td width="20%" height="30">{{tab.num}}</td>
            <td width="55%" height="30">{{tab.reason}}</td>
            <td width="55%" height="30">{{tab.more}}</td>
          </tr>
          </tbody>
        </table>
        <div>
          <div class="crm-records-tj_z">合计:<span>3</span>条</div>
          <div class="crm-records-tj_z">列表显示条数:
            <span>
              <select name="" id="">
                <option value="">10</option>
              </select>
            </span>
          </div>
          <div class="crm-records-tj_y">
            <ul>
              <li>首页</li>
              <li>上一页</li>
              <li>下一页</li>
              <li>末页</li>
              <li>
                第
                <span>1</span>
                /
                <span>1</span>
              </li>
              <li>
                <select name="" id="">
                  <option value="">1</option>
                </select>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="al-dialog-button">
      <!--<input type="button" class="al-dialog-cancel" value="关闭"  @click="close">-->
      <span slot="footer" class="dialog-footer close-btn">
        <el-button  @click="close">关闭</el-button>
      </span>
    </div>
  </div>

</template>
<script>
export  default ({
  name:"commonAlert",
  data(){
    return {
      alertShow:false,
      clientLists:[
        {
          date:"0",
          type:"105",
          status:"1",
          result:"106",
          lost:"无限制"
        },
        {
          date:"2",
          type:"普通导入",
          status:"已处理",
          result:"101",
          lost:"无限制"
        },
        {
          date:"4",
          type:"普通导入",
          status:"已处理",
          result:"100",
          lost:"无限制"
        }
      ],
    dataLists:[
      {
        num:"2",
        reason:"联系人邮箱格式不正确！",
        more:'E2&"@qq.com"'
      },
      {
        num:"2",
        reason:"联系人邮箱格式不正确！",
        more:'E2&"@qq.com"'
      },
      {
        num:"2",
        reason:"联系人邮箱格式不正确！",
        more:'E2&"@qq.com"'
      }
    ]
    }
  },
  methods:{
    close:function(){
      /*子组件方法放置父组件去调用*/
      this.$emit("closeAlert",false)
    }
  }
})
</script>
<style lang="less">
  .crm-al-tab{
    border:1px solid #ddd;
    border-radius: 3px;
    display: block;
    background-color:#fff;
    position: absolute;
    overflow: hidden;
    z-index: 700;
    width: 700px;
    left: 0;
    right: 0;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    margin: 0 auto;
    .crm-al-list{
      overflow:auto;
      padding: 10px 20px;
      height:300px;
    }
  }
  .al-dialog-button{
    text-align: right;
    margin-top: 10px;
    padding-bottom: 10px;
    font-size: 12px;
    padding-right: 6px;
    .al-dialog-cancel{
      border: 1px solid #999;
      height: 24px;
      line-height: 22px;
      color: #666;
      cursor: pointer;
      padding: 0 5px;
      margin: 0px;
      outline: none;
    }
    .close-btn{
      margin-right:0;
    }
  }
</style>

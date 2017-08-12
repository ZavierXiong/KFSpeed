<template>
  <div id="ordinaryImport">
    <div>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tbody>
          <tr>
            <td colspan="4" class="crm-oItab-title">
              <b>
                <span>Excel文件导入</span>
              </b>
              <span class="red">(普通导入不受日限制)</span>
            </td>
          </tr>
          <tr>
            <td width="100" class="crm-oItab-left">
              <span>选择导入文件</span>
            </td>
            <td colspan="3" class="crm-oItab-right">
              <el-upload
                class="upload-demo"
                action="https://jsonplaceholder.typicode.com/posts/">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td width="100" class="crm-oItab-left">
              <span>选择存储位置</span>
            </td>
            <td colspan="3" class="crm-oItab-right">
              <select name="" id="">
                <option value="1">私海</option>
                <option value="2">公海</option>
              </select>
            </td>
          </tr>
          <tr>
            <td width="100" class="crm-oItab-left">支持xls|xlsx|csv</td>
            <td colspan="3" class="crm-oItab-right">
              <a href="#"><span>普通导入样例</span></a>
              <span class="red">(不严格要求参照该样例)</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <table width="100%" cellspacing="0" cellpadding="0" border="0">
        <tbody>
          <tr>
            <td colspan="4" class="crm-oItab-title">
              <b><span>业务信息</span></b>
            </td>
          </tr>
          <tr v-for="info in businessInfo">
            <td width="100" class="crm-oItab-left">
              <span>{{info.text}}</span>
            </td>
            <td colspan="3" class="crm-oItab-right">
              <select name="" id="1" class="crm-select">
                <option v-for="option in info.options" >{{option.text}}</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
  export default({
    name:'ordinaryImport',
    data(){
      return{
        businessInfo:[
          {
            text:"客户分类",
            options:[
              {text:"重点跟进客户"},
              {text:"默认分类"},
              {text:"重点意向客户"},
              {text:"一般潜在客户"},
              {text:"阿里"},
              {text:"美国客户"},
              {text:"JP"},
              {text:"KP"}
            ]
          },
          {
            text:"客户来源",
            options:[
              {text:"易外销搜索客户"},
              {text:"公司网站"},
              {text:"B2B平台"},
              {text:"展会获取"}
            ]
          },
          {
            text:"客户关系",
            options:[
              {text:"代理商"},
              {text:"供货商"},
              {text:"新客户"},
              {text:"老客户"},
              {text:"广告商"}
            ]
          },
          {
            text:"客户状态",
            options:[
              {text:"收集状态"},
              {text:"开发状态"},
              {text:"跟进状态"},
              {text:"潜在客户"},
              {text:"意向客户"},
              {text:"成交客户"}
            ]
          },
          {
            text:"所属行业",
            options:[
              {text:"手机、通讯"},
              {text:"消费电子"},
              {text:"电脑及配件"},
              {text:"汽车、摩托车及零部件"},
              {text:"服装服饰"},
              {text:"鞋、袜、帽及配件"},
              {text:"箱包"},
              {text:"钟表、珠宝首饰、眼镜"},
              {text:"运动及娱乐"},
              {text:"玩具"},
              {text:"礼品、工艺品"},
              {text:"健康美容、个人护理"},
              {text:"照明、灯具"},
              {text:"家居园艺"},
              {text:"家具及室内装饰品"},
              {text:"办公用品及文具"},
              {text:"包装和纸"},
              {text:"印刷和出版"},
              {text:"安全产品"},
              {text:"汽车配件"},
              {text:"五金工具"},
              {text:"纺织"},
              {text:"家用电器"},
              {text:"食品及饮料"},
              {text:"其他"},
              {text:"新能源"},
              {text:"电子电气"}
            ]
          },
          {
            text:"意向产品",
            options:[
              {text:"默认产品"},
              {text:"电子原配件"},
              {text:"mini pc"}
            ]
          }
        ]
      }
    }
  })
</script>
<style rel="stylesheet/scss" lang="less">
  #ordinaryImport{
    /*display: none;*/
    padding-top: 10px;
    padding-left: 20px;
  }
  .crm-oItab-title{
    border-bottom:1px solid #ddd;
    text-align: left;
    height:35px;
    line-height: 35px;;
  }
  .crm-oItab-left{
    text-align: right;
    padding:0 10px 0 5px;
    height:35px;
    line-height: 35px;
  }
  .crm-oItab-right{
    .crm-oItab-left;
    text-align:left;
    a{
      color: #005EAC;
      text-decoration: none;
    }
  }
  .crm-select{
    border: 1px solid #ddd;
    height: 22px;
    line-height: 22px;
    width: 180px;
  }
</style>

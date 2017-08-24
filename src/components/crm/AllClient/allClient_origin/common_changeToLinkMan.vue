<template>
  <div>
    <div class="searchHead">
      <label for="">请选择要转给的客户:</label>
      <select name="" id="" class="clientName">
        <option value="" v-for="option in toClientList">{{option.name}}</option>
      </select>
      <input class="search-input" type="text" placeholder="输入客户名称搜索客户"/>
      <span @click="searchClient" class="search-btn">搜索</span>
    </div>
    <div class="search-result">
      <span>搜索结果：</span>
      <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <thead>
          <tr>
            <th width="90%">客户</th>
            <th>选择</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>科飞时速</td>
            <td><input type="radio"/></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default({
  props:[
    'toClientList'
  ],
  methods:{
    searchClient(){
      this.$emit('searchClient')
    }
  }
})
</script>
<style lang="less">
  .search-result{
    margin-top:10px;
    th,td{
      text-align: center;
      font-weight:normal;
    }
    th{
      background-color:#ededed;
      border:1px solid #ededed;
      height:30px;
    }
    td{
      height:50px;
      border:1px solid #ededed;
    }
  }
  .searchHead{
    .clientName,.search-input{
      width:180px;
      height:30px;
      vertical-align: middle;
      border:1px solid #ddd;
    }
    .search-btn{
      cursor: pointer;
      display: inline-block;
      height:30px;
      line-height: 30px;
      color:#fff;
      background-color:#66CC99;
      vertical-align: middle;
      width:50px;
      text-align: center;
    }
  }
</style>

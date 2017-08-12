<template>
  <div id="cm-more-info">
    <!--点击显示-->
    <button type="text" @click="test = true">点击打开 </button>
    <!--弹框...修改外部div类名-->
    <el-dialog title="提示" :visible.sync="test"  class='yourName'>
      <!--此处添加你的弹框内容-->

      <!--底部确认取消按钮-->
			<span slot="footer" class="dialog-footer">
        <el-button @click="test = false">取 消</el-button>
        <el-button type="primary" @click="test = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default{
    name:"cm-more-info",
    data() {
    return {
      test:true
    }
  }
  }
</script>

<style>
  /*头部样式*/
  .yourName .el-dialog__header {
    line-height: 0;
    background-color: #20A0FF;
    padding: 15px 20px;
    text-align: left;
  }

  /*字体颜色*/
  .yourName .el-dialog__title,
  .yourName .el-dialog__headerbtn .el-dialog__close,
  .yourName .el-dialog__headerbtn .el-dialog__close:hover {
    color: #fff;
  }

  /*弹框内容padding*/
  .yourName .el-dialog__body {
    padding: 20px 10px 10px;
  }


  /*设置所需的宽度*/
  .yourName .el-dialog--tiny {
    min-width: 500px !important;
  }


  /*注意：弹框内容样式前,记得外部div类名，以免类名冲突*/
  .yourName .content{

  }
</style>

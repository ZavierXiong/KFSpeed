<template>
  <common-wareHouse
    :my-title="myTitle"
    :storage-list="storageList"></common-wareHouse>
</template>
<script>
  import commonWareHouse from './common_wareHouse.vue'
  export default ({
    data(){
      return{
        myTitle:[
          {name:'已入客户库联系人'}
        ],
        storageList:[
          {
            name:'lan ina',
            email:'ina@yiwaixiao.com',
            createDate:'2017-08-02',
            lastDate:'',
            sendMessage:'0',
            getMessage:'0',
          },
          {
            name:'小王 ina',
            email:'ina@yiwaixiao.com',
            createDate:'2017-08-02',
            lastDate:'',
            sendMessage:'0',
            getMessage:'0'
          },
          {
            name:'校长 ina',
            email:'ina@yiwaixiao.com',
            createDate:'2017-08-02',
            lastDate:'',
            sendMessage:'0',
            getMessage:'0'
          },
          {
            name:'小杯 ina',
            email:'ina@yiwaixiao.com',
            createDate:'2017-08-02',
            lastDate:'',
            sendMessage:'0',
            getMessage:'0'
          }
        ]
      }
    },
    components:{
      commonWareHouse
    }
  })
</script>
<style>

</style>

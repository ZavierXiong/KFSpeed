<template>
  <share-component :td-lists="tdLists" :my-title="myTitle" :has-cancel-share="true"></share-component>
</template>
<script>
  import shareComponent from './commonShare.vue'
  export default({
    data(){
    return{
      myTitle:[
        {name:'我的共享客户'}
      ],
      tdLists:[
        {
          info:'helloC',
          infoEmail:'simon_tandava@yahoo.com',
          tel:'无',
          inDate:'2017-05-21',
          shareDate:'2017-06-05',
          lastDate:'2017-05-24',
          shareTo:[
            {name:'小蓝'},
            {name:'小绿'},
            {name:'小白'}
          ],
          whoShare:'小红'
        },{
          info:'sunny',
          infoEmail:'simon_tandava@yahoo.com',
          tel:'无',
          inDate:'2017-06-21',
          shareDate:'2017-08-05',
          lastDate:'2017-03-24',
          shareTo:[
            {name:'小吕'}
          ],
          whoShare:'小绿'
        },{
          info:'rainy',
          infoEmail:'simon_tandava@yahoo.com',
          tel:'无',
          inDate:'2017-07-21',
          shareDate:'2017-05-05',
          lastDate:'2017-09-24',
          shareTo:[
            {name:'小青'}
          ],
          whoShare:'小黑'
        },
      ],
      //共享来源同事列表
      colleagueOption:[
        {name:'所有'},
        {name:'小兰'},
        {name:'小绿'},
        {name:'小红'},
        {name:'小黄'},
        {name:'小黑'},
        {name:'小白'}
      ]
    }
  },
  components:{
    shareComponent
  }
  })
</script>
<style>

</style>

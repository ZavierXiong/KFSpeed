<template>
  <common-content :info-lists="infoLists" :my-title="myTitle"  @dateSort="dateSort(infoLists)" @IndateSort="IndateSort(infoLists)" @starSort="starSort(infoLists)"></common-content>
</template>
<script>
  import commonContent from './allClient.vue'
  export default ({
    data(){
    return{
      myTitle:[{
        name:" 一般潜在客户 > 录入时间-降序 "
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
      ]
    }
  },
  components:{
    commonContent
  },
  methods:{
    dateSort(arr){
      let _this = this;
      if(arr.length<=1){
        return arr;
      }
      let midIndex = Math.floor(arr.length/2);
      let midIndexVal = arr.splice(midIndex,1)[0];
      let midDate = new Date(midIndexVal.lastDate).getTime();
      let left=[];
      let right=[];
      for(var i=0;i<arr.length;i++){
        let arrDate =  new Date(arr[i].lastDate).getTime()
        if(arrDate < midDate){
          left.push(arr[i]);
        }else{
          right.push(arr[i]);
        }
      }
      let a = this.dateSort(left).concat(midIndexVal,_this.dateSort(right));
      this.infoLists = a;
      this.isMinSort=!this.isMinSort
      return(this.infoLists);
    },
    //入库时间排序
    IndateSort(arr){
      let _this = this;
      if(arr.length<=1){
        return arr;
      }
      let midIndex = Math.floor(arr.length/2);
      let midIndexVal = arr.splice(midIndex,1)[0];
      let midDate = new Date(midIndexVal.date).getTime();
      let left=[];
      let right=[];
      for(var i=0;i<arr.length;i++){
        let arrDate =  new Date(arr[i].date).getTime()
        if(arrDate < midDate){
          left.push(arr[i]);
        }else{
          right.push(arr[i]);
        }
      }
      let a = this.IndateSort(left).concat(midIndexVal,_this.IndateSort(right));
      this.infoLists = a;
      return(this.infoLists);
    },
    //星级排序
    starSort(arr){
      let _this = this;
      if(arr.length<=1){
        return arr;
      }
      let midIndex = Math.floor(arr.length/2);
      let midIndexVal = arr.splice(midIndex,1)[0];
      let midNum =midIndexVal.stars.length;
      let left=[];
      let right=[];
      for(var i=0;i<arr.length;i++){
        let arrDate =  arr[i].stars.length;
        if(arrDate < midNum){
          left.push(arr[i]);
        }else{
          right.push(arr[i]);
        }
      }
      let a = this.starSort(left).concat(midIndexVal,_this.starSort(right));
      this.infoLists = a;
      return(this.infoLists);
    }
  }
  })
</script>
<style>

</style>

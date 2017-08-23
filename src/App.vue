<template>
  <div id="app">
    <common-header></common-header>
    <router-view></router-view>
  </div>
</template>

<script>
  import '@/css/reset.css'
  import commonHeader from './components/crm/commonHeader.vue'
  export default {
    name: 'app',
    components:{
      commonHeader
    }
  }
</script>

<style>
</style>

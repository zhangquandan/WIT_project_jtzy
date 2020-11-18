<template>
  <div style="width:100%;height: 100vh;">
    <div id="bigBaiduMap"></div>
  </div>
</template>

<script>
  import { initBaiduMap } from '../../components/chart/js/baiduMap.js'
  export default {
    name: '',
    data() {
      return {

      }
    },

    mounted() {
      initBaiduMap("bigBaiduMap",true,17.75)
      document.getElementById('bigBaiduMap').onmousewheel = function(e) {
       e.preventDefault();
      };
      document.documentElement.style.overflowY = 'hidden'
      window.scrollTo(0, 0)
    },

    methods:{

    }
  }
</script>

<style scoped="scoped">
  #bigBaiduMap{
    width: 100%;
    height: 100%;
  }
</style>

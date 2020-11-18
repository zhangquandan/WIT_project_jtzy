<template>
  <div style="width: 100%;height: 100%;position: relative;">
    <!-- <div style="position: absolute;bottom: -10px; color: white; left: 88px;">
      <div v-for="item in arr" :key="item" class="i">{{item}}</div>
    </div> -->
      <div v-show="isFullScreen" class="baidu-map-box">
        <div id="baiduMap"></div>
      </div>
    <!-- <div class="chartBox" :class="{'chartBoxBg':$store.state.viewType != 'dma' && $store.state.viewType != 'campus'}" id="myChart2"></div>
    <div @click="toFullScreen" style="position: absolute; right: 10px; top: 0; color: white; cursor: pointer;z-index: 999999999999;">全屏</div> -->
  </div>

</template>

<script>
  import watermeter from '../../assets/config/watermeter_wgs84.json'
  import dma from '../../assets/config/dma_jtzy_wgs84.json'
  import maprange from '../../assets/config/maprange_jtzy_wgs84.json'
  import build from '../../assets/config/build.json'
  import {
    getColor
  } from '../../util/color.js'
  import {
    initEcharts
  } from './js/scatter.js'
  import {
    initBuildEchart
  } from './js/build.js'
  import {
    initDMAEcharts
  } from './js/dma.js'
  import {
    initBaiduMap,
    changeView
  } from './js/baiduMap.js'
  import {
    initSchoolEcharts
  } from './js/school.js'
  export default {
    name: 'scatter',
    data() {
      return {
        arr: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300, 1400],
        isFullScreen: true,
        baiduMap: {},
        echartsMap: {},
      }
    },

    mounted() {
      var that = this
      //this.init();
      document.getElementById('baiduMap').onmousewheel = function(e) {
       e.preventDefault();
      };

      //this.echartsMap = this.$echarts.init(document.getElementById('myChart2'))
      //initEcharts(this.echartsMap)
    },

    methods: {
      //加载地图配置
      init: function() {
        var that = this
        that.$echarts.registerMap('geoman', watermeter);
        this.$echarts.registerMap("lt", build);
        this.$echarts.registerMap("dma", dma);
        that.$echarts.registerMap("maprange", maprange)
      },

      initBaiduMap: function() {
        initBaiduMap("baiduMap",false)
      },

      toFullScreen: function() {
        this.isFullScreen = !this.isFullScreen
      },

      setData: function() {
        var that = this
        switch (that.$store.state.viewType) {
          case 'build':
            //initBuildEchart(this.echartsMap)
            //data_ = 'buildData'
            changeView('建筑管控')
            break
          case 'meter':
            // initEcharts(this.echartsMap)
            // var opt = this.echartsMap.getOption().series[0];
            // var testData = []
            // for(let i = 0 ; i < opt.data.length ; i ++){
            //   var obj
            //   for(let y = 0 ; y < that.$store.state.meterData.length ; y ++){
            //     if(that.$store.state.meterData[y].name == opt.data[i].name){
            //       obj = that.$store.state.meterData[y].value
            //       break
            //     }
            //   }
            //   opt.data[i].value.push(obj)
            //   opt.data[i].value.push(obj.leakageIndex)
            // }
            // this.echartsMap.setOption({
            //   series: opt
            // })
            changeView('水表管控')
            return
          case 'dma':
            // initDMAEcharts(this.echartsMap)
            // data_ = 'dmaData'
            changeView('DMA管控')
            break
          case 'campus':
            // initSchoolEcharts(this.echartsMap)
            // data_ = 'maprange'
            changeView('校区管控')
            break
        }
        // var testData =  that.tranData(that.$store.state[data_])
        // this.echartsMap.setOption({
        //   series: [{
        //     data:testData
        //   }]
        // })
      },

      tranData: function(arr) {
        var data = []
        for (var item of arr) {
          try {
            var obj = {}
            obj.name = item.name
            obj.value = [item.value.leakageIndex.toFixed(1), item.value]
            //如果不显示高度，注释if代码块
            // if(item.height){
            //    obj.height = item.height
            // }
            data.push(obj)
          } catch (e) {
            console.log(e)
          }
        }
        return data
      }
    }
  }
</script>

<style scoped="scoped">
  .chartBox {
    width: 100%;
    height: 112%;
    margin: 0 auto;
    filter: brightness(1.05);
    margin-top: -5%;
    background-image: url(../../assets/img/map3.png);
    background-size: 100% 150%;
    background-position: center -50px;
    background-repeat: no-repeat;
  }

  .chartBoxBg {
    background-image: url(../../assets/img/map.png);
    background-size: 100% 168%;
    background-position: center -100px;
    background-repeat: no-repeat;
  }

  .i {
    width: 53px;
    height: 12px;
    text-align: center;
    line-height: 12px;
    margin-right: 5px;
    font-size: 14px;
    float: left;
  }

  .baidu-map-box {
    background-image: url(../../assets/img/bottom_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    position: absolute;
    width: 95%;
    height: 105%;
    top: -30px;
    margin-left: 2.5%;
    background-color: black;
  }

  #baiduMap {
    width: 99%;
    height: 98%;
    position: absolute;
    top: 5px;
    left: 4px;
    opacity: 1;
  }

  .bounce-enter-active {
    animation: bounce-in .5s;
  }

  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
</style>

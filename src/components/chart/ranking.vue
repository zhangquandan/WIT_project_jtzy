<template>
  <div id="ranking">
    <div>
      <div class="top">
        <img style="width: 25px; height: 25px; vertical-align: -4px; margin-right: 5px;" :src="icon" />
        {{title}}综合侧漏指数
      </div>
    </div>
    <div id="comp" v-show="isHaveData" :style="{'marginLeft':canvesLeft}"></div>
    <div id="comp" style="line-height: 250px ;color: white;" v-show="!isHaveData" :style="{'marginLeft':canvesLeft}">暂无数据</div>
  </div>
</template>

<script>
  import {
    initRankEchart
  } from './js/rank.js'
  export default {
    name: 'ranking',
    props: {
      icon: {
        type: String,
        required: true,
        default: "../../../assets/uplefticon.png"
      },
      canvesWidth: {
        type: String,
        default: "90%"
      },
      canvesLeft: {
        type: String,
        default: "5%"
      },
    },
    data() {
      return {
        echartsRank: {},
        title: "",
        isHaveData:true
      }
    },
    methods: {

      setData: function() {
        var that = this
        var chartData;
        var opt = this.echartsRank.getOption();
        switch (that.$store.state.viewType) {
          case 'build':
          that.title = "建筑"
            chartData = that.$store.state.buildData
            opt.grid[0].left = "26%"
            break
          case 'meter':
            that.title = "水表"
            chartData = that.$store.state.meterData
            opt.grid[0].left = "38%"
            break
          case 'dma':
            that.title = "DMA"
            chartData = that.$store.state.dmaData
            opt.grid[0].left = "26%"
            break
          default:
            return
        }
        var data = []
        for (let item of chartData) {
          data.push({
            name: item.name,
            val: item.value,
          })
        }
        data.sort(function(a, b) {
          return b.val.leakageIndex - a.val.leakageIndex
        })
        data = data.slice(0, 10)
        that.$store.commit("setTopTen",data)
        var line = []
        var name = []
        var val = []
        var blank = [6,6,6,6,6,6,6,6,6,6,6]
        var circle = [0,0,0,0,0,0,0,0,0,0,0]
        var lineBg = [110,110,110,110,110,110,110,110,110,110]
        var leakageIndexMax = 0;
        var leakageIndexMin = 0;
        if(!data[0]){
          that.isHaveData = false
          return
        }
        that.isHaveData = true
        leakageIndexMax = data[0].val.leakageIndex
        leakageIndexMin = data[data.length-1].val.leakageIndex
        for (let item of data) {
          if(leakageIndexMin < 0){
            line.push(((item.val.leakageIndex - leakageIndexMin) / (leakageIndexMax - leakageIndexMin)) * 100)
          }else{
             line.push((item.val.leakageIndex / leakageIndexMax ) * 100)
          }
          name.push(item.name)
          val.push(item.val.leakageIndex.toFixed(1))
        }
        opt.yAxis[0].data = name
        opt.yAxis[1].data = val
        opt.series[2].data = line
        opt.series[0].data = blank.slice(0,line.length)
        opt.series[1].data = circle.slice(0,line.length)
        opt.series[3].data = lineBg.slice(0,line.length)
        opt.series[4].data = circle.slice(0,line.length)
        opt.series[5].data = circle.slice(0,line.length)
        this.echartsRank.clear()//重新加载动画
        this.echartsRank.setOption(opt)
      },

      initCharts: function() {
        this.echartsRank = this.$echarts.init(document.getElementById('comp'))
        initRankEchart(this.echartsRank)
      }
    },
    mounted() {
      var that = this
      that.initCharts()
    }
  }
</script>

<style scoped="scoped">
  #ranking {
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-image: url(../../assets/img/rank.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;

  }

  #comp {
    width: 360px;
    height: 300px;
    margin-left: 5%;
    text-align: center;
  }

  .top {
    font-size: 1.25rem;
    color: rgb(250, 205, 65);
    height: 50px;
    line-height: 50px;
    background-color: rgb(4, 33, 103);
    margin: 2px;
    text-align: left;
    padding-left: 20px;
    box-sizing: border-box;
  }

  .top::after {
    content: '';
    height: 2px;
    width: 100%;
    display: block;
    background-image: linear-gradient(to right, rgb(4, 33, 103), rgb(4, 33, 103), rgb(0, 154, 215) 50%, rgb(4, 33, 103), rgb(4, 33, 103));
  }
</style>

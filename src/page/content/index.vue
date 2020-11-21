<template>
  <div class="content">
    <div class="left-column">
      <div class="left-column-top">
        <ranking v-show="$store.state.viewType != 'campus'" ref="rank" :icon="icon" title="水表综合漏损指数"></ranking>
        <campus v-show="$store.state.viewType == 'campus'"></campus>
      </div>
      <div class="left-column-bottom">
        <lb-view v-show="$store.state.viewType != 'campus'" ref="lbView"></lb-view>
        <meterInfo ref="meterInfo" v-show="$store.state.viewType == 'campus'"></meterInfo>
      </div>
    </div>
    <div class="mid-column">
      <div class="mid-column-top">
        <echartMap ref="map"></echartMap>
      </div>
      <div class="mid-column-bottom">
        <graph ref="cbView"></graph>
      </div>
    </div>
    <div class="right-column">
      <div class="right-column-top">
        <school-info></school-info>
      </div>
      <div class="right-column-bottom">
        <indicators></indicators>
      </div>
    </div>
  </div>
</template>

<script>
  import graph from '../../components/chart/graph.vue'
  import echartMap from '../../components/chart/map.vue'
  import ranking from '../../components/chart/ranking.vue'
  import lbView from '../../components/lbView.vue'
  import schoolInfo from '../../components/schoolInfo.vue'
  import indicators from '../../components/indicators.vue'
  import campus from '../../components/campus.vue'
  import meterInfo from '../../components/chart/meterInfo.vue'
  import {
    getData,
    getDMAData,
    getMaprangeData,
    getMeterData
  } from '../../mock/data.js'
  import {
    getSkData,
    getTotalityData,
    getSchoolInfo,
    getMeterRunInfo,
    lineData,
    waterregion,
    getMWrite,
    getBuildData,
    getWaterPointData,
    getQuantityByDay,
    getQuantityByMonth,
    getQuantityByYear,
  } from '../../api/api.js'
  export default {
    name: '',
    data() {
      return {
        icon: require('../../assets/img/uplefticon.png'),
        buildArea: "",
      }
    },

    components: {
      graph,
      echartMap,
      ranking,
      lbView,
      schoolInfo,
      indicators,
      campus,
      meterInfo
    },

    mounted() {
      //  getData() //建筑物模拟数据
      //getMeterData() //水表模拟数据
      var that = this

      this.init()

      //获取水表运行情况
      getMeterRunInfo(true).then(res => {
        getMeterRunInfo().then(res2 => {
          var data = [res2.data.data.total, res.data.data.total, res2.data.data.total - res.data.data.total]
          that.$store.commit('setMeterInfo', data)
          that.$refs.meterInfo.setData()
        })
      })

      //获取学校信息
      getSchoolInfo().then(res => {
        that.buildArea = res.data[2].value
        var info = {
          flooSpace: res.data[0].value,
          coveredArea: res.data[2].value,
          stuNum: res.data[9].value,
          teaNum: res.data[10].value
        }
        that.$store.commit('setSchoolInfo', info)
        this.getQuantity()
      })

      //获取学校管控数据（包含dma模块数据）
      waterregion().then(res => {
        this.$store.commit("setMaprange", [{
          name: res.data.data[0].name,
          value: res.data.data[0]
        }])
        var arr = []
        for (let i = 1; i < res.data.data.length; i++) {
          arr.push({
            name: res.data.data[i].name,
            value: res.data.data[i]
          })
        }
        that.$store.commit("setDMAData", arr)

        getBuildData().then(buildRes => {
          var buildArr = []
          for (let i = 0; i < buildRes.data.data.length; i++) {
            buildArr.push({
              name: buildRes.data.data[i].name,
              value: buildRes.data.data[i]
            })
          }
          that.$store.commit("setBuildData", buildArr)
        })

        getWaterPointData().then(pointRes => {
          var pointArr = []
          for (let i = 0; i < pointRes.data.data.length; i++) {
            pointArr.push({
              name: pointRes.data.data[i].name,
              value: pointRes.data.data[i]
            })
          }
          that.$store.commit("setMeterData", pointArr)
        })

        //获取色卡刻度值并初始化地图
        getSkData().then(res_ => {
          var dataArr = []
          for (let i = 1; i <= 14; i++) {
            dataArr.push(res_.data.data[6]['range' + i])
          }
          that.$store.commit("setScale", dataArr)
          this.$refs.map.initBaiduMap()
        })
      })
    },

    methods: {
      changeView: function() {
        this.$refs.map.setData()
        this.$refs.rank.setData()
        this.$refs.lbView.setData()
      },

      init: function() {
        var that = this
        lineData().then(res => {
          if (!res.data.data[0]) {
            return
          }
          var des = [] //每月用水定额
          for (let m = 1; m <= 12; m++) {
            var index = "m" + m
            des.push((res.data.data[0][index]).toFixed(1))
          }

          getMWrite().then(res2 => {
            var ysls = [] //每月用水量
            var jsls = [] //每月节水量
            for (let i = 0; i < res2.data.data.list.length - 1; i++) {
              ysls.push((res2.data.data.list[i].data).toFixed(1))
              jsls.push((des[i] - res2.data.data.list[i].data).toFixed(1))
            }

            //计算组件title相关数据
            var bnde = 0 //本年定额
            var ylj = 0 //已累计
            var yyjs = 0 //已用节水
            var mqde = 0 //目前定额
            for (let i = 0; i < des.length; i++) {
              bnde += parseFloat(des[i])
            }

            for (let i = 0; i < ysls.length; i++) {
              ylj += parseFloat(ysls[i])
              yyjs += parseFloat(jsls[i])
              mqde += parseFloat(des[i])
            }

            var yyjsl = ((mqde - ylj) / mqde / 0.01).toFixed(1) //已用节水率
            bnde = bnde.toFixed(1)
            ylj = ylj.toFixed(1)
            yyjs = yyjs.toFixed(1)


            //提交数据
            that.$store.commit('setData', {
              de: des,
              ysl: ysls,
              jsl: jsls,
              bnde: bnde,
              ylj: ylj,
              yyjs: yyjs,
              yyjsl: yyjsl,
              success: function() {
                that.$refs.cbView.init()
              }
            });
          })
        })
      },

      getQuantity: function() {
        var that = this
        //本年已过天数
        var days = Math.ceil((new Date() - new Date(new Date().getFullYear().toString())) / (24 * 60 * 60 * 1000)) +
          1;
        getQuantityByDay().then(dayData => {
          that.$store.commit("upDateIndicator", {
            index: 0,
            val: dayData.data.data.list[0].data.toFixed(1)
          })
        })
        getQuantityByMonth().then(monthData => {
          that.$store.commit("upDateIndicator", {
            index: 1,
            val: monthData.data.data.list[0].data.toFixed(1)
          })

          getQuantityByYear().then(yearData => {
            var data = yearData.data.data.list[0].data
            that.$store.commit("upDateIndicator", {
              index: 2,
              val: data.toFixed(1)
            })
            //生均单耗
            var averageStu = data / that.$store.state.schoolInfo.stuNum / days * 1000
            that.$store.commit("upDateIndicator", {
              index: 3,
              val: averageStu.toFixed(1)
            })
            //建筑单耗
            var averageBuild = data / that.buildArea / days * 1000
            that.$store.commit("upDateIndicator", {
              index: 4,
              val: averageBuild.toFixed(1)
            })
            //本年节水率
            lineData().then(res => {
              if (!res.data.data[0]) {
                return
              }
              var resData = res.data.data[0]
              var quota = 0
              var mon = new Date().getMonth() + 1
              for (let j = 1; j <= mon - 1; j++) {
                var ind = "m" + j
                quota += resData[ind]
              }
              var averageWaterSaving = (quota - data + monthData.data.data.list[0].data ) / quota / 0.01
              that.$store.commit("upDateIndicator", {
                index: 5,
                val: averageWaterSaving.toFixed(1)
              })
            })

          })
        })

      }
    }
  }
</script>

<style scoped="scoped">
  .content {
    position: absolute;
    top: 130px;
    bottom: 0;
    padding: 0 50px 50px 50px;
    box-sizing: border-box;
    text-align: center;
  }

  .content .left-column {
    display: inline-block;
    width: 402.5px;
    height: 100%;
    vertical-align: top;
  }

  .content .left-column .left-column-top {
    height: 40%;
    width: 100%;

  }

  .content .left-column .left-column-bottom {
    height: 58.5%;
    width: 100%;
    box-sizing: border-box;
    padding-top: 12px;
  }

  .content .mid-column {
    display: inline-block;
    width: 1000px;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
    vertical-align: top;
  }

  .content .right-column {
    display: inline-block;
    width: 402.5px;
    height: 100%;
  }

  .content .mid-column .mid-column-top {
    width: 100%;
    height: 57%;
  }

  .content .mid-column .mid-column-top::before {
    content: '';
    display: table;
  }

  .content .mid-column .mid-column-bottom {
    width: 100%;
    height: 42%;
  }

  .content .right-column .right-column-top {
    height: 35%;
  }

  .content .right-column .right-column-bottom {
    height: 61%;
    margin-top: 24px;
  }
</style>

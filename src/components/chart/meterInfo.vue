<template>
  <div class="meter">
    <div class="top">
      <img style="width: 25px; height: 25px; vertical-align: -4px; margin-right: 5px;" src="../../assets/img/low-right_icon.png" />
      水表运行情况
    </div>
    <div class="text">
      <div class="titleText">
        <span>在线{{$store.state.meterInfo[1]}}</span><span style="margin-left: 10px;">离线{{$store.state.meterInfo[2]}}</span>
      </div>
    </div>
    <div class="charts" ref="biao"></div>
  </div>
</template>

<script>
  import echarts from 'echarts';
  export default {
    name: 'biao',
    data() {
      return {
        value: 0,
        max: 100,
        chart: {}
      }
    },
    methods: {
      init() {
        var biao = this.$refs.biao
        var numberBackground = "../asset/kuang.png";
        this.chart = this.$echarts.init(biao);
        var value = this.value;
        var max = this.max;
        var option = {
          //backgroundColor: '#011a5e',
          angleAxis: {
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            min: 0,
            max: max / 0.70,
            startAngle: 215
          },
          radiusAxis: {
            type: 'category',
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              show: false
            },
            data: ['w', 'q', 'e', 'd', 'a', 'b', 'c'],
            z: 1
          },
          polar: [{
            radius: '90%',
            center: ['50%', '35%']
          }],
          series: [{
              type: 'bar',
              data: ['', '', '', '', '', value, value],
              coordinateSystem: 'polar',
              name: '在线',
              roundCap: true,
              z: 2,
              barWidth: 4,
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 0,
                [{
                    offset: 0,
                    color: '#4739fb',
                  },
                  {
                    offset: 1,
                    color: '#51fded',
                  }
                ]
              ),

            },
            {
              type: 'gauge',
              radius: '75%',
              splitNumber: 4,
              max: max,
              detail: {
                show: false,
              },
              axisLine: {
                show: false,
              },
              title: {
                show: true,
                offsetCenter: [0, "-10%"],
                textStyle: {
                  color: '#fff',
                  fontSize: 20
                }
              },
              detail: {
                offsetCenter: [0, "-10%"],
                formatter: function(max) {
                  var num = Math.round(max);
                  return num;
                },
                "textStyle": {
                  padding: [0, 0, 80, 0],
                  "fontSize": 40,
                  fontWeight: '600',
                  color: '#fff',
                }
              },
              data: [{
                "name": "水表总数",
                "value": "0",
              }],
              splitLine: {
                show: false
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: false
              },
              pointer: {
                show: false
              }
            },
            {
              type: 'bar',
              data: ['', '', '', '', '', max, max],
              z: 0,
              silent: true,
              coordinateSystem: 'polar',
              name: '离线',
              roundCap: true,
              color: new echarts.graphic.LinearGradient(
                0, 0, 1, 1,
                [{
                    offset: 0,
                    color: '#13217f',
                  },
                  {
                    offset: 1,
                    color: '#164e7d',
                  }
                ]
              ),
              barGap: '-100%',
              barWidth: 5,
              barCategoryGap: '-20' /*多个并排柱子设置柱子之间的间距*/

            }
          ],
          tooltip: {
            show: false
          },
          legend: {
            bottom: 0,
            left: 40,
            orient: 'vertical',
            itemWidth: 130,
            itemHeight: 8,
            textStyle: {
              color: '#fff',
              fontSize: 10,
              fontFamily: '思源黑体 CN'
            }
          }
        }
        this.chart.setOption(option);
      },

      setData: function() {
        var opt = this.chart.getOption()
        var data = this.$store.state.meterInfo
        opt.series[0].data = ['', '', '', '', '',parseInt(data[1]/data[0]*100), parseInt(data[1]/data[0]*100)]
        opt.series[1].data = [{
          "name": "水表总数",
          "value": data[0],
        }],
        opt.series[2].data = ['', '', '', '', '', 100, 100],
        this.chart.setOption(opt);
      }
    },
    mounted() {
      this.init()
    }
  }
</script>

<style scoped="scoped">
  .top {
    font-size: 1.25rem;
    color: rgb(250, 205, 65);
    height: 50px;
    line-height: 50px;
    background-color: rgb(4, 33, 103);
    margin: 4px;
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

  .charts {
    width: 250px;
    height: 300px;
    margin: 0 auto;
    margin-top: 70px;
  }

  .text {
    display: flex;
    position: absolute;
    width: 160px;
    height: 30px;
    left: 50%;
    top: 330px;
    margin-left: -80px;
    padding: 0 0 0 5px;
    z-index: 1000;
    box-sizing: border-box;
    background-image: url(../../assets/img/kuang.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
  }

  .titleText {
    width: 160px;
    float: left;
    font-family: "思源黑体 CN";
    line-height: 20px;
    font-size: 14px;
    text-align: left;
    padding: 0 10px 0 5px;
    box-sizing: border-box;
    height: 30px;
    line-height: 30px;
    color: #5be2f2;
  }

  .titleText::before {
    content: '';
    display: inline-block;
    background-image: url(../../assets/img/delta.png);
    background-repeat: no-repeat;
    background-image: 100% 100%;
    width: 20px;
    height: 20px;
    position: relative;
    top: 7px;
  }

  .meter {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-image: url(../../assets/img/lbViewBg.png);
    overflow: hidden;
    position: relative;
  }
</style>

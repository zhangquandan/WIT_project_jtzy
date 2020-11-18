<template>
  <div class="chartBox" id="myChart"></div>
</template>

<script>
  export default {
    name: 'bar',
    data() {
      return {

      }
    },

    mounted() {
        // this.init()
    },

    methods: {
      init: function() {
        var that = this
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        var option = {
          title: {
            text: '本年定额：' + that.$store.state.zx.bnde + '吨     已累计：' + that.$store.state.zx.ylj + '吨     已用节水：' +
              that.$store.state.zx.yyjs + '吨     已用节水率：' + that.$store.state.zx.yyjsl + '%',
            x: 'center',
            bottom: 65,
            padding: [0, 0, 0, 0],
            textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: '#fff',
            },
          },

          tooltip: {
            trigger: 'axis'
          },
          color: ['#1DD6CF', '#ED8DD0', "#0a0"],
          legend: {
            data: ['用水定额', '节水量', '用水量'],
            textStyle: {
              color: '#fff',
              fontSize: 14,
            },
            top: 25,
            right: 80,
            itemWidth: 10,
            itemHeight: 15,
            itemGap: 40,
            icon: 'circle',
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
            axisLine: {
              lineStyle: {
                color: '#0186C0',
                width: 2,
              },
            },

            splitLine: {
              show: true,
              interval: (index, value) => {
                if (index != option.xAxis.data.length - 1) {
                  return true
                }
              },
              lineStyle: {
                type: 'solid',
                color: '#006EA5',
              }
            },
          },

          yAxis: {
            type: 'value',
            name: '水量(吨)',
            axisLine: {
              lineStyle: {
                color: '#0186C0',
                width: 2,
              },
            },

            splitLine: {
              show: true,

              lineStyle: {
                type: 'solid',
                color: '#013779'
              }
            },
          },
          series: [{
              name: '用水定额',
              type: 'line',
              smooth: true,
              data: this.$store.state.zx.de
            },
            {
              name: '节水量',
              type: 'line',
              smooth: true,
              data: this.$store.state.zx.jsl,
            },
            {
              name: '用水量',
              type: 'line',
              smooth: true,
              data: this.$store.state.zx.ysl,
            }
          ]
        }
        myChart.setOption(option)
      },
    },
  }
</script>

<style scoped="scoped">
  .chartBox {
    width: 100%;
    height: 102.5%;
    background-image: url(../../assets/img/bottom_bg.png);
    background-size: 95% 95%;
    background-repeat: no-repeat;
    background-position: center;
  }
</style>

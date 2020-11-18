export function initRankEchart(myChart){
  var option = {
  	grid: {
  		top: '10%',
  		left: '28%',
      right:'13%',
  		bottom: '10%',
  		containLabel: false
  	},
  	xAxis: {
  		show: false,
  	},
  	yAxis: [{
  			type: 'category',
  			inverse: true,
  			data: ["A01","A01","A01","A01","A01","A01","A01","A01","A01","A01"],
  			axisLine: {
  				show: true,
  				lineStyle: {
  					color: '#0068b7',
  					width: 3
  				},
  				symbolSize: [5, 7.5]
  			},
  			boundaryGap: false,
  			nameGap : 15,
  			offset:5,
  			axisTick: {
  				show: false
  			},
  			axisLabel: {
  				color: '#5ecef4',
  				textStyle: {
  					fontSize: 13,
  				},

  			},
  		},
  		{
  			data: ["300","300","300","300","300","300","300","300","300","300"],
  			inverse: true,
  			axisLine: {
  				show: false
  			},
        offset:-20,
  			boundaryGap: false,
  			axisTick: {
  				show: false
  			},
  			axisLabel: {
  				color: '#fff',
  				textStyle: {
  					fontSize: 13,
  				},
  			},
  		}
  	],
  	series: [{
  			name: '空格',
  			type: 'bar',
  			stack: 'a',
  			barWidth: 12,
  			zlevel: 5,
  			yAxisIndex: 0,
  			data: [6,6,6,6,6,6,6,6,6,6,6],
  			itemStyle: {
  				color: 'none'
  			}
  		},
  		{
  			name: '空格',
  			type: 'bar',
  			stack: 'b',
  			barWidth: 12,
  			zlevel: 5,
  			yAxisIndex: 1,
  			data: [0,0,0,0,0,0,0,0,0,0,0],
  			itemStyle: {
  				color: 'none'
  			}
  		},
  		{
        //蓝条长度
  			name: '条',
  			type: 'bar',
  			data: [80,80,80,80,80,80,80,80,80,80],
  			stack: 'a',
  			yAxisIndex: 0,
  			zlevel: 2,
  			itemStyle: {
  				barBorderRadius: 20,
  				// 此时的color 可以修改柱子的颜色
  				color: {
  					type: 'linear',
  					x: 1,
  					y: 1,
  					x2: 0,
  					y2: 0,
  					colorStops: [{
  							offset: 0,
  							color: '#366ef3' // 0% 处的颜色
  						},
  						{
  							offset: 1,
  							color: '#5de4f1' // 100% 处的颜色
  						}
  					],
  					global: false // 缺省为 false
  				}
  			},
  			barCategoryGap: '50%',
  			barWidth: 8
  		},
  		{
        //条背景长度
  			name: '框',
  			type: 'bar',
  			barCategoryGap: '50%',
  			barWidth: 8,
  			stack: 'b',
  			yAxisIndex: 1,
  			zlevel: 0,
  			data: [110,110,110,110,110,110,110,110,110,110],
  			itemStyle: {
  				color: '#003567',
  				barBorderRadius: 15
  			}
  		}, {
  			name: '外圆',
  			type: 'scatter',
  			hoverAnimation: false,
  			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  			yAxisIndex: 0,
  			symbolSize: 17,
  			itemStyle: {
  				normal: {
  					color: '#01b7ec',
  					opacity: 1
  				}
  			},
  			z: 2
  		}, {
  			name: '外圆',
  			type: 'scatter',
  			hoverAnimation: false,
  			data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  			yAxisIndex: 0,
  			symbolSize: 15,
  			itemStyle: {
  				normal: {
  					color: '#0264ae',
  					opacity: 1
  				}
  			},
  			z: 3
  		}
  	]
  }
  myChart.setOption(option)
}

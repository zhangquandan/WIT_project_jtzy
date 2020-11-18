import { getColourAtla } from '../../../util/color.js'
import { showInfo ,getVisualMap, getViewControl } from '../../../util/chartOpt.js'
import meterLocatron from '../../../assets/config/watermeter_wgs84.json'
var scatter = []
function initEcharts(myChart) {
  getLocation()
  var option = {
    geo3D: [{
      top:-50,
      left:20,
    	show: false,
    	roam: true,
    	zoom: 1,
    	map: "maprange",
    	selectedMode: true, //是否允许选中多个区域，
    	label: {
    		normal: {
    			show: false,
    			color: '#fff'
    		},
    		emphasis: {
    			show: false,
    			color: '#FFFF0F'
    		}
    	},
    	itemStyle: {
    		normal: {
    			show: false,
    			borderColor: 'none',
    			borderWidth: 2,
    			areaColor: 'none',
    			shadowColor: 'none',
    			shadowBlur: 6,
    			shadowOffsetY: 5,
    		},
    		emphasis: {
    			show: false,
    			areaColor: 'none)',
    			color: '#ff0'
    		}
    	},
      viewControl: getViewControl(160)
    }],

    visualMap:getVisualMap(),

    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,250,0)',
      formatter: function(params){
        return showInfo(params,2)
      }
    },

    series: [{
      type: 'scatter3D',
      name:'scatter3D',
      symbolSize: 25,
      coordinateSystem: 'geo3D',
      geo3DIndex: "0",
      //symbol:"arrow",
      symbol: "path://M512 2.696533C286.071467 2.696533 102.929067 185.838933 102.929067 411.767467c0 251.170133 243.541333 471.432533 373.794133 595.370666a51.080533 51.080533 0 0 0 70.5024 0.136534c127.163733-120.763733 373.8624-345.122133 373.8624-595.5072C921.070933 185.838933 737.928533 2.696533 512 2.696533z m0 562.670934c-84.8384 0-153.6-68.7616-153.6-153.6s68.7616-153.6 153.6-153.6a153.6 153.6 0 0 1 0 307.2z",
      data: scatter,
      label: {
        normal: {
          formatter: '{b}',
          position: 'right',
          show: false
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          color: function(e) {
            try {
              if (e.data.value[2] && e.data.value[2].leakageIndex != undefined) {
                return that.getColor(e.data.value[2])
              } else {
                return "#fff"
              }
            } catch (e) {}
          },
        },
      },

    }]
  }
  myChart.setOption(option)
}

//加载坐标
function getLocation(){
  var res = []
  for(let item of meterLocatron.features){
    var obj = {}
    let lat = item.geometry.coordinates[0]
    let lng = item.geometry.coordinates[1]
    let name = item.properties.name
    res.push({
      name:item.properties.name,
      value:[lat,lng]
    })
  }
  scatter = res
}

export {
  initEcharts
}

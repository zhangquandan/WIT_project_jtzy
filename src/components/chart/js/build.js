import {
  getColourAtla
} from '../../../util/color.js'
import { showInfo , getVisualMap, getViewControl} from '../../../util/chartOpt.js'
export function initBuildEchart(myChart) {
  var name1 = 'lt';
  var option = {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    visualMap: getVisualMap(),
    tooltip: {
      trigger: 'item',
      backgroundColor: 'rgba(0,0,250,0)',
      formatter: function(params){
        return showInfo(params,1)
      }
    },


    series: [{
      type: 'map3D', // 系列类型
      name: 'buildMap', // 系列名称
      map: name1, // 地图类型。echarts-gl 中使用的地图类型同 geo 组件相同(ECharts 中提供了两种格式的地图数据，一种是可以直接 script 标签引入的 js 文件，引入后会自动注册地图名字和数据。还有一种是 JSON 文件，需要通过 AJAX 异步加载后手动注册。)
      top: '-60',
      left: '-10',
      regionHeight:4,
      // 环境贴图，支持純颜色值，渐变色，全景贴图的 url。默认为 'auto'，在配置有 light.ambientCubemap.texture 的时候会使用该纹理作为环境贴图。否则则不显示环境贴图。
      label: {
        // 标签的相关设置
        show: false, // (地图上的城市名称)是否显示标签 [ default: false ]
        //distance: 50,               // 标签距离图形的距离，在三维的散点图中这个距离是屏幕空间的像素值，其它图中这个距离是相对的三维距离
        //formatter:,               // 标签内容格式器
        textStyle: {
          // 标签的字体样式
          color: '#000', // 地图初始化区域字体颜色
          fontSize: 8, // 字体大小
          opacity: 1, // 字体透明度
          backgroundColor: 'rgba(0,23,11,0)' // 字体背景色
        }
      },

      itemStyle: {
        // 三维地理坐标系组件 中三维图形的视觉属性，包括颜色，透明度，描边等。
        color: 'rgba(4,91,175,1)', // 地图板块的颜色
        opacity: 1, // 图形的不透明度 [ default: 1 ]
        borderWidth: 0.5, // (地图板块间的分隔线)图形描边的宽度。加上描边后可以更清晰的区分每个区域   [ default: 0 ]
        borderColor: '#000' // 图形描边的颜色。[ default: #333 ]
      },

      emphasis: {
        // 鼠标 hover 高亮时图形和标签的样式 (当鼠标放上去时  label和itemStyle 的样式)
        label: {
          // label高亮时的配置
          show: true,
          textStyle: {
            color: '#fff', // 高亮时标签颜色变为 白色
            fontSize: 15 // 高亮时标签字体 变大
          }
        },
        itemStyle: {
          // itemStyle高亮时的配置
          areaColor: '#66ffff' // 高亮时地图板块颜色改变
        }
      },

      groundPlane: {
        // 地面可以让整个组件有个“摆放”的地方，从而使整个场景看起来更真实，更有模型感。
        show: false, // 是否显示地面。[ default: false ]
        color: '#aaa' // 地面颜色。[ default: '#aaa' ]
      },

      viewControl: getViewControl(190)
    }]
  };
  myChart.setOption(option,true);
}

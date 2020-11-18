import mapStyle from '../../../assets/config/map-style.json'
import build from '../../../assets/config/build.json'
import scatter from '../../../assets/config/watermeter_wgs84.json'
import dma from '../../../assets/config/dma_jtzy_wgs84.json'
import campus from '../../../assets/config/maprange_jtzy_wgs84.json'
import router from '../../../router/index.js'
import {
  getColor,
  getColorArr
} from '../../../util/color.js'
import store from '../../../store/index.js'
import {
  getData
} from '../../../mock/data.js'
import {
  wgs84togcj02,
  gcj02tobd09
} from '../../../util/transform.js'

var img1 = require('../../../assets/img/quanping.png')
var img2 = require('../../../assets/img/huanyuan.png')
var img3 = require('../../../assets/img/chongzhi.png')

let map;
//各个信息的覆盖物
let overlays = {
  meter: [],
  dma: [],
  campus: [],
  build: []
}

let menu = []

//地图左侧按钮列表
let btns = []
let btnListView

var point = new BMapGL.Point(114.272159, 30.432361); //中心点
var Polyline = []
var arr2 = [
  '114.269321,30.436954',
  '114.269015,30.434743',
  '114.268836,30.433108',
  '114.268009,30.43029',
  '114.275825,30.430026',
  '114.276705,30.436425',
  '114.269321,30.436954',
]


var EN_JW = "180, 90;"; //东北角
var NW_JW = "-180,  90;"; //西北角
var WS_JW = "-180, -90;"; //西南角
var SE_JW = "180, -60;"; //东南角

var zoom_

function initBaiduMap(domId, isScreen, zoom) {
  if (map && map.destroy) {
    map.clearOverlays()
    map.destroy()
  }
  map = new BMapGL.Map(domId);
  map.centerAndZoom(point, 17.5);
  if (zoom) {
    zoom_ = zoom
    map.setZoom(zoom)
  }
  map.setMapStyleV2({
    styleJson: mapStyle
  })
  map.setTilt(40);
  map.setHeading(30);
  map.disableDoubleClickZoom()
  map.enableScrollWheelZoom(true)

  //var polyArr = []
  Polyline = []
  for (let i = 0; i < arr2.length; i++) {
    var loc = arr2[i].split(",")
    //polyArr.push(new BMapGL.Point(loc[0], loc[1]))
    Polyline.push(new BMapGL.Point(loc[0], loc[1]))
  }

  // var polyline_ = new BMapGL.Polyline(polyArr, {
  //   strokeColor: "#ff0",
  //   strokeWeight: 2,
  //   strokeOpacity: 1,
  //   geodesic: true,
  //   enableMassClear: false
  // });
  // map.addOverlay(polyline_);

  // var a = ""
  // for (let i = 0; i < arr2.length; i++) {
  //   a += arr2[i] + ";"
  // }
  //a + SE_JW + WS_JW + NW_JW + EN_JW + SE_JW
  // var ply1 = new BMapGL.Polygon(a + WS_JW + NW_JW + EN_JW + SE_JW, {
  //   strokeColor: "none",
  //   fillColor: "#021036",
  //   fillOpacity: 1,
  //   strokeOpacity: 0,
  //   enableMassClear: false
  // });
  // map.addOverlay(ply1);

  setMaprange()
  createMapMenu(isScreen)
}

function destroyMap() {
  //alert("sss")
}

function setPoint() {
  overlays.meter = []
  btns = []
  for (let item of scatter.features) {
    let location = item.geometry.coordinates
    let gcj02 = wgs84togcj02(location[0], location[1])
    let bd09 = gcj02tobd09(gcj02[0], gcj02[1])
    let point = new BMapGL.Point(bd09[0], bd09[1]);
    let marker = new BMapGL.Marker(point);
    let meterObj
    for (let i = 0; i < store.state.meterData.length; i++) {
      if (item.properties.name == store.state.meterData[i].name) {
        meterObj = store.state.meterData[i]
        break
      }
    }
    let win = getWindow(meterObj, item.properties.name)
    marker.addEventListener('click', function(e) {
      map.openInfoWindow(win, point);
    })
    btns.push({
      name: item.properties.name,
      win: win,
      polygon: point
    })
    overlays.meter.push(marker)
    map.addOverlay(marker);
  }
  upDateLeftList()
}

function setMaprange() {
  overlays.campus = []
  btns = []
  for (let item of campus.features) {
    let polygon = []
    for (let item_ of item.geometry.coordinates[0][0]) {
      let a = wgs84togcj02(item_[0], item_[1])
      let b = gcj02tobd09(a[0], a[1])
      polygon.push(new BMapGL.Point(b[0], b[1]))
    }
    let maprangeObj
    for (let i = 0; i < store.state.maprange.length; i++) {
      if (item.properties.name == store.state.maprange[i].name) {
        maprangeObj = store.state.maprange[i]
        break
      }
    }

    let maprangeColor = "#4B0082"
    if (maprangeObj) {
      let leakageIndex = parseInt(maprangeObj.value.leakageIndex)
      maprangeColor = getColor(leakageIndex)
    }
    let ply1 = new BMapGL.Prism(Polyline, 10, {
      topFillColor: maprangeColor,
      topFillOpacity: 0.8,
      sideFillColor: maprangeColor,
      sideFillOpacity: 1,
    });
    let win = getWindow(maprangeObj, item.properties.name)
    ply1.addEventListener('click', function(e) {
      map.openInfoWindow(win, new BMapGL.Point(e.latLng.lng, e.latLng.lat));
    });
    btns.push({
      name: item.properties.name,
      win: win,
      polygon: polygon[0]
    })
    overlays.campus.push(ply1)
    map.addOverlay(ply1);
  }
  upDateLeftList()
}



function setDMA() {
  overlays.dma = []
  btns = []
  for (let item of dma.features) {
    let polygon = []
    for (let item_ of item.geometry.coordinates[0][0]) {
      let a = wgs84togcj02(item_[0], item_[1])
      let b = gcj02tobd09(a[0], a[1])
      polygon.push(new BMapGL.Point(b[0], b[1]))
    }
    let dmaObj
    for (let i = 0; i < store.state.dmaData.length; i++) {
      if (item.properties.name == store.state.dmaData[i].name) {
        dmaObj = store.state.dmaData[i]
        break
      }
    }

    let dmaColor = "#4B0082"
    if (dmaObj) {
      let leakageIndex = parseInt(dmaObj.value.leakageIndex)
      dmaColor = getColor(leakageIndex)
    }

    let ply1 = new BMapGL.Prism(polygon, 10, {
      topFillColor: dmaColor,
      topFillOpacity: 0.8,
      sideFillColor: '#000',
      sideFillOpacity: 1,
    });
    let win = getWindow(dmaObj, item.properties.name)
    ply1.addEventListener('click', function(e) {
      map.openInfoWindow(win, new BMapGL.Point(e.latLng.lng, e.latLng.lat));
    });
    btns.push({
      name: item.properties.name,
      win: win,
      polygon: polygon[0]
    })
    overlays.dma.push(ply1)
    map.addOverlay(ply1);
  }
  upDateLeftList()
}

function setBuildData() {
  overlays.build = []
  btns = []
  for (let item of build.features) {
    let polygon = []
    for (let item_ of item.geometry.coordinates[0][0]) {
      let a = wgs84togcj02(item_[0], item_[1])
      let b = gcj02tobd09(a[0], a[1])
      polygon.push(new BMapGL.Point(b[0], b[1]))
    }
    let buildObj
    for (let i = 0; i < store.state.buildData.length; i++) {
      if (item.properties.name == store.state.buildData[i].name) {
        buildObj = store.state.buildData[i]
        break
      }
    }

    let buildColor = "#4B0082"
    if (buildObj) {
      let leakageIndex = parseInt(buildObj.value.leakageIndex)
      buildColor = getColor(leakageIndex)
    }

    //buildObj.height 建筑物高度 替换Prism第二个参数即可
    let c = new BMapGL.Prism(polygon, 30, {
      topFillColor: buildColor,
      topFillOpacity: 1,
      sideFillColor: '#333',
      sideFillOpacity: 1,
    });

    c.addEventListener('click', function() {
      map.openInfoWindow(win, polygon[0]);
    });
    let win = getWindow(buildObj, item.properties.name)
    btns.push({
      name: item.properties.name,
      win: win,
      polygon: polygon[0]
    })
    overlays.build.push(c)
    map.addOverlay(c);
  }
  upDateLeftList()
}

function getWindow(obj, name) {
  let opts = {
    width: 200,
    height: 150,
    enableAutoPan: false,
    title: '<div style="font-weight:800">' + name + '</div>'
  };

  if (obj) {
    return new BMapGL.InfoWindow(
      '<div' +
      '<div>当日水量：' + obj.value.total + '</div>' +
      '<div>日量隔周增量：' + obj.value.addTotal + '</div>' +
      '<div>日量隔周增幅：' + obj.value.addRangeTotal + '</div>' +
      '<div>最小流量隔周增量：' + obj.value.addMin + '</div>' +
      '<div>最小流量隔周增幅：' + obj.value.addRangeMin + '</div>' +
      '<div>综合侧漏指数：' + obj.value.leakageIndex + '</div>' +
      '</div>', opts);
  } else {
    return new BMapGL.InfoWindow(
      '<div' +
      '<div>暂无数据</div>' +
      '</div>', opts);
  }


}



function MapMenu() {
  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
  this.defaultOffset = new BMapGL.Size(20, 20)
}

//位置重置
function MapMenu2() {
  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
  this.defaultOffset = new BMapGL.Size(70, 10)
}

function MapMenu3() {
  this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
  this.defaultOffset = new BMapGL.Size(10, 10)
}

//全屏
function MapMenu4() {
  this.defaultAnchor = BMAP_ANCHOR_TOP_RIGHT;
  this.defaultOffset = new BMapGL.Size(10, 10)
}

//色卡
function MapMenu5() {
  this.defaultAnchor = BMAP_ANCHOR_BOTTOM_RIGHT;
  this.defaultOffset = new BMapGL.Size(0, 30)
}



function createMapMenu(isScreen) {

  MapMenu5.prototype = new BMapGL.Control()
  MapMenu5.prototype.initialize = function(map) {
    var div = document.createElement('div')
    var valbox = document.createElement('div')
    div.style.width = "100%"
    div.style.height = "28px"
    div.style.textAlign = 'center'
    valbox.style.height = "16px"
    valbox.style.textAlign = 'center'
    valbox.style.width = "100%"
    div.appendChild(valbox)
    var colors = getColorArr()
    var values = store.state.scale
    for (let i = 0; i < colors.length; i++) {
      var item = document.createElement('div')
      item.style.backgroundColor = colors[i]
      item.style.border = "1px solid #000"
      item.style.boxSizing = 'border-box'
      item.style.display = "inline-block"
      item.style.height = "12px"
      item.style.width = "4%"
      item.style.verticalAlign = 'top'
      if(values[i]){
        var val = document.createElement('div')
        val.innerText = values[i]
        val.style.color = '#fff'
        val.style.fontSize = '12px'
        val.style.width = '4%'
        val.style.height = '16px'
        val.style.lineHeight = '16px'
        val.style.textAlign = 'center'
        // val.style.border = '1px solid #000'
        // val.style.boxSizing = 'border-box'
        val.style.display = 'inline-block'
        valbox.appendChild(val)
      }
      div.appendChild(item)
    }
    map.getContainer().appendChild(div);
    return div;
  }
  map.addControl(new MapMenu5());

  MapMenu.prototype = new BMapGL.Control()
  MapMenu.prototype.initialize = function(map) {
    var div = document.createElement('div');
    div.style.padding = "7px 10px";
    div.style.boxShadow = "0 2px 6px 0 rgba(27, 142, 236, 0.5)";
    div.style.borderRadius = "5px";
    div.style.backgroundColor = "rgba(27, 142, 236, 0.5)";
    div.style.color = '#fff'
    menu = []
    var menuArr = ['校区管控', 'DMA管控', '建筑管控', '水表管控']
    for (let item of menuArr) {
      let menuItem = document.createElement('div')
      if (item == '校区管控') {
        menuItem.style.color = 'yellow'
      }
      menuItem.appendChild(document.createTextNode(item));
      menuItem.style.cursor = 'pointer'
      menuItem.onclick = function() {
        changeView(item)
      }
      menu.push(menuItem)
      div.appendChild(menuItem)
    }
    // 添加DOM元素到地图中
    map.getContainer().appendChild(div);
    return div;
  }

  var mapMenu = new MapMenu();
  map.addControl(mapMenu);

  MapMenu2.prototype = new BMapGL.Control()
  MapMenu2.prototype.initialize = function(map) {
    var div = document.createElement('div')
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.textAlign = 'center'
    div.style.color = 'white'
    var img = document.createElement('img')
    img.src = img3
    img.style.cursor = 'pointer'
    div.appendChild(img)
    img.onclick = function() {
      map.reset()
      setTimeout(function() {
        if (zoom_) {
          map.setZoom(zoom_)
        }
        map.setTilt(40);
        map.setHeading(30);
      }, 1000)
    }
    map.getContainer().appendChild(div);
    return div;
  }
  var mapMenu2 = new MapMenu2();
  map.addControl(mapMenu2);


  MapMenu4.prototype = new BMapGL.Control()
  MapMenu4.prototype.initialize = function(map) {
    var div = document.createElement('div')
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.textAlign = 'center'
    var img = document.createElement('img')
    img.style.cursor = 'pointer'
    if (!isScreen) {
      img.src = img1
      div.appendChild(img)
      img.onclick = function() {
        router.push('/bigMap')
      }
    } else {
      img.src = img2
      div.appendChild(img)
      img.onclick = function() {
        router.push('/')
      }
    }
    map.getContainer().appendChild(div);
    return div;
  };
  map.addControl(new MapMenu4());
}

function upDateLeftList() {
  map.removeControl(btnListView)
  MapMenu3.prototype = new BMapGL.Control()
  MapMenu3.prototype.initialize = function(map) {
    var div = document.createElement('div')
    div.style.width = "150px"
    div.style.height = "96%"
    div.style.backgroundColor = "rgba(27, 142, 236, 0.5)";
    div.style.color = '#fff'
    div.style.cursor = 'pointer'
    div.style.overflow = 'auto'
    div.style.boxSizing = 'border-box'
    div.style.paddingLeft = '10px'
    for (let item of btns) {
      let btn = document.createElement('div')
      btn.appendChild(document.createTextNode(item.name))
      btn.style.padding = "10px 0"
      btn.style.overflow = "hidden"
      btn.style.textOverflow = "ellipsis"
      btn.style.whiteSpace = "nowrap"
      btn.onclick = function() {
        item.win._config.enableAutoPan = true
        console.log(item.win)
        map.openInfoWindow(item.win, item.polygon);
        setTimeout(function() {
          item.win._config.enableAutoPan = false
        }, 1000)
      }
      div.appendChild(btn)
    }
    map.getContainer().appendChild(div);
    return div;
  }
  btnListView = new MapMenu3();
  map.addControl(btnListView);
}



function changeView(type) {
  var dom
  var data;
  var f;
  if (!map) {
    return
  }
  /**单选模式（启动多选模式需注释)*/
  map.clearOverlays()
  for (let item of menu) {
    item.style.color = "#fff"
  }
  /***************************/
  switch (type) {
    case '校区管控':
      data = 'campus'
      f = setMaprange
      dom = menu[0]
      break
    case 'DMA管控':
      data = 'dma'
      f = setDMA
      dom = menu[1]
      break
    case '建筑管控':
      data = 'build'
      f = setBuildData
      dom = menu[2]
      break
    case '水表管控':
      data = 'meter'
      f = setPoint
      dom = menu[3]
      break
  }
  f()
  /**单选模式（启动多选模式需注释)*/
  dom.style.color = '#ff0'
  /***************************/

  /**多选模式取消下面代码的注释***/
  // if (dom.style.color == 'yellow') {
  //   for (let item of overlays[data]) {
  //     map.removeOverlay(item)
  //   }
  //   dom.style.color = '#fff'
  // } else {
  //   f()
  //   dom.style.color = 'yellow'
  // }
}

export {
  initBaiduMap,
  destroyMap,
  setData,
  reset,
  changeView
}

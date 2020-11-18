var Mock = require('mockjs')
import store from '../store/index.js'
import build from '../assets/config/build.json'
import dma from '../assets/config/dma_jtzy_wgs84.json'
import maprange from '../assets/config/maprange_jtzy_wgs84.json'
import meter from '../assets/config/watermeter_wgs84.json'
function getData() {
  var regions = build.features.map(function(feature) {
    var data = {
      addMin: Mock.Random.natural(0, 1000000) / 100,
      addRangeMin: Mock.Random.natural(0, 10000) / 100 + "%",
      addRangeTotal: Mock.Random.natural(0, 10000) / 100 + "%",
      addTotal: Mock.Random.natural(0, 1000000) / 100,
      id: Mock.Random.natural(0, 100),
      leakageIndex: Mock.Random.natural(0, 150000) / 100,
      min: Mock.Random.natural(0, 100) / 100,
      time: "2020-10-13",
      name:feature.properties.name,
      total: Mock.Random.natural(0, 100) / 100,
    }
    return {
      name: feature.properties.name,
      value: data,
      height: feature.properties.height
    };
  });
  store.commit("setBuildData", regions)
  //return data
}

function getMeterData() {
  var regions = meter.features.map(function(feature) {
    var data = {
      addMin: Mock.Random.natural(0, 1000000) / 100,
      addRangeMin: Mock.Random.natural(0, 10000) / 100 + "%",
      addRangeTotal: Mock.Random.natural(0, 10000) / 100 + "%",
      addTotal: Mock.Random.natural(0, 1000000) / 100,
      id: Mock.Random.natural(0, 100),
      leakageIndex: Mock.Random.natural(0, 150000) / 100,
      min: Mock.Random.natural(0, 100) / 100,
      time: "2020-10-13",
      name:feature.properties.name,
      total: Mock.Random.natural(0, 100) / 100,
    }
    return {
      name: feature.properties.name,
      value: data,
    };
  });
  store.commit("setMeterData", regions)
}

function getDMAData(){
  var regions = dma.features.map(function(feature) {
    var data = {
      addMin: Mock.Random.natural(0, 1000000) / 100,
      addRangeMin: Mock.Random.natural(0, 10000) / 100 + "%",
      addRangeTotal: Mock.Random.natural(0, 10000) / 100 + "%",
      addTotal: Mock.Random.natural(0, 1000000) / 100,
      id: Mock.Random.natural(0, 100),
      leakageIndex: Mock.Random.natural(0, 150000) / 100,
      min: Mock.Random.natural(0, 100) / 100,
      time: "2020-10-13",
      name:feature.properties.name,
      total: Mock.Random.natural(0, 100) / 100,
    }
    return {
      name: feature.properties.name,
      value: data,
    };
  });
  store.commit("setDMAData", regions)
}

function getMaprangeData(){
  var regions = maprange.features.map(function(feature) {
    var data = {
      addMin: Mock.Random.natural(0, 1000000) / 100,
      addRangeMin: Mock.Random.natural(0, 10000) / 100 + "%",
      addRangeTotal: Mock.Random.natural(0, 10000) / 100 + "%",
      addTotal: Mock.Random.natural(0, 1000000) / 100,
      id: Mock.Random.natural(0, 100),
      leakageIndex: Mock.Random.natural(0, 150000) / 100,
      min: Mock.Random.natural(0, 100) / 100,
      time: "2020-10-13",
      name:feature.properties.name,
      total: Mock.Random.natural(0, 100) / 100,
    }
    return {
      name: feature.properties.name,
      value: data,
    };
  });
  store.commit("setMaprange", regions)
}

export {
  getData,
  getMeterData,
  getDMAData,
  getMaprangeData
}

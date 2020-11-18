import service from './fetch.js'
import {
  time
} from '../util/time.js'

var y = new Date().getFullYear()

/**
 * 建筑综合漏损指数
 * @param {Object} params :{buildingid  建筑ID， time   时间（yyyy-MM-dd）}
 * @param {Object} callback
 */
export function getBuildData() {
  return service.get('/wsis/api/building/LeakageIndex', {
    params: {
      time: '2020-10-19'
    }
  })
}

/**
 * 获取色卡值
 */
export function getSkData() {
  return service.get('/wsis/api/legendStatisticsStandard')
}

/**
 * 获取总体用水指标
 */
export function getTotalityData() {
  var obj = {}
  service.get('/wsis/api/waterregion/Quantity/CustomTimeDay', {
    params: {
      time: time.getYesFormatDay()
    }
  }).then(res => {
    console.log(res)
  })
}

/**
 * 获取学校信息
 */
export function getSchoolInfo() {
  return service.get('/wsis/api/statsvariable')
}

/**
 * 获取水表运行情况
 */
export function getMeterRunInfo(isOnLine) {
  var param = {}
  if(isOnLine){
    param = {
       name: 'isonline',
       value: 1
     }
  }
  return service.get('/wsis/api/watermeter/search', {
     params: param
  })
}

export function lineData() {
  return service.get('/wsis/api/waterregionWaterquotaList', {
    params:{
      waterregionid: 1,
      quotayear: new Date().getFullYear()
    }
  })
}

export function getMWrite(){
  return service.get('/wsis/api/waterregion/Quantity/YearMonth',{
     params:{
       pageNum:1,
       pageSize:100,
       yy:y,
       waterregionid:1,
     }
  })
}

/**
 * 获取校园、DMA数据
 */
export function waterregion() {
  return service.get('/wsis/api/waterregion/LeakageIndex', {
     params: {
       time: time.getYesFormatDay()
     }
  })
}

export function getWaterPointData(){
  return service.get('/wsis/api/logWatermeter/LeakageIndex',{
    params:{
      time:time.getYesFormatDay()
    }
  })
}

export function getQuantityByDay(){
  return service.get('wsis/api/waterregion/Quantity/CustomTimeDay',{
    params:{
      pageNum: 1,
      pageSize: 5,
      waterregionid: 1,
      starttime: time.getYesFormatDay(),
      endtime: time.getNowFormatDay()
    }
  })
}

export function getQuantityByMonth(){
  return service.get('wsis/api/waterregion/Quantity/CustomTimeMonth',{
    params:{
      pageNum: 1,
      pageSize: 5,
      waterregionid: 1,
      starttime: time.getNowFormatDayNoDay(),
      endtime: time.getNextMonth(time.getNowFormatDayNoDay())
    }
  })
}

export function getQuantityByYear(){
  return service.get('wsis/api/waterregion/Quantity/Years',{
    params:{
      pageNum: 1,
      pageSize: 5,
      waterregionid: 1,
      startyy: y,
      endyy: y+1,
    }
  })
}

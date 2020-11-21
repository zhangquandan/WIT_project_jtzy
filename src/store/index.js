import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    scale:[],//卡尺值
    viewType:"campus",//地图类型
    buildData:[],//建筑管控数据
    meterData:[],//水表管控数据
    dmaData:[],//dma管控数据
    maprange:[], //学校管控数据
    topTen:[],
    schoolInfo:{},//学校信息,
    meterInfo:[],//水表在线情况 [总数,在线,离线]
    zx:{
    	de: [], //每月用水定额
    	ysl: [], //每月用水量
    	jsl: [], //每月节水量
    	bnde: 0, //本年定额
    	ylj: 0, //已累计
    	yyjs: 0, //以用节水
    	yyjsl: 0, //已用节水率
    },

    //总体用水指标
    indicator: [{
    	label: "昨日用水总量(T)",
    	data: "加载中"
    }, {
    	label: "本月用水总量(T)",
    	data: "加载中"
    }, {
    	label: "本年用水总量(T)",
    	data: "加载中"
    }, {
    	label: "本年生均单耗(L/P.D)",
    	data: "加载中"
    }, {
    	label: "本年建筑单耗(L/M².D)",
    	data: "加载中"
    }, {
    	label: "本年节水率(T)",
    	data: "加载中"
    }, ],
  },
  mutations: {
    setBuildData:function(state,args){
      state.buildData = args
    },

    upDateIndicator:function(state,args){
      state.indicator[args.index].data = args.val
      state.indicator.push({})
      state.indicator.pop()
    },

    setScale:function(state,args){
      state.scale = args
    },

    setMeterInfo:function(state,args){
      state.meterInfo = args
    },

    setTopTen:function(state,args){
      state.topTen = args
    },

    setMeterData:function(state,args){
      state.meterData = args
    },

    setViewType:function(state,args){
      state.viewType = args
    },

    setDMAData:function(state,args){
      state.dmaData = args
    },

    setMaprange:function(state,args){
      state.maprange = args
    },

    setSchoolInfo:function(state,args){
      state.schoolInfo = args
    },

    setData: function(state, args) {
    	state.zx.de = args.de
    	state.zx.ysl = args.ysl
    	state.zx.jsl = args.jsl
    	state.zx.bnde = args.bnde
    	state.zx.ylj = args.ylj
    	state.zx.yyjs = args.yyjs
    	state.zx.yyjsl = args.yyjsl
    	args.success()
    },
  },
  actions: {
  },
  modules: {
  }
})

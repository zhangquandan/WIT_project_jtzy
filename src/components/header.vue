<template>
  <div class="header">
    <div class="logoBox">
      <img src="../assets/img/logo.png" />
      <div class="logoInfo">
        <div>武汉交通职业学院</div>
        <div>智慧水务管控平台</div>
      </div>
    </div>

    <div class="nav">
      <span :class="{'isChoose':$store.state.viewType == 'campus'}" @click="changeView('campus')">校区管控</span>
      <span :class="{'isChoose':$store.state.viewType == 'dma'}" @click="changeView('dma')">DMA管控</span>
      <span :class="{'isChoose':$store.state.viewType == 'build'}" @click="changeView('build')">建筑管控</span>
      <span :class="{'isChoose':$store.state.viewType == 'meter'}" @click="changeView('meter')">水表管控</span>
    </div>

    <div class="subnav">
      <span style="margin-right: 30px;">欢迎您,武汉交通职业学院</span>
      <a href="http://47.110.33.227:8280/wit/#/WaterPublicity/WaterSurvey" style="color: white; display: inline-block; cursor: pointer;">返回首页</a>
      <div class="time">
        <span>{{year}}-{{month}}-{{day}}</span>
        <span>{{hour}}:{{minute}}:{{second}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'myHeader',
    data() {
      return {
        year: "",
        month: "",
        day: "",
        hour: "",
        minute: "",
        second: "",
        week: ""
      }
    },

    mounted() {
      this.getNowTime()
    },

    methods: {
      goback:function(url){
        window.location.href = url
      },

      changeView: function(view) {
        if (this.$store.state.viewType != view) {
          this.$store.commit("setViewType", view)
          this.$emit('changeView')
        }
      },

      getNowTime: function() {
        var _this = this;
        var date;
        setInterval(function() {
          date = new Date()
          _this.year = _this.appendZer(date.getFullYear())
          _this.month = (_this.appendZer(date.getMonth() + 1))
          _this.day = _this.appendZer(date.getDate())
          _this.hour = _this.appendZer(date.getHours())
          _this.minute = _this.appendZer(date.getMinutes())
          _this.second = _this.appendZer(date.getSeconds());
        }, 1000);
      },

      //过滤加0
      appendZer: function(obj) {
        if (obj < 10) {
          return "0" + obj;
        } else {
          return obj;
        }
      },
    }
  }
</script>

<style scoped="scoped">
  .header {
    height: 89px;
    position: relative;
    background-image: url(../assets/img/top_bg.png);
    background-repeat: no-repeat;
    background-position: -15px 0px;
  }

  .isChoose {
    color: yellow !important;
  }

  .header .logoBox {
    position: absolute;
    top: 20px;
    left: 80px;
    width: 300px;
  }

  .header .logoBox .logoInfo {
    display: inline-block;
    color: rgb(48, 204, 252);
    font-size: 20px;
    vertical-align: 10px;
    margin-left: 10px;
  }

  .header .logoBox .logoInfo :nth-child(1) {
    font-weight: 800;
  }

  .nav {
    position: absolute;
    text-align: center;
    width: 1014px;
    top: 20px;
    left: 50%;
    margin-left: -515px;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .nav span {
    font-size: 1.5rem;
    margin: 30px;
    color: rgb(55, 205, 255);
    cursor: pointer;
  }

  .subnav {
    position: absolute;
    right: 70px;
    top: 50px;
    color: white;
  }

  .subnav .time {
    position: absolute;
    right: 0;
    margin-top: 10px;
  }
</style>

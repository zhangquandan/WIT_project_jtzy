<template>
  <div id="schoolInfo">
    <div class="top">
      <img style="width: 25px; height: 25px; vertical-align: -4px; margin-right: 5px;" src="../assets/img/RU_icon.png" />
      学校基本信息
    </div>

    <div class="content">
      <div class="column column-floor">
        <div>占地面积(亩)</div>
        <div style="margin-top: 10px;">
          <div :key="index" v-for="(item,index) in format($store.state.schoolInfo.flooSpace)" class="digit">
            {{item}}
          </div>
        </div>
      </div>

      <div class="column column-covered-area">
        <div>建筑面积(m²)</div>
        <div style="margin-top: 10px;">
          <div :key="index" v-for="(item,index) in format($store.state.schoolInfo.coveredArea)" class="digit">
            {{item}}
          </div>
        </div>
      </div>

      <div class="column column-stu">
        <div>学生人数(人)</div>
        <div style="margin-top: 10px;">
          <div :key="index" v-for="(item,index) in format($store.state.schoolInfo.stuNum)" class="digit">
            {{item}}
          </div>
        </div>
      </div>

      <div class="column column-tea">
        <div>教职工人数(人)</div>
        <div style="margin-top: 10px;">
          <div :key="index" v-for="(item,index) in format($store.state.schoolInfo.teaNum)" class="digit">
            {{item}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'schoolInfo',
    data() {
      return {
        num:'124567'
      }
    },

    mounted() {

    },

    methods:{
      format:function(num){
        num = num+''
        return num.split('')
      }
    }
  }
</script>

<style scoped="scoped">
  #schoolInfo{
    color: white;
    width: 100%;
    height: 100%;
    position: relative;
    background-image: url(../assets/img/schoolInfo.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    overflow: hidden;
  }

  .top {
   font-size: 1.25rem;
   color:rgb(250,205,65);
   height: 50px;
   line-height: 50px;
   background-color: rgb(4,33,103);
   margin: 2px;
   text-align: left;
   padding-left: 20px;
   box-sizing: border-box;
  }

  .top::after{
    content: '';
    height: 2px;
    width: 100%;
    display: block;
    background-image: linear-gradient(to right, rgb(4,33,103),rgb(4,33,103), rgb(0,154,215) 50% ,rgb(4,33,103),rgb(4,33,103));
  }

  .content{
    position: relative;
    width: 78%;
    height: 60%;
    top: 10%;
    left: 11%;
  }

  .content .column{
    width: 46%;
    height: 43%;
    color: white;
    padding:10px 5px;
    box-sizing: border-box;
    text-align: center;
    position: absolute;
    border: rgb(37,111,174) 1px solid;
  }

  .content .column-floor{
    top: 0;
    left: 0;
  }

  .content .column-covered-area{
    top: 0;
    right: 0;
  }

  .content .column-stu{
    bottom: 0;
    left: 0;
  }

  .content .column-tea{
    right: 0;
    bottom: 0;
  }

  .column .digit{
    font-weight: 700;
    font-size: 18px;
    display: inline-block;
    width: 18px;
    margin:0 2px;
    text-align: center;
    background-image: url(../assets/img/num_bg.png), url(../assets/img/num_bg.png);
    background-position: top center,bottom center;
    background-size: 100% 46%,100% 46%;
    background-repeat: no-repeat;
  }
</style>

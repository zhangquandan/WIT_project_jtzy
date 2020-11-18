<template>
    <div id="indicators">
      <div class="top">
        <img style="width: 25px; height: 25px; vertical-align: -4px; margin-right: 5px;" src="../assets/img/low-right_icon.png" />
        总体用水指标
      </div>

      <div class="column">
        <div class="column-item">指标</div>
        <div class="column-item">全校区</div>
      </div>

      <div>
         <div class="value" :key="item.label" v-for="(item,index) in $store.state.indicator">
           <div style="width:170px" class="val-item">{{item.label}}</div>
           <div style="padding-left: 35px;" class="val-item">{{item.data}}</div>
         </div>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'indicators',
    data() {
      return {
        
      }
    },

    mounted() {

    },

    methods:{

    }
  }
</script>

<style scoped="scoped">
  #indicators{
    width: 100%;
    height: 100%;
    background-image: url(../assets/img/indicators.png);
    background-size: 100% 100%;
    overflow: hidden;
  }

  .top {
   font-size: 1.25rem;
   color:rgb(250,205,65);
   height: 50px;
   line-height: 50px;
   background-color: rgb(4,33,103);
   margin: 4px;
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

  .column .column-item{
    display: inline-block;
    width: 100px;
    background-image: url(../assets/img/lbBg.png);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding: 8px;
    margin:30px 15px;
    color: white;
  }

  .value{
    height: 50px;
    padding-bottom: 10px;
  }

  .value::after{
    content: '';
    display: block;
    height: 1px;
    background-color: rgb(7,52,193);
    width: 80%;
    margin-left: 10%;
    margin-top: 20px;
  }

  .value .val-item{
    width: 140px;
    color: #5ECEF4;
    display: inline-block;
    font-size: 14px;
    text-align: left;
    padding-left: 25px;
    box-sizing: border-box;
  }
</style>
